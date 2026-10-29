/* Edition 001 room. Data is generated from the confirmed selection at build time. */
const svg = (body,view='0 0 200 140') => `<svg class="art" viewBox="${view}" aria-hidden="true" fill="none" xmlns="http://www.w3.org/2000/svg">${body}</svg>`;
const doorway=svg(`<circle cx="143" cy="30" r="21" fill="#b7432f"/><path d="M32 130 61 24h72l25 106M52 130l18-91h52l16 91" stroke="#d5cdb7" stroke-width="1.2"/><path d="M77 130V52h36v78" fill="#d4c5a0"/><path d="m84 130 10-59h4l12 59" fill="#1e241e"/><path d="M0 130h195M22 137h158" stroke="#d5cdb7"/><circle cx="96" cy="75" r="5" fill="#1e241e"/>`);
const globe=svg(`<circle cx="100" cy="70" r="49" stroke="#34473b" stroke-width="1.5"/><ellipse cx="100" cy="70" rx="24" ry="49" stroke="#34473b"/><ellipse cx="100" cy="70" rx="49" ry="18" stroke="#34473b"/><path d="M51 70h98M100 21v98" stroke="#34473b"/><path d="M18 113Q101-2 177 21" stroke="#34473b" stroke-dasharray="3 4"/><circle cx="145" cy="38" r="7" fill="#b63827"/><path d="M161 100a22 22 0 1 1-21-32 19 19 0 0 0 21 32" fill="#eae5ce"/>`);
const bottles=svg(`<g stroke="#302a1d" stroke-width="1.6"><path d="M20 124V65l9-11V35h24v19l9 11v59z" fill="#e7d8b6"/><path d="M82 124V53l9-11V20h24v22l9 11v71z" fill="#b84b34"/><path d="M142 124V75l10-12V45h22v18l10 12v49z" fill="#a9b9a5"/><path d="M28 35h26M90 20h26M151 45h24" stroke-width="7"/><path d="M19 83h44v25H19M81 68h44v29H81M141 89h44v23h-44" fill="#eee4cb"/></g><g fill="#302a1d" font-family="monospace" font-size="12"><text x="33" y="100">01</text><text x="95" y="88">02</text><text x="155" y="105">03</text></g>`);
const vectors=svg(`<g stroke="#4d554a" stroke-width="1"><circle cx="100" cy="70" r="49"/><circle cx="100" cy="70" r="30"/><path d="M100 5v130M35 70h130M54 24l92 92M54 116l92-92"/><path d="m100 22 21 27 26 21-30 18-17 31-18-32-31-17 33-17z" fill="#b0bbae88"/></g><g fill="#b63827"><circle cx="100" cy="22" r="4"/><circle cx="147" cy="70" r="4"/><circle cx="100" cy="119" r="4"/><circle cx="51" cy="70" r="4"/></g><circle cx="100" cy="70" r="4" fill="#252a23"/>`);
const socks=svg(`<g stroke="#d4dfcf" opacity=".55"><ellipse cx="102" cy="78" rx="80" ry="29" transform="rotate(-28 102 78)"/><ellipse cx="102" cy="78" rx="80" ry="29" transform="rotate(35 102 78)"/><circle cx="102" cy="78" r="53" stroke-dasharray="2 6"/></g><path d="m81 25 38 8-13 63q-4 20-30 21L46 107q-11-10 0-20l31-13z" fill="#eae5cf" stroke="#2e4140" stroke-width="2"/><path d="m82 34 34 8M80 44l34 8M75 76l28 8" stroke="#b63827" stroke-width="5"/><path d="m48 86 20 10-3 15" stroke="#acae98" stroke-width="2"/><circle cx="161" cy="30" r="7" fill="#ccae64"/><path d="m30 45 4-8 4 8-4 8zM153 114l4-8 4 8-4 8z" fill="#dedcc2"/>`,'0 0 200 160');
const dishes=svg(`<g stroke="#334b42" stroke-width="2"><ellipse cx="98" cy="95" rx="62" ry="14"/><path d="M36 95v12q62 28 124 0V95M47 78q51 25 102 0M54 66q44 23 88 0"/><ellipse cx="98" cy="55" rx="41" ry="10"/><path d="m142 25 13 43M149 23l14 43M137 29l12 42"/></g>`);
const trash=svg(`<path d="M61 37h79l-8 91H70zM51 34h99M82 20h39l8 14M85 56l3 53M114 56l-3 53" stroke="#574758" stroke-width="5"/><path d="m72 7 9-8M139 10l11-7" stroke="#574758" stroke-width="3"/>`);
const presentations=[
 ['satan tape',`${doorway}`,`The Creator<br>of Satan`],
 ['goodnight',globe,'Goodnight,<br>world leaders.'],
 ['buff tape',bottles,'Buff Store'],
 ['anxiety',`<div class="years">1800<span>↓ 2025</span></div>`,'New tools.<br>Same old fear.'],
 ['gridwall',`<div class="ad-grid" aria-hidden="true">${'<i></i>'.repeat(16)}</div>`,'THIS SPACE<br>WILL DIE.'],
 ['vectors',vectors,'Eight ways to feel.'],
 ['sock tape',`<div class="photo">${socks}</div>`,'One sock.<br>Another universe.'],
 ['dishes',dishes,'The art of<br>not doing the dishes.'],
 ['office','', 'EMPLOYEE:<br>INVISIBLE'],
 ['trash',trash,'DIGITAL<br>WASTE.']
];
const escapeHTML=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const room=document.querySelector('#room');
const isEnglish=document.documentElement.lang==='en';
const localePrefix=isEnglish?'/en':'';
const siteBase=document.querySelector('meta[name=site-base]')?.content||'';
fetch(siteBase+localePrefix+'/assets/ideas.json').then(r=>{if(!r.ok)throw Error('Content unavailable');return r.json();}).then(ideas=>{
 room.innerHTML=ideas.map((idea,n)=>{
  const [classes,art,title]=presentations[n];
  const num=`<span class="num">NO. ${idea.number} / 001</span>`;
  const heading=`<h2 lang="en">${title}</h2>`;
  const zh=`<span class="zh">${escapeHTML(isEnglish?idea.short:idea.title)}</span>`;
  const middle=n===6?art+num+heading+zh:num+heading+(n===2?'<span class="buff-rule">PERSONALITY / ABILITY / COMPANY</span>':'')+art+zh;
  return `<a id="idea-${escapeHTML(idea.id)}" class="object ${classes}" href="${siteBase}${localePrefix}/archive/ideas/${encodeURIComponent(idea.id)}/" aria-label="${escapeHTML(idea.title)}${isEnglish?", read idea":"，閱讀想法"}">${middle}<span class="type">${escapeHTML(idea.kind)}</span><span class="arrow" aria-hidden="true">↗</span></a>`;
 }).join('');
 if(location.hash.startsWith('#idea-')&&(!document.activeElement||document.activeElement===document.body))document.getElementById(location.hash.slice(1))?.scrollIntoView({block:'center'});
}).catch(()=>{room.innerHTML=isEnglish?'<p>Unable to load ideas. Please refresh the page.</p>':'<p>內容暫時無法載入，請重新整理。</p>';});
