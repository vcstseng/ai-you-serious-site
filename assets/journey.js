/* Shared route/state contract. Edition scripts render; this file owns navigation. */
(()=>{
 const base=document.querySelector('meta[name="site-base"]')?.content||'';
 const english=document.documentElement.lang==='en';
 const edition=document.querySelector('meta[name="edition-number"]')?.content;
 const latest=document.querySelector('meta[name="latest-edition"]')?.content;
 const idea=document.body.dataset.ideaId;
 const callbacks=[];
 const key='aiys-navigation-v1';
 const clean=pathname=>pathname.startsWith(base+'/')?pathname.slice(base.length).replace(/^\/en(?=\/)/,''):null;
 const route=(path,lang=english)=>base+(lang?'/en':'')+path;
 let contexts={};
 try{contexts=JSON.parse(sessionStorage.getItem(key)||'{}')}catch{}
 function save(number,value){if(!/^\d{3}$/.test(number||''))return;contexts[number]=value;try{sessionStorage.setItem(key,JSON.stringify(contexts))}catch{}}
 function stateLinks(id,search=location.search){
  const current=new URL(location.href);
  current.search=search;
  if(id)current.hash=id;
  for(const a of document.querySelectorAll('.language-switch a')){const u=new URL(a.href);u.search=current.search;u.hash=current.hash;a.href=u.href}
  for(const a of document.querySelectorAll('.edition-route a')){
   if(edition&&clean(new URL(a.href).pathname)==='/editions/'+edition+'/'){const u=new URL(a.href);u.search=current.search;u.hash=current.hash;a.href=u.href}
  }
 }
 const api=window.AIYS={
  revealOnEntry(target,heading=target){
   if(!location.hash.startsWith('#idea-')||!target)return;
   const show=()=>requestAnimationFrame(()=>{target.scrollIntoView({block:'start',behavior:'auto'});if(heading){heading.setAttribute('tabindex','-1');heading.focus({preventScroll:true})}});
   if(document.readyState==='complete')show();else addEventListener('load',show,{once:true});
  },
  clearSelection(){const u=new URL(location.href);u.hash='';history.replaceState(null,'',u.pathname+u.search);stateLinks()},
  setSelection(id,parameters={},write=false){
   if(!/^idea-[a-z0-9-]+$/.test(id||''))return;
   const u=new URL(location.href);
   for(const [name,value] of Object.entries(parameters)){if(value===null)u.searchParams.delete(name);else u.searchParams.set(name,value)}
   if(write){u.hash=id;history.replaceState(null,'',u.pathname+u.search+u.hash)}
   stateLinks(id,u.search);
  },
  onRestore(callback){callbacks.push(callback)},
  restore(){for(const callback of callbacks)callback(new URL(location.href));stateLinks()},
 };
 addEventListener('hashchange',()=>{if(location.hash.startsWith('#idea-'))api.restore()});
 addEventListener('popstate',()=>api.restore());
 document.addEventListener('click',event=>{
  const a=event.target.closest('a[href]');if(!a)return;
  const u=new URL(a.href,location.href);if(u.origin!==location.origin)return;
  const target=clean(u.pathname);if(!target?.startsWith('/archive/ideas/'))return;
  const modified=event.metaKey||event.ctrlKey||event.shiftKey||event.altKey||event.button>0;
  if((a.getAttribute('role')==='button'||a.hasAttribute('data-open'))&&!modified)return;
  const path=clean(location.pathname);
  if(idea)return; // Moving between L2 pages retains the original entry context.
  const number=edition||a.dataset.edition;
  if(path==='/archive/')save(number,{type:'archive',path,search:location.search});
  else if(edition&&(path==='/'||path==='/editions/'+edition+'/')){
   const id=a.id.startsWith('idea-')?a.id:location.hash.slice(1);
   save(number,{type:'room',path,search:location.search,hash:id?'#'+id:'',idea:target.split('/').filter(Boolean).at(-1)});
  }
 },true);
 if(idea){
  const number=document.body.dataset.editionNumber;
  const entry=contexts[number];
  if(entry?.type==='room'&&(entry.path==='/'||entry.path==='/editions/'+number+'/')){
   const path=entry.path==='/'&&number!==latest?'/editions/'+number+'/':entry.path;
   const u=new URL(route(path),location.origin);
   u.search=entry.search||'';
   if(entry.idea!==idea)u.searchParams.delete('reveal');
   u.hash='idea-'+idea;
   document.querySelectorAll('.idea-return,.back-room').forEach(a=>a.href=u.href);
  }else if(entry?.type==='archive'&&entry.path==='/archive/'){
   const u=new URL(route('/archive/'),location.origin);u.search=entry.search||'';
   const a=document.createElement('a');a.className='source-return';a.href=u.href;
   a.textContent=english?'← Back to search results':'← 返回搜尋結果';
   document.querySelector('.idea-return')?.before(a);
  }
 }
 const switcher=document.querySelector('header .language-switch');
 if(switcher)for(const dialog of document.querySelectorAll('dialog')){
  const copy=switcher.cloneNode(true);copy.classList.add('dialog-language');
  (dialog.querySelector('.dialog-body')||dialog).append(copy);
 }
 stateLinks();
})();
