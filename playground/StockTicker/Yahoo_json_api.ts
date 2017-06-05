// JSON types generated from json2types

// JSON types for https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20csv%20where%20url=%27http://download.finance.yahoo.com/d/quotes.csv?f=snl1p%26s%3DAAPL,BABA,GOOG,TSLA,123%27%20and%20columns=%27symbol,name,price,previous_close%27&format=json

declare module yql_json {

    export interface Row {
        symbol: string;
        name: string;
        price: string;
        previous_close: string;
    }

    export interface Results {
        row: Row[];
    }

    export interface Query {
        count: number;
        created: Date;
        lang: string;
        results: Results;
    }

    export interface RootObject {
        query: Query;
    }
}
