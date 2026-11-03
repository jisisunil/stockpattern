import test from 'node:test';
import assert from 'node:assert/strict';
import {detectPatterns,movingAverage,sampleData} from '../public/patterns.js';
test('doji and zero-range candles',()=>{assert.equal(detectPatterns([{open:10,close:10.01,high:11,low:9}])[0].name,'Doji');assert.deepEqual(detectPatterns([{open:10,close:10,high:10,low:10}]),[]);});
test('bullish and bearish engulfing',()=>{assert.ok(detectPatterns([{open:12,close:10,high:13,low:9},{open:9,close:13,high:14,low:8}]).some(p=>p.name==='Bullish engulfing'));assert.ok(detectPatterns([{open:10,close:12,high:13,low:9},{open:13,close:9,high:14,low:8}]).some(p=>p.name==='Bearish engulfing'));});
test('hammer shape',()=>assert.ok(detectPatterns([{open:10,close:10.5,high:10.6,low:8}]).some(p=>p.name==='Hammer shape')));
test('moving average warmup and values',()=>assert.deepEqual(movingAverage([{close:2},{close:4},{close:6}],2),[null,3,5]));
test('sample data is deterministic and has valid daily OHLC',()=>{const rows=sampleData('AAPL');assert.equal(rows.length,180);assert.deepEqual(rows,sampleData('AAPL'));for(const [i,c] of rows.entries()){assert.ok(c.high>=Math.max(c.open,c.close));assert.ok(c.low<=Math.min(c.open,c.close));assert.ok(c.low>0);assert.ok(c.volume>0);if(i)assert.ok(c.date>rows[i-1].date);}});
