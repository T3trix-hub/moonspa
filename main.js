// тема: тёмная / светлая
(()=>{
  const root=document.documentElement;
  const btn=document.querySelector('.theme');
  if(btn){
    const sync=()=>btn.setAttribute('aria-label',root.dataset.theme==='dark'?'Включить светлую тему':'Включить тёмную тему');
    sync();
    btn.addEventListener('click',()=>{
      const next=root.dataset.theme==='dark'?'light':'dark';
      root.dataset.theme=next;
      try{localStorage.setItem('kosmo-theme',next)}catch(e){}
      sync();
    });
  }
})();
// меню
const b=document.querySelector('.burger'),n=document.querySelector('nav');
if(b){b.addEventListener('click',()=>{const o=n.classList.toggle('open');b.setAttribute('aria-expanded',o)})}
// полоска прокрутки
(()=>{const p=document.getElementById('progress');if(!p)return;
  const f=()=>{const h=document.documentElement;const m=h.scrollHeight-h.clientHeight;p.style.width=(m>0?h.scrollTop/m*100:0)+'%'};
  addEventListener('scroll',f,{passive:true});f()})();
const reduce=matchMedia('(prefers-reduced-motion: reduce)').matches;
// появление, счётчики, полосы
(()=>{
  document.querySelectorAll('.fill').forEach(f=>f.style.setProperty('--w',f.dataset.w+'%'));
  if(!('IntersectionObserver' in window)||reduce){document.querySelectorAll('.fill').forEach(f=>f.style.width=f.dataset.w+'%');return}
  const sel='main section:not(.hero) h2, main section:not(.hero) .lead, .tile, .stat, .prog, details, .photo, .note, .map, .cards>div, .bar-row, .quiz, .breath';
  const els=[...document.querySelectorAll(sel)].filter(e=>!e.closest('.hero'));
  const io=new IntersectionObserver(es=>es.forEach(en=>{
    if(!en.isIntersecting)return;const t=en.target;t.classList.add('in');io.unobserve(t);
    const fl=t.querySelector&&t.querySelector('.fill');if(fl)fl.style.width=fl.dataset.w+'%';
    const num=t.querySelector&&t.querySelector('[data-count]');if(num)count(num);
  }),{threshold:.12,rootMargin:'0px 0px -6% 0px'});
  els.forEach(e=>{e.classList.add('reveal');const s=[...e.parentElement.children].filter(c=>els.includes(c));const i=s.indexOf(e);if(i>0)e.style.transitionDelay=Math.min(i,4)*.1+'s';io.observe(e)});
  function count(el){const to=parseFloat(el.dataset.count),dec=(el.dataset.count.split('.')[1]||'').length,suf=el.dataset.suf||'';const t0=performance.now(),d=1400;
    const step=t=>{const k=Math.min((t-t0)/d,1),v=to*(1-Math.pow(1-k,3));el.textContent=v.toFixed(dec).replace('.',',')+suf;if(k<1)requestAnimationFrame(step)};requestAnimationFrame(step)}
})();
// фильтр меню
(()=>{const tabs=document.querySelectorAll('.tab');if(!tabs.length)return;
  tabs.forEach(t=>t.addEventListener('click',()=>{
    tabs.forEach(x=>x.setAttribute('aria-pressed',x===t));
    const c=t.dataset.cat;document.querySelectorAll('.mgroup').forEach(g=>g.classList.toggle('hide',c!=='all'&&g.dataset.cat!==c));
  }))})();
// просмотр фото в галерее
(()=>{const figs=document.querySelectorAll('.gal figure');if(!figs.length)return;
  const lb=document.createElement('div');lb.className='lb';lb.innerHTML='<img alt="">';document.body.appendChild(lb);const im=lb.querySelector('img');
  figs.forEach(f=>f.addEventListener('click',()=>{const s=f.querySelector('img');im.src=s.src;im.alt=s.alt;lb.classList.add('open')}));
  lb.addEventListener('click',()=>lb.classList.remove('open'));
  document.addEventListener('keydown',e=>{if(e.key==='Escape')lb.classList.remove('open')})})();


