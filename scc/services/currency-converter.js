class CurrencyConverter {
    convertCurrency(currency, shares) {
        let self = this;
        let descriptionRet = [];
        return new Promise(function (resolve, reject) {
            let promises = [];
            for (let i = 0; i < shares.length; i++) {
                promises.push(self.convertSingle(currency, shares[i]));
            }
            Promise.all(promises).then(conversions => {
                for (let i = 0; i < conversions.length; i++) {
                    shares[i].share_price.currency = currency;
                    shares[i].share_price.value *= conversions[i];
                }
                conversions.forEach(conversion => console.log(conversion));
                resolve(shares);
            })
        });
    }

    getCurrencies(){
        const soapPromise = new Promise(function (resolve, reject) {
            var soap = require('soap');
            var url = 'http://localhost:8080/CurrencyConvertor/CurrencyConversionWSService?WSDL';
            var args = {};
            soap.createClient(url, function (err, client) {
                client.GetCurrencyCodes(args, function (err, result) {
                    if(err) reject();
                    console.log(result);
                    resolve(result);
                });
            });
        });
        return soapPromise;
    }
    convertSingle(currency, share) {
        const soapPromise = new Promise(function (resolve, reject) {
            var soap = require('soap');
            var url = 'http://localhost:8080/CurrencyConvertor/CurrencyConversionWSService?WSDL';
            var args = {'cur1': share.share_price.currency.toUpperCase(), "cur2": currency.toUpperCase()};
            soap.createClient(url, function (err, client) {
                client.GetConversionRate(args, function (err, result) {
                    if(err) reject();
                    console.log(result);
                    resolve(result.return);
                });
            });
        });
        return soapPromise;
    }

}

module.exports = CurrencyConverter;