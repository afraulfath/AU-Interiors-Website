document.addEventListener('DOMContentLoaded',()=>{
 const loader=document.getElementById('pageLoader'); setTimeout(()=>loader&&loader.classList.add('hide'),500);
 const header=document.getElementById('siteHeader'); const back=document.getElementById('backTop');
 const menu=document.getElementById('menuBtn'), nav=document.getElementById('mainNav');
 if(menu) menu.addEventListener('click',()=>nav.classList.toggle('open'));
 const path=location.pathname.split('/').pop()||'index.html'; document.querySelectorAll('.main-nav a').forEach(a=>{if(a.getAttribute('href')===path)a.classList.add('active')});
 window.addEventListener('scroll',()=>{header?.classList.toggle('scrolled',scrollY>20);back?.classList.toggle('show',scrollY>450)});
 back?.addEventListener('click',()=>scrollTo({top:0,behavior:'smooth'}));
 const observer=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('visible');observer.unobserve(e.target)}}),{threshold:.12}); document.querySelectorAll('.reveal').forEach(x=>observer.observe(x));
 document.querySelectorAll('[data-count]').forEach(el=>{let done=false; const io=new IntersectionObserver(es=>{if(es[0].isIntersecting&&!done){done=true;let target=+el.dataset.count,start=0,step=Math.max(1,Math.ceil(target/35));let t=setInterval(()=>{start=Math.min(target,start+step);el.textContent=start+(target===98?'%':'+');if(start>=target)clearInterval(t)},28);io.disconnect()}});io.observe(el)});
 const toast=(msg)=>{const t=document.getElementById('toast');if(!t)return;t.textContent=msg;t.classList.add('show');setTimeout(()=>t.classList.remove('show'),2200)};
 const saved=JSON.parse(localStorage.getItem('auSaved')||'[]');
 document.querySelectorAll('[data-save]').forEach(btn=>{const name=btn.dataset.save;if(saved.includes(name)){btn.parentElement.classList.add('saved');btn.textContent='♥'}btn.addEventListener('click',e=>{e.stopPropagation();let s=JSON.parse(localStorage.getItem('auSaved')||'[]');if(s.includes(name)){s=s.filter(x=>x!==name);btn.textContent='♡';btn.parentElement.classList.remove('saved');toast('Removed from saved projects')}else{s.push(name);btn.textContent='♥';btn.parentElement.classList.add('saved');toast('Project saved')};localStorage.setItem('auSaved',JSON.stringify(s));const d=document.getElementById('dashSaved');if(d)d.textContent=s.length+' projects'})});
 const filters=document.querySelectorAll('[data-filter]'), cards=document.querySelectorAll('.project-card2'); let activeFilter='all'; const applyProjectFilters=()=>{const q=(document.getElementById('projectSearch')?.value||'').toLowerCase().trim();cards.forEach(c=>{const matchFilter=activeFilter==='all'||c.dataset.category===activeFilter;const matchSearch=!q||(c.dataset.title||'').includes(q);c.style.display=matchFilter&&matchSearch?'block':'none'})}; filters.forEach(f=>f.addEventListener('click',()=>{filters.forEach(x=>x.classList.remove('active'));f.classList.add('active');activeFilter=f.dataset.filter;applyProjectFilters()}));
 const search=document.getElementById('projectSearch'); search?.addEventListener('input',applyProjectFilters);
 const modal=document.getElementById('projectModal'); document.querySelectorAll('.project-card2').forEach(card=>card.addEventListener('click',()=>{if(!modal)return;document.getElementById('modalTitle').textContent=card.dataset.title||'Project';document.getElementById('modalText').textContent='This project is ready for its final photography. Your image will be placed into this exact visual slot later.';modal.classList.add('open')})); document.getElementById('modalClose')?.addEventListener('click',()=>modal.classList.remove('open'));modal?.addEventListener('click',e=>{if(e.target===modal)modal.classList.remove('open')});
 document.querySelectorAll('[data-demo-form]').forEach(form=>form.addEventListener('submit',e=>{e.preventDefault();form.querySelector('.notice')?.classList.add('show');toast('Submitted successfully');setTimeout(()=>form.reset(),700)}));
 const area=document.getElementById('area'), areaValue=document.getElementById('areaValue'), est=document.getElementById('estimate'); const calc=()=>{if(!area||!est)return;areaValue.textContent=Number(area.value).toLocaleString()+' sq.ft';let base=Number(area.value)*Number(document.getElementById('level').value)*Number(document.getElementById('property').value);let add=[...document.querySelectorAll('.addon:checked')].reduce((a,x)=>a+Number(x.value),0);base*=1+add/100;est.textContent='₹'+(base/100000).toFixed(1)+'L'};area?.addEventListener('input',calc);document.getElementById('level')?.addEventListener('change',calc);document.getElementById('property')?.addEventListener('change',calc);document.querySelectorAll('.addon').forEach(x=>x.addEventListener('change',calc));document.getElementById('calcBtn')?.addEventListener('click',()=>{calc();toast('Estimate updated')});calc();
 const quote=document.getElementById('quote'),author=document.getElementById('author'),dots=document.querySelectorAll('[data-test]'); const testimonials=[['The team understood our vision before we could even put it into words. The result feels like home, only better.','— Ananya Rao · Residential Client'],['Every decision felt considered. The space now represents our brand beautifully and works better for our team.','— Rahul Mehta · Corporate Client'],['From the first moodboard to the final handover, the process felt premium, clear and genuinely collaborative.','— Sara Khan · Hospitality Client']]; dots.forEach(d=>d.addEventListener('click',()=>{const i=+d.dataset.test;if(quote){quote.textContent=testimonials[i][0];author.textContent=testimonials[i][1];dots.forEach(x=>x.classList.remove('active'));d.classList.add('active')}}));
 // AU Interiors hero slider — automatic 4-second slideshow
 const heroSlides=[...document.querySelectorAll('.hero-slide')];
 const heroDots=[...document.querySelectorAll('[data-hero-dot]')];
 const heroPrev=document.getElementById('heroPrev'), heroNext=document.getElementById('heroNext');
 const HERO_AUTOPLAY_MS=4000;
 if(heroSlides.length){
   let heroIndex=0, heroTimer=null;
   const startHeroAutoplay=()=>{
     clearInterval(heroTimer);
     heroTimer=setInterval(()=>showHero(heroIndex+1,false),HERO_AUTOPLAY_MS);
   };
   const showHero=(i,reset=true)=>{
     heroIndex=(i+heroSlides.length)%heroSlides.length;
     heroSlides.forEach((slide,n)=>slide.classList.toggle('active',n===heroIndex));
     heroDots.forEach((dot,n)=>dot.classList.toggle('active',n===heroIndex));
     if(reset) startHeroAutoplay();
   };
   heroPrev?.addEventListener('click',()=>showHero(heroIndex-1));
   heroNext?.addEventListener('click',()=>showHero(heroIndex+1));
   heroDots.forEach(dot=>dot.addEventListener('click',()=>showHero(Number(dot.dataset.heroDot))));

   // Start automatically when the page loads. It keeps rotating even without any user interaction.
   showHero(0,false);
   startHeroAutoplay();
 }

});