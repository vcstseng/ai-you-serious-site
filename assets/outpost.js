(()=>{
 const links=[...document.querySelectorAll('.cargo-list>a')];
 if(links.length!==10)return;
 const reader=document.querySelector('.file-reader'),title=document.querySelector('#file-title'),en=document.documentElement.lang==='en';
 const records=links.map((node,i)=>{const template=document.querySelector('#cargo-'+i).content;return{node,title:node.querySelector('h2').textContent,hook:node.querySelector('p').textContent,href:node.getAttribute('href'),category:template.querySelector('[data-category]').textContent,copy:template.querySelector('[data-copy]').textContent,source:template.querySelector('[data-source]').textContent}});
 let selected=0;
 function language(){document.querySelectorAll('.language-switch a').forEach(a=>{const u=new URL(a.href);u.hash=records[selected].node.id;a.href=u.href})}
 function select(index,byUser=false,focus=false){
  selected=index;const record=records[index];
  links.forEach((node,i)=>node.setAttribute('aria-current',String(i===index)));
  title.textContent=record.title;
  document.querySelector('#file-count').textContent=String(index+1).padStart(2,'0')+' / 10';
  document.querySelector('#file-category').textContent=record.category;
  document.querySelector('#file-hook').textContent=record.hook;
  document.querySelector('#file-copy').textContent=record.copy;
  document.querySelector('#file-source').textContent=record.source;
  document.querySelector('#read-file').href=record.href;
  if(byUser){const u=new URL(location.href);u.hash=record.node.id;history.replaceState(null,'',u.pathname+u.search+u.hash)}
  language();
  if(focus){reader.scrollIntoView({block:'start',behavior:'auto'});title.focus({preventScroll:true})}
 }
 links.forEach((node,i)=>{
  node.setAttribute('data-enhanced','');node.setAttribute('role','button');node.setAttribute('aria-controls','file-title');
  node.setAttribute('aria-label',String(i+1).padStart(2,'0')+' / '+records[i].title);
  node.addEventListener('click',event=>{event.preventDefault();select(i,true,matchMedia('(max-width:650px)').matches)});
  node.addEventListener('keydown',event=>{if(event.key===' '){event.preventDefault();select(i,true,true)}});
 });
 document.querySelector('#next-file').addEventListener('click',()=>select((selected+1)%10,true));
 function restore(){const index=records.findIndex(r=>'#'+r.node.id===location.hash);select(index>=0?index:0)}
 reader.hidden=false;restore();
 addEventListener('hashchange',()=>{if(location.hash.startsWith('#idea-'))restore()});
 // A return from L2 restores the corresponding file and brings its reader into view.
 if(location.hash.startsWith('#idea-')){
  const show=()=>requestAnimationFrame(()=>{reader.scrollIntoView({block:'start',behavior:'auto'});title.focus({preventScroll:true})});
  if(document.readyState==='complete')show();else addEventListener('load',show,{once:true});
 }
})();
