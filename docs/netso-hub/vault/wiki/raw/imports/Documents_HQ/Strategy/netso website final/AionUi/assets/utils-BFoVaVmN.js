/**
 * @license
 * Copyright 2025 AionUi (aionui.com)
 * SPDX-License-Identifier: Apache-2.0
 */const e=(r=8)=>{try{const o=globalThis.crypto;if(o){if(typeof o.randomUUID=="function"&&r>=36)return o.randomUUID();if(typeof o.getRandomValues=="function"){const n=new Uint8Array(Math.ceil(r/2));return o.getRandomValues(n),Array.from(n,a=>a.toString(16).padStart(2,"0")).join("").slice(0,r)}}}catch{}const t=Date.now().toString(36);return(t+t).slice(0,r)},s=r=>{const t=r.toLowerCase();return t.startsWith("zh-tw")?"zh-TW":t.startsWith("zh")?"zh-CN":t.startsWith("ja")?"ja-JP":t.startsWith("ko")?"ko-KR":t.startsWith("tr")?"tr-TR":"en-US"};export{s as r,e as u};
