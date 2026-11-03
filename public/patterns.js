export function detectPatterns(candles) {
  const findings=[];
  for(let i=0;i<candles.length;i++){
    const c=candles[i], range=c.high-c.low, body=Math.abs(c.close-c.open);
    if(range<=0)continue;
    const upper=c.high-Math.max(c.open,c.close), lower=Math.min(c.open,c.close)-c.low;
    if(body/range<=0.1) findings.push({index:i,name:'Doji',bias:'Neutral',detail:'Open and close are close together, suggesting indecision.'});
    else if(lower>=2*body && upper<=body && body/range<0.4) findings.push({index:i,name:'Hammer shape',bias:'Bullish',detail:'A long lower wick suggests buyers rejected lower prices. Confirm with trend context.'});
    if(i){const p=candles[i-1];if(p.close<p.open && c.close>c.open && c.open<=p.close && c.close>=p.open) findings.push({index:i,name:'Bullish engulfing',bias:'Bullish',detail:'A rising candle fully covers the previous falling candle body.'});
      if(p.close>p.open && c.close<c.open && c.open>=p.close && c.close<=p.open) findings.push({index:i,name:'Bearish engulfing',bias:'Bearish',detail:'A falling candle fully covers the previous rising candle body.'});}
  }
  return findings;
}
export function movingAverage(candles,period=20){return candles.map((_,i)=>i<period-1?null:candles.slice(i-period+1,i+1).reduce((s,c)=>s+c.close,0)/period);}
export function sampleData(symbol,count=180){let seed=[...symbol].reduce((s,c)=>s+c.charCodeAt(0),7);const random=()=>{seed=(seed*1664525+1013904223)>>>0;return seed/4294967296;};let price={AAPL:208,MSFT:410,NVDA:128,TSLA:265,SPY:575}[symbol]||150;const rows=[];const day=new Date('2026-10-30T12:00:00Z');day.setUTCDate(day.getUTCDate()-count*2);while(rows.length<count){day.setUTCDate(day.getUTCDate()+1);if([0,6].includes(day.getUTCDay()))continue;const open=price*(1+(random()-.5)*.012),close=open*(1+(random()-.47)*.032);rows.push({date:day.toISOString().slice(0,10),open,close,high:Math.max(open,close)*(1+random()*.012),low:Math.min(open,close)*(1-random()*.012),volume:Math.floor(10000000+random()*50000000)});price=close;}return rows;}
