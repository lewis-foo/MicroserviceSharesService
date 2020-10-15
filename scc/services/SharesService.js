let SharesRepository = require("../repository/shares_repository");
let repo = new SharesRepository();
let request = require("request");


class SharesService {
    constructor() {

    }

    getAllShares(){
        return repo.getAll();
    }
    search(term){
        return repo.search(term);
    }
    getShareBySymbol(symbol){
        return repo.getBySymbol(symbol);
    }

    addShareCompany(symbol, callback){
        var requestURI = "https://cloud.iexapis.com/stable/stock/"+symbol+"/quote?token=pk_5503ac3e508443fda4ed292d3a4e7668";
        request(requestURI, {json:true},(error, response, body) =>{
            console.log(body);
            if(body === "Unknown symbol"){
                callback(false);
                return;
            }

            let newStockInfo = {
                "company_name" : body.companyName,
                "company_symbol" : body.symbol,
                "share_amount" : body.avgTotalVolume,
                "share_price" : {
                    "currency" : "usd",
                    "value" : body.latestPrice,
                    "last_update" : body.latestUpdate
                }

            };
            repo.addStock(newStockInfo);
            callback(true);
        });
    }

    purchaseShares(symbol, amount){
        var total = this.getShareBySymbol(symbol)[0].share_amount - amount;
        if(total < 0) return false;
        repo.update(symbol, "share_amount", total);
        return true;
    }
}
module.exports = SharesService;