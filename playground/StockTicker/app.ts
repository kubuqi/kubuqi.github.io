class Ticker {
    clock: HTMLElement;
    quote_table: HTMLElement;
    add_symbol: HTMLInputElement;
    timerToken: number;
    symbols: Array<string>;

    // Flag to help skip fetching if previous one is pending.
    is_fetching: Boolean;    

    constructor() {
        // Clock
        this.clock = document.getElementById("clock");
        this.clock.innerText = new Date().toUTCString();

        // Stock Table
        this.quote_table = document.getElementById('stock_table');

        // Input for new stock
        this.add_symbol = <HTMLInputElement>document.getElementById('add_symbol');

        // Add couple of stocks into the list to make it pretty.
        this.symbols = [];
        this.addNewSymbol("AAPL");
        this.addNewSymbol("BABA");
        this.addNewSymbol("GOOG");

        this.is_fetching = false;
    }

    start() {
        this.timerToken = setInterval(this.onTick.bind(this), 1000);
    }

    stop() {
        clearTimeout(this.timerToken);
    }

    // Fetch quote from Yahoo and update table.
    onTick() {
        this.clock.innerHTML = new Date().toUTCString();

        // If there is a previous fetching going on, skip
        if (this.is_fetching) {
            return;
        }
        this.is_fetching = true;    // will turn off after ajax return.

        // Construct csv URL. Sample URL: http://download.finance.yahoo.com/d/quotes.csv?s=TSLA+GOOG+&f=snl1p
        var csvUrl: string = "http://download.finance.yahoo.com/d/quotes.csv?f=snl1p";
        csvUrl += "%26s%3D"; // "&s=" but have to code in ASCII here
        for (let entry of this.symbols) {
            // Append symbols
            csvUrl += entry;
            csvUrl += ",";
        }
        // Add a timestamp as fake symbol so as to avoid caching
        csvUrl += new Date().getTime();
        // console.log('csv URL: ' + csvUrl);

        // Yahoo Query Language. 
        // Go to here to construct and test your query: https://developer.yahoo.com/yql/
        var yql: string = "select * from csv where url='" + csvUrl + "'" + " and columns='symbol,name,price,previous_close'";
        // console.log('YQL: ' + yql);

        // JSON API URL
        var jsonUrl: string = "https://query.yahooapis.com/v1/public/yql?q=" + yql + "&format=json";
        console.log("JSON URL:" + jsonUrl);

        var self = this;
        $.ajax({
            type: 'GET',
            url: jsonUrl,
            dataType: 'json',
            crossDomain: true,
            cache: false,
            success: function (response) {
                var result: yql_json.RootObject = <yql_json.RootObject>response;
                console.log("Feched " + result.query.count + " results");
                if (result.query.count > 1) {
                    for (let entry of result.query.results.row) {
                        var row: HTMLTableRowElement = <HTMLTableRowElement>document.getElementById(entry.symbol);
                        if (row) {
                            row.cells[0].innerHTML = entry.symbol;
                            row.cells[1].innerHTML = entry.name;
                            row.cells[2].innerHTML = Number(entry.price).toFixed(2).toString();

                            var change: Number = (Number(entry.price) - Number(entry.previous_close)) * 100 / Number(entry.previous_close);
                            row.cells[3].innerHTML = change.toFixed(2).toString();
                            console.log(entry.name + ":" + entry.price + Number(entry.previous_close));
                        }
                    }
                } else {
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
    }

    // Add a new stock into list.
    addNewSymbol(new_symbol: string) {

        // Check for duplication before insert.
        for (let entry of this.symbols) {
            if (new_symbol == entry) {
                console.log("Duplicated symbol: " + new_symbol);
                return;
            }
        }

        // Create a new row in the stock list table.
        var elem_table_row: HTMLTableRowElement = <HTMLTableRowElement>document.createElement("TR");
        elem_table_row.setAttribute("ID", new_symbol);
        elem_table_row.insertCell(0);
        elem_table_row.insertCell(1);
        elem_table_row.insertCell(2);
        elem_table_row.insertCell(3);
        this.quote_table.appendChild(elem_table_row);

        // Create click handler to delete a stock symbol
        var ticker = this;
        elem_table_row.addEventListener(
            "click",
            function () {
                // Remove from symbol array on click
                let index: number = ticker.symbols.indexOf(this.getAttribute("ID"));
                if (index !== -1) {
                    ticker.symbols.splice(index, 1);
                }
                ticker.quote_table.removeChild(this);
            },
            false);

        this.symbols.push(new_symbol);
        console.log(this.symbols);
    }

    // Handler for add new symbol button.
    onNewSymbol() {
        this.addNewSymbol(this.add_symbol.value);
    }
}


window.onload = () => {
    var ticker = new Ticker();
    ticker.start();

    // New symbol handler.
    document.getElementById('add_button').addEventListener("click", ticker.onNewSymbol.bind(ticker), false);
};