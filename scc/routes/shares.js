let express = require("express");
let router = express.Router();
let sharesService = require("../services/SharesService");
let shares = new sharesService();
let wikipediaService = require("../services/wikipedia-service");
let wikipedia = new wikipediaService();
let currencyConverter = require("../services/currency-converter");
let currency = new currencyConverter();

router.get("/", function (req, res) {
    let returnShares;
    let currencyParam = 'GBP';

    if(req.query.hasOwnProperty("currency"))
        currencyParam = req.query.currency;

    if(req.query.hasOwnProperty("symbol")){
        returnShares = shares.getShareBySymbol(req.query.symbol);
    }else if(req.query.hasOwnProperty("search")){
        returnShares = shares.search(req.query.search);
    }else {
        returnShares = shares.getAllShares().shares;
    }
    if(req.query.hasOwnProperty("ascending")){
        returnShares.sort((a, b) => {
            return b.share_price.value - a.share_price.value;
        });
    }
    if(req.query.hasOwnProperty("descending")){
        returnShares.sort((a, b) => {
            return a.share_price.value -  b.share_price.value;
        });
    }
    wikipedia.getDescriptions(returnShares).then(descriptions => {



        currency.convertCurrency(currencyParam, returnShares).then((sharesConv)=>{

            let returnObj = {
                shares: sharesConv,
                descriptions: descriptions
            };

            res.json(returnObj);
        });


    });
});

router.get("/currency", (req, res) =>{
    currency.getCurrencies().then((currencies) =>{
        res.json(currencies.return);
    });
});
router.post("/", (req, res) =>{
    shares.addShareCompany(req.body.symbol, (succeded) =>{
            res.json({"succeded" : succeded});
    });
});

router.post("/purchase", function (req, res) {
    if(req.body.hasOwnProperty("symbol") && req.body.hasOwnProperty("amount")){
        if(shares.purchaseShares(req.body.symbol, req.body.amount)){
            res.json(shares.getShareBySymbol(req.body.symbol)[0]);
        }else{
            res.json({"valid" : false});
        }

    }else{
        res.json({"valid" : false});
    }

});

module.exports = router;