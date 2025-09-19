import{a as ie}from"./_commonjsHelpers-Bx2EM-6T.js";import{s as x}from"./index-DQChmr6p.js";import{h as he}from"./moment-C5S46NFB.js";var H={},tt,Mt;function ge(){return Mt||(Mt=1,tt=function(){return typeof Promise=="function"&&Promise.prototype&&Promise.prototype.then}),tt}var et={},O={},Lt;function q(){if(Lt)return O;Lt=1;let a;const t=[0,26,44,70,100,134,172,196,242,292,346,404,466,532,581,655,733,815,901,991,1085,1156,1258,1364,1474,1588,1706,1828,1921,2051,2185,2323,2465,2611,2761,2876,3034,3196,3362,3532,3706];return O.getSymbolSize=function(n){if(!n)throw new Error('"version" cannot be null or undefined');if(n<1||n>40)throw new Error('"version" should be in range from 1 to 40');return n*4+17},O.getSymbolTotalCodewords=function(n){return t[n]},O.getBCHDigit=function(r){let n=0;for(;r!==0;)n++,r>>>=1;return n},O.setToSJISFunction=function(n){if(typeof n!="function")throw new Error('"toSJISFunc" is not a valid function.');a=n},O.isKanjiModeEnabled=function(){return typeof a<"u"},O.toSJIS=function(n){return a(n)},O}var nt={},It;function Tt(){return It||(It=1,function(a){a.L={bit:1},a.M={bit:0},a.Q={bit:3},a.H={bit:2};function t(r){if(typeof r!="string")throw new Error("Param is not a string");switch(r.toLowerCase()){case"l":case"low":return a.L;case"m":case"medium":return a.M;case"q":case"quartile":return a.Q;case"h":case"high":return a.H;default:throw new Error("Unknown EC Level: "+r)}}a.isValid=function(n){return n&&typeof n.bit<"u"&&n.bit>=0&&n.bit<4},a.from=function(n,e){if(a.isValid(n))return n;try{return t(n)}catch{return e}}}(nt)),nt}var rt,Rt;function me(){if(Rt)return rt;Rt=1;function a(){this.buffer=[],this.length=0}return a.prototype={get:function(t){const r=Math.floor(t/8);return(this.buffer[r]>>>7-t%8&1)===1},put:function(t,r){for(let n=0;n<r;n++)this.putBit((t>>>r-n-1&1)===1)},getLengthInBits:function(){return this.length},putBit:function(t){const r=Math.floor(this.length/8);this.buffer.length<=r&&this.buffer.push(0),t&&(this.buffer[r]|=128>>>this.length%8),this.length++}},rt=a,rt}var ot,Pt;function pe(){if(Pt)return ot;Pt=1;function a(t){if(!t||t<1)throw new Error("BitMatrix size must be defined and greater than 0");this.size=t,this.data=new Uint8Array(t*t),this.reservedBit=new Uint8Array(t*t)}return a.prototype.set=function(t,r,n,e){const o=t*this.size+r;this.data[o]=n,e&&(this.reservedBit[o]=!0)},a.prototype.get=function(t,r){return this.data[t*this.size+r]},a.prototype.xor=function(t,r,n){this.data[t*this.size+r]^=n},a.prototype.isReserved=function(t,r){return this.reservedBit[t*this.size+r]},ot=a,ot}var it={},$t;function ve(){return $t||($t=1,function(a){const t=q().getSymbolSize;a.getRowColCoords=function(n){if(n===1)return[];const e=Math.floor(n/7)+2,o=t(n),s=o===145?26:Math.ceil((o-13)/(2*e-2))*2,d=[o-7];for(let i=1;i<e-1;i++)d[i]=d[i-1]-s;return d.push(6),d.reverse()},a.getPositions=function(n){const e=[],o=a.getRowColCoords(n),s=o.length;for(let d=0;d<s;d++)for(let i=0;i<s;i++)d===0&&i===0||d===0&&i===s-1||d===s-1&&i===0||e.push([o[d],o[i]]);return e}}(it)),it}var st={},St;function ye(){if(St)return st;St=1;const a=q().getSymbolSize,t=7;return st.getPositions=function(n){const e=a(n);return[[0,0],[e-t,0],[0,e-t]]},st}var at={},Dt;function Ee(){return Dt||(Dt=1,function(a){a.Patterns={PATTERN000:0,PATTERN001:1,PATTERN010:2,PATTERN011:3,PATTERN100:4,PATTERN101:5,PATTERN110:6,PATTERN111:7};const t={N1:3,N2:3,N3:40,N4:10};a.isValid=function(e){return e!=null&&e!==""&&!isNaN(e)&&e>=0&&e<=7},a.from=function(e){return a.isValid(e)?parseInt(e,10):void 0},a.getPenaltyN1=function(e){const o=e.size;let s=0,d=0,i=0,l=null,c=null;for(let f=0;f<o;f++){d=i=0,l=c=null;for(let u=0;u<o;u++){let h=e.get(f,u);h===l?d++:(d>=5&&(s+=t.N1+(d-5)),l=h,d=1),h=e.get(u,f),h===c?i++:(i>=5&&(s+=t.N1+(i-5)),c=h,i=1)}d>=5&&(s+=t.N1+(d-5)),i>=5&&(s+=t.N1+(i-5))}return s},a.getPenaltyN2=function(e){const o=e.size;let s=0;for(let d=0;d<o-1;d++)for(let i=0;i<o-1;i++){const l=e.get(d,i)+e.get(d,i+1)+e.get(d+1,i)+e.get(d+1,i+1);(l===4||l===0)&&s++}return s*t.N2},a.getPenaltyN3=function(e){const o=e.size;let s=0,d=0,i=0;for(let l=0;l<o;l++){d=i=0;for(let c=0;c<o;c++)d=d<<1&2047|e.get(l,c),c>=10&&(d===1488||d===93)&&s++,i=i<<1&2047|e.get(c,l),c>=10&&(i===1488||i===93)&&s++}return s*t.N3},a.getPenaltyN4=function(e){let o=0;const s=e.data.length;for(let i=0;i<s;i++)o+=e.data[i];return Math.abs(Math.ceil(o*100/s/5)-10)*t.N4};function r(n,e,o){switch(n){case a.Patterns.PATTERN000:return(e+o)%2===0;case a.Patterns.PATTERN001:return e%2===0;case a.Patterns.PATTERN010:return o%3===0;case a.Patterns.PATTERN011:return(e+o)%3===0;case a.Patterns.PATTERN100:return(Math.floor(e/2)+Math.floor(o/3))%2===0;case a.Patterns.PATTERN101:return e*o%2+e*o%3===0;case a.Patterns.PATTERN110:return(e*o%2+e*o%3)%2===0;case a.Patterns.PATTERN111:return(e*o%3+(e+o)%2)%2===0;default:throw new Error("bad maskPattern:"+n)}}a.applyMask=function(e,o){const s=o.size;for(let d=0;d<s;d++)for(let i=0;i<s;i++)o.isReserved(i,d)||o.xor(i,d,r(e,i,d))},a.getBestMask=function(e,o){const s=Object.keys(a.Patterns).length;let d=0,i=1/0;for(let l=0;l<s;l++){o(l),a.applyMask(l,e);const c=a.getPenaltyN1(e)+a.getPenaltyN2(e)+a.getPenaltyN3(e)+a.getPenaltyN4(e);a.applyMask(l,e),c<i&&(i=c,d=l)}return d}}(at)),at}var J={},xt;function se(){if(xt)return J;xt=1;const a=Tt(),t=[1,1,1,1,1,1,1,1,1,1,2,2,1,2,2,4,1,2,4,4,2,4,4,4,2,4,6,5,2,4,6,6,2,5,8,8,4,5,8,8,4,5,8,11,4,8,10,11,4,9,12,16,4,9,16,16,6,10,12,18,6,10,17,16,6,11,16,19,6,13,18,21,7,14,21,25,8,16,20,25,8,17,23,25,9,17,23,34,9,18,25,30,10,20,27,32,12,21,29,35,12,23,34,37,12,25,34,40,13,26,35,42,14,28,38,45,15,29,40,48,16,31,43,51,17,33,45,54,18,35,48,57,19,37,51,60,19,38,53,63,20,40,56,66,21,43,59,70,22,45,62,74,24,47,65,77,25,49,68,81],r=[7,10,13,17,10,16,22,28,15,26,36,44,20,36,52,64,26,48,72,88,36,64,96,112,40,72,108,130,48,88,132,156,60,110,160,192,72,130,192,224,80,150,224,264,96,176,260,308,104,198,288,352,120,216,320,384,132,240,360,432,144,280,408,480,168,308,448,532,180,338,504,588,196,364,546,650,224,416,600,700,224,442,644,750,252,476,690,816,270,504,750,900,300,560,810,960,312,588,870,1050,336,644,952,1110,360,700,1020,1200,390,728,1050,1260,420,784,1140,1350,450,812,1200,1440,480,868,1290,1530,510,924,1350,1620,540,980,1440,1710,570,1036,1530,1800,570,1064,1590,1890,600,1120,1680,1980,630,1204,1770,2100,660,1260,1860,2220,720,1316,1950,2310,750,1372,2040,2430];return J.getBlocksCount=function(e,o){switch(o){case a.L:return t[(e-1)*4+0];case a.M:return t[(e-1)*4+1];case a.Q:return t[(e-1)*4+2];case a.H:return t[(e-1)*4+3];default:return}},J.getTotalCodewordsCount=function(e,o){switch(o){case a.L:return r[(e-1)*4+0];case a.M:return r[(e-1)*4+1];case a.Q:return r[(e-1)*4+2];case a.H:return r[(e-1)*4+3];default:return}},J}var lt={},K={},Ot;function Ce(){if(Ot)return K;Ot=1;const a=new Uint8Array(512),t=new Uint8Array(256);return function(){let n=1;for(let e=0;e<255;e++)a[e]=n,t[n]=e,n<<=1,n&256&&(n^=285);for(let e=255;e<512;e++)a[e]=a[e-255]}(),K.log=function(n){if(n<1)throw new Error("log("+n+")");return t[n]},K.exp=function(n){return a[n]},K.mul=function(n,e){return n===0||e===0?0:a[t[n]+t[e]]},K}var Ut;function we(){return Ut||(Ut=1,function(a){const t=Ce();a.mul=function(n,e){const o=new Uint8Array(n.length+e.length-1);for(let s=0;s<n.length;s++)for(let d=0;d<e.length;d++)o[s+d]^=t.mul(n[s],e[d]);return o},a.mod=function(n,e){let o=new Uint8Array(n);for(;o.length-e.length>=0;){const s=o[0];for(let i=0;i<e.length;i++)o[i]^=t.mul(e[i],s);let d=0;for(;d<o.length&&o[d]===0;)d++;o=o.slice(d)}return o},a.generateECPolynomial=function(n){let e=new Uint8Array([1]);for(let o=0;o<n;o++)e=a.mul(e,new Uint8Array([1,t.exp(o)]));return e}}(lt)),lt}var dt,zt;function be(){if(zt)return dt;zt=1;const a=we();function t(r){this.genPoly=void 0,this.degree=r,this.degree&&this.initialize(this.degree)}return t.prototype.initialize=function(n){this.degree=n,this.genPoly=a.generateECPolynomial(this.degree)},t.prototype.encode=function(n){if(!this.genPoly)throw new Error("Encoder not initialized");const e=new Uint8Array(n.length+this.degree);e.set(n);const o=a.mod(e,this.genPoly),s=this.degree-o.length;if(s>0){const d=new Uint8Array(this.degree);return d.set(o,s),d}return o},dt=t,dt}var ct={},ut={},ft={},kt;function ae(){return kt||(kt=1,ft.isValid=function(t){return!isNaN(t)&&t>=1&&t<=40}),ft}var P={},qt;function le(){if(qt)return P;qt=1;const a="[0-9]+",t="[A-Z $%*+\\-./:]+";let r="(?:[u3000-u303F]|[u3040-u309F]|[u30A0-u30FF]|[uFF00-uFFEF]|[u4E00-u9FAF]|[u2605-u2606]|[u2190-u2195]|u203B|[u2010u2015u2018u2019u2025u2026u201Cu201Du2225u2260]|[u0391-u0451]|[u00A7u00A8u00B1u00B4u00D7u00F7])+";r=r.replace(/u/g,"\\u");const n="(?:(?![A-Z0-9 $%*+\\-./:]|"+r+`)(?:.|[\r
]))+`;P.KANJI=new RegExp(r,"g"),P.BYTE_KANJI=new RegExp("[^A-Z0-9 $%*+\\-./:]+","g"),P.BYTE=new RegExp(n,"g"),P.NUMERIC=new RegExp(a,"g"),P.ALPHANUMERIC=new RegExp(t,"g");const e=new RegExp("^"+r+"$"),o=new RegExp("^"+a+"$"),s=new RegExp("^[A-Z0-9 $%*+\\-./:]+$");return P.testKanji=function(i){return e.test(i)},P.testNumeric=function(i){return o.test(i)},P.testAlphanumeric=function(i){return s.test(i)},P}var _t;function _(){return _t||(_t=1,function(a){const t=ae(),r=le();a.NUMERIC={id:"Numeric",bit:1,ccBits:[10,12,14]},a.ALPHANUMERIC={id:"Alphanumeric",bit:2,ccBits:[9,11,13]},a.BYTE={id:"Byte",bit:4,ccBits:[8,16,16]},a.KANJI={id:"Kanji",bit:8,ccBits:[8,10,12]},a.MIXED={bit:-1},a.getCharCountIndicator=function(o,s){if(!o.ccBits)throw new Error("Invalid mode: "+o);if(!t.isValid(s))throw new Error("Invalid version: "+s);return s>=1&&s<10?o.ccBits[0]:s<27?o.ccBits[1]:o.ccBits[2]},a.getBestModeForData=function(o){return r.testNumeric(o)?a.NUMERIC:r.testAlphanumeric(o)?a.ALPHANUMERIC:r.testKanji(o)?a.KANJI:a.BYTE},a.toString=function(o){if(o&&o.id)return o.id;throw new Error("Invalid mode")},a.isValid=function(o){return o&&o.bit&&o.ccBits};function n(e){if(typeof e!="string")throw new Error("Param is not a string");switch(e.toLowerCase()){case"numeric":return a.NUMERIC;case"alphanumeric":return a.ALPHANUMERIC;case"kanji":return a.KANJI;case"byte":return a.BYTE;default:throw new Error("Unknown mode: "+e)}}a.from=function(o,s){if(a.isValid(o))return o;try{return n(o)}catch{return s}}}(ut)),ut}var Vt;function Ae(){return Vt||(Vt=1,function(a){const t=q(),r=se(),n=Tt(),e=_(),o=ae(),s=7973,d=t.getBCHDigit(s);function i(u,h,m){for(let E=1;E<=40;E++)if(h<=a.getCapacity(E,m,u))return E}function l(u,h){return e.getCharCountIndicator(u,h)+4}function c(u,h){let m=0;return u.forEach(function(E){const M=l(E.mode,h);m+=M+E.getBitsLength()}),m}function f(u,h){for(let m=1;m<=40;m++)if(c(u,m)<=a.getCapacity(m,h,e.MIXED))return m}a.from=function(h,m){return o.isValid(h)?parseInt(h,10):m},a.getCapacity=function(h,m,E){if(!o.isValid(h))throw new Error("Invalid QR Code version");typeof E>"u"&&(E=e.BYTE);const M=t.getSymbolTotalCodewords(h),y=r.getTotalCodewordsCount(h,m),L=(M-y)*8;if(E===e.MIXED)return L;const B=L-l(E,h);switch(E){case e.NUMERIC:return Math.floor(B/10*3);case e.ALPHANUMERIC:return Math.floor(B/11*2);case e.KANJI:return Math.floor(B/13);case e.BYTE:default:return Math.floor(B/8)}},a.getBestVersionForData=function(h,m){let E;const M=n.from(m,n.M);if(Array.isArray(h)){if(h.length>1)return f(h,M);if(h.length===0)return 1;E=h[0]}else E=h;return i(E.mode,E.getLength(),M)},a.getEncodedBits=function(h){if(!o.isValid(h)||h<7)throw new Error("Invalid QR Code version");let m=h<<12;for(;t.getBCHDigit(m)-d>=0;)m^=s<<t.getBCHDigit(m)-d;return h<<12|m}}(ct)),ct}var ht={},Ht;function Te(){if(Ht)return ht;Ht=1;const a=q(),t=1335,r=21522,n=a.getBCHDigit(t);return ht.getEncodedBits=function(o,s){const d=o.bit<<3|s;let i=d<<10;for(;a.getBCHDigit(i)-n>=0;)i^=t<<a.getBCHDigit(i)-n;return(d<<10|i)^r},ht}var gt={},mt,jt;function Be(){if(jt)return mt;jt=1;const a=_();function t(r){this.mode=a.NUMERIC,this.data=r.toString()}return t.getBitsLength=function(n){return 10*Math.floor(n/3)+(n%3?n%3*3+1:0)},t.prototype.getLength=function(){return this.data.length},t.prototype.getBitsLength=function(){return t.getBitsLength(this.data.length)},t.prototype.write=function(n){let e,o,s;for(e=0;e+3<=this.data.length;e+=3)o=this.data.substr(e,3),s=parseInt(o,10),n.put(s,10);const d=this.data.length-e;d>0&&(o=this.data.substr(e),s=parseInt(o,10),n.put(s,d*3+1))},mt=t,mt}var pt,Kt;function Fe(){if(Kt)return pt;Kt=1;const a=_(),t=["0","1","2","3","4","5","6","7","8","9","A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"," ","$","%","*","+","-",".","/",":"];function r(n){this.mode=a.ALPHANUMERIC,this.data=n}return r.getBitsLength=function(e){return 11*Math.floor(e/2)+6*(e%2)},r.prototype.getLength=function(){return this.data.length},r.prototype.getBitsLength=function(){return r.getBitsLength(this.data.length)},r.prototype.write=function(e){let o;for(o=0;o+2<=this.data.length;o+=2){let s=t.indexOf(this.data[o])*45;s+=t.indexOf(this.data[o+1]),e.put(s,11)}this.data.length%2&&e.put(t.indexOf(this.data[o]),6)},pt=r,pt}var vt,Yt;function Ne(){if(Yt)return vt;Yt=1;const a=_();function t(r){this.mode=a.BYTE,typeof r=="string"?this.data=new TextEncoder().encode(r):this.data=new Uint8Array(r)}return t.getBitsLength=function(n){return n*8},t.prototype.getLength=function(){return this.data.length},t.prototype.getBitsLength=function(){return t.getBitsLength(this.data.length)},t.prototype.write=function(r){for(let n=0,e=this.data.length;n<e;n++)r.put(this.data[n],8)},vt=t,vt}var yt,Jt;function Me(){if(Jt)return yt;Jt=1;const a=_(),t=q();function r(n){this.mode=a.KANJI,this.data=n}return r.getBitsLength=function(e){return e*13},r.prototype.getLength=function(){return this.data.length},r.prototype.getBitsLength=function(){return r.getBitsLength(this.data.length)},r.prototype.write=function(n){let e;for(e=0;e<this.data.length;e++){let o=t.toSJIS(this.data[e]);if(o>=33088&&o<=40956)o-=33088;else if(o>=57408&&o<=60351)o-=49472;else throw new Error("Invalid SJIS character: "+this.data[e]+`
Make sure your charset is UTF-8`);o=(o>>>8&255)*192+(o&255),n.put(o,13)}},yt=r,yt}var Et={exports:{}},Gt;function Le(){return Gt||(Gt=1,function(a){var t={single_source_shortest_paths:function(r,n,e){var o={},s={};s[n]=0;var d=t.PriorityQueue.make();d.push(n,0);for(var i,l,c,f,u,h,m,E,M;!d.empty();){i=d.pop(),l=i.value,f=i.cost,u=r[l]||{};for(c in u)u.hasOwnProperty(c)&&(h=u[c],m=f+h,E=s[c],M=typeof s[c]>"u",(M||E>m)&&(s[c]=m,d.push(c,m),o[c]=l))}if(typeof e<"u"&&typeof s[e]>"u"){var y=["Could not find a path from ",n," to ",e,"."].join("");throw new Error(y)}return o},extract_shortest_path_from_predecessor_list:function(r,n){for(var e=[],o=n;o;)e.push(o),r[o],o=r[o];return e.reverse(),e},find_path:function(r,n,e){var o=t.single_source_shortest_paths(r,n,e);return t.extract_shortest_path_from_predecessor_list(o,e)},PriorityQueue:{make:function(r){var n=t.PriorityQueue,e={},o;r=r||{};for(o in n)n.hasOwnProperty(o)&&(e[o]=n[o]);return e.queue=[],e.sorter=r.sorter||n.default_sorter,e},default_sorter:function(r,n){return r.cost-n.cost},push:function(r,n){var e={value:r,cost:n};this.queue.push(e),this.queue.sort(this.sorter)},pop:function(){return this.queue.shift()},empty:function(){return this.queue.length===0}}};a.exports=t}(Et)),Et.exports}var Zt;function Ie(){return Zt||(Zt=1,function(a){const t=_(),r=Be(),n=Fe(),e=Ne(),o=Me(),s=le(),d=q(),i=Le();function l(y){return unescape(encodeURIComponent(y)).length}function c(y,L,B){const g=[];let I;for(;(I=y.exec(B))!==null;)g.push({data:I[0],index:I.index,mode:L,length:I[0].length});return g}function f(y){const L=c(s.NUMERIC,t.NUMERIC,y),B=c(s.ALPHANUMERIC,t.ALPHANUMERIC,y);let g,I;return d.isKanjiModeEnabled()?(g=c(s.BYTE,t.BYTE,y),I=c(s.KANJI,t.KANJI,y)):(g=c(s.BYTE_KANJI,t.BYTE,y),I=[]),L.concat(B,g,I).sort(function(A,b){return A.index-b.index}).map(function(A){return{data:A.data,mode:A.mode,length:A.length}})}function u(y,L){switch(L){case t.NUMERIC:return r.getBitsLength(y);case t.ALPHANUMERIC:return n.getBitsLength(y);case t.KANJI:return o.getBitsLength(y);case t.BYTE:return e.getBitsLength(y)}}function h(y){return y.reduce(function(L,B){const g=L.length-1>=0?L[L.length-1]:null;return g&&g.mode===B.mode?(L[L.length-1].data+=B.data,L):(L.push(B),L)},[])}function m(y){const L=[];for(let B=0;B<y.length;B++){const g=y[B];switch(g.mode){case t.NUMERIC:L.push([g,{data:g.data,mode:t.ALPHANUMERIC,length:g.length},{data:g.data,mode:t.BYTE,length:g.length}]);break;case t.ALPHANUMERIC:L.push([g,{data:g.data,mode:t.BYTE,length:g.length}]);break;case t.KANJI:L.push([g,{data:g.data,mode:t.BYTE,length:l(g.data)}]);break;case t.BYTE:L.push([{data:g.data,mode:t.BYTE,length:l(g.data)}])}}return L}function E(y,L){const B={},g={start:{}};let I=["start"];for(let v=0;v<y.length;v++){const A=y[v],b=[];for(let p=0;p<A.length;p++){const F=A[p],C=""+v+p;b.push(C),B[C]={node:F,lastCount:0},g[C]={};for(let T=0;T<I.length;T++){const w=I[T];B[w]&&B[w].node.mode===F.mode?(g[w][C]=u(B[w].lastCount+F.length,F.mode)-u(B[w].lastCount,F.mode),B[w].lastCount+=F.length):(B[w]&&(B[w].lastCount=F.length),g[w][C]=u(F.length,F.mode)+4+t.getCharCountIndicator(F.mode,L))}}I=b}for(let v=0;v<I.length;v++)g[I[v]].end=0;return{map:g,table:B}}function M(y,L){let B;const g=t.getBestModeForData(y);if(B=t.from(L,g),B!==t.BYTE&&B.bit<g.bit)throw new Error('"'+y+'" cannot be encoded with mode '+t.toString(B)+`.
 Suggested mode is: `+t.toString(g));switch(B===t.KANJI&&!d.isKanjiModeEnabled()&&(B=t.BYTE),B){case t.NUMERIC:return new r(y);case t.ALPHANUMERIC:return new n(y);case t.KANJI:return new o(y);case t.BYTE:return new e(y)}}a.fromArray=function(L){return L.reduce(function(B,g){return typeof g=="string"?B.push(M(g,null)):g.data&&B.push(M(g.data,g.mode)),B},[])},a.fromString=function(L,B){const g=f(L,d.isKanjiModeEnabled()),I=m(g),v=E(I,B),A=i.find_path(v.map,"start","end"),b=[];for(let p=1;p<A.length-1;p++)b.push(v.table[A[p]].node);return a.fromArray(h(b))},a.rawSplit=function(L){return a.fromArray(f(L,d.isKanjiModeEnabled()))}}(gt)),gt}var Qt;function Re(){if(Qt)return et;Qt=1;const a=q(),t=Tt(),r=me(),n=pe(),e=ve(),o=ye(),s=Ee(),d=se(),i=be(),l=Ae(),c=Te(),f=_(),u=Ie();function h(v,A){const b=v.size,p=o.getPositions(A);for(let F=0;F<p.length;F++){const C=p[F][0],T=p[F][1];for(let w=-1;w<=7;w++)if(!(C+w<=-1||b<=C+w))for(let N=-1;N<=7;N++)T+N<=-1||b<=T+N||(w>=0&&w<=6&&(N===0||N===6)||N>=0&&N<=6&&(w===0||w===6)||w>=2&&w<=4&&N>=2&&N<=4?v.set(C+w,T+N,!0,!0):v.set(C+w,T+N,!1,!0))}}function m(v){const A=v.size;for(let b=8;b<A-8;b++){const p=b%2===0;v.set(b,6,p,!0),v.set(6,b,p,!0)}}function E(v,A){const b=e.getPositions(A);for(let p=0;p<b.length;p++){const F=b[p][0],C=b[p][1];for(let T=-2;T<=2;T++)for(let w=-2;w<=2;w++)T===-2||T===2||w===-2||w===2||T===0&&w===0?v.set(F+T,C+w,!0,!0):v.set(F+T,C+w,!1,!0)}}function M(v,A){const b=v.size,p=l.getEncodedBits(A);let F,C,T;for(let w=0;w<18;w++)F=Math.floor(w/3),C=w%3+b-8-3,T=(p>>w&1)===1,v.set(F,C,T,!0),v.set(C,F,T,!0)}function y(v,A,b){const p=v.size,F=c.getEncodedBits(A,b);let C,T;for(C=0;C<15;C++)T=(F>>C&1)===1,C<6?v.set(C,8,T,!0):C<8?v.set(C+1,8,T,!0):v.set(p-15+C,8,T,!0),C<8?v.set(8,p-C-1,T,!0):C<9?v.set(8,15-C-1+1,T,!0):v.set(8,15-C-1,T,!0);v.set(p-8,8,1,!0)}function L(v,A){const b=v.size;let p=-1,F=b-1,C=7,T=0;for(let w=b-1;w>0;w-=2)for(w===6&&w--;;){for(let N=0;N<2;N++)if(!v.isReserved(F,w-N)){let D=!1;T<A.length&&(D=(A[T]>>>C&1)===1),v.set(F,w-N,D),C--,C===-1&&(T++,C=7)}if(F+=p,F<0||b<=F){F-=p,p=-p;break}}}function B(v,A,b){const p=new r;b.forEach(function(N){p.put(N.mode.bit,4),p.put(N.getLength(),f.getCharCountIndicator(N.mode,v)),N.write(p)});const F=a.getSymbolTotalCodewords(v),C=d.getTotalCodewordsCount(v,A),T=(F-C)*8;for(p.getLengthInBits()+4<=T&&p.put(0,4);p.getLengthInBits()%8!==0;)p.putBit(0);const w=(T-p.getLengthInBits())/8;for(let N=0;N<w;N++)p.put(N%2?17:236,8);return g(p,v,A)}function g(v,A,b){const p=a.getSymbolTotalCodewords(A),F=d.getTotalCodewordsCount(A,b),C=p-F,T=d.getBlocksCount(A,b),w=p%T,N=T-w,D=Math.floor(p/T),j=Math.floor(C/T),ce=j+1,Bt=D-j,ue=new i(Bt);let Z=0;const Y=new Array(T),Ft=new Array(T);let Q=0;const fe=new Uint8Array(v.buffer);for(let V=0;V<T;V++){const W=V<N?j:ce;Y[V]=fe.slice(Z,Z+W),Ft[V]=ue.encode(Y[V]),Z+=W,Q=Math.max(Q,W)}const X=new Uint8Array(p);let Nt=0,$,S;for($=0;$<Q;$++)for(S=0;S<T;S++)$<Y[S].length&&(X[Nt++]=Y[S][$]);for($=0;$<Bt;$++)for(S=0;S<T;S++)X[Nt++]=Ft[S][$];return X}function I(v,A,b,p){let F;if(Array.isArray(v))F=u.fromArray(v);else if(typeof v=="string"){let D=A;if(!D){const j=u.rawSplit(v);D=l.getBestVersionForData(j,b)}F=u.fromString(v,D||40)}else throw new Error("Invalid data");const C=l.getBestVersionForData(F,b);if(!C)throw new Error("The amount of data is too big to be stored in a QR Code");if(!A)A=C;else if(A<C)throw new Error(`
The chosen QR Code version cannot contain this amount of data.
Minimum version required to store current data is: `+C+`.
`);const T=B(A,b,F),w=a.getSymbolSize(A),N=new n(w);return h(N,A),m(N),E(N,A),y(N,b,0),A>=7&&M(N,A),L(N,T),isNaN(p)&&(p=s.getBestMask(N,y.bind(null,N,b))),s.applyMask(p,N),y(N,b,p),{modules:N,version:A,errorCorrectionLevel:b,maskPattern:p,segments:F}}return et.create=function(A,b){if(typeof A>"u"||A==="")throw new Error("No input text");let p=t.M,F,C;return typeof b<"u"&&(p=t.from(b.errorCorrectionLevel,t.M),F=l.from(b.version),C=s.from(b.maskPattern),b.toSJISFunc&&a.setToSJISFunction(b.toSJISFunc)),I(A,F,p,C)},et}var Ct={},wt={},Xt;function de(){return Xt||(Xt=1,function(a){function t(r){if(typeof r=="number"&&(r=r.toString()),typeof r!="string")throw new Error("Color should be defined as hex string");let n=r.slice().replace("#","").split("");if(n.length<3||n.length===5||n.length>8)throw new Error("Invalid hex color: "+r);(n.length===3||n.length===4)&&(n=Array.prototype.concat.apply([],n.map(function(o){return[o,o]}))),n.length===6&&n.push("F","F");const e=parseInt(n.join(""),16);return{r:e>>24&255,g:e>>16&255,b:e>>8&255,a:e&255,hex:"#"+n.slice(0,6).join("")}}a.getOptions=function(n){n||(n={}),n.color||(n.color={});const e=typeof n.margin>"u"||n.margin===null||n.margin<0?4:n.margin,o=n.width&&n.width>=21?n.width:void 0,s=n.scale||4;return{width:o,scale:o?4:s,margin:e,color:{dark:t(n.color.dark||"#000000ff"),light:t(n.color.light||"#ffffffff")},type:n.type,rendererOpts:n.rendererOpts||{}}},a.getScale=function(n,e){return e.width&&e.width>=n+e.margin*2?e.width/(n+e.margin*2):e.scale},a.getImageWidth=function(n,e){const o=a.getScale(n,e);return Math.floor((n+e.margin*2)*o)},a.qrToImageData=function(n,e,o){const s=e.modules.size,d=e.modules.data,i=a.getScale(s,o),l=Math.floor((s+o.margin*2)*i),c=o.margin*i,f=[o.color.light,o.color.dark];for(let u=0;u<l;u++)for(let h=0;h<l;h++){let m=(u*l+h)*4,E=o.color.light;if(u>=c&&h>=c&&u<l-c&&h<l-c){const M=Math.floor((u-c)/i),y=Math.floor((h-c)/i);E=f[d[M*s+y]?1:0]}n[m++]=E.r,n[m++]=E.g,n[m++]=E.b,n[m]=E.a}}}(wt)),wt}var Wt;function Pe(){return Wt||(Wt=1,function(a){const t=de();function r(e,o,s){e.clearRect(0,0,o.width,o.height),o.style||(o.style={}),o.height=s,o.width=s,o.style.height=s+"px",o.style.width=s+"px"}function n(){try{return document.createElement("canvas")}catch{throw new Error("You need to specify a canvas element")}}a.render=function(o,s,d){let i=d,l=s;typeof i>"u"&&(!s||!s.getContext)&&(i=s,s=void 0),s||(l=n()),i=t.getOptions(i);const c=t.getImageWidth(o.modules.size,i),f=l.getContext("2d"),u=f.createImageData(c,c);return t.qrToImageData(u.data,o,i),r(f,l,c),f.putImageData(u,0,0),l},a.renderToDataURL=function(o,s,d){let i=d;typeof i>"u"&&(!s||!s.getContext)&&(i=s,s=void 0),i||(i={});const l=a.render(o,s,i),c=i.type||"image/png",f=i.rendererOpts||{};return l.toDataURL(c,f.quality)}}(Ct)),Ct}var bt={},te;function $e(){if(te)return bt;te=1;const a=de();function t(e,o){const s=e.a/255,d=o+'="'+e.hex+'"';return s<1?d+" "+o+'-opacity="'+s.toFixed(2).slice(1)+'"':d}function r(e,o,s){let d=e+o;return typeof s<"u"&&(d+=" "+s),d}function n(e,o,s){let d="",i=0,l=!1,c=0;for(let f=0;f<e.length;f++){const u=Math.floor(f%o),h=Math.floor(f/o);!u&&!l&&(l=!0),e[f]?(c++,f>0&&u>0&&e[f-1]||(d+=l?r("M",u+s,.5+h+s):r("m",i,0),i=0,l=!1),u+1<o&&e[f+1]||(d+=r("h",c),c=0)):i++}return d}return bt.render=function(o,s,d){const i=a.getOptions(s),l=o.modules.size,c=o.modules.data,f=l+i.margin*2,u=i.color.light.a?"<path "+t(i.color.light,"fill")+' d="M0 0h'+f+"v"+f+'H0z"/>':"",h="<path "+t(i.color.dark,"stroke")+' d="'+n(c,l,i.margin)+'"/>',m='viewBox="0 0 '+f+" "+f+'"',M='<svg xmlns="http://www.w3.org/2000/svg" '+(i.width?'width="'+i.width+'" height="'+i.width+'" ':"")+m+' shape-rendering="crispEdges">'+u+h+`</svg>
`;return typeof d=="function"&&d(null,M),M},bt}var ee;function Se(){if(ee)return H;ee=1;const a=ge(),t=Re(),r=Pe(),n=$e();function e(o,s,d,i,l){const c=[].slice.call(arguments,1),f=c.length,u=typeof c[f-1]=="function";if(!u&&!a())throw new Error("Callback required as last argument");if(u){if(f<2)throw new Error("Too few arguments provided");f===2?(l=d,d=s,s=i=void 0):f===3&&(s.getContext&&typeof l>"u"?(l=i,i=void 0):(l=i,i=d,d=s,s=void 0))}else{if(f<1)throw new Error("Too few arguments provided");return f===1?(d=s,s=i=void 0):f===2&&!s.getContext&&(i=d,d=s,s=void 0),new Promise(function(h,m){try{const E=t.create(d,i);h(o(E,s,i))}catch(E){m(E)}})}try{const h=t.create(d,i);l(null,o(h,s,i))}catch(h){l(h)}}return H.create=t.create,H.toCanvas=e.bind(null,r.render),H.toDataURL=e.bind(null,r.renderToDataURL),H.toString=e.bind(null,function(o,s,d){return n.render(o,d)}),H}var De=Se();const U=ie(De);var R={},ne;function xe(){if(ne)return R;ne=1,Object.defineProperty(R,"__esModule",{value:!0}),R.Printd=R.createIFrame=R.createLinkStyle=R.createStyle=void 0;var a=/^(((http[s]?)|file):)?(\/\/)+([0-9a-zA-Z-_.=?&].+)$/,t=/^((\.|\.\.)?\/)([0-9a-zA-Z-_.=?&]+\/)*([0-9a-zA-Z-_.=?&]+)$/,r=function(i){return a.test(i)||t.test(i)};function n(i,l){var c=i.createElement("style");return c.appendChild(i.createTextNode(l)),c}R.createStyle=n;function e(i,l){var c=i.createElement("link");return c.type="text/css",c.rel="stylesheet",c.href=l,c}R.createLinkStyle=e;function o(i){var l=window.document.createElement("iframe");return l.setAttribute("src","about:blank"),l.setAttribute("style","visibility:hidden;width:0;height:0;position:absolute;z-index:-9999;bottom:0;"),l.setAttribute("width","0"),l.setAttribute("height","0"),l.setAttribute("wmode","opaque"),i.appendChild(l),l}R.createIFrame=o;var s={parent:window.document.body,headElements:[],bodyElements:[]},d=function(){function i(l){this.isLoading=!1,this.hasEvents=!1,this.opts=[s,l||{}].reduce(function(c,f){return Object.keys(f).forEach(function(u){return c[u]=f[u]}),c},{}),this.iframe=o(this.opts.parent)}return i.prototype.getIFrame=function(){return this.iframe},i.prototype.print=function(l,c,f,u){if(!this.isLoading){var h=this.iframe,m=h.contentDocument,E=h.contentWindow;if(!(!m||!E)&&(this.iframe.src="about:blank",this.elCopy=l.cloneNode(!0),!!this.elCopy)){this.isLoading=!0,this.callback=u;var M=E.document;M.open(),M.write('<!DOCTYPE html><html><head><meta charset="utf-8"></head><body></body></html>'),this.addEvents();var y=this.opts,L=y.headElements,B=y.bodyElements;Array.isArray(L)&&L.forEach(function(g){return M.head.appendChild(g)}),Array.isArray(B)&&B.forEach(function(g){return M.body.appendChild(g)}),Array.isArray(c)&&c.forEach(function(g){g&&M.head.appendChild(r(g)?e(M,g):n(M,g))}),M.body.appendChild(this.elCopy),Array.isArray(f)&&f.forEach(function(g){if(g){var I=M.createElement("script");r(g)?I.src=g:I.innerText=g,M.body.appendChild(I)}}),M.close()}}},i.prototype.printURL=function(l,c){this.isLoading||(this.addEvents(),this.isLoading=!0,this.callback=c,this.iframe.src=l)},i.prototype.onBeforePrint=function(l){this.onbeforeprint=l},i.prototype.onAfterPrint=function(l){this.onafterprint=l},i.prototype.launchPrint=function(l){this.isLoading||l.print()},i.prototype.addEvents=function(){var l=this;if(!this.hasEvents){this.hasEvents=!0,this.iframe.addEventListener("load",function(){return l.onLoad()},!1);var c=this.iframe.contentWindow;c&&(this.onbeforeprint&&c.addEventListener("beforeprint",this.onbeforeprint),this.onafterprint&&c.addEventListener("afterprint",this.onafterprint))}},i.prototype.onLoad=function(){var l=this;if(this.iframe){this.isLoading=!1;var c=this.iframe,f=c.contentDocument,u=c.contentWindow;if(!f||!u)return;typeof this.callback=="function"?this.callback({iframe:this.iframe,element:this.elCopy,launchPrint:function(){return l.launchPrint(u)}}):this.launchPrint(u)}},i}();return R.Printd=d,R.default=d,R}var z=xe(),At,re;function Oe(){if(re)return At;re=1;class a{constructor(){this.units=["cero","uno","dos","tres","cuatro","cinco","seis","siete","ocho","nueve"],this.tenToSixteen=["diez","once","doce","trece","catorce","quince","dieciséis"],this.tens=["treinta","cuarenta","cincuenta","sesenta","setenta","ochenta","noventa"]}convertirNroMesAtexto(r){switch(typeof r=="number"&&(r=String(r)),r=this.deleteZerosLeft(r),r){case"1":return"Enero";case"2":return"Febrero";case"3":return"Marzo";case"4":return"Abril";case"5":return"Mayo";case"6":return"Junio";case"7":return"Julio";case"8":return"Agosto";case"9":return"Septiembre";case"10":return"Octubre";case"11":return"Noviembre";case"12":return"Diciembre";default:throw"Numero de mes inválido"}}convertToText(r){if(typeof r=="number"&&(r=String(r)),r=this.deleteZerosLeft(r),!this.validateNumber(r))throw"Número inválido, no se puede convertir!";return this.getName(r)}deleteZerosLeft(r){let n=0,e=!0;for(n=0;n<r.length;n++)if(r.charAt(n)!=0){e=!1;break}return e?"0":r.substr(n)}validateNumber(r){return!(isNaN(r)||r===""||r.indexOf(".")>=0||r.indexOf("-")>=0)}getName(r){return r=this.deleteZerosLeft(r),r.length===1?this.getUnits(r):r.length===2?this.getTens(r):r.length===3?this.getHundreds(r):r.length<7?this.getThousands(r):r.length<13?this.getPeriod(r,6,"millón"):r.length<19?this.getPeriod(r,12,"billón"):"Número demasiado grande."}getUnits(r){let n=parseInt(r);return this.units[n]}getTens(r){let n=r.charAt(1);if(r<17)return this.tenToSixteen[r-10];if(r<20)return"dieci"+this.getUnits(n);switch(r){case"20":return"veinte";case"22":return"veintidós";case"23":return"veintitrés";case"26":return"veintiséis"}if(r<30)return"veinti"+this.getUnits(n);let e=this.tens[r.charAt(0)-3];return n>0&&(e+=" y "+this.getUnits(n)),e}getHundreds(r){let n="",e=r.charAt(0),o=r.substr(1);if(r==100)return"cien";switch(e){case"1":n="ciento";break;case"5":n="quinientos";break;case"7":n="setecientos";break;case"9":n="novecientos"}return n===""&&(n=this.getUnits(e)+"cientos"),o>0&&(n+=" "+this.getName(o)),n}getThousands(r){let n="mil",e=r.length-3,o=r.substr(0,e),s=r.substr(e);return o>1&&(n=this.getName(o).replace("uno","un")+" mil"),s>0&&(n+=" "+this.getName(s)),n}getPeriod(r,n,e){let o="un "+e,s=r.length-n,d=r.substr(0,s),i=r.substr(s);return d>1&&(o=this.getName(d).replace("uno","un")+" "+e.replace("ó","o")+"es"),i>0&&(o+=" "+this.getName(i)),o}}return At={conversorNumerosALetras:a},At}var Ue=Oe();const k=ie(Ue);var G={},oe;function ze(){if(oe)return G;oe=1,Object.defineProperty(G,"__esModule",{value:!0});function a(i){switch(i){case 1:return"Un";case 2:return"Dos";case 3:return"Tres";case 4:return"Cuatro";case 5:return"Cinco";case 6:return"Seis";case 7:return"Siete";case 8:return"Ocho";case 9:return"Nueve";default:return""}}function t(i,l){return l>0?i+" y "+a(l):i}function r(i){var l=Math.floor(i/10),c=i-l*10;switch(l){case 1:switch(c){case 0:return"Diez";case 1:return"Once";case 2:return"Doce";case 3:return"Trece";case 4:return"Catorce";case 5:return"Quince";default:return"Dieci"+a(c).toLowerCase()}case 2:switch(c){case 0:return"Veinte";default:return"Veinti"+a(c).toLowerCase()}case 3:return t("Treinta",c);case 4:return t("Cuarenta",c);case 5:return t("Cincuenta",c);case 6:return t("Sesenta",c);case 7:return t("Setenta",c);case 8:return t("Ochenta",c);case 9:return t("Noventa",c);case 0:return a(c);default:return""}}function n(i){var l=Math.floor(i/100),c=i-l*100;switch(l){case 1:return c>0?"Ciento "+r(c):"Cien";case 2:return"Doscientos "+r(c);case 3:return"Trescientos "+r(c);case 4:return"Cuatrocientos "+r(c);case 5:return"Quinientos "+r(c);case 6:return"Seiscientos "+r(c);case 7:return"Setecientos "+r(c);case 8:return"Ochocientos "+r(c);case 9:return"Novecientos "+r(c);default:return r(c)}}function e(i,l,c,f){var u=Math.floor(i/l),h=i-u*l,m="";return u>0&&(u>1?m=n(u)+" "+f:m=c),h>0&&(m+=""),m}function o(i){var l=1e3,c=Math.floor(i/l),f=i-c*l,u=e(i,l,"Un Mil","Mil"),h=n(f);return u===""?h:(u+" "+h).trim()}function s(i){var l=1e6,c=Math.floor(i/l),f=i-c*l,u=e(i,l,"Un Millón de","Millones de"),h=o(f);return u===""?h:(u+" "+h).trim()}function d(i){var l={enteros:Math.floor(i),centavos:Math.round(i*100)-Math.floor(i)*100,letrasCentavos:"",letrasMonedaPlural:"Pesos",letrasMonedaSingular:"Peso",letrasMonedaCentavoPlural:"/100 M.N.",letrasMonedaCentavoSingular:"/100 M.N."};return l.centavos>=0&&(l.letrasCentavos=function(){return l.centavos>=1&l.centavos<=9?"0"+l.centavos+l.letrasMonedaCentavoSingular:l.centavos===0?"00"+l.letrasMonedaCentavoSingular:l.centavos+l.letrasMonedaCentavoPlural}()),l.enteros===0?("Cero "+l.letrasMonedaPlural+" "+l.letrasCentavos).trim():l.enteros===1?(s(l.enteros)+" "+l.letrasMonedaSingular+" "+l.letrasCentavos).trim():(s(l.enteros)+" "+l.letrasMonedaPlural+" "+l.letrasCentavos).trim()}return G.NumerosALetras=d,G}ze();class Ve{static numeroALetras(t){if(t=parseInt(t),isNaN(t)||t<0||t>1e6)return"Número fuera de rango";const r=["cero","uno","dos","tres","cuatro","cinco","seis","siete","ocho","nueve"],n=["","","veinte","treinta","cuarenta","cincuenta","sesenta","setenta","ochenta","noventa"],e={10:"diez",11:"once",12:"doce",13:"trece",14:"catorce",15:"quince",16:"dieciséis",17:"diecisiete",18:"dieciocho",19:"diecinueve"},o=["","cien","doscientos","trescientos","cuatrocientos","quinientos","seiscientos","setecientos","ochocientos","novecientos"];function s(f){if(f<10)return r[f];if(f>=10&&f<20)return e[f];if(f<100){const h=f%10;return`${n[Math.floor(f/10)]}${h>0?" y "+r[h]:""}`}if(f===100)return"cien";const u=f%100;return`${o[Math.floor(f/100)]}${u>0?" "+s(u):""}`}if(t===1e6)return"un millón";let d=Math.floor(t/1e3),i=t%1e3,l=d>0?d===1?"mil":`${s(d)} mil`:"",c=i>0?s(i):"";return(l+" "+c).trim()}static imprimirCaja(t){}static factura(t){return new Promise((r,n)=>{const e=k.conversorNumerosALetras,s=new e().convertToText(parseInt(t.montoTotal)),d={errorCorrectionLevel:"M",type:"png",quality:.95,width:100,margin:1,color:{dark:"#000000",light:"#FFF"}},i=x().env;U.toDataURL(i.url2+"consulta/QR?nit="+i.nit+"&cuf="+t.cuf+"&numero="+t.numeroFactura+"&t=2",d).then(l=>{let c=`${this.head()}
  <div style='padding-left: 0.5cm;padding-right: 0.5cm'>
      <div class='titulo'>FACTURA <br>CON DERECHO A CREDITO FISCAL</div>
      <div class='titulo2'>${i.razon} <br>
      Casa Matriz<br>
      No. Punto de Venta 0<br>
${i.direccion}<br>
Tel. ${i.telefono}<br>
Oruro</div>
<hr>
<div class='titulo'>NIT</div>
<div class='titulo2'>${i.nit}</div>
<div class='titulo'>FACTURA N°</div>
<div class='titulo2'>${t.numeroFactura}</div>
<div class='titulo'>CÓD. AUTORIZACIÓN</div>
<div class='titulo2'>${t.cuf}</div>
<hr>
<table>
<tr><td class='titder'>NOMBRE/RAZÓN SOCIAL:</td><td class='contenido'>${t.client.nombreRazonSocial}</td>
</tr><tr><td class='titder'>NIT/CI/CEX:</td><td class='contenido'>${t.client.numeroDocumento}</td></tr>
<tr><td class='titder'>COD. CLIENTE:</td ><td class='contenido'>${t.client.id}</td></tr>
<tr><td class='titder'>FECHA DE EMISIÓN:</td><td class='contenido'>${t.fechaEmision}</td></tr>
</table><hr><div class='titulo'>DETALLE</div>`;t.details.forEach(u=>{c+=`<div style='font-size: 12px'><b>${u.product_id} ${u.descripcion} </b></div>`,c+=`<div>${u.cantidad} ${parseFloat(u.precioUnitario).toFixed(2)} 0.00
                    <span style='float:right'>${parseFloat(u.subTotal).toFixed(2)}</span></div>`}),c+=`<hr>
      <table style='font-size: 8px;'>
      <tr><td class='titder' style='width: 60%'>SUBTOTAL Bs</td><td class='conte2'>${parseFloat(t.montoTotal).toFixed(2)}</td></tr>
      <tr><td class='titder'>DESCUENTO Bs</td><td class='conte2'>0.00</td></tr>
      <tr><td class='titder'>TOTAL Bs</td><td class='conte2'>${parseFloat(t.montoTotal).toFixed(2)}</td></tr>
      <tr><td class='titder'>MONTO GIFT CARD Bs</td ><td class='conte2'>0.00</td></tr>
      <tr><td class='titder'>MONTO A PAGAR Bs</td><td class='conte2'>${parseFloat(t.montoTotal).toFixed(2)}</td></tr>
      <tr><td class='titder' style='font-size: 8px'>IMPORTE BASE CRÉDITO FISCAL Bs</td>
      <td class='conte2'>${parseFloat(t.montoTotal).toFixed(2)}</td></tr>
      </table>
      <br>
      <div>Son ${s} ${((parseFloat(t.montoTotal)-Math.floor(parseFloat(t.montoTotal)))*100).toFixed(2)} /100 Bolivianos</div><hr>
      <div class='titulo2' style='font-size: 9px'>
      ESTA FACTURA CONTRIBUYE AL DESARROLLO DEL PAÍS,<br>
      EL USO ILÍCITO SERÁ SANCIONADO PENALMENTE DE<br>
      ACUERDO A LEY<br><br>
      ${t.leyenda} <br><br>
      “Este documento es la Representación Gráfica de un<br>
      Documento Fiscal Digital emitido en una modalidad de<br>
      facturación en línea”</div><br>
      <div style='display: flex;justify-content: center;'> <img  src="${l}" ></div></div>
      </div>
</body>
</html>`,document.getElementById("myElement").innerHTML=c,new z.Printd().print(document.getElementById("myElement")),r(l)}).catch(l=>{n(l)})})}static nota(t,r=!0){return console.log("factura",t),new Promise((n,e)=>{const o=this.numeroALetras(123),s={errorCorrectionLevel:"M",type:"png",quality:.95,width:100,margin:1,color:{dark:"#000000",light:"#FFF"}};x().env,U.toDataURL(`Fecha: ${t.fecha_emision} Monto: ${parseFloat(t.total).toFixed(2)}`,s).then(d=>{let i="",l="";t.producto&&(i="<tr><td class='titder'>PRODUCTO:</td><td class='contenido'>"+t.producto+"</td></tr>"),t.cantidad&&(l="<tr><td class='titder'>CANTIDAD:</td><td class='contenido'>"+t.cantidad+"</td></tr>");let c=`${this.head()}
  <!--div style='padding-left: 0.5cm;padding-right: 0.5cm'>
  <img src="logo.png" alt="logo" style="width: 100px; height: 50px; display: block; margin-left: auto; margin-right: auto;">
      <div class='titulo'>${t.tipo_venta==="EGRESO"?"NOTA DE EGRESO":"NOTA DE VENTA"}</div>
      <div class='titulo2'>${t.tipo_comprobante} <br>
      Casa Matriz<br>
      No. Punto de Venta 0<br>
Calle Beni Nro. 60, entre 6 de Octubre y Potosí.<br>
Tel. 25247993 - 76148555<br>
Oruro</div!-->
<html lang="es">
<head>
    <meta charset="UTF-8">
    <style>
   .mono {
    font-family: Monospace,serif !important;
    font-size: 18px !important;
  }
</style>
<title></title>
</head>
<body>
<div class="mono">
<hr>
<table>
<tr><td class='titder'>ID:</td><td class='titder'>${t.id}</td></tr>
<tr><td class='titder'>NOMBRE/RAZÓN SOCIAL:</td><td class='titder'>${t.nombre}</td></tr>
<tr><!-- td class='titder'>NIT/CI/CEX:</td><td class='contenido'>${t.client?t.client.nit:""}</td --></tr>
<tr><td class='titder'>FECHA DE EMISIÓN:</td><td class='contenido'>${t.fecha}</td></tr>
${i}
${l}
</table><hr><div class='titulo'>DETALLE</div>`;t.venta_detalles.forEach(f=>{console.log("r",f),c+=`<div style='font-size: 12px'><b> ${f.producto?.nombre} </b></div>`,f.visible===1?c+=`<div>
                    <span style='font-size: 18px;font-weight: bold'>
                        ${f.cantidad}
                    </span>
                    <span>
                    ${parseFloat(f.precio).toFixed(2)}
                    </span>

                    <span style='float:right'>
                        ${parseFloat(f.precio*f.cantidad).toFixed(2)}
                    </span>
                    </div>`:c+=`<div>
                    <span style='font-size: 18px;font-weight: bold'>
                        ${f.cantidad}
                    </span>
                    <span>

                    </span>

                    <span style='float:right'>

                    </span>`}),c+=`<hr>
<div>${t.comentario===""||t.comentario===null||t.comentario===void 0?"":"Comentario: "+t.comentario}</div>
      <table style='font-size: 8px;'>
      <tr><td class='titder' style='width: 60%'>SUBTOTAL Bs</td><td class='titder'>${parseFloat(t.total).toFixed(2)}</td></tr>
<!--      <tr><td class='titder' style='width: 60%'>Descuento Bs</td><td class='titder'>${parseFloat(t.descuento).toFixed(2)}</td></tr>-->
<!--      <tr><td class='titder' style='width: 60%'>TOTAL Bs</td><td class='titder'>${parseFloat(t.total-t.descuento).toFixed(2)}</td></tr>-->
      </table>
      <br>
      <div>Son ${o} ${((parseFloat(t.total)-Math.floor(parseFloat(t.total)))*100).toFixed(2)} /100 Bolivianos</div><hr>
        <!--div style='display: flex;justify-content: center;'>
          <img  src="${d}" style="width: 75px; height: 75px; display: block; margin-left: auto; margin-right: auto;">
        </div--!>
      </div>
      </div>
</body>
</html>`,document.getElementById("myElement").innerHTML=c,r&&new z.Printd().print(document.getElementById("myElement")),n(d)}).catch(d=>{e(d)})})}static cotizacion(t,r,n,e,o=!0){return(e==null||e==="")&&(e=0),new Promise((s,d)=>{const i=k.conversorNumerosALetras,c=new i().convertToText(parseInt(n)),f=he().format("YYYY-MM-DD"),u={errorCorrectionLevel:"M",type:"png",quality:.95,width:100,margin:1,color:{dark:"#000000",light:"#FFF"}},h=x().env;U.toDataURL(`Fecha: ${f} Monto: ${parseFloat(n).toFixed(2)}`,u).then(m=>{let E=`${this.head()}
  <div style='padding-left: 0.5cm;padding-right: 0.5cm'>
  <img src="logo.png" alt="logo" style="width: 100px; height: 50px; display: block; margin-left: auto; margin-right: auto;">
      <div class='titulo'>COTIZACION</div>
      <div class='titulo2'>${h.razon} <br>
      Casa Matriz<br>
      No. Punto de Venta 0<br>
${h.direccion}<br>
Tel. ${h.telefono}<br>
Oruro</div>
<hr>
<table>
<tr><td class='titder'>NOMBRE/RAZÓN SOCIAL:</td><td class='contenido'>${r.nombre}</td>
<tr><td class='titder'>FECHA DE EMISIÓN:</td><td class='contenido'>${f}</td></tr>
</table><hr><div class='titulo'>DETALLE</div>`;t.forEach(M=>{E+=`<div style='font-size: 12px'><b> ${M.nombre} </b></div>`,E+=`<div><span style='font-size: 18px;font-weight: bold'>${M.cantidadVenta}</span> ${parseFloat(M.precioVenta).toFixed(2)} 0.00
                    <span style='float:right'>${parseFloat(M.precioVenta*M.cantidadVenta).toFixed(2)}</span></div>`}),E+=`<hr>
<div>${r.comentario===""||r.comentario===null||r.comentario===void 0?"":"Comentario: "+r.comentario}</div>
      <table style='font-size: 8px;'>
      <tr><td class='titder' style='width: 60%'>SUBTOTAL Bs</td><td class='conte2'>${parseFloat(n).toFixed(2)}</td></tr>
      <tr><td class='titder' style='width: 60%'>Descuento Bs</td><td class='conte2'>${parseFloat(e).toFixed(2)}</td></tr>
      <tr><td class='titder' style='width: 60%'>TOTAL Bs</td><td class='conte2'>${parseFloat(n-e).toFixed(2)}</td></tr>
      </table>
      <br>
      <div>Son ${c} ${((parseFloat(n)-Math.floor(parseFloat(n)))*100).toFixed(2)} /100 Bolivianos</div><hr>
      <div style='display: flex;justify-content: center;'>
        <img  src="${m}" style="width: 75px; height: 75px; display: block; margin-left: auto; margin-right: auto;">
      </div></div>
      </div>
</body>
</html>`,document.getElementById("myElement").innerHTML=E,o&&new z.Printd().print(document.getElementById("myElement")),s(m)}).catch(m=>{d(m)})})}static notaCompra(t){return console.log("factura",t),new Promise((r,n)=>{const e=k.conversorNumerosALetras,s=new e().convertToText(parseInt(t.total)),d={errorCorrectionLevel:"M",type:"png",quality:.95,width:100,margin:1,color:{dark:"#000000",light:"#FFF"}},i=x().env;U.toDataURL(`Fecha: ${t.fecha_emision} Monto: ${parseFloat(t.total).toFixed(2)}`,d).then(async l=>{let c=`${this.head()}
  <div style='padding-left: 0.5cm;padding-right: 0.5cm'>
  <img src="logo.png" alt="logo" style="width: 100px; height: 50px; display: block; margin-left: auto; margin-right: auto;">
      <div class='titulo'>${t.tipo_venta==="EGRESO"?"NOTA DE EGRESO":"NOTA DE COMPRA"}</div>
      <div class='titulo2'>${i.razon} <br>
      Casa Matriz<br>
      No. Punto de Venta 0<br>
${i.direccion}<br>
Tel. ${i.telefono}<br>
Oruro</div>
<hr>
<table>
<tr><td class='titder'>NOMBRE/RAZÓN SOCIAL:</td><td class='contenido'>${t.client?t.client.nombre:""}</td>
</tr><tr><td class='titder'>NIT/CI/CEX:</td><td class='contenido'>${t.client?t.client.nit:""}</td></tr>
<!--<tr><td class='titder'>FECHA DE EMISIÓN:</td><td class='contenido'>${t.fecha_emision}</td></tr>-->
</table><hr><div class='titulo'>DETALLE</div>`;t.buy_details.forEach(u=>{c+=`<div style='font-size: 12px'><b>${u.nombre} </b></div>`,c+=`<div><span style='font-size: 14px;font-weight: bold'>${u.cantidad}</span> ${parseFloat(u.precio).toFixed(2)} 0.00
                    <span style='float:right'>${parseFloat(u.subtotal).toFixed(2)}</span></div>`}),c+=`<hr>
      <table style='font-size: 8px;'>
      <tr><td class='titder' style='width: 60%'>SUBTOTAL Bs</td><td class='conte2'>${parseFloat(t.total).toFixed(2)}</td></tr>
      <tr><td class='titder' style='width: 60%'>Descuento Bs</td><td class='conte2'>${parseFloat(t.descuento).toFixed(2)}</td></tr>
      <tr><td class='titder' style='width: 60%'>TOTAL Bs</td><td class='conte2'>${parseFloat(t.total-t.descuento).toFixed(2)}</td></tr>
      </table>
      <br>
      <div>Son ${s} ${((parseFloat(t.total)-Math.floor(parseFloat(t.total)))*100).toFixed(2)} /100 Bolivianos</div><hr>
      <div style='display: flex;justify-content: center;'>
        <img  src="${l}" style="width: 75px; height: 75px; display: block; margin-left: auto; margin-right: auto;">
      </div></div>
      </div>
</body>
</html>`,document.getElementById("myElement").innerHTML=c,new z.Printd().print(document.getElementById("myElement")),r(l)}).catch(l=>{n(l)})})}static reportTotal(t,r){const n=t.filter(s=>s.tipoVenta==="Ingreso").reduce((s,d)=>s+d.montoTotal,0),e=t.filter(s=>s.tipoVenta==="Egreso").reduce((s,d)=>s+d.montoTotal,0),o=n-e;return console.log("montoTotal",o),new Promise((s,d)=>{const i=k.conversorNumerosALetras,l=new i,c=Math.abs(o),f=l.convertToText(parseInt(c)),u={errorCorrectionLevel:"M",type:"png",quality:.95,width:100,margin:1,color:{dark:"#000000",light:"#FFF"}},h=x().env;U.toDataURL(` Monto: ${parseFloat(o).toFixed(2)}`,u).then(m=>{let E=`${this.head()}
  <div style='padding-left: 0.5cm;padding-right: 0.5cm'>
  <img src="logo.png" alt="logo" style="width: 100px; height: 100px; display: block; margin-left: auto; margin-right: auto;">
      <div class='titulo'>title</div>
      <div class='titulo2'>${h.razon} <br>
      Casa Matriz<br>
      No. Punto de Venta 0<br>
${h.direccion}<br>
Tel. ${h.telefono}<br>
Oruro</div>
<hr>
<table>
</table><hr><div class='titulo'>DETALLE</div>`;t.forEach(y=>{E+=`<div style='font-size: 12px'><b> ${y.user.name} </b></div>`,E+=`<div> ${parseFloat(y.montoTotal).toFixed(2)} ${y.tipoVenta}
          <span style='float:right'> ${y.tipoVenta==="Egreso"?"-":""} ${parseFloat(y.montoTotal).toFixed(2)}</span></div>`}),E+=`<hr>
      <table style='font-size: 8px;'>
      <tr><td class='titder' style='width: 60%'>SUBTOTAL Bs</td><td class='conte2'>${parseFloat(o).toFixed(2)}</td></tr>
      </table>
      <br>
      <div>Son ${f} ${((parseFloat(o)-Math.floor(parseFloat(o)))*100).toFixed(2)} /100 Bolivianos</div><hr>
      <div style='display: flex;justify-content: center;'>
        <img  src="${m}" style="width: 75px; height: 75px; display: block; margin-left: auto; margin-right: auto;">
      </div></div>
      </div>
</body>
</html>`,document.getElementById("myElement").innerHTML=E,new z.Printd().print(document.getElementById("myElement")),s(m)}).catch(m=>{d(m)})})}static reciboCompra(t){return console.log("reciboCompra",t),new Promise((r,n)=>{const e=k.conversorNumerosALetras,s=new e().convertToText(parseInt(t.total)),d={errorCorrectionLevel:"M",type:"png",quality:.95,width:100,margin:1,color:{dark:"#000000",light:"#FFF"}},i=x().env;U.toDataURL(`Fecha: ${t.date} Monto: ${parseFloat(t.total).toFixed(2)}`,d).then(l=>{let c=`${this.head()}
    <div style='padding-left: 0.5cm;padding-right: 0.5cm'>
    <img src="logo.png" alt="logo" style="width: 100px; height: 100px; display: block; margin-left: auto; margin-right: auto;">
      <div class='titulo'>RECIBO DE COMPRA</div>
      <div class='titulo2'>${i.razon} <br>
      Casa Matriz<br>
      No. Punto de Venta 0<br>
    ${i.direccion}<br>
    Tel. ${i.telefono}<br>
    Oruro</div>
    <hr>
    <table>
    </table><hr><div class='titulo'>DETALLE</div>`;t.compra_detalles.forEach(u=>{c+=`<div style='font-size: 12px'><b>${u.nombre} </b></div>`,c+=`<div>${u.cantidad} ${parseFloat(u.precio).toFixed(2)} 0.00
          <span style='float:right'>${parseFloat(u.total).toFixed(2)}</span></div>`}),c+=`<hr>
      <table style='font-size: 8px;'>
      <tr><td class='titder' style='width: 60%'>SUBTOTAL Bs</td><td class='conte2'>${parseFloat(t.total).toFixed(2)}</td></tr>
      </table>
      <br>
      <div>Son ${s} ${((parseFloat(t.total)-Math.floor(parseFloat(t.total)))*100).toFixed(2)} /100 Bolivianos</div><hr>
      <div style='display: flex;justify-content: center;'>
        <img  src="${l}" style="width: 75px; height: 75px; display: block; margin-left: auto; margin-right: auto;">
      </div></div>
      </div>
    </body>
    </html>`,document.getElementById("myElement").innerHTML=c,new z.Printd().print(document.getElementById("myElement")),r(l)}).catch(l=>{n(l)})})}static reciboPedido(t){return console.log("reciboPedido",t),new Promise((r,n)=>{const e=k.conversorNumerosALetras,s=new e().convertToText(parseInt(t.total)),d={errorCorrectionLevel:"M",type:"png",quality:.95,width:100,margin:1,color:{dark:"#000000",light:"#FFF"}},i=x().env;U.toDataURL(`Fecha: ${t.date} Monto: ${parseFloat(t.total).toFixed(2)}`,d).then(l=>{let c=`${this.head()}
    <div style='padding-left: 0.5cm;padding-right: 0.5cm'>
    <img src="logo.png" alt="logo" style="width: 100px; height: 100px; display: block; margin-left: auto; margin-right: auto;">
      <div class='titulo'>RECIBO DE PEDIDO</div>
      <div class='titulo2'>${i.razon} <br>
      Casa Matriz<br>
      No. Punto de Venta 0<br>
    ${i.direccion}<br>
    Tel. ${i.telefono}<br>
    Oruro</div>
    <hr>
    <div style='display: flex;justify-content: space-between;'>
        <div class='titulo'>FECHA HORA</div>
        <div class='titulo2'>${t.fecha} ${t.hora}</div>
    </div>
    <div style='display: flex;justify-content: space-between;'>
        <div class='titulo'>ID</div>
        <div class='titulo2'>${t.id}</div>
    </div>
    <hr>
    <div class='titulo'>DETALLE</div>`;t.detalles.forEach(u=>{c+=`<div style='font-size: 12px'><b>${u.producto?.nombre} </b></div>`,c+=`<div>${u.cantidad} ${parseFloat(u.cantidad).toFixed(2)} 0.00
          <span style='float:right'>${parseFloat(u.cantidad).toFixed(2)}</span></div>`}),c+=`<hr>
      <table style='font-size: 8px;'>
      <tr><td class='titder' style='width: 60%'>SUBTOTAL Bs</td><td class='conte2'>${parseFloat(t.total).toFixed(2)}</td></tr>
      </table>
      <br>
      <div>Son ${s} ${((parseFloat(t.total)-Math.floor(parseFloat(t.total)))*100).toFixed(2)} /100 Bolivianos</div><hr>
      <div style='display: flex;justify-content: center;'>
        <img  src="${l}" style="width: 75px; height: 75px; display: block; margin-left: auto; margin-right: auto;">
      </div></div>
      </div>
    </body>
    </html>`,document.getElementById("myElement").innerHTML=c,new z.Printd().print(document.getElementById("myElement")),r(l)}).catch(l=>{n(l)})})}static reciboTranferencia(t,r,n,e){return console.log("producto",t,"de",r,"ha",n,"cantidad",e),new Promise((o,s)=>{const d=k.conversorNumerosALetras,l=new d().convertToText(parseInt(e)),c={errorCorrectionLevel:"M",type:"png",quality:.95,width:100,margin:1,color:{dark:"#000000",light:"#FFF"}},f=x().env;U.toDataURL(`de: ${r} A: ${n}`,c).then(u=>{let h=`${this.head()}
    <div style='padding-left: 0.5cm;padding-right: 0.5cm'>
    <img src="logo.png" alt="logo" style="width: 100px; height: 100px; display: block; margin-left: auto; margin-right: auto;">
      <div class='titulo'>RECIBO DE TRANSFERENCIA</div>
      <div class='titulo2'>${f.razon} <br>
      Casa Matriz<br>
      No. Punto de Venta 0<br>
    ${f.direccion}<br>
    Tel. ${f.telefono}<br>
    Oruro</div>
    <hr>
    <table>
    </table><hr><div class='titulo'>DETALLE</div>`;h+=`<div style='font-size: 12px'><b>Producto: ${t} de Sucursal${r} a ${n} </b></div>`,h+=`<hr>
      <table style='font-size: 8px;'>
      <tr><td class='titder' style='width: 60%'>CANTIDAD </td><td class='conte2'>${e+""}</td></tr>
      </table>
      <br>
      <div>Son ${l+""} ${e+""} unidades</div><hr>
      <div style='display: flex;justify-content: center;'>
        <img  src="${u}" style="width: 75px; height: 75px; display: block; margin-left: auto; margin-right: auto;">
      </div></div>
      </div>
    </body>
    </html>`,document.getElementById("myElement").innerHTML=h,new z.Printd().print(document.getElementById("myElement")),o(u)}).catch(u=>{s(u)})})}static head(){return`<html>
<style>
      .titulo{
      font-size: 12px;
      text-align: center;
      font-weight: bold;
      }
      .titulo2{
      font-size: 10px;
      text-align: center;
      }
            .titulo3{
      font-size: 10px;
      text-align: center;
      width:70%;
      }
            .contenido{
      font-size: 10px;
      text-align: left;
      }
      .conte2{
      font-size: 10px;
      text-align: right;
      }
      .titder{
      font-size: 12px;
      text-align: right;
      font-weight: bold;
      }
      hr{
  border-top: 1px dashed   ;
}
  table{
    width:100%
  }
  h1 {
    color: black;
    font-family: sans-serif;
  }
  </style>
<body>
<div style="width: 300px;">`}}export{Ve as I};
