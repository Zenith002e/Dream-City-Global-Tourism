(function(){
  var calm=matchMedia('(prefers-reduced-motion: reduce)').matches;
  if(calm)document.querySelectorAll('animateMotion').forEach(function(a){a.remove()});
  var S=[].slice.call(document.querySelectorAll('.photo i')),D=document.querySelector('.dots'),C=document.querySelector('.cap'),t;
  if(S.length&&D&&C){
    S.forEach(function(_,i){var b=document.createElement('button');b.setAttribute('aria-label','Show photo '+(i+1));b.onclick=function(){go(i)};D.appendChild(b)});
    var hero=document.querySelector('.hero'),paused=false;
    hero.addEventListener('mouseenter',function(){paused=true});
    hero.addEventListener('mouseleave',function(){paused=false});
    function go(i){
      S.forEach(function(s,k){s.classList.toggle('on',k===i)});
      [].forEach.call(D.children,function(b,k){b.classList.remove('on');if(k===i){void b.offsetWidth;b.classList.add('on')}});
      C.textContent=S[i].dataset.cap||'';C.href=S[i].dataset.href||'tours.html';
      clearTimeout(t);
      if(!calm)t=setTimeout(function(){paused?go(i):go((i+1)%S.length)},6000);
    }
    go(0);
  }
  var P=document.querySelector('.posts');
  if(P){
    var n0=P.children.length,pos=0,hold=false,last=0,resume;
    function stop(){hold=true;clearTimeout(resume)}
    function go(){clearTimeout(resume);resume=setTimeout(function(){pos=P.scrollLeft;hold=false},1800)}
    if(!calm){
      for(var k=0;k<n0;k++){var cl=P.children[k].cloneNode(true);cl.setAttribute('aria-hidden','true');cl.tabIndex=-1;P.appendChild(cl)}
      var tick=function(ts){var dt=Math.min(ts-last,50);last=ts;
        if(!hold){pos+=dt*.05;var per=P.children[n0].offsetLeft-P.children[0].offsetLeft;if(pos>=per)pos-=per;P.scrollLeft=pos}
        requestAnimationFrame(tick)};
      requestAnimationFrame(function(ts){last=ts;tick(ts)});
      P.addEventListener('mouseenter',stop);P.addEventListener('mouseleave',go);
      P.addEventListener('touchstart',stop,{passive:true});P.addEventListener('touchend',go,{passive:true});
      P.addEventListener('wheel',function(){stop();go()},{passive:true});
    }
    document.querySelectorAll('.pnav button').forEach(function(b){b.onclick=function(){stop();P.scrollBy({left:+b.dataset.d*320,behavior:'smooth'});go()}});
  }
  if(!calm&&'IntersectionObserver' in window){
    var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}})},{threshold:.1});
    document.querySelectorAll('.tile,.pol,.cc,.map,fieldset,.sec-head,.about>div:last-child,.form,.contact dl>div,.tour-card,.day-box,.sidebar,.band>.wrap>*').forEach(function(e){
      var i=[].indexOf.call(e.parentNode.children,e);
      e.classList.add('rv');e.style.transitionDelay=Math.min(i,6)*70+'ms';io.observe(e);
    });
  }
})();
