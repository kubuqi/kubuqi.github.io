var Ticker = (function () {
    function Ticker() {
        // Clock
        this.clock = document.getElementById("clock");
        this.clock.innerText = new Date().toUTCString();
        // Stock Table
        this.quote_table = document.getElementById('stock_table');
        // Input for new stock
        this.add_symbol = document.getElementById('add_symbol');
        // Add couple of stocks into the list to make it pretty.
        this.symbols = [];
        this.addNewSymbol("AAPL");
        this.addNewSymbol("BABA");
        this.addNewSymbol("GOOG");
        this.is_fetching = false;
    }
    Ticker.prototype.start = function () {
        this.timerToken = setInterval(this.onTick.bind(this), 1000);
    };
    Ticker.prototype.stop = function () {
        clearTimeout(this.timerToken);
    };
    // Fetch quote from Yahoo and update table.
    Ticker.prototype.onTick = function () {
        this.clock.innerHTML = new Date().toUTCString();
        // If there is a previous fetching going on, skip
        if (this.is_fetching) {
            return;
        }
        this.is_fetching = true; // will turn off after ajax return.
        // Construct csv URL. Sample URL: http://download.finance.yahoo.com/d/quotes.csv?s=TSLA+GOOG+&f=snl1p
        var csvUrl = "http://download.finance.yahoo.com/d/quotes.csv?f=snl1p";
        csvUrl += "%26s%3D"; // "&s=" but have to code in ASCII here
        for (var _i = 0, _a = this.symbols; _i < _a.length; _i++) {
            var entry = _a[_i];
            // Append symbols
            csvUrl += entry;
            csvUrl += ",";
        }
        // Add a timestamp as fake symbol so as to avoid caching
        csvUrl += new Date().getTime();
        // console.log('csv URL: ' + csvUrl);
        // Yahoo Query Language. 
        // Go to here to construct and test your query: https://developer.yahoo.com/yql/
        var yql = "select * from csv where url='" + csvUrl + "'" + " and columns='symbol,name,price,previous_close'";
        // console.log('YQL: ' + yql);
        // JSON API URL
        var jsonUrl = "https://query.yahooapis.com/v1/public/yql?q=" + yql + "&format=json";
        console.log("JSON URL:" + jsonUrl);
        var self = this;
        $.ajax({
            type: 'GET',
            url: jsonUrl,
            dataType: 'json',
            crossDomain: true,
            cache: false,
            success: function (response) {
                var result = response;
                console.log("Feched " + result.query.count + " results");
                if (result.query.count > 1) {
                    for (var _i = 0, _a = result.query.results.row; _i < _a.length; _i++) {
                        var entry = _a[_i];
                        var row = document.getElementById(entry.symbol);
                        if (row) {
                            row.cells[0].innerHTML = entry.symbol;
                            row.cells[1].innerHTML = entry.name;
                            row.cells[2].innerHTML = Number(entry.price).toFixed(2).toString();
                            var change = (Number(entry.price) - Number(entry.previous_close)) * 100 / Number(entry.previous_close);
                            row.cells[3].innerHTML = change.toFixed(2).toString();
                            console.log(entry.name + ":" + entry.price + Number(entry.previous_close));
                        }
                    }
                }
                else {
                    console.log("Feched empty result");
                }
                // Turn off fetching flag
                self.is_fetching = false;
            },
            error: function (request, status, error) {
                console.log("Fetching failed, " + request.responseText);
                self.is_fetching = false;
            }
        }); // end of ajax
    };
    // Add a new stock into list.
    Ticker.prototype.addNewSymbol = function (new_symbol) {
        // Check for duplication before insert.
        for (var _i = 0, _a = this.symbols; _i < _a.length; _i++) {
            var entry = _a[_i];
            if (new_symbol == entry) {
                console.log("Duplicated symbol: " + new_symbol);
                return;
            }
        }
        // Create a new row in the stock list table.
        var elem_table_row = document.createElement("TR");
        elem_table_row.setAttribute("ID", new_symbol);
        elem_table_row.insertCell(0);
        elem_table_row.insertCell(1);
        elem_table_row.insertCell(2);
        elem_table_row.insertCell(3);
        this.quote_table.appendChild(elem_table_row);
        // Create click handler to delete a stock symbol
        var ticker = this;
        elem_table_row.addEventListener("click", function () {
            // Remove from symbol array on click
            var index = ticker.symbols.indexOf(this.getAttribute("ID"));
            if (index !== -1) {
                ticker.symbols.splice(index, 1);
            }
            ticker.quote_table.removeChild(this);
        }, false);
        this.symbols.push(new_symbol);
        console.log(this.symbols);
    };
    // Handler for add new symbol button.
    Ticker.prototype.onNewSymbol = function () {
        this.addNewSymbol(this.add_symbol.value);
    };
    return Ticker;
}());
window.onload = function () {
    var ticker = new Ticker();
    ticker.start();
    // New symbol handler.
    document.getElementById('add_button').addEventListener("click", ticker.onNewSymbol.bind(ticker), false);
};
//# sourceMappingURL=app.js.map