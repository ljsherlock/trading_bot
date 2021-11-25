const GeminiAPI = require('gemini-api').default;
// const key = 'account-bUgZzJs7DBH2Id6S5slf';
// const secret = '3rsxLpdRSTQAaYkgQTvkyn3DvXj8';
const restClient = new GeminiAPI({
  key: process.env.GEMINI_API_KEY,
  secret: process.env.GEMINI_API_SECRET,
  sandbox: true
});

module.exports = {
  marketBuyBitcoin: function() {
    return restClient.newOrder({
      amount: 1,
      price: 10000,
      side: 'buy',
      symbol: 'btcusd',
      options: ['immediate-or-cancel']
    }).then(res => console.log(res))
    .catch(error => console.error(error));
  },
  marketSellBitcoin: function() {
    return restClient.newOrder({
      amount: 1,
      price: 10000,
      side: 'sell',
      symbol: 'btcusd',
      options: ['immediate-or-cancel']
    }).then(res => console.log(res))
    .catch(error => console.error(error));
  },
  bitcoinPrice: function() {
    return restClient.getTicker('btcusd')
  }
}