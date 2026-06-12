import{r as t,R as n,o as ae,u as ie,v as se,f as ce}from"./vendor-react-CX5SUctX.js";import{I as R}from"./index-wkPQcxQ3.js";/**
 * @license
 * Copyright 2025 AionUi (aionui.com)
 * SPDX-License-Identifier: Apache-2.0
 */const le=R(ae),de=R(ie),ue=R(ce),me=R(se),k=.75,O=1.5,pe=({url:f,id:he,showNavBar:E=!1,partition:F,className:j,style:J,onDidFinishLoad:T,onDidFailLoad:V})=>{const K=t.useRef(null),x=t.useRef(null),s=t.useRef(null),L=t.useRef(!1),[o,v]=t.useState(f),[C,m]=t.useState(f),[S,w]=t.useState(!0),[M,h]=t.useState(1),[B,Z]=t.useState(!1),b=t.useRef([]),p=t.useRef([]),[Y,_]=t.useState(!1),[P,y]=t.useState(!1),g=t.useCallback(e=>{try{const r=new URL(e),c=r.hostname.toLowerCase(),l=c==="127.0.0.1"||c==="localhost",d=["18791","18888","19000"].includes(r.port);return l&&d}catch{return!1}},[]),u=g(o);t.useEffect(()=>{b.current=[],p.current=[],_(!1),y(!1),v(f),m(f),w(!0),h(1),Z(!1),L.current=g(f)},[f]),t.useEffect(()=>{const e=s.current;if(!(!B||!e?.setZoomFactor))try{e.setZoomFactor(u?M:1)}catch{}},[u,M,B]);const W=t.useCallback(e=>{const r=s.current;!r||!e||e!==o&&(o&&b.current.push(o),p.current=[],v(e),m(e),_(b.current.length>0),y(!1),r.src=e)},[o]);t.useEffect(()=>{const e=s.current;if(!e)return;const r=()=>w(!0),c=()=>{w(!1)},l=()=>{e.executeJavaScript(`
        (function() {
          if (window.__webviewHostInjected) return;
          window.__webviewHostInjected = true;

          document.addEventListener('click', function(e) {
            let target = e.target;
            while (target && target.tagName !== 'A') {
              target = target.parentElement;
            }
            if (target && target.tagName === 'A') {
              const href = target.href;
              if (href && /^https?:/i.test(href)) {
                e.preventDefault();
                e.stopPropagation();
                window.postMessage({ type: '__WEBVIEW_HOST_NAVIGATE__', url: href }, '*');
              }
            }
          }, true);

          const originalOpen = window.open;
          window.open = function(url) {
            if (url && /^https?:/i.test(url)) {
              window.postMessage({ type: '__WEBVIEW_HOST_NAVIGATE__', url: url }, '*');
              return null;
            }
            return originalOpen.apply(this, arguments);
          };

          document.addEventListener('submit', function(e) {
            const form = e.target;
            if (form && form.action && /^https?:/i.test(form.action)) {
              e.preventDefault();
              window.postMessage({ type: '__WEBVIEW_HOST_NAVIGATE__', url: form.action }, '*');
            }
          }, true);
        })();
        true;
      `).catch(()=>{})},d=i=>{try{if(i.message.includes("__WEBVIEW_HOST_NAVIGATE__")){const a=i.message.match(/"url":"([^"]+)"/);a&&a[1]&&W(a[1]);return}if(i.message.includes("__AIONUI_WEBVIEW_ZOOM__")){const a=i.message.match(/"deltaY":(-?\d+(\.\d+)?)/);if(a&&a[1]){const N=Number(a[1])<0?.08:-.08;h(A=>{const oe=Number((A+N).toFixed(2));return Math.max(k,Math.min(O,oe))})}return}i.message.includes("__AIONUI_WEBVIEW_ZOOM_RESET__")&&h(1)}catch{}},I=i=>{const a=i.url;a&&a!==o&&(v(a),m(a))},U=()=>{Z(!0),l(),e.executeJavaScript(`
        (function() {
          let viewport = document.querySelector('meta[name="viewport"]');
          if (!viewport) {
            viewport = document.createElement('meta');
            viewport.name = 'viewport';
            viewport.content = 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no';
            document.head.appendChild(viewport);
          }
        })();
        true;
      `).catch(()=>{}),e.executeJavaScript(`
        window.addEventListener('message', function(e) {
          if (e.data && e.data.type === '__WEBVIEW_HOST_NAVIGATE__') {
            console.log('__WEBVIEW_HOST_NAVIGATE__', JSON.stringify(e.data));
          }
        });
        true;
      `).catch(()=>{}),g(o)&&e.executeJavaScript(`
          (function() {
            if (window.__aionuiZoomInjected) return true;
            window.__aionuiZoomInjected = true;
            window.addEventListener('wheel', function(e) {
              if (!(e.ctrlKey || e.metaKey)) return;
              e.preventDefault();
              console.log('__AIONUI_WEBVIEW_ZOOM__', JSON.stringify({ deltaY: e.deltaY }));
            }, { passive: false, capture: true });
            window.addEventListener('keydown', function(e) {
              if (!(e.ctrlKey || e.metaKey)) return;
              if (e.key === '0') {
                e.preventDefault();
                console.log('__AIONUI_WEBVIEW_ZOOM_RESET__');
              }
            }, { capture: true });
            return true;
          })();
          true;
        `).catch(()=>{}),g(o)&&L.current&&window.setTimeout(()=>{const i=s.current,a=x.current;!i||!a||i.executeJavaScript(`
            (() => {
              try {
                const stage = document.getElementById('main-stage');
                const body = document.body;
                const doc = document.documentElement;
                const width = Math.max(stage?.scrollWidth || 0, body?.scrollWidth || 0, doc?.scrollWidth || 0, window.innerWidth || 0);
                return { width };
              } catch (e) {
                return { width: window.innerWidth || 0 };
              }
            })();
          `).then(D=>{const N=Number(D?.width||0);if(!N)return;const A=Number((a.clientWidth/N).toFixed(2));h(Math.max(k,Math.min(O,A))),L.current=!1}).catch(()=>{})},120)},z=()=>{w(!1),T?.()},G=i=>{w(!1),V?.(i.errorCode,i.errorDescription)};return e.addEventListener("did-start-loading",r),e.addEventListener("did-stop-loading",c),e.addEventListener("dom-ready",U),e.addEventListener("did-navigate",I),e.addEventListener("did-navigate-in-page",I),e.addEventListener("console-message",d),e.addEventListener("did-finish-load",z),e.addEventListener("did-fail-load",G),()=>{e.removeEventListener("did-start-loading",r),e.removeEventListener("did-stop-loading",c),e.removeEventListener("dom-ready",U),e.removeEventListener("did-navigate",I),e.removeEventListener("did-navigate-in-page",I),e.removeEventListener("console-message",d),e.removeEventListener("did-finish-load",z),e.removeEventListener("did-fail-load",G)}},[W,o,T,V,g]),t.useEffect(()=>{const e=x.current,r=s.current;if(!e||!r)return;const c=()=>{const d=e.getBoundingClientRect();d.width>0&&d.height>0&&(r.style.width=`${d.width}px`,r.style.height=`${d.height}px`)};c();const l=new ResizeObserver(c);return l.observe(e),()=>l.disconnect()},[]);const $=t.useCallback(()=>{u&&h(1)},[u]),q=t.useCallback(()=>{const e=s.current,r=x.current;!u||!e||!r||e.executeJavaScript(`
      (() => {
        try {
          const stage = document.getElementById('main-stage');
          const body = document.body;
          const doc = document.documentElement;
          const width = Math.max(stage?.scrollWidth || 0, body?.scrollWidth || 0, doc?.scrollWidth || 0, window.innerWidth || 0);
          return { width };
        } catch (e) {
          return { width: window.innerWidth || 0 };
        }
      })();
    `).then(c=>{const l=Number(c?.width||0);if(!l)return;const d=Number((r.clientWidth/l).toFixed(2));h(Math.max(k,Math.min(O,d)))}).catch(()=>{})},[u]),X=t.useCallback(e=>{if(!u||!(e.ctrlKey||e.metaKey))return;e.preventDefault();const r=e.deltaY<0?.08:-.08;h(c=>{const l=Number((c+r).toFixed(2));return Math.max(k,Math.min(O,l))})},[u]),Q=t.useCallback(()=>{if(b.current.length===0)return;const e=b.current.pop();p.current.push(o),_(b.current.length>0),y(!0),v(e),m(e),s.current&&(s.current.src=e)},[o]),ee=t.useCallback(()=>{if(p.current.length===0)return;const e=p.current.pop();b.current.push(o),_(!0),y(p.current.length>0),v(e),m(e),s.current&&(s.current.src=e)},[o]),te=t.useCallback(()=>{s.current?.reload()},[]),re=t.useCallback(e=>{e.preventDefault();let r=C.trim();r&&(/^https?:\/\//i.test(r)||(r="https://"+r),W(r))},[C,W]),ne=t.useCallback(e=>{e.key==="Escape"&&(m(o),e.target.blur())},[o]),H={allowpopups:"false",webpreferences:"contextIsolation=no, nodeIntegration=no, nativeWindowOpen=no"};return F&&(H.partition=F),n.createElement("div",{ref:K,className:`h-full w-full flex flex-col ${j??""}`,style:J},E&&n.createElement("style",null,`
            .aion-url-viewer-toolbar {
              --viewer-border: var(--color-border-2);
              --viewer-border-hover: var(--color-border-3);
              --viewer-bg: var(--color-bg-3);
              --viewer-bg-hover: var(--color-fill-2);
              --viewer-text: var(--color-text-2);
              --viewer-text-muted: var(--color-text-3);
            }
            .aion-url-viewer-toolbar .toolbar-btn {
              -webkit-appearance: none;
              appearance: none;
              display: inline-flex;
              align-items: center;
              justify-content: center;
              height: 30px;
              min-width: 30px;
              padding: 0 10px;
              border-radius: 10px;
              border: 1px solid var(--viewer-border);
              background: var(--viewer-bg);
              color: var(--viewer-text);
              line-height: 1;
              font-size: 12px;
              transition: all 150ms ease;
              cursor: pointer;
            }
            .aion-url-viewer-toolbar .toolbar-btn.icon-btn {
              width: 30px;
              min-width: 30px;
              padding: 0;
            }
            .aion-url-viewer-toolbar .toolbar-btn:hover:not(:disabled) {
              background: var(--viewer-bg-hover);
              border-color: var(--viewer-border-hover);
            }
            .aion-url-viewer-toolbar .toolbar-btn:active:not(:disabled) {
              transform: translateY(0.5px);
            }
            .aion-url-viewer-toolbar .toolbar-btn:focus-visible {
              outline: none;
              border-color: rgb(var(--primary-6));
              box-shadow: 0 0 0 2px rgba(var(--primary-6), 0.12);
            }
            .aion-url-viewer-toolbar .toolbar-btn:disabled {
              opacity: 0.55;
              cursor: not-allowed;
              color: var(--viewer-text-muted);
              background: var(--color-bg-2);
            }
            .aion-url-viewer-toolbar .toolbar-chip {
              display: inline-flex;
              align-items: center;
              justify-content: center;
              height: 30px;
              min-width: 48px;
              padding: 0 10px;
              border-radius: 10px;
              border: 1px solid var(--viewer-border);
              background: var(--color-bg-2);
              color: var(--viewer-text-muted);
              font-size: 11px;
              line-height: 1;
            }
            .aion-url-viewer-toolbar .toolbar-input {
              -webkit-appearance: none;
              appearance: none;
              width: 100%;
              height: 30px;
              padding: 0 12px;
              border-radius: 10px;
              border: 1px solid var(--viewer-border);
              background: var(--viewer-bg);
              color: var(--color-text-1);
              font-size: 12px;
              line-height: 30px;
              transition: all 150ms ease;
            }
            .aion-url-viewer-toolbar .toolbar-input:hover {
              border-color: var(--viewer-border-hover);
            }
            .aion-url-viewer-toolbar .toolbar-input:focus {
              outline: none;
              border-color: rgb(var(--primary-6));
              box-shadow: 0 0 0 2px rgba(var(--primary-6), 0.12);
            }
          `),E&&n.createElement("div",{className:"aion-url-viewer-toolbar flex items-center gap-6px h-40px px-10px bg-bg-2 border-b border-border-1 flex-shrink-0"},n.createElement("button",{onClick:Q,disabled:!Y,className:"toolbar-btn icon-btn",title:"Back"},n.createElement(le,{theme:"outline",size:16})),n.createElement("button",{onClick:ee,disabled:!P,className:"toolbar-btn icon-btn",title:"Forward"},n.createElement(de,{theme:"outline",size:16})),n.createElement("button",{onClick:te,className:"toolbar-btn icon-btn",title:"Refresh"},S?n.createElement(me,{theme:"outline",size:16,className:"animate-spin"}):n.createElement(ue,{theme:"outline",size:16})),u&&n.createElement("div",{className:"flex items-center gap-6px ml-2px"},n.createElement("button",{onClick:$,className:"toolbar-btn",title:"Reset zoom"},"100%"),n.createElement("button",{onClick:q,className:"toolbar-btn",title:"Fit"},"Fit"),n.createElement("span",{className:"toolbar-chip"},Math.round(M*100),"%")),n.createElement("form",{onSubmit:re,className:"flex-1 ml-2px"},n.createElement("input",{type:"text",value:C,onChange:e=>m(e.target.value),onKeyDown:ne,onFocus:e=>e.target.select(),className:"toolbar-input",placeholder:"Enter URL..."}))),!E&&S&&n.createElement("div",{className:"absolute inset-0 flex items-center justify-center text-t-secondary text-14px z-10 pointer-events-none"},n.createElement("span",{className:"animate-pulse"},"Loading…")),n.createElement("div",{ref:x,className:"flex-1 overflow-hidden relative",style:{minHeight:0},onWheel:X},n.createElement("webview",{ref:s,src:o,className:"border-0 absolute left-0 top-0",style:{opacity:!E&&S?0:1,transition:"opacity 150ms ease-in"},...H})))};export{pe as W};
