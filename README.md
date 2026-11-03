# Stockpattern

A dependency-free stock chart dashboard with simulated OHLC data, interactive candlesticks, a 20-session simple moving average, and educational candlestick pattern detection.

## Develop

Requires Node.js 22 or newer. No API keys, package downloads, database, or build step required.

```sh
npm test
npm run dev
```

The server listens on port 3000. Use `PORT=3001 npm start` to select another port. `HOST` defaults to `0.0.0.0`.

Select AAPL, MSFT, NVDA, TSLA, or SPY and a one-, three-, or six-month range. Hover over candles or focus the chart and use arrow keys to inspect sessions. Select a detected pattern to highlight its candle. Toggle the SMA 20 overlay as needed.

## Data and limitations

All prices and volumes are deterministic simulated data, not historical or live quotes. Sessions exclude weekends but do not model exchange holidays. The detector identifies doji, hammer shapes, bullish engulfing, and bearish engulfing. These are geometric rules without trend confirmation or trading recommendations. No accounts or trades are supported.

## Files

- `server.js`: Node HTTP server with an explicit static asset allowlist.
- `public/`: responsive client, chart renderer, and pure pattern/data functions.
- `test/`: pattern, moving average, and data integrity tests using Node's built-in test runner.
