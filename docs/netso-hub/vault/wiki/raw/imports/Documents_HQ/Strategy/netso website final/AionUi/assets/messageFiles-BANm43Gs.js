import{q as i,t as p}from"./index-wkPQcxQ3.js";const g=(s,n)=>{const e=n.map(r=>typeof r=="string"?r:r.path).filter(Boolean);return Array.from(new Set([...s,...e]))},m=(s,n,e)=>{if(!n.length)return s;const r=n.map(t=>{if(!e)return t;if(t.startsWith("/")||/^[A-Za-z]:/.test(t)){const o=t.replace(/\\/g,"/"),a=e.replace(/[\\/]+$/,"").replace(/\\/g,"/");if(o.startsWith(a+"/")){const $=o.slice(a.length+1);return`${e}/${$.replace(i,"$1")}`}const c=t.split(/[\\/]/);let l=c[c.length-1]||t;return l=l.replace(i,"$1"),`${e}/${l}`}return`${e}/${t}`});return`${s}

${p}
${r.join(`
`)}`};export{m as b,g as c};
