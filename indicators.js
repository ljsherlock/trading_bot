// const CCAPIKey = 'd4f79f3adf999cb1a741ad18124870a2ff44434db99a82921da8c4ab9ac95597';
const CryptoCompareAPI = require('cryptocompare');
CryptoCompareAPI.setApiKey(process.env.CRYPTO_COMPARE_API_KEY)

module.exports = {
  getHourlyMovingAverage: function (cryptoAsset, fiatCurrency, hours, callback) {
    if(hours > 169) {
      console.log('only 169 hours allowed');
      return;
    }
    CryptoCompareAPI.histoHour(cryptoAsset, fiatCurrency)
    .then(data => {
      data = data.reverse();
      var sum = 0;
  
      for (let index = 0; index < hours; index++) {
        sum+= data[index].close;
      }
    
      var movingAverage = Math.floor(sum / hours);
  
      callback(movingAverage);
    })
    .catch(console.error)
  }
}