// дыхательная пауза
(()=>{const c=document.getElementById('bcircle'),t=document.getElementById('btext'),b=document.getElementById('bbtn');if(!c)return;
  let run=false,tm;
  function cycle(){if(!run)return;c.classList.add('in');t.textContent='Вдох';tm=setTimeout(()=>{if(!run)return;t.textContent='Пауза';tm=setTimeout(()=>{if(!run)return;c.classList.remove('in');t.textContent='Выдох';tm=setTimeout(cycle,4000)},1500)},4000)}
  b.addEventListener('click',()=>{run=!run;clearTimeout(tm);if(run){b.textContent='Остановить';cycle()}else{b.textContent='Начать';c.classList.remove('in');t.textContent=''}});
})();
// подбор программы
(()=>{const box=document.getElementById('quiz');if(!box)return;
  const TG='https://t.me/+375296556256',TEL='tel:+375296556256';
  const P={
   stress:{n:'Калифорнийский антистресс',d:'Спа-ритуал для расслабления и успокоения, разработан калифорнийскими психотерапевтами. Лёгкое воздействие на поверхностные мышцы помогает справиться с напряжением.',l:['Мягкие плавные движения','Глубокое расслабление'],pr:{60:100,90:130}},
   muscle:{n:'Шведский массаж',d:'Классика европейского спа. Динамичные приёмы помогают укрепить мышцы и суставы, улучшить кровообращение и лимфоток.',l:['Мышечная релаксация','Динамичные приёмы'],pr:{60:100,90:130}},
   energy:{n:'Балийский энергетический ритуал',d:'Возможность отключиться от суеты, погрузиться в мир чувственных наслаждений и вернуться к себе обновлённым и спокойным.',l:['Энергия и гармония','Ритуал для чувств'],pr:{60:100,90:130}},
   stone:{n:'Спа-ритуал тёплыми камнями',d:'Стоун-терапия: на тело воздействуют гладкие тёплые камни. Помогает максимально расслабиться, снимает напряжение, стресс и тревогу.',l:['Тёплые камни','Глубокий релакс'],price:120},
   pair:{n:'Спа-программа «Для двоих»',d:'Программа для двоих с парением в кедровой бочке и массажем.',l:['Парение в кедровой бочке с травами Алтая','Массаж тела на выбор, 60 мин','Head spa, 15 мин','Горячее полотенце на спину','Чаепитие'],price:345},
   girls:{n:'Спа-программа для двоих «Подружки»',d:'Массаж, уход за лицом и чаепитие для двоих.',l:['Массаж тела на выбор, 90 мин','Лимфодренажный массаж лица, 15 мин','Head spa, 15 мин','Тканевая маска для лица','Горячее полотенце на спину','Чаепитие'],price:355},
   detox:{n:'Спа-программа «Gold fito detox»',d:'Парение в кедровой бочке и спа-ритуал Gold.',l:['Парение в кедровой бочке с травами Алтая, 30 мин','Спа-ритуал Gold, 60 мин','Чаепитие'],price:180,time:'90 мин'},
   restore:{n:'Спа-программа «Восстановление»',d:'Длинный спа-ритуал и массаж головы и лица.',l:['Спа-ритуал Gold, 90 мин','Head spa, 15 мин','Чаепитие'],price:175}};
  const S={
   start:{q:'Что вам нужно сейчас?',o:[['Снять стресс','stress'],['Размять мышцы','muscle'],['Заряд энергии','energy'],['Тепло и глубокий релакс','stone'],['Побыть вдвоём','pair?'],['Полная перезагрузка','reset?']]},
   time:{q:'Сколько у вас времени?',o:[['Около часа',60],['Около полутора часов',90]]},
   pair:{q:'Что для вас важнее?',o:[['Кедровая бочка и массаж','pair'],['Массаж и уход за лицом','girls']]},
   reset:{q:'Каким должен быть день?',o:[['С парением в кедровой бочке','detox'],['С долгим ритуалом и head spa','restore']]}};
  let st=[];
  const esc=s=>s;
  function head(n){return `<div class="qstep">Шаг ${n}</div>`}
  function ask(key,n){const x=S[key];box.innerHTML=head(n)+`<h2>${x.q}</h2><div class="opts">`+x.o.map((o,i)=>`<button class="opt" data-i="${i}">${o[0]}</button>`).join('')+`</div>`+(n>1?'<button class="back" data-back>Назад</button>':'');
    box.querySelectorAll('.opt').forEach(b=>b.addEventListener('click',()=>pick(key,+b.dataset.i,n)));
    const bk=box.querySelector('[data-back]');if(bk)bk.addEventListener('click',()=>{st.pop();ask(st.length?st[st.length-1].next:'start',st.length+1)})}
  function pick(key,i,n){const v=S[key].o[i][1];
    if(key==='start'){if(['stress','muscle','energy'].includes(v)){st=[{next:'start',v}];st[0].next='start';ask2('time',2,v);return}
      if(v==='stone'){result('stone');return}
      if(v==='pair?'){ask('pair',2);return}
      if(v==='reset?'){ask('reset',2);return}}
    else result(v)}
  function ask2(key,n,topic){const x=S[key];box.innerHTML=head(n)+`<h2>${x.q}</h2><div class="opts">`+x.o.map((o,i)=>`<button class="opt" data-i="${i}">${o[0]}</button>`).join('')+`</div><button class="back" data-back>Назад</button>`;
    box.querySelectorAll('.opt').forEach(b=>b.addEventListener('click',()=>result(topic,x.o[+b.dataset.i][1])));
    box.querySelector('[data-back]').addEventListener('click',()=>ask('start',1))}
  function result(k,min){const p=P[k];const price=p.price||p.pr[min];const time=min?`${min} мин`:(p.time||'');
    box.innerHTML=`<div class="res"><div class="qstep">Ваша программа</div><h3>${p.n}</h3><div class="price">${price} Br${time?` <small style="font-size:1rem;font-family:var(--sans);color:var(--mute)">· ${time}</small>`:''}</div><p>${p.d}</p><ul>${p.l.map(x=>`<li>${x}</li>`).join('')}</ul><div class="row" style="margin-top:1.4rem"><a class="btn" href="${TG}">Записаться в Telegram</a><a class="btn ghost" href="${TEL}">Позвонить</a></div><button class="back" id="again">Пройти заново</button><p style="margin-top:1rem;font-size:.82rem;color:var(--mute)">Это подсказка. Окончательно программу подберёт специалист при записи.</p></div>`;
    box.querySelector('#again').addEventListener('click',()=>ask('start',1))}
  ask('start',1);
})();
