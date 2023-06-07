# Market tracker
### Made with love by [Ivanstam](https://github.com/Ivanstam)

*Project powered by: 
<img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/laravel/laravel-plain.svg" width="14"/> Laravel,
<img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-plain.svg" width="14"/> Javascript,
<img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vuejs/vuejs-original.svg" width="14"/> Vue, VueX and
<img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-plain.svg" width="14"/>Tailwind.*

A stock/market tracker front-end using market data from [Alphavantage](https://www.alphavantage.co/), with a laravel
back-end used to manage users, their portfolios and later: technical analysis sets to subject the market data to.

In order to access the [Alphavantage API](https://www.alphavantage.co/documentation/#intraday-extended) you need an API
key, make or add it to your `/root/vue` .env file:
```
VITE_API_ALPHA_KEY=yourkeyhere
```
