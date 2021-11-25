require('dotenv').config()

global.fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
const indicators = require('./indicators.js')
const exchange = require('./exchange.js')

// every 5 second
// Below HMA = buy (if we have no position)
// more HMA = sell (if we have a position)
// short when HMA is above

var hasPosition = false
var strategy = function() {
  console.log("        ")
  console.log("Executing strategy...");
  console.log("***********************************")

  indicators.getHourlyMovingAverage('BTC', 'USD', 100, function(ma) {
    exchange.bitcoinPrice()
    .then(res => {
      var price = res.last;
      
      console.log('Moving Avg:', ma)
      console.log('price:', price)

      if (price < ma && !hasPosition) {
        console.log('Action: buy!')

        exchange.marketBuyBitcoin().then(res => {
          console.log('Buy successful.');
          hasPosition = true;

          setTimeout(strategy, 1000);
        }).catch(error => {
          console.error
        })
      } else if (price > ma && hasPosition) {
        console.log('Action: sell')

        exchange.marketSellBitcoin().then(res => {
          console.log('Sell successful.');
          hasPosition = false;

          setTimeout(strategy, 1000);
        }).catch(error => {
          console.error
        })
      } else {
        console.log('Action: hold');
        setTimeout(strategy, 1000);
      }

    });
  });
}

strategy();



// indicators.getHourlyMovingAverage('BTC', 'USD', 100, (result) => {
//   console.log('movingAvg', result)
// });

// exchange.marketBuyBitcoin();
// exchange.marketSellBitcoin();

// restClient.newOrder({
//   amount: 10,
//   price: 100,
//   side: 'buy',
//   symbol: 'btcusd'
// }).then((response) => {
//   restClient.cancelOrder({order_id: response.order_id}).then(response => {
//     console.log(response)
//   })
// }).catch(error => console.log(error));

// restClient.getAllSymbols().then(response => {
//   restClient.getTicker(response[0]).then(response =>
//     console.log(response)
//   )
// })

// restClient.getOrderBook('btcusd').then(response => {
//   // console.log(response)
//   console.log(response.bids[0].amount)
// }).catch(error => {
//   console.log(error)
// })

// CryptoCompareAPI.coinList().then(coinList => {
//   // console.log(coinList)
// })

// CryptoCompareAPI.price('BTC', ['USD', 'GBP'])
// .then(prices => {
//   // console.log('current', prices)
//   // -> { USD: 1100.24, EUR: 1039.63 }
// })
// .catch(console.error)

// CryptoCompareAPI.priceHistorical('BTC', ['USD', 'GBP'], new Date('2017-01-01'))
// .then(prices => {
//   // console.log('2017-01-01', prices)
//   // -> { BTC: { USD: 997, EUR: 948.17 } }
// })
// .catch(console.error)

// 100 hour moving average
// 1. data from crypto compare
// 2. calculate from past 100 past hours
// 3. check continuously if pirce is crossing 100MA
// 4. Buy/Sell/Hold


// CryptoCompareAPI.histoHour('BTC', 'USD')
// .then(data => {
//   data = data.reverse();
//   var sum = 0;

//   for (let index = 0; index < 100; index++) {
//     sum+= data[index].close;
//   }

//   var movingAverage = sum / 100;

//   // console.log('Moving Average:', movingAverage)
// })
// .catch(console.error)
