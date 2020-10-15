const wiki = require('wikijs').default;

class WikipediaService {
    getDescriptions(shares){
        let self = this;
        let descriptionRet = [];
        return new Promise(function (resolve, reject) {
            let promises = [];
            for (let i = 0; i < shares.length; i++) {
                promises.push(self.getDescription(shares[i]));
            }
            Promise.all(promises).then(descriptions => {
                descriptions.forEach(description => descriptionRet.push(description));
                resolve(descriptionRet);
            })
        });
    }

    getDescription(share){
        const wikiPromise = new Promise(function (resolve, reject) {
            wiki().find(share.company_name)
                .then(page => page.summary()
                    .then(summary => {
                        resolve(summary.substr(0, 1200)+ "...");
                    })
                )
        });
        return wikiPromise;
    }
}

module.exports = WikipediaService;