import{a as ae}from"./_commonjsHelpers-Bx2EM-6T.js";import{s as D}from"./index-D7Xk6GjO.js";import{h as he}from"./moment-C5S46NFB.js";var j={},rt,$t;function ge(){return $t||($t=1,rt=function(){return typeof Promise=="function"&&Promise.prototype&&Promise.prototype.then}),rt}var ot={},z={},Mt;function _(){if(Mt)return z;Mt=1;let l;const t=[0,26,44,70,100,134,172,196,242,292,346,404,466,532,581,655,733,815,901,991,1085,1156,1258,1364,1474,1588,1706,1828,1921,2051,2185,2323,2465,2611,2761,2876,3034,3196,3362,3532,3706];return z.getSymbolSize=function(n){if(!n)throw new Error('"version" cannot be null or undefined');if(n<1||n>40)throw new Error('"version" should be in range from 1 to 40');return n*4+17},z.getSymbolTotalCodewords=function(n){return t[n]},z.getBCHDigit=function(r){let n=0;for(;r!==0;)n++,r>>>=1;return n},z.setToSJISFunction=function(n){if(typeof n!="function")throw new Error('"toSJISFunc" is not a valid function.');l=n},z.isKanjiModeEnabled=function(){return typeof l<"u"},z.toSJIS=function(n){return l(n)},z}var it={},Rt;function Lt(){return Rt||(Rt=1,function(l){l.L={bit:1},l.M={bit:0},l.Q={bit:3},l.H={bit:2};function t(r){if(typeof r!="string")throw new Error("Param is not a string");switch(r.toLowerCase()){case"l":case"low":return l.L;case"m":case"medium":return l.M;case"q":case"quartile":return l.Q;case"h":case"high":return l.H;default:throw new Error("Unknown EC Level: "+r)}}l.isValid=function(n){return n&&typeof n.bit<"u"&&n.bit>=0&&n.bit<4},l.from=function(n,e){if(l.isValid(n))return n;try{return t(n)}catch{return e}}}(it)),it}var st,St;function me(){if(St)return st;St=1;function l(){this.buffer=[],this.length=0}return l.prototype={get:function(t){const r=Math.floor(t/8);return(this.buffer[r]>>>7-t%8&1)===1},put:function(t,r){for(let n=0;n<r;n++)this.putBit((t>>>r-n-1&1)===1)},getLengthInBits:function(){return this.length},putBit:function(t){const r=Math.floor(this.length/8);this.buffer.length<=r&&this.buffer.push(0),t&&(this.buffer[r]|=128>>>this.length%8),this.length++}},st=l,st}var at,Pt;function pe(){if(Pt)return at;Pt=1;function l(t){if(!t||t<1)throw new Error("BitMatrix size must be defined and greater than 0");this.size=t,this.data=new Uint8Array(t*t),this.reservedBit=new Uint8Array(t*t)}return l.prototype.set=function(t,r,n,e){const o=t*this.size+r;this.data[o]=n,e&&(this.reservedBit[o]=!0)},l.prototype.get=function(t,r){return this.data[t*this.size+r]},l.prototype.xor=function(t,r,n){this.data[t*this.size+r]^=n},l.prototype.isReserved=function(t,r){return this.reservedBit[t*this.size+r]},at=l,at}var lt={},xt;function ve(){return xt||(xt=1,function(l){const t=_().getSymbolSize;l.getRowColCoords=function(n){if(n===1)return[];const e=Math.floor(n/7)+2,o=t(n),s=o===145?26:Math.ceil((o-13)/(2*e-2))*2,d=[o-7];for(let i=1;i<e-1;i++)d[i]=d[i-1]-s;return d.push(6),d.reverse()},l.getPositions=function(n){const e=[],o=l.getRowColCoords(n),s=o.length;for(let d=0;d<s;d++)for(let i=0;i<s;i++)d===0&&i===0||d===0&&i===s-1||d===s-1&&i===0||e.push([o[d],o[i]]);return e}}(lt)),lt}var dt={},Dt;function ye(){if(Dt)return dt;Dt=1;const l=_().getSymbolSize,t=7;return dt.getPositions=function(n){const e=l(n);return[[0,0],[e-t,0],[0,e-t]]},dt}var ct={},Ot;function Ee(){return Ot||(Ot=1,function(l){l.Patterns={PATTERN000:0,PATTERN001:1,PATTERN010:2,PATTERN011:3,PATTERN100:4,PATTERN101:5,PATTERN110:6,PATTERN111:7};const t={N1:3,N2:3,N3:40,N4:10};l.isValid=function(e){return e!=null&&e!==""&&!isNaN(e)&&e>=0&&e<=7},l.from=function(e){return l.isValid(e)?parseInt(e,10):void 0},l.getPenaltyN1=function(e){const o=e.size;let s=0,d=0,i=0,a=null,c=null;for(let u=0;u<o;u++){d=i=0,a=c=null;for(let f=0;f<o;f++){let h=e.get(u,f);h===a?d++:(d>=5&&(s+=t.N1+(d-5)),a=h,d=1),h=e.get(f,u),h===c?i++:(i>=5&&(s+=t.N1+(i-5)),c=h,i=1)}d>=5&&(s+=t.N1+(d-5)),i>=5&&(s+=t.N1+(i-5))}return s},l.getPenaltyN2=function(e){const o=e.size;let s=0;for(let d=0;d<o-1;d++)for(let i=0;i<o-1;i++){const a=e.get(d,i)+e.get(d,i+1)+e.get(d+1,i)+e.get(d+1,i+1);(a===4||a===0)&&s++}return s*t.N2},l.getPenaltyN3=function(e){const o=e.size;let s=0,d=0,i=0;for(let a=0;a<o;a++){d=i=0;for(let c=0;c<o;c++)d=d<<1&2047|e.get(a,c),c>=10&&(d===1488||d===93)&&s++,i=i<<1&2047|e.get(c,a),c>=10&&(i===1488||i===93)&&s++}return s*t.N3},l.getPenaltyN4=function(e){let o=0;const s=e.data.length;for(let i=0;i<s;i++)o+=e.data[i];return Math.abs(Math.ceil(o*100/s/5)-10)*t.N4};function r(n,e,o){switch(n){case l.Patterns.PATTERN000:return(e+o)%2===0;case l.Patterns.PATTERN001:return e%2===0;case l.Patterns.PATTERN010:return o%3===0;case l.Patterns.PATTERN011:return(e+o)%3===0;case l.Patterns.PATTERN100:return(Math.floor(e/2)+Math.floor(o/3))%2===0;case l.Patterns.PATTERN101:return e*o%2+e*o%3===0;case l.Patterns.PATTERN110:return(e*o%2+e*o%3)%2===0;case l.Patterns.PATTERN111:return(e*o%3+(e+o)%2)%2===0;default:throw new Error("bad maskPattern:"+n)}}l.applyMask=function(e,o){const s=o.size;for(let d=0;d<s;d++)for(let i=0;i<s;i++)o.isReserved(i,d)||o.xor(i,d,r(e,i,d))},l.getBestMask=function(e,o){const s=Object.keys(l.Patterns).length;let d=0,i=1/0;for(let a=0;a<s;a++){o(a),l.applyMask(a,e);const c=l.getPenaltyN1(e)+l.getPenaltyN2(e)+l.getPenaltyN3(e)+l.getPenaltyN4(e);l.applyMask(a,e),c<i&&(i=c,d=a)}return d}}(ct)),ct}var X={},Ut;function le(){if(Ut)return X;Ut=1;const l=Lt(),t=[1,1,1,1,1,1,1,1,1,1,2,2,1,2,2,4,1,2,4,4,2,4,4,4,2,4,6,5,2,4,6,6,2,5,8,8,4,5,8,8,4,5,8,11,4,8,10,11,4,9,12,16,4,9,16,16,6,10,12,18,6,10,17,16,6,11,16,19,6,13,18,21,7,14,21,25,8,16,20,25,8,17,23,25,9,17,23,34,9,18,25,30,10,20,27,32,12,21,29,35,12,23,34,37,12,25,34,40,13,26,35,42,14,28,38,45,15,29,40,48,16,31,43,51,17,33,45,54,18,35,48,57,19,37,51,60,19,38,53,63,20,40,56,66,21,43,59,70,22,45,62,74,24,47,65,77,25,49,68,81],r=[7,10,13,17,10,16,22,28,15,26,36,44,20,36,52,64,26,48,72,88,36,64,96,112,40,72,108,130,48,88,132,156,60,110,160,192,72,130,192,224,80,150,224,264,96,176,260,308,104,198,288,352,120,216,320,384,132,240,360,432,144,280,408,480,168,308,448,532,180,338,504,588,196,364,546,650,224,416,600,700,224,442,644,750,252,476,690,816,270,504,750,900,300,560,810,960,312,588,870,1050,336,644,952,1110,360,700,1020,1200,390,728,1050,1260,420,784,1140,1350,450,812,1200,1440,480,868,1290,1530,510,924,1350,1620,540,980,1440,1710,570,1036,1530,1800,570,1064,1590,1890,600,1120,1680,1980,630,1204,1770,2100,660,1260,1860,2220,720,1316,1950,2310,750,1372,2040,2430];return X.getBlocksCount=function(e,o){switch(o){case l.L:return t[(e-1)*4+0];case l.M:return t[(e-1)*4+1];case l.Q:return t[(e-1)*4+2];case l.H:return t[(e-1)*4+3];default:return}},X.getTotalCodewordsCount=function(e,o){switch(o){case l.L:return r[(e-1)*4+0];case l.M:return r[(e-1)*4+1];case l.Q:return r[(e-1)*4+2];case l.H:return r[(e-1)*4+3];default:return}},X}var ut={},K={},zt;function Ce(){if(zt)return K;zt=1;const l=new Uint8Array(512),t=new Uint8Array(256);return function(){let n=1;for(let e=0;e<255;e++)l[e]=n,t[n]=e,n<<=1,n&256&&(n^=285);for(let e=255;e<512;e++)l[e]=l[e-255]}(),K.log=function(n){if(n<1)throw new Error("log("+n+")");return t[n]},K.exp=function(n){return l[n]},K.mul=function(n,e){return n===0||e===0?0:l[t[n]+t[e]]},K}var kt;function we(){return kt||(kt=1,function(l){const t=Ce();l.mul=function(n,e){const o=new Uint8Array(n.length+e.length-1);for(let s=0;s<n.length;s++)for(let d=0;d<e.length;d++)o[s+d]^=t.mul(n[s],e[d]);return o},l.mod=function(n,e){let o=new Uint8Array(n);for(;o.length-e.length>=0;){const s=o[0];for(let i=0;i<e.length;i++)o[i]^=t.mul(e[i],s);let d=0;for(;d<o.length&&o[d]===0;)d++;o=o.slice(d)}return o},l.generateECPolynomial=function(n){let e=new Uint8Array([1]);for(let o=0;o<n;o++)e=l.mul(e,new Uint8Array([1,t.exp(o)]));return e}}(ut)),ut}var ft,qt;function be(){if(qt)return ft;qt=1;const l=we();function t(r){this.genPoly=void 0,this.degree=r,this.degree&&this.initialize(this.degree)}return t.prototype.initialize=function(n){this.degree=n,this.genPoly=l.generateECPolynomial(this.degree)},t.prototype.encode=function(n){if(!this.genPoly)throw new Error("Encoder not initialized");const e=new Uint8Array(n.length+this.degree);e.set(n);const o=l.mod(e,this.genPoly),s=this.degree-o.length;if(s>0){const d=new Uint8Array(this.degree);return d.set(o,s),d}return o},ft=t,ft}var ht={},gt={},mt={},_t;function de(){return _t||(_t=1,mt.isValid=function(t){return!isNaN(t)&&t>=1&&t<=40}),mt}var S={},Vt;function ce(){if(Vt)return S;Vt=1;const l="[0-9]+",t="[A-Z $%*+\\-./:]+";let r="(?:[u3000-u303F]|[u3040-u309F]|[u30A0-u30FF]|[uFF00-uFFEF]|[u4E00-u9FAF]|[u2605-u2606]|[u2190-u2195]|u203B|[u2010u2015u2018u2019u2025u2026u201Cu201Du2225u2260]|[u0391-u0451]|[u00A7u00A8u00B1u00B4u00D7u00F7])+";r=r.replace(/u/g,"\\u");const n="(?:(?![A-Z0-9 $%*+\\-./:]|"+r+`)(?:.|[\r
]))+`;S.KANJI=new RegExp(r,"g"),S.BYTE_KANJI=new RegExp("[^A-Z0-9 $%*+\\-./:]+","g"),S.BYTE=new RegExp(n,"g"),S.NUMERIC=new RegExp(l,"g"),S.ALPHANUMERIC=new RegExp(t,"g");const e=new RegExp("^"+r+"$"),o=new RegExp("^"+l+"$"),s=new RegExp("^[A-Z0-9 $%*+\\-./:]+$");return S.testKanji=function(i){return e.test(i)},S.testNumeric=function(i){return o.test(i)},S.testAlphanumeric=function(i){return s.test(i)},S}var Ht;function V(){return Ht||(Ht=1,function(l){const t=de(),r=ce();l.NUMERIC={id:"Numeric",bit:1,ccBits:[10,12,14]},l.ALPHANUMERIC={id:"Alphanumeric",bit:2,ccBits:[9,11,13]},l.BYTE={id:"Byte",bit:4,ccBits:[8,16,16]},l.KANJI={id:"Kanji",bit:8,ccBits:[8,10,12]},l.MIXED={bit:-1},l.getCharCountIndicator=function(o,s){if(!o.ccBits)throw new Error("Invalid mode: "+o);if(!t.isValid(s))throw new Error("Invalid version: "+s);return s>=1&&s<10?o.ccBits[0]:s<27?o.ccBits[1]:o.ccBits[2]},l.getBestModeForData=function(o){return r.testNumeric(o)?l.NUMERIC:r.testAlphanumeric(o)?l.ALPHANUMERIC:r.testKanji(o)?l.KANJI:l.BYTE},l.toString=function(o){if(o&&o.id)return o.id;throw new Error("Invalid mode")},l.isValid=function(o){return o&&o.bit&&o.ccBits};function n(e){if(typeof e!="string")throw new Error("Param is not a string");switch(e.toLowerCase()){case"numeric":return l.NUMERIC;case"alphanumeric":return l.ALPHANUMERIC;case"kanji":return l.KANJI;case"byte":return l.BYTE;default:throw new Error("Unknown mode: "+e)}}l.from=function(o,s){if(l.isValid(o))return o;try{return n(o)}catch{return s}}}(gt)),gt}var jt;function Ae(){return jt||(jt=1,function(l){const t=_(),r=le(),n=Lt(),e=V(),o=de(),s=7973,d=t.getBCHDigit(s);function i(f,h,v){for(let w=1;w<=40;w++)if(h<=l.getCapacity(w,v,f))return w}function a(f,h){return e.getCharCountIndicator(f,h)+4}function c(f,h){let v=0;return f.forEach(function(w){const I=a(w.mode,h);v+=I+w.getBitsLength()}),v}function u(f,h){for(let v=1;v<=40;v++)if(c(f,v)<=l.getCapacity(v,h,e.MIXED))return v}l.from=function(h,v){return o.isValid(h)?parseInt(h,10):v},l.getCapacity=function(h,v,w){if(!o.isValid(h))throw new Error("Invalid QR Code version");typeof w>"u"&&(w=e.BYTE);const I=t.getSymbolTotalCodewords(h),E=r.getTotalCodewordsCount(h,v),L=(I-E)*8;if(w===e.MIXED)return L;const B=L-a(w,h);switch(w){case e.NUMERIC:return Math.floor(B/10*3);case e.ALPHANUMERIC:return Math.floor(B/11*2);case e.KANJI:return Math.floor(B/13);case e.BYTE:default:return Math.floor(B/8)}},l.getBestVersionForData=function(h,v){let w;const I=n.from(v,n.M);if(Array.isArray(h)){if(h.length>1)return u(h,I);if(h.length===0)return 1;w=h[0]}else w=h;return i(w.mode,w.getLength(),I)},l.getEncodedBits=function(h){if(!o.isValid(h)||h<7)throw new Error("Invalid QR Code version");let v=h<<12;for(;t.getBCHDigit(v)-d>=0;)v^=s<<t.getBCHDigit(v)-d;return h<<12|v}}(ht)),ht}var pt={},Jt;function Te(){if(Jt)return pt;Jt=1;const l=_(),t=1335,r=21522,n=l.getBCHDigit(t);return pt.getEncodedBits=function(o,s){const d=o.bit<<3|s;let i=d<<10;for(;l.getBCHDigit(i)-n>=0;)i^=t<<l.getBCHDigit(i)-n;return(d<<10|i)^r},pt}var vt={},yt,Yt;function Ne(){if(Yt)return yt;Yt=1;const l=V();function t(r){this.mode=l.NUMERIC,this.data=r.toString()}return t.getBitsLength=function(n){return 10*Math.floor(n/3)+(n%3?n%3*3+1:0)},t.prototype.getLength=function(){return this.data.length},t.prototype.getBitsLength=function(){return t.getBitsLength(this.data.length)},t.prototype.write=function(n){let e,o,s;for(e=0;e+3<=this.data.length;e+=3)o=this.data.substr(e,3),s=parseInt(o,10),n.put(s,10);const d=this.data.length-e;d>0&&(o=this.data.substr(e),s=parseInt(o,10),n.put(s,d*3+1))},yt=t,yt}var Et,Kt;function Be(){if(Kt)return Et;Kt=1;const l=V(),t=["0","1","2","3","4","5","6","7","8","9","A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"," ","$","%","*","+","-",".","/",":"];function r(n){this.mode=l.ALPHANUMERIC,this.data=n}return r.getBitsLength=function(e){return 11*Math.floor(e/2)+6*(e%2)},r.prototype.getLength=function(){return this.data.length},r.prototype.getBitsLength=function(){return r.getBitsLength(this.data.length)},r.prototype.write=function(e){let o;for(o=0;o+2<=this.data.length;o+=2){let s=t.indexOf(this.data[o])*45;s+=t.indexOf(this.data[o+1]),e.put(s,11)}this.data.length%2&&e.put(t.indexOf(this.data[o]),6)},Et=r,Et}var Ct,Gt;function Le(){if(Gt)return Ct;Gt=1;const l=V();function t(r){this.mode=l.BYTE,typeof r=="string"?this.data=new TextEncoder().encode(r):this.data=new Uint8Array(r)}return t.getBitsLength=function(n){return n*8},t.prototype.getLength=function(){return this.data.length},t.prototype.getBitsLength=function(){return t.getBitsLength(this.data.length)},t.prototype.write=function(r){for(let n=0,e=this.data.length;n<e;n++)r.put(this.data[n],8)},Ct=t,Ct}var wt,Zt;function Fe(){if(Zt)return wt;Zt=1;const l=V(),t=_();function r(n){this.mode=l.KANJI,this.data=n}return r.getBitsLength=function(e){return e*13},r.prototype.getLength=function(){return this.data.length},r.prototype.getBitsLength=function(){return r.getBitsLength(this.data.length)},r.prototype.write=function(n){let e;for(e=0;e<this.data.length;e++){let o=t.toSJIS(this.data[e]);if(o>=33088&&o<=40956)o-=33088;else if(o>=57408&&o<=60351)o-=49472;else throw new Error("Invalid SJIS character: "+this.data[e]+`
Make sure your charset is UTF-8`);o=(o>>>8&255)*192+(o&255),n.put(o,13)}},wt=r,wt}var bt={exports:{}},Qt;function Ie(){return Qt||(Qt=1,function(l){var t={single_source_shortest_paths:function(r,n,e){var o={},s={};s[n]=0;var d=t.PriorityQueue.make();d.push(n,0);for(var i,a,c,u,f,h,v,w,I;!d.empty();){i=d.pop(),a=i.value,u=i.cost,f=r[a]||{};for(c in f)f.hasOwnProperty(c)&&(h=f[c],v=u+h,w=s[c],I=typeof s[c]>"u",(I||w>v)&&(s[c]=v,d.push(c,v),o[c]=a))}if(typeof e<"u"&&typeof s[e]>"u"){var E=["Could not find a path from ",n," to ",e,"."].join("");throw new Error(E)}return o},extract_shortest_path_from_predecessor_list:function(r,n){for(var e=[],o=n;o;)e.push(o),r[o],o=r[o];return e.reverse(),e},find_path:function(r,n,e){var o=t.single_source_shortest_paths(r,n,e);return t.extract_shortest_path_from_predecessor_list(o,e)},PriorityQueue:{make:function(r){var n=t.PriorityQueue,e={},o;r=r||{};for(o in n)n.hasOwnProperty(o)&&(e[o]=n[o]);return e.queue=[],e.sorter=r.sorter||n.default_sorter,e},default_sorter:function(r,n){return r.cost-n.cost},push:function(r,n){var e={value:r,cost:n};this.queue.push(e),this.queue.sort(this.sorter)},pop:function(){return this.queue.shift()},empty:function(){return this.queue.length===0}}};l.exports=t}(bt)),bt.exports}var Xt;function $e(){return Xt||(Xt=1,function(l){const t=V(),r=Ne(),n=Be(),e=Le(),o=Fe(),s=ce(),d=_(),i=Ie();function a(E){return unescape(encodeURIComponent(E)).length}function c(E,L,B){const p=[];let $;for(;($=E.exec(B))!==null;)p.push({data:$[0],index:$.index,mode:L,length:$[0].length});return p}function u(E){const L=c(s.NUMERIC,t.NUMERIC,E),B=c(s.ALPHANUMERIC,t.ALPHANUMERIC,E);let p,$;return d.isKanjiModeEnabled()?(p=c(s.BYTE,t.BYTE,E),$=c(s.KANJI,t.KANJI,E)):(p=c(s.BYTE_KANJI,t.BYTE,E),$=[]),L.concat(B,p,$).sort(function(A,b){return A.index-b.index}).map(function(A){return{data:A.data,mode:A.mode,length:A.length}})}function f(E,L){switch(L){case t.NUMERIC:return r.getBitsLength(E);case t.ALPHANUMERIC:return n.getBitsLength(E);case t.KANJI:return o.getBitsLength(E);case t.BYTE:return e.getBitsLength(E)}}function h(E){return E.reduce(function(L,B){const p=L.length-1>=0?L[L.length-1]:null;return p&&p.mode===B.mode?(L[L.length-1].data+=B.data,L):(L.push(B),L)},[])}function v(E){const L=[];for(let B=0;B<E.length;B++){const p=E[B];switch(p.mode){case t.NUMERIC:L.push([p,{data:p.data,mode:t.ALPHANUMERIC,length:p.length},{data:p.data,mode:t.BYTE,length:p.length}]);break;case t.ALPHANUMERIC:L.push([p,{data:p.data,mode:t.BYTE,length:p.length}]);break;case t.KANJI:L.push([p,{data:p.data,mode:t.BYTE,length:a(p.data)}]);break;case t.BYTE:L.push([{data:p.data,mode:t.BYTE,length:a(p.data)}])}}return L}function w(E,L){const B={},p={start:{}};let $=["start"];for(let y=0;y<E.length;y++){const A=E[y],b=[];for(let m=0;m<A.length;m++){const T=A[m],C=""+y+m;b.push(C),B[C]={node:T,lastCount:0},p[C]={};for(let N=0;N<$.length;N++){const g=$[N];B[g]&&B[g].node.mode===T.mode?(p[g][C]=f(B[g].lastCount+T.length,T.mode)-f(B[g].lastCount,T.mode),B[g].lastCount+=T.length):(B[g]&&(B[g].lastCount=T.length),p[g][C]=f(T.length,T.mode)+4+t.getCharCountIndicator(T.mode,L))}}$=b}for(let y=0;y<$.length;y++)p[$[y]].end=0;return{map:p,table:B}}function I(E,L){let B;const p=t.getBestModeForData(E);if(B=t.from(L,p),B!==t.BYTE&&B.bit<p.bit)throw new Error('"'+E+'" cannot be encoded with mode '+t.toString(B)+`.
 Suggested mode is: `+t.toString(p));switch(B===t.KANJI&&!d.isKanjiModeEnabled()&&(B=t.BYTE),B){case t.NUMERIC:return new r(E);case t.ALPHANUMERIC:return new n(E);case t.KANJI:return new o(E);case t.BYTE:return new e(E)}}l.fromArray=function(L){return L.reduce(function(B,p){return typeof p=="string"?B.push(I(p,null)):p.data&&B.push(I(p.data,p.mode)),B},[])},l.fromString=function(L,B){const p=u(L,d.isKanjiModeEnabled()),$=v(p),y=w($,B),A=i.find_path(y.map,"start","end"),b=[];for(let m=1;m<A.length-1;m++)b.push(y.table[A[m]].node);return l.fromArray(h(b))},l.rawSplit=function(L){return l.fromArray(u(L,d.isKanjiModeEnabled()))}}(vt)),vt}var Wt;function Me(){if(Wt)return ot;Wt=1;const l=_(),t=Lt(),r=me(),n=pe(),e=ve(),o=ye(),s=Ee(),d=le(),i=be(),a=Ae(),c=Te(),u=V(),f=$e();function h(y,A){const b=y.size,m=o.getPositions(A);for(let T=0;T<m.length;T++){const C=m[T][0],N=m[T][1];for(let g=-1;g<=7;g++)if(!(C+g<=-1||b<=C+g))for(let F=-1;F<=7;F++)N+F<=-1||b<=N+F||(g>=0&&g<=6&&(F===0||F===6)||F>=0&&F<=6&&(g===0||g===6)||g>=2&&g<=4&&F>=2&&F<=4?y.set(C+g,N+F,!0,!0):y.set(C+g,N+F,!1,!0))}}function v(y){const A=y.size;for(let b=8;b<A-8;b++){const m=b%2===0;y.set(b,6,m,!0),y.set(6,b,m,!0)}}function w(y,A){const b=e.getPositions(A);for(let m=0;m<b.length;m++){const T=b[m][0],C=b[m][1];for(let N=-2;N<=2;N++)for(let g=-2;g<=2;g++)N===-2||N===2||g===-2||g===2||N===0&&g===0?y.set(T+N,C+g,!0,!0):y.set(T+N,C+g,!1,!0)}}function I(y,A){const b=y.size,m=a.getEncodedBits(A);let T,C,N;for(let g=0;g<18;g++)T=Math.floor(g/3),C=g%3+b-8-3,N=(m>>g&1)===1,y.set(T,C,N,!0),y.set(C,T,N,!0)}function E(y,A,b){const m=y.size,T=c.getEncodedBits(A,b);let C,N;for(C=0;C<15;C++)N=(T>>C&1)===1,C<6?y.set(C,8,N,!0):C<8?y.set(C+1,8,N,!0):y.set(m-15+C,8,N,!0),C<8?y.set(8,m-C-1,N,!0):C<9?y.set(8,15-C-1+1,N,!0):y.set(8,15-C-1,N,!0);y.set(m-8,8,1,!0)}function L(y,A){const b=y.size;let m=-1,T=b-1,C=7,N=0;for(let g=b-1;g>0;g-=2)for(g===6&&g--;;){for(let F=0;F<2;F++)if(!y.isReserved(T,g-F)){let R=!1;N<A.length&&(R=(A[N]>>>C&1)===1),y.set(T,g-F,R),C--,C===-1&&(N++,C=7)}if(T+=m,T<0||b<=T){T-=m,m=-m;break}}}function B(y,A,b){const m=new r;b.forEach(function(F){m.put(F.mode.bit,4),m.put(F.getLength(),u.getCharCountIndicator(F.mode,y)),F.write(m)});const T=l.getSymbolTotalCodewords(y),C=d.getTotalCodewordsCount(y,A),N=(T-C)*8;for(m.getLengthInBits()+4<=N&&m.put(0,4);m.getLengthInBits()%8!==0;)m.putBit(0);const g=(N-m.getLengthInBits())/8;for(let F=0;F<g;F++)m.put(F%2?17:236,8);return p(m,y,A)}function p(y,A,b){const m=l.getSymbolTotalCodewords(A),T=d.getTotalCodewordsCount(A,b),C=m-T,N=d.getBlocksCount(A,b),g=m%N,F=N-g,R=Math.floor(m/N),q=Math.floor(C/N),G=q+1,J=R-q,Z=new i(J);let Y=0;const Q=new Array(N),Ft=new Array(N);let tt=0;const fe=new Uint8Array(y.buffer);for(let H=0;H<N;H++){const nt=H<F?q:G;Q[H]=fe.slice(Y,Y+nt),Ft[H]=Z.encode(Q[H]),Y+=nt,tt=Math.max(tt,nt)}const et=new Uint8Array(m);let It=0,P,x;for(P=0;P<tt;P++)for(x=0;x<N;x++)P<Q[x].length&&(et[It++]=Q[x][P]);for(P=0;P<J;P++)for(x=0;x<N;x++)et[It++]=Ft[x][P];return et}function $(y,A,b,m){let T;if(Array.isArray(y))T=f.fromArray(y);else if(typeof y=="string"){let R=A;if(!R){const q=f.rawSplit(y);R=a.getBestVersionForData(q,b)}T=f.fromString(y,R||40)}else throw new Error("Invalid data");const C=a.getBestVersionForData(T,b);if(!C)throw new Error("The amount of data is too big to be stored in a QR Code");if(!A)A=C;else if(A<C)throw new Error(`
The chosen QR Code version cannot contain this amount of data.
Minimum version required to store current data is: `+C+`.
`);const N=B(A,b,T),g=l.getSymbolSize(A),F=new n(g);return h(F,A),v(F),w(F,A),E(F,b,0),A>=7&&I(F,A),L(F,N),isNaN(m)&&(m=s.getBestMask(F,E.bind(null,F,b))),s.applyMask(m,F),E(F,b,m),{modules:F,version:A,errorCorrectionLevel:b,maskPattern:m,segments:T}}return ot.create=function(A,b){if(typeof A>"u"||A==="")throw new Error("No input text");let m=t.M,T,C;return typeof b<"u"&&(m=t.from(b.errorCorrectionLevel,t.M),T=a.from(b.version),C=s.from(b.maskPattern),b.toSJISFunc&&l.setToSJISFunction(b.toSJISFunc)),$(A,T,m,C)},ot}var At={},Tt={},te;function ue(){return te||(te=1,function(l){function t(r){if(typeof r=="number"&&(r=r.toString()),typeof r!="string")throw new Error("Color should be defined as hex string");let n=r.slice().replace("#","").split("");if(n.length<3||n.length===5||n.length>8)throw new Error("Invalid hex color: "+r);(n.length===3||n.length===4)&&(n=Array.prototype.concat.apply([],n.map(function(o){return[o,o]}))),n.length===6&&n.push("F","F");const e=parseInt(n.join(""),16);return{r:e>>24&255,g:e>>16&255,b:e>>8&255,a:e&255,hex:"#"+n.slice(0,6).join("")}}l.getOptions=function(n){n||(n={}),n.color||(n.color={});const e=typeof n.margin>"u"||n.margin===null||n.margin<0?4:n.margin,o=n.width&&n.width>=21?n.width:void 0,s=n.scale||4;return{width:o,scale:o?4:s,margin:e,color:{dark:t(n.color.dark||"#000000ff"),light:t(n.color.light||"#ffffffff")},type:n.type,rendererOpts:n.rendererOpts||{}}},l.getScale=function(n,e){return e.width&&e.width>=n+e.margin*2?e.width/(n+e.margin*2):e.scale},l.getImageWidth=function(n,e){const o=l.getScale(n,e);return Math.floor((n+e.margin*2)*o)},l.qrToImageData=function(n,e,o){const s=e.modules.size,d=e.modules.data,i=l.getScale(s,o),a=Math.floor((s+o.margin*2)*i),c=o.margin*i,u=[o.color.light,o.color.dark];for(let f=0;f<a;f++)for(let h=0;h<a;h++){let v=(f*a+h)*4,w=o.color.light;if(f>=c&&h>=c&&f<a-c&&h<a-c){const I=Math.floor((f-c)/i),E=Math.floor((h-c)/i);w=u[d[I*s+E]?1:0]}n[v++]=w.r,n[v++]=w.g,n[v++]=w.b,n[v]=w.a}}}(Tt)),Tt}var ee;function Re(){return ee||(ee=1,function(l){const t=ue();function r(e,o,s){e.clearRect(0,0,o.width,o.height),o.style||(o.style={}),o.height=s,o.width=s,o.style.height=s+"px",o.style.width=s+"px"}function n(){try{return document.createElement("canvas")}catch{throw new Error("You need to specify a canvas element")}}l.render=function(o,s,d){let i=d,a=s;typeof i>"u"&&(!s||!s.getContext)&&(i=s,s=void 0),s||(a=n()),i=t.getOptions(i);const c=t.getImageWidth(o.modules.size,i),u=a.getContext("2d"),f=u.createImageData(c,c);return t.qrToImageData(f.data,o,i),r(u,a,c),u.putImageData(f,0,0),a},l.renderToDataURL=function(o,s,d){let i=d;typeof i>"u"&&(!s||!s.getContext)&&(i=s,s=void 0),i||(i={});const a=l.render(o,s,i),c=i.type||"image/png",u=i.rendererOpts||{};return a.toDataURL(c,u.quality)}}(At)),At}var Nt={},ne;function Se(){if(ne)return Nt;ne=1;const l=ue();function t(e,o){const s=e.a/255,d=o+'="'+e.hex+'"';return s<1?d+" "+o+'-opacity="'+s.toFixed(2).slice(1)+'"':d}function r(e,o,s){let d=e+o;return typeof s<"u"&&(d+=" "+s),d}function n(e,o,s){let d="",i=0,a=!1,c=0;for(let u=0;u<e.length;u++){const f=Math.floor(u%o),h=Math.floor(u/o);!f&&!a&&(a=!0),e[u]?(c++,u>0&&f>0&&e[u-1]||(d+=a?r("M",f+s,.5+h+s):r("m",i,0),i=0,a=!1),f+1<o&&e[u+1]||(d+=r("h",c),c=0)):i++}return d}return Nt.render=function(o,s,d){const i=l.getOptions(s),a=o.modules.size,c=o.modules.data,u=a+i.margin*2,f=i.color.light.a?"<path "+t(i.color.light,"fill")+' d="M0 0h'+u+"v"+u+'H0z"/>':"",h="<path "+t(i.color.dark,"stroke")+' d="'+n(c,a,i.margin)+'"/>',v='viewBox="0 0 '+u+" "+u+'"',I='<svg xmlns="http://www.w3.org/2000/svg" '+(i.width?'width="'+i.width+'" height="'+i.width+'" ':"")+v+' shape-rendering="crispEdges">'+f+h+`</svg>
`;return typeof d=="function"&&d(null,I),I},Nt}var re;function Pe(){if(re)return j;re=1;const l=ge(),t=Me(),r=Re(),n=Se();function e(o,s,d,i,a){const c=[].slice.call(arguments,1),u=c.length,f=typeof c[u-1]=="function";if(!f&&!l())throw new Error("Callback required as last argument");if(f){if(u<2)throw new Error("Too few arguments provided");u===2?(a=d,d=s,s=i=void 0):u===3&&(s.getContext&&typeof a>"u"?(a=i,i=void 0):(a=i,i=d,d=s,s=void 0))}else{if(u<1)throw new Error("Too few arguments provided");return u===1?(d=s,s=i=void 0):u===2&&!s.getContext&&(i=d,d=s,s=void 0),new Promise(function(h,v){try{const w=t.create(d,i);h(o(w,s,i))}catch(w){v(w)}})}try{const h=t.create(d,i);a(null,o(h,s,i))}catch(h){a(h)}}return j.create=t.create,j.toCanvas=e.bind(null,r.render),j.toDataURL=e.bind(null,r.renderToDataURL),j.toString=e.bind(null,function(o,s,d){return n.render(o,d)}),j}var xe=Pe();const O=ae(xe);var M={},oe;function De(){if(oe)return M;oe=1,Object.defineProperty(M,"__esModule",{value:!0}),M.Printd=M.createIFrame=M.createLinkStyle=M.createStyle=void 0;var l=/^(((http[s]?)|file):)?(\/\/)+([0-9a-zA-Z-_.=?&].+)$/,t=/^((\.|\.\.)?\/)([0-9a-zA-Z-_.=?&]+\/)*([0-9a-zA-Z-_.=?&]+)$/,r=function(i){return l.test(i)||t.test(i)};function n(i,a){var c=i.createElement("style");return c.appendChild(i.createTextNode(a)),c}M.createStyle=n;function e(i,a){var c=i.createElement("link");return c.type="text/css",c.rel="stylesheet",c.href=a,c}M.createLinkStyle=e;function o(i){var a=window.document.createElement("iframe");return a.setAttribute("src","about:blank"),a.setAttribute("style","visibility:hidden;width:0;height:0;position:absolute;z-index:-9999;bottom:0;"),a.setAttribute("width","0"),a.setAttribute("height","0"),a.setAttribute("wmode","opaque"),i.appendChild(a),a}M.createIFrame=o;var s={parent:window.document.body,headElements:[],bodyElements:[]},d=function(){function i(a){this.isLoading=!1,this.hasEvents=!1,this.opts=[s,a||{}].reduce(function(c,u){return Object.keys(u).forEach(function(f){return c[f]=u[f]}),c},{}),this.iframe=o(this.opts.parent)}return i.prototype.getIFrame=function(){return this.iframe},i.prototype.print=function(a,c,u,f){if(!this.isLoading){var h=this.iframe,v=h.contentDocument,w=h.contentWindow;if(!(!v||!w)&&(this.iframe.src="about:blank",this.elCopy=a.cloneNode(!0),!!this.elCopy)){this.isLoading=!0,this.callback=f;var I=w.document;I.open(),I.write('<!DOCTYPE html><html><head><meta charset="utf-8"></head><body></body></html>'),this.addEvents();var E=this.opts,L=E.headElements,B=E.bodyElements;Array.isArray(L)&&L.forEach(function(p){return I.head.appendChild(p)}),Array.isArray(B)&&B.forEach(function(p){return I.body.appendChild(p)}),Array.isArray(c)&&c.forEach(function(p){p&&I.head.appendChild(r(p)?e(I,p):n(I,p))}),I.body.appendChild(this.elCopy),Array.isArray(u)&&u.forEach(function(p){if(p){var $=I.createElement("script");r(p)?$.src=p:$.innerText=p,I.body.appendChild($)}}),I.close()}}},i.prototype.printURL=function(a,c){this.isLoading||(this.addEvents(),this.isLoading=!0,this.callback=c,this.iframe.src=a)},i.prototype.onBeforePrint=function(a){this.onbeforeprint=a},i.prototype.onAfterPrint=function(a){this.onafterprint=a},i.prototype.launchPrint=function(a){this.isLoading||a.print()},i.prototype.addEvents=function(){var a=this;if(!this.hasEvents){this.hasEvents=!0,this.iframe.addEventListener("load",function(){return a.onLoad()},!1);var c=this.iframe.contentWindow;c&&(this.onbeforeprint&&c.addEventListener("beforeprint",this.onbeforeprint),this.onafterprint&&c.addEventListener("afterprint",this.onafterprint))}},i.prototype.onLoad=function(){var a=this;if(this.iframe){this.isLoading=!1;var c=this.iframe,u=c.contentDocument,f=c.contentWindow;if(!u||!f)return;typeof this.callback=="function"?this.callback({iframe:this.iframe,element:this.elCopy,launchPrint:function(){return a.launchPrint(f)}}):this.launchPrint(f)}},i}();return M.Printd=d,M.default=d,M}var U=De(),Bt,ie;function Oe(){if(ie)return Bt;ie=1;class l{constructor(){this.units=["cero","uno","dos","tres","cuatro","cinco","seis","siete","ocho","nueve"],this.tenToSixteen=["diez","once","doce","trece","catorce","quince","dieciséis"],this.tens=["treinta","cuarenta","cincuenta","sesenta","setenta","ochenta","noventa"]}convertirNroMesAtexto(r){switch(typeof r=="number"&&(r=String(r)),r=this.deleteZerosLeft(r),r){case"1":return"Enero";case"2":return"Febrero";case"3":return"Marzo";case"4":return"Abril";case"5":return"Mayo";case"6":return"Junio";case"7":return"Julio";case"8":return"Agosto";case"9":return"Septiembre";case"10":return"Octubre";case"11":return"Noviembre";case"12":return"Diciembre";default:throw"Numero de mes inválido"}}convertToText(r){if(typeof r=="number"&&(r=String(r)),r=this.deleteZerosLeft(r),!this.validateNumber(r))throw"Número inválido, no se puede convertir!";return this.getName(r)}deleteZerosLeft(r){let n=0,e=!0;for(n=0;n<r.length;n++)if(r.charAt(n)!=0){e=!1;break}return e?"0":r.substr(n)}validateNumber(r){return!(isNaN(r)||r===""||r.indexOf(".")>=0||r.indexOf("-")>=0)}getName(r){return r=this.deleteZerosLeft(r),r.length===1?this.getUnits(r):r.length===2?this.getTens(r):r.length===3?this.getHundreds(r):r.length<7?this.getThousands(r):r.length<13?this.getPeriod(r,6,"millón"):r.length<19?this.getPeriod(r,12,"billón"):"Número demasiado grande."}getUnits(r){let n=parseInt(r);return this.units[n]}getTens(r){let n=r.charAt(1);if(r<17)return this.tenToSixteen[r-10];if(r<20)return"dieci"+this.getUnits(n);switch(r){case"20":return"veinte";case"22":return"veintidós";case"23":return"veintitrés";case"26":return"veintiséis"}if(r<30)return"veinti"+this.getUnits(n);let e=this.tens[r.charAt(0)-3];return n>0&&(e+=" y "+this.getUnits(n)),e}getHundreds(r){let n="",e=r.charAt(0),o=r.substr(1);if(r==100)return"cien";switch(e){case"1":n="ciento";break;case"5":n="quinientos";break;case"7":n="setecientos";break;case"9":n="novecientos"}return n===""&&(n=this.getUnits(e)+"cientos"),o>0&&(n+=" "+this.getName(o)),n}getThousands(r){let n="mil",e=r.length-3,o=r.substr(0,e),s=r.substr(e);return o>1&&(n=this.getName(o).replace("uno","un")+" mil"),s>0&&(n+=" "+this.getName(s)),n}getPeriod(r,n,e){let o="un "+e,s=r.length-n,d=r.substr(0,s),i=r.substr(s);return d>1&&(o=this.getName(d).replace("uno","un")+" "+e.replace("ó","o")+"es"),i>0&&(o+=" "+this.getName(i)),o}}return Bt={conversorNumerosALetras:l},Bt}var Ue=Oe();const k=ae(Ue);var W={},se;function ze(){if(se)return W;se=1,Object.defineProperty(W,"__esModule",{value:!0});function l(i){switch(i){case 1:return"Un";case 2:return"Dos";case 3:return"Tres";case 4:return"Cuatro";case 5:return"Cinco";case 6:return"Seis";case 7:return"Siete";case 8:return"Ocho";case 9:return"Nueve";default:return""}}function t(i,a){return a>0?i+" y "+l(a):i}function r(i){var a=Math.floor(i/10),c=i-a*10;switch(a){case 1:switch(c){case 0:return"Diez";case 1:return"Once";case 2:return"Doce";case 3:return"Trece";case 4:return"Catorce";case 5:return"Quince";default:return"Dieci"+l(c).toLowerCase()}case 2:switch(c){case 0:return"Veinte";default:return"Veinti"+l(c).toLowerCase()}case 3:return t("Treinta",c);case 4:return t("Cuarenta",c);case 5:return t("Cincuenta",c);case 6:return t("Sesenta",c);case 7:return t("Setenta",c);case 8:return t("Ochenta",c);case 9:return t("Noventa",c);case 0:return l(c);default:return""}}function n(i){var a=Math.floor(i/100),c=i-a*100;switch(a){case 1:return c>0?"Ciento "+r(c):"Cien";case 2:return"Doscientos "+r(c);case 3:return"Trescientos "+r(c);case 4:return"Cuatrocientos "+r(c);case 5:return"Quinientos "+r(c);case 6:return"Seiscientos "+r(c);case 7:return"Setecientos "+r(c);case 8:return"Ochocientos "+r(c);case 9:return"Novecientos "+r(c);default:return r(c)}}function e(i,a,c,u){var f=Math.floor(i/a),h=i-f*a,v="";return f>0&&(f>1?v=n(f)+" "+u:v=c),h>0&&(v+=""),v}function o(i){var a=1e3,c=Math.floor(i/a),u=i-c*a,f=e(i,a,"Un Mil","Mil"),h=n(u);return f===""?h:(f+" "+h).trim()}function s(i){var a=1e6,c=Math.floor(i/a),u=i-c*a,f=e(i,a,"Un Millón de","Millones de"),h=o(u);return f===""?h:(f+" "+h).trim()}function d(i){var a={enteros:Math.floor(i),centavos:Math.round(i*100)-Math.floor(i)*100,letrasCentavos:"",letrasMonedaPlural:"Pesos",letrasMonedaSingular:"Peso",letrasMonedaCentavoPlural:"/100 M.N.",letrasMonedaCentavoSingular:"/100 M.N."};return a.centavos>=0&&(a.letrasCentavos=function(){return a.centavos>=1&a.centavos<=9?"0"+a.centavos+a.letrasMonedaCentavoSingular:a.centavos===0?"00"+a.letrasMonedaCentavoSingular:a.centavos+a.letrasMonedaCentavoPlural}()),a.enteros===0?("Cero "+a.letrasMonedaPlural+" "+a.letrasCentavos).trim():a.enteros===1?(s(a.enteros)+" "+a.letrasMonedaSingular+" "+a.letrasCentavos).trim():(s(a.enteros)+" "+a.letrasMonedaPlural+" "+a.letrasCentavos).trim()}return W.NumerosALetras=d,W}ze();class Ve{static numeroALetras(t){if(t=parseInt(t),isNaN(t)||t<0||t>1e6)return"Número fuera de rango";const r=["cero","uno","dos","tres","cuatro","cinco","seis","siete","ocho","nueve"],n=["","","veinte","treinta","cuarenta","cincuenta","sesenta","setenta","ochenta","noventa"],e={10:"diez",11:"once",12:"doce",13:"trece",14:"catorce",15:"quince",16:"dieciséis",17:"diecisiete",18:"dieciocho",19:"diecinueve"},o=["","cien","doscientos","trescientos","cuatrocientos","quinientos","seiscientos","setecientos","ochocientos","novecientos"];function s(u){if(u<10)return r[u];if(u>=10&&u<20)return e[u];if(u<100){const h=u%10;return`${n[Math.floor(u/10)]}${h>0?" y "+r[h]:""}`}if(u===100)return"cien";const f=u%100;return`${o[Math.floor(u/100)]}${f>0?" "+s(f):""}`}if(t===1e6)return"un millón";let d=Math.floor(t/1e3),i=t%1e3,a=d>0?d===1?"mil":`${s(d)} mil`:"",c=i>0?s(i):"";return(a+" "+c).trim()}static imprimirCaja(t){}static async factura(t){return new Promise(async(r,n)=>{try{const e=k.conversorNumerosALetras,o=new e,s=D().env,d=g=>Number(g||0).toFixed(2),i=g=>(g??"").toString(),a=Number(t.total??t.montoTotal??0),c=t.numeroFactura??t.numero_factura??t.id??"—",u=t.fechaEmision??(t.fecha&&t.hora?`${t.fecha} ${t.hora}`:"—"),f=t.nombre??t?.cliente?.nombre??"SN",h=t.complemento??t?.cliente?.complemento??"",v=t.ci??t?.cliente?.ci??"0",w=t.cliente_id??t?.cliente?.id??"—",I=s?.puntoVenta??0,E=t.cuf??null,L=E?E.match(/.{1,20}/g).join("<br>"):null,B=E?"FACTURA<br>CON DERECHO A CRÉDITO FISCAL":"NOTA DE VENTA",p=t.leyenda??"Ley N° 453: Puedes acceder a la reclamación cuando tus derechos han sido vulnerados.",$=Array.isArray(t.venta_detalles)?t.venta_detalles:Array.isArray(t.details)?t.details:[],y=Math.floor(a),A=Math.round((a-y)*100).toString().padStart(2,"0"),b=`Son ${o.convertToText(y)} ${A}/100 Bolivianos`;let m=null;L&&(m=await O.toDataURL(`${s.url2}consulta/QR?nit=${s.nit}&cuf=${L}&numero=${c}&t=2`,{errorCorrectionLevel:"M",type:"png",width:110,margin:0,color:{dark:"#000",light:"#FFF"}}));let T=`${this.head()}
<style>
/* Ticket 80mm ~ 300px */
.ticket { width:300px; margin:0 auto; }
.mono { font-family: "Courier New", Courier, monospace; }
.fs9 { font-size:9px; } .fs10{font-size:10px;} .fs11{font-size:11px;} .fs12{font-size:12px;}
.center{ text-align:center; } .right{ text-align:right; } .left{ text-align:left; }
hr{ border:0; border-top:1px dashed #000; margin:6px 0; }
.title{ font-weight:700; text-transform:uppercase; line-height:1.15; }
.small { font-size:8px; line-height:1.25; }

.tbl{ width:100%; border-collapse:collapse; }
.tbl td{ padding:2px 0; vertical-align:top; }

.lbl{ width:135px; font-weight:700; text-transform:uppercase; }
.val{ width:auto; }

.det-header{ font-weight:700; text-transform:uppercase; margin:4px 0; }
.item-desc{ font-weight:700; }
.item-meta{ color:#111; }

.tot td{ padding:1px 0; }
.tot .l{ width:70%; }
.tot .r{ width:30%; text-align:right; }

.qr{ display:flex; justify-content:center; margin-top:6px; }
@page { margin: 6mm; }
</style>

<div class="ticket mono fs10">
  <div class="title fs12 center">${B}</div>

  <div class="center small">
    ${i(s.razon)}<br>
    Casa Matriz<br>
    No. Punto de Venta ${I}<br>
    ${i(s.direccion)}<br>
    Tel. ${i(s.telefono)}<br>
    Oruro
  </div>

  <hr>

  <table class="tbl fs10">
    <tr><td class="lbl">NIT</td><td class="val">${i(s.nit)}</td></tr>
    <tr><td class="lbl">FACTURA N°</td><td class="val">${c}</td></tr>
    <tr><td class="lbl">CÓD. AUTORIZACIÓN</td><td class="val">${L??"—"}</td></tr>
  </table>

  <hr>

  <table class="tbl fs10">
    <tr><td class="lbl">NOMBRE/RAZÓN SOCIAL</td><td class="val">${i(f)}</td></tr>
    <tr><td class="lbl">NIT/CI/CEX</td><td class="val">${i(v)}${i(h?"-"+h:"")}</td></tr>
    <tr><td class="lbl">NRO. CLIENTE</td><td class="val">${i(w)}</td></tr>
    <tr><td class="lbl">FECHA DE EMISIÓN</td><td class="val">${i(u)}</td></tr>
  </table>

  <hr>
  <div class="det-header center">DETALLE</div>`;$.forEach(g=>{const F=g.producto_id??g.product_id??g?.producto?.id??"—",R=i(g.nombre??g.descripcion??g?.producto?.nombre??""),q=i(g.unidad??g?.producto?.unidad??""),G=Number(g.cantidad??g.qty??0),J=Number(g.precio??g.precioUnitario??0),Z=Number(g.descuento??g.montoDescuento??0),Y=g.subTotal??G*J-Z;T+=`
      <table class="tbl fs10">
        <tr>
          <td class="left item-desc" colspan="3">${F} - ${R}</td>
          <td class="right item-desc">${d(Y)}</td>
        </tr>
        <tr><td class="left item-meta" colspan="4">Unidad de Medida: ${q||"Unidad (Servicios)"}</td></tr>
        <tr>
          <td class="right" style="width:22%;">${d(G)}</td>
          <td class="center" style="width:6%;">x</td>
          <td class="right" style="width:32%;">${d(J)} - ${d(Z)}</td>
          <td class="right" style="width:40%;"></td>
        </tr>
      </table>`}),T+=`
  <hr>
  <table class="tbl tot fs10">
    <tr><td class="l left strong">TOTAL Bs</td><td class="r strong">${d(a)}</td></tr>
    <tr><td class="l left">(-) DESCUENTO Bs</td><td class="r">0.00</td></tr>
    <tr><td class="l left strong">SUBTOTAL A PAGAR Bs</td><td class="r strong">${d(a)}</td></tr>
    <tr><td class="l left">(-) AJUSTES NO SUJETOS A IVA Bs</td><td class="r">0.00</td></tr>
    <tr><td class="l left strong">MONTO TOTAL A PAGAR Bs</td><td class="r strong">${d(a)}</td></tr>
    <tr><td class="l left">(-) TASAS Bs</td><td class="r">0.00</td></tr>
    <tr><td class="l left">(-) OTROS PAGOS NO SUJETO IVA Bs</td><td class="r">0.00</td></tr>
    <tr><td class="l left">(+) AJUSTES NO SUJETOS A IVA Bs</td><td class="r">0.00</td></tr>
    <tr><td class="l left strong">IMPORTE BASE CRÉDITO FISCAL</td><td class="r strong">${d(a)}</td></tr>
  </table>

  <div class="fs10" style="margin-top:6px;">${b}</div>

  <hr>
  <div class="center small">
    ESTA FACTURA CONTRIBUYE AL DESARROLLO DEL PAÍS,<br>
    EL USO ILÍCITO SERÁ SANCIONADO PENALMENTE DE ACUERDO A LEY
  </div>
  <div class="center small" style="margin-top:4px;">${i(p)}</div>
  <div class="center small" style="margin-top:4px;">“Este documento es la Representación Gráfica de un<br>Documento Fiscal Digital emitido en una modalidad de facturación en línea”</div>
  ${m?`<div class="qr"><img src="${m}" alt="QR"></div>`:""}
</div>`;const C=document.getElementById("myElement");C&&(C.innerHTML=T),new U.Printd().print(C),r(m)}catch(e){n(e)}})}static nota(t,r=!0){return console.log("factura",t),new Promise((n,e)=>{const o=this.numeroALetras(123),s={errorCorrectionLevel:"M",type:"png",quality:.95,width:100,margin:1,color:{dark:"#000000",light:"#FFF"}};D().env,O.toDataURL(`Fecha: ${t.fecha_emision} Monto: ${parseFloat(t.total).toFixed(2)}`,s).then(d=>{let i="",a="";t.producto&&(i="<tr><td class='titder'>PRODUCTO:</td><td class='contenido'>"+t.producto+"</td></tr>"),t.cantidad&&(a="<tr><td class='titder'>CANTIDAD:</td><td class='contenido'>"+t.cantidad+"</td></tr>");let c=`${this.head()}
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
${a}
</table><hr><div class='titulo'>DETALLE</div>`;t.venta_detalles.forEach(u=>{console.log("r",u),c+=`<div style='font-size: 12px'><b> ${u.producto?.nombre} </b></div>`,u.visible===1?c+=`<div>
                    <span style='font-size: 18px;font-weight: bold'>
                        ${u.cantidad}
                    </span>
                    <span>
                    ${parseFloat(u.precio).toFixed(2)}
                    </span>

                    <span style='float:right'>
                        ${parseFloat(u.precio*u.cantidad).toFixed(2)}
                    </span>
                    </div>`:c+=`<div>
                    <span style='font-size: 18px;font-weight: bold'>
                        ${u.cantidad}
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
</html>`,document.getElementById("myElement").innerHTML=c,r&&new U.Printd().print(document.getElementById("myElement")),n(d)}).catch(d=>{e(d)})})}static cotizacion(t,r,n,e,o=!0){return(e==null||e==="")&&(e=0),new Promise((s,d)=>{const i=k.conversorNumerosALetras,c=new i().convertToText(parseInt(n)),u=he().format("YYYY-MM-DD"),f={errorCorrectionLevel:"M",type:"png",quality:.95,width:100,margin:1,color:{dark:"#000000",light:"#FFF"}},h=D().env;O.toDataURL(`Fecha: ${u} Monto: ${parseFloat(n).toFixed(2)}`,f).then(v=>{let w=`${this.head()}
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
<tr><td class='titder'>FECHA DE EMISIÓN:</td><td class='contenido'>${u}</td></tr>
</table><hr><div class='titulo'>DETALLE</div>`;t.forEach(I=>{w+=`<div style='font-size: 12px'><b> ${I.nombre} </b></div>`,w+=`<div><span style='font-size: 18px;font-weight: bold'>${I.cantidadVenta}</span> ${parseFloat(I.precioVenta).toFixed(2)} 0.00
                    <span style='float:right'>${parseFloat(I.precioVenta*I.cantidadVenta).toFixed(2)}</span></div>`}),w+=`<hr>
<div>${r.comentario===""||r.comentario===null||r.comentario===void 0?"":"Comentario: "+r.comentario}</div>
      <table style='font-size: 8px;'>
      <tr><td class='titder' style='width: 60%'>SUBTOTAL Bs</td><td class='conte2'>${parseFloat(n).toFixed(2)}</td></tr>
      <tr><td class='titder' style='width: 60%'>Descuento Bs</td><td class='conte2'>${parseFloat(e).toFixed(2)}</td></tr>
      <tr><td class='titder' style='width: 60%'>TOTAL Bs</td><td class='conte2'>${parseFloat(n-e).toFixed(2)}</td></tr>
      </table>
      <br>
      <div>Son ${c} ${((parseFloat(n)-Math.floor(parseFloat(n)))*100).toFixed(2)} /100 Bolivianos</div><hr>
      <div style='display: flex;justify-content: center;'>
        <img  src="${v}" style="width: 75px; height: 75px; display: block; margin-left: auto; margin-right: auto;">
      </div></div>
      </div>
</body>
</html>`,document.getElementById("myElement").innerHTML=w,o&&new U.Printd().print(document.getElementById("myElement")),s(v)}).catch(v=>{d(v)})})}static notaCompra(t){return console.log("factura",t),new Promise((r,n)=>{const e=k.conversorNumerosALetras,s=new e().convertToText(parseInt(t.total)),d={errorCorrectionLevel:"M",type:"png",quality:.95,width:100,margin:1,color:{dark:"#000000",light:"#FFF"}},i=D().env;O.toDataURL(`Fecha: ${t.fecha_emision} Monto: ${parseFloat(t.total).toFixed(2)}`,d).then(async a=>{let c=`${this.head()}
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
</table><hr><div class='titulo'>DETALLE</div>`;t.buy_details.forEach(f=>{c+=`<div style='font-size: 12px'><b>${f.nombre} </b></div>`,c+=`<div><span style='font-size: 14px;font-weight: bold'>${f.cantidad}</span> ${parseFloat(f.precio).toFixed(2)} 0.00
                    <span style='float:right'>${parseFloat(f.subtotal).toFixed(2)}</span></div>`}),c+=`<hr>
      <table style='font-size: 8px;'>
      <tr><td class='titder' style='width: 60%'>SUBTOTAL Bs</td><td class='conte2'>${parseFloat(t.total).toFixed(2)}</td></tr>
      <tr><td class='titder' style='width: 60%'>Descuento Bs</td><td class='conte2'>${parseFloat(t.descuento).toFixed(2)}</td></tr>
      <tr><td class='titder' style='width: 60%'>TOTAL Bs</td><td class='conte2'>${parseFloat(t.total-t.descuento).toFixed(2)}</td></tr>
      </table>
      <br>
      <div>Son ${s} ${((parseFloat(t.total)-Math.floor(parseFloat(t.total)))*100).toFixed(2)} /100 Bolivianos</div><hr>
      <div style='display: flex;justify-content: center;'>
        <img  src="${a}" style="width: 75px; height: 75px; display: block; margin-left: auto; margin-right: auto;">
      </div></div>
      </div>
</body>
</html>`,document.getElementById("myElement").innerHTML=c,new U.Printd().print(document.getElementById("myElement")),r(a)}).catch(a=>{n(a)})})}static reportTotal(t,r){const n=t.filter(s=>s.tipoVenta==="Ingreso").reduce((s,d)=>s+d.montoTotal,0),e=t.filter(s=>s.tipoVenta==="Egreso").reduce((s,d)=>s+d.montoTotal,0),o=n-e;return console.log("montoTotal",o),new Promise((s,d)=>{const i=k.conversorNumerosALetras,a=new i,c=Math.abs(o),u=a.convertToText(parseInt(c)),f={errorCorrectionLevel:"M",type:"png",quality:.95,width:100,margin:1,color:{dark:"#000000",light:"#FFF"}},h=D().env;O.toDataURL(` Monto: ${parseFloat(o).toFixed(2)}`,f).then(v=>{let w=`${this.head()}
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
</table><hr><div class='titulo'>DETALLE</div>`;t.forEach(E=>{w+=`<div style='font-size: 12px'><b> ${E.user.name} </b></div>`,w+=`<div> ${parseFloat(E.montoTotal).toFixed(2)} ${E.tipoVenta}
          <span style='float:right'> ${E.tipoVenta==="Egreso"?"-":""} ${parseFloat(E.montoTotal).toFixed(2)}</span></div>`}),w+=`<hr>
      <table style='font-size: 8px;'>
      <tr><td class='titder' style='width: 60%'>SUBTOTAL Bs</td><td class='conte2'>${parseFloat(o).toFixed(2)}</td></tr>
      </table>
      <br>
      <div>Son ${u} ${((parseFloat(o)-Math.floor(parseFloat(o)))*100).toFixed(2)} /100 Bolivianos</div><hr>
      <div style='display: flex;justify-content: center;'>
        <img  src="${v}" style="width: 75px; height: 75px; display: block; margin-left: auto; margin-right: auto;">
      </div></div>
      </div>
</body>
</html>`,document.getElementById("myElement").innerHTML=w,new U.Printd().print(document.getElementById("myElement")),s(v)}).catch(v=>{d(v)})})}static reciboCompra(t){return console.log("reciboCompra",t),new Promise((r,n)=>{const e=k.conversorNumerosALetras,s=new e().convertToText(parseInt(t.total)),d={errorCorrectionLevel:"M",type:"png",quality:.95,width:100,margin:1,color:{dark:"#000000",light:"#FFF"}},i=D().env;O.toDataURL(`Fecha: ${t.date} Monto: ${parseFloat(t.total).toFixed(2)}`,d).then(a=>{let c=`${this.head()}
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
    </table><hr><div class='titulo'>DETALLE</div>`;t.compra_detalles.forEach(f=>{c+=`<div style='font-size: 12px'><b>${f.nombre} </b></div>`,c+=`<div>${f.cantidad} ${parseFloat(f.precio).toFixed(2)} 0.00
          <span style='float:right'>${parseFloat(f.total).toFixed(2)}</span></div>`}),c+=`<hr>
      <table style='font-size: 8px;'>
      <tr><td class='titder' style='width: 60%'>SUBTOTAL Bs</td><td class='conte2'>${parseFloat(t.total).toFixed(2)}</td></tr>
      </table>
      <br>
      <div>Son ${s} ${((parseFloat(t.total)-Math.floor(parseFloat(t.total)))*100).toFixed(2)} /100 Bolivianos</div><hr>
      <div style='display: flex;justify-content: center;'>
        <img  src="${a}" style="width: 75px; height: 75px; display: block; margin-left: auto; margin-right: auto;">
      </div></div>
      </div>
    </body>
    </html>`,document.getElementById("myElement").innerHTML=c,new U.Printd().print(document.getElementById("myElement")),r(a)}).catch(a=>{n(a)})})}static reciboPedido(t){return console.log("reciboPedido",t),new Promise((r,n)=>{const e=k.conversorNumerosALetras,s=new e().convertToText(parseInt(t.total)),d={errorCorrectionLevel:"M",type:"png",quality:.95,width:100,margin:1,color:{dark:"#000000",light:"#FFF"}},i=D().env;O.toDataURL(`Fecha: ${t.date} Monto: ${parseFloat(t.total).toFixed(2)}`,d).then(a=>{let c=`${this.head()}
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
    <div class='titulo'>DETALLE</div>`;t.detalles.forEach(f=>{c+=`<div style='font-size: 12px'><b>${f.producto?.nombre} </b></div>`,c+=`<div>${f.cantidad} ${parseFloat(f.cantidad).toFixed(2)} 0.00
          <span style='float:right'>${parseFloat(f.cantidad).toFixed(2)}</span></div>`}),c+=`<hr>
      <table style='font-size: 8px;'>
      <tr><td class='titder' style='width: 60%'>SUBTOTAL Bs</td><td class='conte2'>${parseFloat(t.total).toFixed(2)}</td></tr>
      </table>
      <br>
      <div>Son ${s} ${((parseFloat(t.total)-Math.floor(parseFloat(t.total)))*100).toFixed(2)} /100 Bolivianos</div><hr>
      <div style='display: flex;justify-content: center;'>
        <img  src="${a}" style="width: 75px; height: 75px; display: block; margin-left: auto; margin-right: auto;">
      </div></div>
      </div>
    </body>
    </html>`,document.getElementById("myElement").innerHTML=c,new U.Printd().print(document.getElementById("myElement")),r(a)}).catch(a=>{n(a)})})}static reciboTranferencia(t,r,n,e){return console.log("producto",t,"de",r,"ha",n,"cantidad",e),new Promise((o,s)=>{const d=k.conversorNumerosALetras,a=new d().convertToText(parseInt(e)),c={errorCorrectionLevel:"M",type:"png",quality:.95,width:100,margin:1,color:{dark:"#000000",light:"#FFF"}},u=D().env;O.toDataURL(`de: ${r} A: ${n}`,c).then(f=>{let h=`${this.head()}
    <div style='padding-left: 0.5cm;padding-right: 0.5cm'>
    <img src="logo.png" alt="logo" style="width: 100px; height: 100px; display: block; margin-left: auto; margin-right: auto;">
      <div class='titulo'>RECIBO DE TRANSFERENCIA</div>
      <div class='titulo2'>${u.razon} <br>
      Casa Matriz<br>
      No. Punto de Venta 0<br>
    ${u.direccion}<br>
    Tel. ${u.telefono}<br>
    Oruro</div>
    <hr>
    <table>
    </table><hr><div class='titulo'>DETALLE</div>`;h+=`<div style='font-size: 12px'><b>Producto: ${t} de Sucursal${r} a ${n} </b></div>`,h+=`<hr>
      <table style='font-size: 8px;'>
      <tr><td class='titder' style='width: 60%'>CANTIDAD </td><td class='conte2'>${e+""}</td></tr>
      </table>
      <br>
      <div>Son ${a+""} ${e+""} unidades</div><hr>
      <div style='display: flex;justify-content: center;'>
        <img  src="${f}" style="width: 75px; height: 75px; display: block; margin-left: auto; margin-right: auto;">
      </div></div>
      </div>
    </body>
    </html>`,document.getElementById("myElement").innerHTML=h,new U.Printd().print(document.getElementById("myElement")),o(f)}).catch(f=>{s(f)})})}static head(){return`<html>
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
<div style="width: 300px;">`}static async printFactura(t){const r=k.conversorNumerosALetras,e=new r().convertToText(parseInt(t.total)),o=D().env,s=await O.toDataURL(`${o.url2}consulta/QR?nit=${o.nit}&cuf=${t.cuf}&numero=${t.id}&t=2`,{errorCorrectionLevel:"M",type:"png",quality:.95,width:100,margin:1,color:{dark:"#000000",light:"#FFF"}}),d=t.online?"en":"fuera de";let i=`<style>
    .titulo { font-size: 12px; text-align: center; font-weight: bold; }
    .titulo2 { font-size: 10px; text-align: center; }
    .contenido { font-size: 10px; text-align: left; }
    .conte2 { font-size: 10px; text-align: right; }
    .titder { font-size: 12px; text-align: right; font-weight: bold; }
    hr { border-top: 1px dashed; }
  </style>
  <div style='padding: 0.5cm'>
    <div class='titulo'>FACTURA CON DERECHO A CREDITO FISCAL</div>
    <div class='titulo2'>
      ${o.razon}<br>Casa Matriz<br>No. Punto de Venta 0<br>
      ${o.direccion}<br>Tel. ${o.telefono}<br>Oruro
    </div>
    <hr>
    <div class='titulo'>NIT</div><div class='titulo2'>${o.nit}</div>
    <div class='titulo'>FACTURA N°</div><div class='titulo2'>${t.id}</div>
    <div class='titulo'>CÓD. AUTORIZACIÓN</div><div class='titulo2'>${t.cuf}</div>
    <hr>
    <table>
      <tr><td class='titder'>NOMBRE/RAZÓN SOCIAL:</td><td class='contenido'>${t.nombre}</td></tr>
      <tr><td class='titder'>NIT/CI/CEX:</td><td class='contenido'>${t.ci}${t.cliente.complemento?"-"+t.cliente.complemento:""}</td></tr>
      <tr><td class='titder'>COD. CLIENTE:</td><td class='contenido'>${t.cliente.id}</td></tr>
      <tr><td class='titder'>FECHA DE EMISIÓN:</td><td class='contenido'>${t.fecha}</td></tr>
    </table>
    <hr>
    <div class='titulo'>DETALLE</div>`;t.venta_detalles.forEach(u=>{i+=`<div style='font-size: 12px'><b>${u.id} - ${u.nombre}</b></div>
             <div>${u.cantidad} ${parseFloat(u.precio).toFixed(2)} 0.00
             <span style='float:right'>${parseFloat(u.cantidad*u.precio).toFixed(2)}</span></div>`}),i+=`<hr>
    <table style='font-size: 8px;'>
      <tr><td class='titder'>SUBTOTAL Bs</td><td class='conte2'>${parseFloat(t.total).toFixed(2)}</td></tr>
      <tr><td class='titder'>DESCUENTO Bs</td><td class='conte2'>0.00</td></tr>
      <tr><td class='titder'>TOTAL Bs</td><td class='conte2'>${parseFloat(t.total).toFixed(2)}</td></tr>
      <tr><td class='titder'>MONTO GIFT CARD Bs</td><td class='conte2'>0.00</td></tr>
      <tr><td class='titder'>MONTO A PAGAR Bs</td><td class='conte2'>${parseFloat(t.total).toFixed(2)}</td></tr>
      <tr><td class='titder'>IMPORTE BASE CRÉDITO FISCAL Bs</td><td class='conte2'>${parseFloat(t.total).toFixed(2)}</td></tr>
    </table><br>
    <div>Son ${e} ${((parseFloat(t.total)-Math.floor(t.total))*100).toFixed(0)}/100 Bolivianos</div>
    <hr>
    <div class='titulo2' style='font-size: 9px'>ESTA FACTURA CONTRIBUYE AL DESARROLLO DEL PAÍS,<br>
    EL USO ILÍCITO SERÁ SANCIONADO PENALMENTE DE ACUERDO A LEY<br><br>
    ${t.leyenda}<br><br>
    “Este documento es la Representación Gráfica de un Documento Fiscal Digital emitido en una modalidad de facturación ${d} línea”</div>
    <div style='display: flex; justify-content: center;'>
      <img src="${s}" />
    </div>
  </div>`;const a=document.getElementById("myElement");a&&(a.innerHTML=i),new U.Printd().print(a)}}export{Ve as I};
