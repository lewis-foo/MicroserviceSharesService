let fs = require("fs"),
    xml2js = require("xml2js");

function read(callback) {
        fs.readFile("data/shares.json" , "utf-8", function (err, data) {
            if(err) return console.log(err);
            callback(JSON.parse(data));
        })
}
function write(shares) {
    fs.writeFile( "data/shares.json" , JSON.stringify(shares, null, 2), err => {
        if(err) return console.log(err);
        console.log("File successfully saved");
    });
}
class SharesRepository {

    constructor() {

        let self = this;
        read(function (result) {
            if(result.hasOwnProperty("shares")){
                self.shares = result;
            }else{
                self.shares = {
                    "shares" : []
                }
            }

        });
    }

    getAll(){
        var self = this;
        read(function (result) {
            if(result.hasOwnProperty("shares")){
                self.shares = result;
            }else{
                self.shares = {
                    "shares" : []
                }
            }

        });
        return this.shares;
    }
    search(term){
        var share = this.shares.shares.filter((item) =>{
            return item.company_symbol.toLowerCase() .startsWith( term.toLowerCase()) ||
                item.company_name.toLowerCase().startsWith(term.toLowerCase());
        });
        return share;
    }
    update(symbol, prop , value){
        console.log(symbol);
        var self = this;
        read(function (result) {
            if(result.hasOwnProperty("shares")){
                self.shares = result;
            }else{
                self.shares = {
                    "shares" : []
                }
            }

        });
        var share = this.shares.shares.filter((item) =>{
            return item.company_symbol.toLowerCase() === symbol.toLowerCase();
        });

        share[0][prop] = value;
        write(this.shares);
    }

    getBySymbol(symbol){
        var share = this.shares.shares.filter((item) =>{
            return item.company_symbol.toLowerCase() === symbol.toLowerCase();
        });
        console.log(share);
        return share;
    }

    addStock(stock){
        if(this.getBySymbol(stock.company_symbol).length === 0)
        {
            this.shares.shares.push(stock);
            write(this.shares);
        }

    }

}

module.exports = SharesRepository;