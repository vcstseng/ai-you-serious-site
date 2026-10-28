(()=>{
 const links=[...document.querySelectorAll('.cargo-list>a')];if(links.length!==10)return;
 const reader=document.querySelector('.file-reader'),title=document.querySelector('#file-title');
 const paths=[
 '<path d="M12 50V14h22l10 6 10-6h22v36H54l-10 6-10-6ZM44 20v36M19 24h12m-12 8h12m23-8h15m-15 8h15"/>',
 '<path d="M14 25h51l-12-12m12 12L53 37M74 55H23l12-12M23 55l12 12"/><circle cx="16" cy="55" r="6"/><circle cx="72" cy="25" r="6"/>',
 '<path d="M44 66V36M44 49C18 49 16 25 16 25c27-2 28 15 28 24ZM44 39C44 17 69 13 69 13c2 20-10 26-25 26Z"/><path d="M20 68h48"/>',
 '<path d="M12 38h64c-2 23-17 25-32 25S14 61 12 38ZM10 68h68M27 29c-9-8 9-10 0-20m17 20c-9-8 9-10 0-20m17 20c-9-8 9-10 0-20"/>',
 '<path d="m14 26 30-15 30 15-30 15ZM14 26v32l30 16 30-16V26M44 41v33M29 19l31 15v14"/>',
 '<rect x="19" y="21" width="50" height="37" rx="4"/><path d="M44 21V9m-10 0h20M19 36H9v15h10m50-15h10v15H69M29 58v13m30-13v13M30 47h28"/><circle cx="32" cy="34" r="3"/><circle cx="56" cy="34" r="3"/>',
 '<path d="M19 10h46l9 9v53H14V10ZM27 10v24h34V10M25 72V48h38v24M51 17v11"/><path d="m66 44 4-4 4 4m-4-4v14"/>',
 '<path d="M16 68h56M21 60l4-18L58 9l14 14-33 33ZM25 42l14 14M52 15l14 14M21 60l18-4"/>',
 '<path d="M43 12 16 65m27-53 13 6-27 53M21 55l16 8"/><path d="M57 21c28 0 22 27 8 27S46 38 56 34s23 10 11 24-9 18-1 18"/>',
 '<path d="m13 32 62 0-8 29H21ZM19 47h50M34 32l-4 29m26-29 3 29M44 61v13M28 74h32"/><circle cx="44" cy="15" r="7"/><path d="M44 1v4M26 15h5m26 0h5M31 3l4 4m18 0 4-4"/>'
 ];
 const records=links.map((node,i)=>{const t=document.querySelector('#cargo-'+i).content;return{node,title:node.querySelector('h2').textContent,hook:node.querySelector('p').textContent,href:node.getAttribute('href'),category:t.querySelector('[data-category]').textContent,copy:t.querySelector('[data-copy]').textContent,source:t.querySelector('[data-source]').textContent}});
 let selected=-1;
 function select(index,write=false,focus=true){
  selected=index;const r=records[index];reader.hidden=false;
  links.forEach((n,i)=>{n.setAttribute('aria-current',String(i===index));n.dataset.selected=String(i===index)});
  title.textContent=r.title;
  document.querySelector('#file-count').textContent=String(index+1).padStart(2,'0')+' / 10';
  for(const [id,value] of [['file-category',r.category],['file-hook',r.hook],['file-copy',r.copy],['file-source',r.source]])document.getElementById(id).textContent=value;
  document.querySelector('#read-file').href=r.href;
  window.AIYS.setSelection(r.node.id,{},write);
  if(focus){reader.scrollIntoView({block:'start',behavior:'auto'});title.focus({preventScroll:true})}
 }
 records.forEach((r,i)=>{
  r.node.setAttribute('data-enhanced','');
  r.node.setAttribute('aria-label',String(i+1).padStart(2,'0')+' / '+r.title);
  const art=document.createElement('span');art.className='mission-art';art.setAttribute('aria-hidden','true');
  art.innerHTML=`<svg viewBox="0 0 88 82" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="square" stroke-linejoin="bevel">${paths[i]}</svg>`;
  r.node.prepend(art);
  const label=document.createElement('span');label.className='mission-category';label.textContent=r.category;r.node.append(label);
  
  
 });
 function close(){reader.hidden=true;links.forEach(n=>{n.setAttribute('aria-current','false');n.dataset.selected='false'});window.AIYS.clearSelection();if(selected>=0)links[selected].focus()}
 document.querySelector('#close-file').addEventListener('click',close);
 reader.addEventListener('keydown',e=>{if(e.key==='Escape'){e.preventDefault();close()}});
 document.querySelector('#next-file').addEventListener('click',()=>select((selected+1)%10,true));
 function restore(u){const index=records.findIndex(r=>'#'+r.node.id===u.hash);if(index>=0)select(index,false,true)}
 window.AIYS.onRestore(restore);
 if(location.hash.startsWith('#idea-')){
  restore(new URL(location.href));
  window.AIYS.revealOnEntry(reader,title);
 }
})();
