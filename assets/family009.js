(()=>{
 const en=document.documentElement.lang==='en';
 const say=r=>typeof r==='string'?r:(en?r.en:r.zh);
 const root=document.querySelector('.family-photo-scene');
 if(root){
  const slider=document.querySelector('[data-family-zoom]'),layer=root.querySelector('.photo-layer'),status=document.querySelector('[data-photo-status]');
  function zoom(value){slider.value=value;layer.style.setProperty('--photo-zoom',value);status.textContent=en?(value>1.6?'The elder is clear. Who is outside the frame?':'Everyone is in the frame. Can you still see the children?'):(value>1.6?'中央的長輩很清楚。畫面外還有誰？':'大家都進入畫面了。你還看得見孩子嗎？')}
  slider.addEventListener('input',()=>zoom(slider.value));
  root.addEventListener('focusin',e=>{if(e.target.closest('.photo-hotspot')&&e.target.matches(':focus-visible'))zoom(1)});
  function restore(){if(location.hash.startsWith('#idea-')){zoom(1);const a=document.getElementById(location.hash.slice(1));if(a)window.AIYS.revealOnEntry(a)}}
  window.AIYS.onRestore(restore);zoom(location.hash.startsWith('#idea-')?1:1.8);restore();
 }
 const section=document.querySelector('[data-family-interaction]');if(!section)return;
 const number=Number(section.dataset.familyInteraction),holder=section.querySelector('[data-records]'),items=holder?JSON.parse(holder.dataset.records):[];
 const status=section.querySelector('.interaction-status');let index=Number(holder?.dataset.start||0);
 function select(i){index=Math.max(0,Math.min(items.length-1,i));const r=items[index];if(status)status.textContent=say(r);section.querySelectorAll('[data-choice]').forEach(b=>b.setAttribute('aria-pressed',String(Number(b.dataset.choice)===index)));const count=section.querySelector('[data-time-count]');if(count)count.textContent=String(index+1).padStart(2,'0')+' / '+String(items.length).padStart(2,'0');section.querySelectorAll('[data-time]').forEach(b=>b.disabled=Number(b.dataset.time)<0?index===0:index===items.length-1);if(number===3){section.querySelector('.portrait-caption').textContent=String(r.year).padStart(3,'0');const photo=section.querySelector('.portrait-atlas img');photo.style.left=-(index%2)*100+'%';photo.style.top=-Math.floor(index/2)*100+'%'}if(number===7){section.querySelector('[data-diary-left]').textContent=say(r.left);section.querySelector('[data-diary-right]').textContent=say(r.right)}if(number===9){section.querySelector('.dining-table').dataset.step=index;section.querySelector('.head-speech').textContent=en?(index===4?'You do not understand yet.':'You will understand when you grow up.'):(index===4?'你現在還不懂。':'等你長大就懂了。')}}
 section.querySelectorAll('[data-choice]').forEach(b=>b.addEventListener('click',()=>select(Number(b.dataset.choice))));
 section.querySelectorAll('[data-time]').forEach(b=>b.addEventListener('click',()=>select(index+Number(b.dataset.time))));
 if(items.length)select(index);
 const transfers=[...section.querySelectorAll('.contract-ledger li')];let shown=2;transfers.forEach((li,i)=>li.hidden=i>=shown);section.querySelector('[data-more-transfers]')?.addEventListener('click',e=>{shown++;transfers.forEach((li,i)=>li.hidden=i>=shown);e.currentTarget.disabled=shown>=transfers.length});
 section.querySelector('[data-cancel]')?.addEventListener('click',()=>{const receipt=section.querySelector('.life-certificate');receipt.hidden=false;receipt.scrollIntoView({block:'nearest',behavior:'auto'})});
 const archiveButtons=[...section.querySelectorAll('[data-archive]')];
 function memoryStatus(){const count=archiveButtons.filter(b=>b.getAttribute('aria-pressed')==='true').length;status.textContent=en?(count+' of 4 memories archived. The spaces remain.'):(`已封存 ${count}／4 段記憶。空位仍然存在。`)}
 archiveButtons.forEach(b=>b.addEventListener('click',()=>{const archived=b.getAttribute('aria-pressed')!=='true';b.setAttribute('aria-pressed',String(archived));section.querySelector('[data-memory="'+b.dataset.archive+'"]').classList.toggle('archived',archived);memoryStatus()}));
 section.querySelector('[data-reset-memory]')?.addEventListener('click',()=>{archiveButtons.forEach(b=>b.setAttribute('aria-pressed','false'));section.querySelectorAll('.memory-trace').forEach(t=>t.classList.remove('archived'));memoryStatus()});
 const photoSlider=section.querySelector('[data-photo-zoom]');if(photoSlider){const img=section.querySelector('.photo-crop img');function photo(){img.style.transform='scale('+photoSlider.value+')';status.textContent=en?(photoSlider.value>1.8?'The elder is clear. The edges are outside the frame.':'The whole family is here. The youngest faces have become dots.'):(photoSlider.value>1.8?'長輩很清楚。邊緣的人還在畫面外。':'全家都到齊了。最年幼的臉變成了點。')}photoSlider.addEventListener('input',photo);photo()}
})();
