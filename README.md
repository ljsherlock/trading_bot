# Gemini Trading Bot
### Purpose
Automate trading strategy(s) and remove myself (my computing/decision making) from the equation by translating said strategy into business logic and using present and historical data to make decisions and therefore actions.

### Built with...
- A Gemini API wrapper ([gemini-api](http://github.com/mjesuele/gemini-api-node.git)) for Node.js is used to take _actions_ in the crypto market.
- A CryptoCompare JavaScript API ([cryptocompare](https://github.com/exodusmovement/cryptocompare)) for observing present and historical data which will inform our _orientation_ and _decisions_, and _actions_.
- Local environment variables (.env) and [dotenv](https://www.npmjs.com/package/dotenv) to store and load our API keys for Gemni and CryptoCompare (our keys are for the sandbox, but we treat them like live keys as a security standard).

### Structure
The code includes a seperation of concerns and abstraction.
_Seperation of concerns_:
1. Exchange methods --> exchange.js
2. Indicators methods --> indicators.js
3. Strategy logic --> index.js (entry file)

### Usage
Install dependancies
```bash 
# yarn 
```

Run bot
```
# yarn start 
```
