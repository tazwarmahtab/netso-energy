const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["./index-wkPQcxQ3.js","./vendor-highlight-am57TD_2.js","./vendor-arco-Bqg-s5Cj.js","./vendor-react-CX5SUctX.js","./vendor-editor-cC9T3iig.js","./vendor-arco-Bfxep3p_.css","./index-CXhCb9th.css"])))=>i.map(i=>d[i]);
import{k as U}from"./vendor-katex-DrSI9qtO.js";import{f as A,V as $,I as E,a0 as b,u as B,a1 as I,a2 as K,a3 as X,e as H}from"./index-wkPQcxQ3.js";import{R as t,r as h,O as J,Q as Z,U as G,w as Q,a as q}from"./vendor-react-CX5SUctX.js";import{j as Y,M as ee,c as te,a as oe}from"./mermaid-VLURNSYL-T-Q-ofNq.js";import{M as V}from"./vendor-arco-Bqg-s5Cj.js";import{h as re,v as ne,a as ae,_ as se}from"./vendor-highlight-am57TD_2.js";import{r as le,a as N,M as ie,b as ce,c as de,d as ue}from"./vendor-markdown-D0w6j_S6.js";/**
 * @license
 * Copyright 2025 AionUi (aionui.com)
 * SPDX-License-Identifier: Apache-2.0
 */const me=e=>{const o=t.createContext({value:e,setValue(){console.warn("")}}),i=()=>t.useContext(o).value,a=()=>t.useContext(o).setValue,d=e;return[i,c=>{const[l,r]=h.useState(c.value||JSON.parse(JSON.stringify(d))),u=h.useRef(!0);return h.useEffect(()=>{u.current||(r(c.value),u.current=!1)},[c.value]),t.createElement(o.Provider,{value:{value:l,setValue:r}},c.children)},a]},he=E(J),[pe,ge,fe]=me({root:""}),M=({src:e,alt:o,className:i})=>{const[a,d]=h.useState(!0),[s,c]=h.useState(e),{root:l}=pe(),r=h.useMemo(()=>!l||e.startsWith("http")||e.startsWith("data:")||e.startsWith("/")||e.startsWith("file:")||e.startsWith("\\")||/^[A-Za-z]:/.test(e)?e:Y(l,e),[e,l]);return h.useEffect(()=>{d(!0),A.getImageBase64.invoke({path:r}).then(u=>{c(u),d(!1)}).catch(u=>{console.error("[LocalImageView] Failed to load image:",{path:r,error:u}),d(!1)})},[r]),a?t.createElement("span",{style:{display:"flex",alignItems:"center",gap:"4px"}},t.createElement(he,{className:"loading",style:{display:"flex"},theme:"outline",size:"14",fill:$.primary,strokeWidth:2}),t.createElement("span",null,o)):t.createElement("img",{src:s,alt:o,className:i})};M.Provider=ge;M.useUpdateLocalImage=fe;/**
 * @license
 * Copyright 2025 AionUi (aionui.com)
 * SPDX-License-Identifier: Apache-2.0
 */const T=e=>{const o=String(e).replace(/\n$/,"");try{return JSON.stringify(JSON.parse(o),(i,a)=>a,2)}catch{return o}},xe=(e,o)=>e.startsWith("+")&&!e.startsWith("+++")?{backgroundColor:o?b.additionBgDark:b.additionBgLight}:e.startsWith("-")&&!e.startsWith("---")?{backgroundColor:o?b.deletionBgDark:b.deletionBgLight}:e.startsWith("@@")?{backgroundColor:o?b.hunkBgDark:b.hunkBgLight}:{};/**
 * @license
 * Copyright 2025 AionUi (aionui.com)
 * SPDX-License-Identifier: Apache-2.0
 */const ye=E(Z),be=E(Q),z=E(G),C=3,we=200,w=new Map;function ve(e,o){const i=o.slice(0,C).join(`
`),a=`${e}:${o.length}:${i}`;if(!w.has(a)&&w.size>=we){const d=w.keys().next().value;d!==void 0&&w.delete(d)}return a}function Se(e){const{t:o}=B(),[,i]=h.useState(0),[a,d]=h.useState(()=>document.documentElement.getAttribute("data-theme")||"light");t.useEffect(()=>{const p=()=>{const L=document.documentElement.getAttribute("data-theme")||"light";d(L)},S=new MutationObserver(p);return S.observe(document.documentElement,{attributes:!0,attributeFilter:["data-theme"]}),()=>S.disconnect()},[]);const{children:s,className:c,node:l,hiddenCodeCopyButton:r,codeStyle:u,...f}=e,n=/language-(\w+)/.exec(c||"")?.[1]||"text",g=a==="dark"?ne:ae;if(n==="latex"||n==="math"||n==="tex"){const p=String(s).replace(/\n$/,"");if(!/\\(documentclass|begin\{document\}|usepackage)\b/.test(p))try{const L=U.renderToString(p,{displayMode:!0,throwOnError:!1});return t.createElement("div",{className:"katex-display",dangerouslySetInnerHTML:{__html:L}})}catch{}}if(n==="mermaid")return t.createElement(ee,{code:T(s),style:e.codeStyle});if(!String(s).includes(`
`))return t.createElement("code",{...f,className:c,style:{fontWeight:"bold"}},s);const y=n==="diff",P=T(s),k=P.split(`
`),O=y?k:[],D=k.length,_=D>C,R=ve(n,k),v=w.get(R)??!1,W=p=>{w.set(R,p),i(S=>S+1)},F=v||!_?P:k.slice(0,C).join(`
`),j={margin:"0",borderRadius:"0",border:"none",background:"transparent",color:"var(--text-primary)",overflowX:"auto",maxWidth:"100%"};return t.createElement("div",{style:{width:"100%",minWidth:0,maxWidth:"100%",...e.codeStyle}},t.createElement("div",{style:{border:"1px solid var(--bg-3)",borderRadius:"0.3rem",overflow:"hidden",overflowX:"auto"}},t.createElement("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"center",backgroundColor:"var(--bg-2)",borderTopLeftRadius:"0.3rem",borderTopRightRadius:"0.3rem",padding:"6px 10px",borderBottom:"1px solid var(--bg-3)"}},t.createElement("span",{style:{textDecoration:"none",color:"var(--text-secondary)",fontSize:"12px",lineHeight:"20px"}},"<"+n.toLocaleLowerCase()+">"),t.createElement("div",{style:{display:"flex",alignItems:"center",gap:"8px"}},t.createElement(ye,{theme:"outline",size:"18",style:{cursor:"pointer"},fill:"var(--text-secondary)",onClick:()=>{te(T(s)).then(()=>{V.success(o("common.copySuccess"))}).catch(()=>{V.error(o("common.copyFailed"))})}}),_&&v&&t.createElement(z,{theme:"outline",size:"20",style:{cursor:"pointer"},fill:"var(--text-secondary)",onMouseDown:p=>{p.button===0&&(p.preventDefault(),W(!1))},title:o("common.collapse","Collapse")}))),t.createElement(re,{children:F,language:n,style:g,PreTag:"div",wrapLines:y,lineProps:y?p=>({style:{display:"block",...xe(O[p-1]||"",a==="dark")}}):void 0,customStyle:j,codeTagProps:{style:{color:"var(--text-primary)"}}}),_&&t.createElement("div",{style:{display:"flex",justifyContent:v?"flex-end":"center",alignItems:"center",backgroundColor:"var(--bg-2)",borderBottomLeftRadius:"0.3rem",borderBottomRightRadius:"0.3rem",padding:"4px 10px",borderTop:"1px solid var(--bg-3)",cursor:"pointer"},onMouseDown:p=>{p.button===0&&(p.preventDefault(),W(!v))}},v?t.createElement(z,{theme:"outline",size:"20",fill:"var(--text-secondary)",title:o("common.collapse","Collapse")}):t.createElement("span",{style:{color:"var(--text-secondary)",fontSize:"12px",lineHeight:"20px"}},o("common.viewMoreLines",{count:D-C})," ",t.createElement(be,{theme:"outline",size:"14",fill:"var(--text-secondary)"})))))}const ke=(e="light",o,i)=>{const a=document.createElement("style"),d=o?Object.entries(o).map(([s,c])=>`${s}: ${c};`).join(`
    `):"";return a.innerHTML=`
  /* Shadow DOM CSS variable definitions */
  :host {
    ${d}
  }

  * {
    line-height:26px;
    font-size:16px;
    color: inherit;
  }

  .markdown-shadow-body {
    word-break: break-word;
    overflow-wrap: anywhere;
    color: var(--text-primary);
    max-width: 100%;
  }
  .markdown-shadow-body>p:first-child
  {
    margin-top:0px;
  }
  h1,h2,h3,h4,h5,h6{
    margin-block-start:0px;
    margin-block-end:0px;
  }
  .markdown-shadow-body p {
    margin-block-start: 10px;
    margin-block-end: 10px;
  }
  a{
    color:${K.theme.Color.PrimaryColor};
    text-decoration: none;
    cursor: pointer;
    word-break: break-all;
    overflow-wrap: anywhere;
  }
  h1{
    font-size: 24px;
    line-height: 32px;
    font-weight: bold;
  }
  h2,h3,h4,h5,h6{
    font-size: 16px;
    line-height: 24px;
    font-weight: bold;
    margin-top: 8px;
    margin-bottom: 8px;
  }
  code span{
    font-size:13px;
    line-height:20px;
  }

  .markdown-shadow-body>p:last-child{
    margin-bottom:0px;
  }
  ol, ul {
    padding-inline-start:20px;
  }
  pre {
    max-width: 100%;
    overflow-x: auto;
    margin-block-start: 8px;
    margin-block-end: 8px;
  }
  img {
    max-width: 100%;
    height: auto;
  }
   /* Table border styles */
  table {
    border-collapse: collapse;
    th{
      padding: 8px;
      border: 1px solid var(--bg-3);
      background-color: var(--bg-1);
      font-weight: bold;
    }
    td{
        padding: 8px;
        border: 1px solid var(--bg-3);
        min-width: 120px;
    }
  }
  /* Inline code should wrap on small screens to avoid horizontal overflow */
  .markdown-shadow-body code {
    word-break: break-word;
    overflow-wrap: anywhere;
    max-width: 100%;
  }
  /* Allow KaTeX to use its own line-height for proper fraction/superscript rendering */
  .katex,
  .katex * {
    line-height: normal;
  }

  /* Display math: only scroll horizontally when formula exceeds container width */
  .katex-display {
    overflow-x: auto;
    overflow-y: hidden;
    padding: 0.5em 0;
  }

  .loading {
    animation: loading 1s linear infinite;
  }


  @keyframes loading {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }

  /* User Custom CSS (injected into Shadow DOM) */
  ${i||""}
  `,a};let x=null;const Ce=()=>{if(x)return x;try{const e=[...document.styleSheets].find(i=>i.href?.includes("katex")||i.ownerNode?.dataset?.katex);if(e){const i=[...e.cssRules].map(a=>a.cssText).join(`
`);return x=new CSSStyleSheet,x.replaceSync(i),x}const o=[...document.styleSheets];for(const i of o)try{const a=[...i.cssRules];if(a.some(s=>s.cssText.includes(".katex"))){const s=a.map(c=>c.cssText).join(`
`);return x=new CSSStyleSheet,x.replaceSync(s),x}}catch{continue}}catch(e){console.warn("Failed to create KaTeX stylesheet for Shadow DOM:",e)}return null},Ee=({children:e})=>{const[o,i]=h.useState(null),a=t.useRef(null),[d,s]=h.useState("");t.useEffect(()=>{se(async()=>{const{ConfigStorage:r}=await import("./index-wkPQcxQ3.js").then(u=>u.bv);return{ConfigStorage:r}},__vite__mapDeps([0,1,2,3,4,5,6]),import.meta.url).then(({ConfigStorage:r})=>{r.get("customCss").then(u=>{if(u){const f=I(u);s(f)}else s("")}).catch(u=>{console.error("Failed to load custom CSS:",u)})});const l=r=>{if(r.detail?.customCss!==void 0){const u=r.detail.customCss||"",f=I(u);s(f)}};return window.addEventListener("custom-css-updated",l),()=>{window.removeEventListener("custom-css-updated",l)}},[]);const c=t.useCallback(l=>{const r=getComputedStyle(document.documentElement),u=document.documentElement.getAttribute("data-theme")||"light",f={"--bg-1":r.getPropertyValue("--bg-1"),"--bg-2":r.getPropertyValue("--bg-2"),"--bg-3":r.getPropertyValue("--bg-3"),"--color-text-1":r.getPropertyValue("--color-text-1"),"--color-text-2":r.getPropertyValue("--color-text-2"),"--color-text-3":r.getPropertyValue("--color-text-3"),"--text-primary":r.getPropertyValue("--text-primary"),"--text-secondary":r.getPropertyValue("--text-secondary")};a.current&&a.current.remove();const m=ke(u,f,d);a.current=m,l.appendChild(m);const n=Ce();n&&!l.adoptedStyleSheets.includes(n)&&(l.adoptedStyleSheets=[...l.adoptedStyleSheets,n])},[d]);return t.useEffect(()=>{o&&c(o)},[o,d,c]),t.useEffect(()=>{if(!o)return;const l=new MutationObserver(()=>{c(o)});return l.observe(document.documentElement,{attributes:!0,attributeFilter:["data-theme","class"]}),()=>l.disconnect()},[o,c]),t.createElement("div",{ref:l=>{if(!l||l.__init__shadow)return;l.__init__shadow=!0;const r=l.attachShadow({mode:"open"});c(r),i(r)},className:"markdown-shadow",style:{width:"100%",flex:"1 1 auto",minWidth:0}},o&&q.createPortal(e,o))};/**
 * @license
 * Copyright 2025 AionUi (aionui.com)
 * SPDX-License-Identifier: Apache-2.0
 */const _e=e=>!(e.startsWith("http://")||e.startsWith("https://")||e.startsWith("data:")),Ie=({hiddenCodeCopyButton:e,codeStyle:o,className:i,onRef:a,allowHtml:d,children:s})=>{const{t:c}=B(),l=h.useMemo(()=>{if(typeof s=="string"){let m=s.replace(/file:\/\//g,"");return m=oe(m),m}return s},[s]),r=h.useCallback(m=>{m.preventDefault(),m.stopPropagation();const n=m.currentTarget.href;n&&X(n).catch(g=>{console.error(c("messages.openLinkFailed"),g)})},[c]),u=h.useMemo(()=>({span:({node:m,className:n,children:g,...y})=>t.createElement("span",{...y,className:n},g),code:m=>t.createElement(Se,{...m,codeStyle:o,hiddenCodeCopyButton:e}),a:({node:m,...n})=>t.createElement("a",{...n,target:"_blank",rel:"noreferrer",onClick:r}),table:({node:m,...n})=>t.createElement("div",{style:{overflowX:"auto",maxWidth:"100%"}},t.createElement("table",{...n,style:{...n.style,borderCollapse:"collapse",border:"1px solid var(--bg-3)",minWidth:"100%"}})),td:({node:m,...n})=>t.createElement("td",{...n,style:{...n.style,padding:"8px",border:"1px solid var(--bg-3)",minWidth:"120px"}}),img:({node:m,...n})=>{const g=n;if(_e(g.src||"")){const y=decodeURIComponent(g.src||"");return t.createElement(M,{src:y,alt:g.alt||"",className:g.className})}return t.createElement("img",{...g})}}),[o,e,r]),f=h.useMemo(()=>d?[le,N]:[N],[d]);return t.createElement("div",{className:H("relative w-full",i)},t.createElement(Ee,null,t.createElement("div",{ref:a,className:"markdown-shadow-body"},t.createElement(ie,{remarkPlugins:[ce,de,ue],rehypePlugins:f,components:u},l))))};export{M as L,Ie as M,me as c};
