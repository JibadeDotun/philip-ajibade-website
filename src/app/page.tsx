'use client';

import { useEffect, useRef, useState } from 'react';

export default function Home() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const cursorRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const symRef = useRef<HTMLDivElement>(null);
  const [light, setLight] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [showScroll, setShowScroll] = useState(true);
  const mx = useRef(0), my = useRef(0);
  const rx = useRef(0), ry = useRef(0);

  const mathSymbols = ['∇','∫','∑','∂','φ','∞','∴','∵','π','λ','δ','∈','⊂','≡','∮'];

  useEffect(() => {
    const handleNavScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleNavScroll);
    handleNavScroll();
    return () => window.removeEventListener('scroll', handleNavScroll);
  }, []);

  useEffect(() => {
    const handleScrollHint = () => {
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      const docHeight = document.documentElement.scrollHeight;
      const distanceFromBottom = docHeight - scrollY - windowHeight;
      const pastHero = scrollY > windowHeight * 0.8;
      const nearBottom = distanceFromBottom < 300;
      setShowScroll(!pastHero && !nearBottom);
    };
    window.addEventListener('scroll', handleScrollHint);
    handleScrollHint();
    return () => window.removeEventListener('scroll', handleScrollHint);
  }, []);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      mx.current = e.clientX; my.current = e.clientY;
      if (cursorRef.current) { cursorRef.current.style.left = e.clientX + 'px'; cursorRef.current.style.top = e.clientY + 'px'; }
      if (symRef.current) { symRef.current.style.left = e.clientX + 'px'; symRef.current.style.top = e.clientY + 'px'; }
    };
    window.addEventListener('mousemove', onMove);
    let animId: number;
    const animRing = () => {
      rx.current += (mx.current - rx.current) * 0.12;
      ry.current += (my.current - ry.current) * 0.12;
      if (ringRef.current) { ringRef.current.style.left = rx.current + 'px'; ringRef.current.style.top = ry.current + 'px'; }
      animId = requestAnimationFrame(animRing);
    };
    animRing();
    return () => { window.removeEventListener('mousemove', onMove); cancelAnimationFrame(animId); };
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current; if (!canvas) return;
    const ctx = canvas.getContext('2d'); if (!ctx) return;
    const resize = () => { canvas.width = window.innerWidth; canvas.height = window.innerHeight; draw(); };
    const draw = () => {
      const W = canvas.width, H = canvas.height;
      ctx.clearRect(0, 0, W, H);
      ctx.fillStyle = light ? '#1a1a18' : '#f0ede6';
      ctx.font = '11px "DM Sans", monospace';
      ctx.textAlign = 'center';
      const exprs = ['∇f(x,y)=0','∫₀^∞e⁻ˣdx=1','φ=(1+√5)/2','eⁱᵖⁱ+1=0','∑ᵢ₌₁ⁿi=n(n+1)/2','d/dx[xⁿ]=nxⁿ⁻¹','P(A|B)=P(B|A)P(A)/P(B)','∂u/∂t=α∂²u/∂x²','lim sin(x)/x=1','det(A)≠0','∀ε>0∃δ>0','n!=n·(n-1)!','rank(M)=n','aᵀa=I','0,1,1,2,3,5,8,13...','x=(-b±√Δ)/2a','|z|²=zz̄','∮B·dA=0'];
      ctx.globalAlpha = 0.3;
      for (let x = 70; x < W; x += 70) for (let y = 70; y < H; y += 70) { ctx.beginPath(); ctx.arc(x, y, 0.9, 0, Math.PI * 2); ctx.fill(); }
      ctx.globalAlpha = 0.55;
      exprs.forEach((e, i) => {
        const fx = ((Math.sin(i * 2.4 + 7) * 0.5 + 0.5) * 0.86 + 0.07) * W;
        const fy = ((Math.cos(i * 1.8 + 3) * 0.5 + 0.5) * 0.86 + 0.07) * H;
        ctx.save(); ctx.translate(fx, fy); ctx.rotate(Math.sin(i * 1.1) * 0.1); ctx.fillText(e, 0, 0); ctx.restore();
      });
      ctx.globalAlpha = 1;
    };
    resize();
    window.addEventListener('resize', resize);
    return () => window.removeEventListener('resize', resize);
  }, [light]);

  const handleHoverEnter = (el: HTMLElement) => {
    el.dataset.hovered = 'true';
    document.body.classList.add('cursor-hover');
    if (symRef.current) symRef.current.style.opacity = '1';
    if (symRef.current) symRef.current.textContent = mathSymbols[Math.floor(Math.random() * mathSymbols.length)];
  };
  const handleHoverLeave = (el: HTMLElement) => {
    delete el.dataset.hovered;
    document.body.classList.remove('cursor-hover');
    if (symRef.current) symRef.current.style.opacity = '0';
  };

  const bg = light ? '#f5f3ee' : '#0c0c0b';
  const bg2 = light ? '#eceae5' : '#141413';
  const bg3 = light ? '#e2e0db' : '#1c1c1a';
  const border = light ? 'rgba(0,0,0,0.07)' : 'rgba(255,255,255,0.07)';
  const borderH = light ? 'rgba(0,0,0,0.18)' : 'rgba(255,255,255,0.16)';
  const text = light ? '#1a1a18' : '#f0ede6';
  const text2 = light ? '#6b6960' : '#9c9a90';
  const text3 = light ? '#b8b6ae' : '#3e3d38';
  const accent = light ? '#4a7200' : '#c8f565';
  const accentBg = light ? '#4a7200' : '#c8f565';
  const accentText = light ? '#f5f3ee' : '#0c0c0b';

  return (
    <>
      <style>{`
        *,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
        html{scroll-behavior:smooth}
        body{cursor:none;overflow-x:hidden;font-family:'DM Sans',sans-serif;font-weight:300;line-height:1.6}
        #cur{position:fixed;width:8px;height:8px;border-radius:50%;pointer-events:none;z-index:9999;transform:translate(-50%,-50%);mix-blend-mode:difference;transition:width .2s,height .2s}
        #ring{position:fixed;width:32px;height:32px;border-radius:50%;pointer-events:none;z-index:9998;transform:translate(-50%,-50%);transition:width .35s,height .35s,opacity .3s;opacity:0.4}
        #sym{position:fixed;font-family:'Playfair Display',serif;font-style:italic;font-size:12px;pointer-events:none;z-index:9997;transform:translate(14px,-18px);opacity:0;transition:opacity .25s;white-space:nowrap}
        @keyframes drop{0%{transform:scaleY(0);transform-origin:top}50%{transform:scaleY(1);transform-origin:top}51%{transform:scaleY(1);transform-origin:bottom}100%{transform:scaleY(0);transform-origin:bottom}}
        @keyframes pulse{0%,100%{box-shadow:0 0 0 2px rgba(200,245,101,0.15)}50%{box-shadow:0 0 0 6px rgba(200,245,101,0.04)}}
        @keyframes fadeUp{from{opacity:0;transform:translateY(20px)}to{opacity:1;transform:translateY(0)}}
        .anim-1{opacity:0;animation:fadeUp .8s .1s ease forwards}
        .anim-2{opacity:0;animation:fadeUp .8s .25s ease forwards}
        .anim-3{opacity:0;animation:fadeUp .8s .4s ease forwards}
        .anim-4{opacity:0;animation:fadeUp .8s .55s ease forwards}
        .anim-5{opacity:0;animation:fadeUp .8s .7s ease forwards}
        .anim-6{opacity:0;animation:fadeUp .8s .35s ease forwards}
        .anim-7{opacity:0;animation:fadeUp .8s .5s ease forwards}
        .anim-8{opacity:0;animation:fadeUp .8s .65s ease forwards}
        .anim-9{opacity:0;animation:fadeUp .8s 1.1s ease forwards}
        .reveal{opacity:0;transform:translateY(24px);transition:opacity .7s ease,transform .7s ease}
        .reveal.vis{opacity:1;transform:translateY(0)}
        @keyframes scrollDrop{0%{transform:scaleY(0);transform-origin:top}50%{transform:scaleY(1);transform-origin:top}51%{transform:scaleY(1);transform-origin:bottom}100%{transform:scaleY(0);transform-origin:bottom}}

        /* Responsive rules */
        .mobile-menu-overlay {display:none;position:fixed;inset:0;opacity:0;visibility:hidden;z-index:999;align-items:center;justify-content:center;transition:opacity .2s ease,visibility .2s ease;}
        .nav-inner {max-width:1400px;width:100%;margin:0 auto;display:flex;align-items:center;justify-content:space-between;gap:24;position:relative;}
        .page-inner {max-width:1400px;width:100%;margin:0 auto;position:relative;}

        @media (hover: none) {
          body{cursor:auto !important}
          #cur,#ring,#sym{display:none !important}
        }

        @media (max-width:767px) {
          .nav {padding: 16px 20px !important;}
          .nav-links {display:none !important;}
          .hamburger {display:block !important;}
          .theme-toggle {display:none !important;}
          .logo-wrapper {display:none !important;}
          .nav-actions {justify-content:flex-end;}
          .mobile-menu-overlay {display:flex !important;opacity:0;visibility:hidden;position:fixed;inset:0;background:rgba(0,0,0,0.95);z-index:999;align-items:center;justify-content:center;}
          .mobile-menu-overlay.open {opacity:1;visibility:visible;}
          .mobile-menu-close {display:block;cursor: none;}
          .hero {display:block !important;padding:90px 20px 0 20px !important;}
          .hero-left, .hero-right {padding: 0 !important;}
          .hero h1 {font-size:52px !important;}
          .services, .work, .about-strip {padding: 48px 20px !important;}
          .about-strip {display: none !important;}
          .services-grid {grid-template-columns:1fr !important;}
          .work-grid {grid-template-columns:1fr !important;}
          .work-grid > div {grid-column: span 12 !important;}
          .about-strip {grid-template-columns:1fr !important;}
          .about-strip a {display:inline-block !important;align-self:flex-start !important;padding:13px 26px !important;}
          footer {flex-direction:column !important;align-items:center !important;gap:16px !important;padding:24px 20px !important;text-align:center;}
          .nav-links a, .hamburger, .mobile-menu-overlay a, .nav button, footer a {font-size:1.1rem !important;}
          .hero .anim-9 {position:fixed !important;bottom:20px !important;left:50% !important;transform:translateX(-50%) !important;z-index:50 !important;}
          .footer-closing {font-size:clamp(36px,8vw,60px) !important;}
          .footer-bottom-row {grid-template-columns:1fr !important;gap:16px !important;}
          .footer-bottom-row > div {width:100% !important;}
          .footer-copyright {text-align:center !important;}
        }

        @media (min-width:768px) and (max-width:1024px) {
          .nav {padding: 16px 32px !important;}
          .nav-links {gap:16px !important;}
          .hero {padding:0 32px !important;}
          .hero h1 {font-size:60px !important;}
          .services, .work, .about-strip {padding: 64px 32px !important;}
          .services-grid {grid-template-columns:repeat(2,1fr) !important;}
          .work-grid {grid-template-columns:repeat(12,1fr) !important;}
          .work-grid > div:nth-child(1){grid-column:span 12 !important;}
          .work-grid > div:nth-child(2){grid-column:span 12 !important;}
          .work-grid > div:nth-child(3), .work-grid > div:nth-child(4), .work-grid > div:nth-child(5){grid-column:span 4 !important;}
          .about-strip {grid-template-columns:1fr 1fr !important;}
          .theme-toggle {display:block !important;}
          .hamburger {display:none !important;}
          .logo-wrapper {position:static;transform:none;}
        }
      `}</style>

      {/* Cursor */}
      <div id="cur" ref={cursorRef} style={{background:accent}}/>
      <div id="ring" ref={ringRef} style={{border:`1px solid ${accent}`}}/>
      <div id="sym" ref={symRef} style={{color:accent}}/>

      {/* Math background */}
      <canvas ref={canvasRef} style={{position:'fixed',inset:0,width:'100%',height:'100%',pointerEvents:'none',opacity:light?0.055:0.04,zIndex:0,transition:'opacity .4s'}}/>

      <div style={{background:bg,color:text,minHeight:'100vh',transition:'background .4s,color .4s',position:'relative'}}>

        {/* NAV */}
        <nav className="nav" style={{position:'fixed',top:0,left:0,right:0,zIndex:100,background:scrolled?(light?'rgba(245,243,238,0.9)':'rgba(12,12,11,0.88)'):'transparent',borderBottom:`1px solid ${scrolled?border:'transparent'}`,backdropFilter:scrolled?'blur(18px)':'none',transition:'all .3s'}}>
          <div className="nav-inner" style={{maxWidth:1400,width:'100%',margin:'0 auto',padding:'22px 20px',display:'flex',alignItems:'center',justifyContent:'space-between',gap:24,position:'relative'}}>
            <button className="hamburger" onClick={()=>setMenuOpen(o=>!o)} style={{border:'none',background:'transparent',color:text2,fontSize:22,cursor:'none',display:'none',order:1}} aria-label="Open menu">☰</button>
            <a className="logo-wrapper" href="#" style={{textDecoration:'none',color:'inherit',cursor:'none'}}>
            <img
              src="/logo.svg"
              height="36"
              alt="P.Ajibade"
              style={{
                height: 36,
                width: 'auto',
                display: 'block',
                transition: 'filter 0.2s ease',
                filter: light ? 'brightness(0)' : 'brightness(0) invert(1) opacity(0.7)'
              }}
              onMouseEnter={(e) => {
                if (!light) e.currentTarget.style.filter = 'brightness(0) invert(1)';
              }}
              onMouseLeave={(e) => {
                if (!light) e.currentTarget.style.filter = 'brightness(0) invert(1) opacity(0.7)';
              }}
            />
          </a>
          <div className="nav-links" style={{display:'flex',gap:36,order:3}}>
            {['Work','Photography','Blog','About'].map(l=>(
              <a key={l} href="#" onMouseEnter={e=>{handleHoverEnter(e.currentTarget); e.currentTarget.style.color = text;}} onMouseLeave={e=>{handleHoverLeave(e.currentTarget); e.currentTarget.style.color = text2;}} style={{fontSize:12,fontWeight:400,letterSpacing:'0.1em',textTransform:'uppercase',color:text2,textDecoration:'none',transition:'color 0.2s ease'}}>{l}</a>
            ))}
          </div>
          <div className="nav-actions" style={{display:'flex',alignItems:'center',gap:14,order:4}}>
            <button className="theme-toggle" onClick={()=>setLight(l=>!l)} onMouseEnter={e=>{handleHoverEnter(e.currentTarget); e.currentTarget.style.color = text;}} onMouseLeave={e=>{handleHoverLeave(e.currentTarget); e.currentTarget.style.color = text2;}} style={{width:34,height:34,borderRadius:'50%',background:'transparent',border:`1px solid ${border}`,cursor:'none',color:text2,fontSize:13,display:'flex',alignItems:'center',justifyContent:'center',transition:'border-color .2s,color .2s'}}>
              {light?'☾':'☀'}
            </button>
            <a href="#" onMouseEnter={e=>{handleHoverEnter(e.currentTarget); e.currentTarget.style.opacity = '0.85';}} onMouseLeave={e=>{handleHoverLeave(e.currentTarget); e.currentTarget.style.opacity = '1';}} style={{fontSize:11,fontWeight:500,letterSpacing:'0.12em',textTransform:'uppercase',color:bg,background:accentBg,padding:'9px 20px',borderRadius:2,textDecoration:'none',transition:'opacity 0.2s ease',cursor:'none'}}>
              Hire me
            </a>
          </div>
        </div>
        </nav>

        <div className={`mobile-menu-overlay ${menuOpen ? 'open' : ''}`}>
          <button className="mobile-menu-close" onClick={()=>setMenuOpen(false)} style={{position:'absolute',top:20,right:24,fontSize:24,border:'none',background:'transparent',color:text,cursor:'none'}}>✕</button>
          <button className="theme-toggle-mobile" onClick={()=>setLight(l=>!l)} style={{position:'absolute',top:20,left:24,fontSize:22,border:'none',background:'transparent',color:text,cursor:'none'}}>{light?'☾':'☀'}</button>
          <div style={{display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',height:'100%',gap:22}}>
            {['Work','Photography','Blog','About'].map(l => (
              <a key={l} href="#" onClick={()=>setMenuOpen(false)} style={{fontSize:24,fontWeight:700,color:text,textDecoration:'none',transition:'color .2s ease'}}>{l}</a>
            ))}
          </div>
        </div>

        {/* HERO */}
        <div className="page-inner" style={{maxWidth:1400,width:'100%',margin:'0 auto',position:'relative'}}>
          <section className="hero" style={{minHeight:'100vh',display:'grid',gridTemplateColumns:'1fr 1fr',position:'relative',padding:'0 48px',overflow:'hidden'}}>
          <div className="hero-left" style={{display:'flex',flexDirection:'column',justifyContent:'center',padding:'120px 64px 100px 0',position:'relative',zIndex:1}}>
            <p className="anim-1" style={{fontSize:10,fontWeight:500,letterSpacing:'0.2em',textTransform:'uppercase',color:accent,display:'flex',alignItems:'center',gap:12,marginBottom:28}}>
              <span style={{fontFamily:"'Playfair Display',serif",fontStyle:'italic',fontSize:14}}>∴</span>
              Available for work
            </p>
            <h1 className="anim-2" style={{fontFamily:"'Playfair Display',serif",fontSize:'clamp(50px,5.8vw,80px)',fontWeight:900,lineHeight:0.9,letterSpacing:'-0.03em'}}>
              <span style={{color:text}}>Philip</span><br/>
              <em style={{fontStyle:'italic',fontWeight:400,color:text2}}>Ajibade</em>
            </h1>
            <div className="anim-3" style={{display:'flex',alignItems:'center',margin:'24px 0'}}>
              <div style={{height:1,flex:1,background:`linear-gradient(90deg,${accent},transparent)`}}/>
              <span style={{fontFamily:"'Playfair Display',serif",fontSize:12,fontStyle:'italic',color:text3,padding:'0 14px',whiteSpace:'nowrap'}}>design(complexity) → clarity</span>
              <div style={{height:1,flex:1,background:`linear-gradient(270deg,${accent},transparent)`}}/>
            </div>
            <p className="anim-4" style={{fontSize:15,fontWeight:300,color:text2,lineHeight:1.8,maxWidth:380}}>
              Working at the intersection of <strong style={{color:text,fontWeight:400}}>mathematical rigour</strong> and design intuition — turning complex data, research, and strategy into experiences that are precise and beautiful.
            </p>
            <div className="anim-5" style={{display:'flex',alignItems:'center',gap:22,marginTop:36}}>
              <a href="#" onMouseEnter={e=>handleHoverEnter(e.currentTarget)} onMouseLeave={e=>handleHoverLeave(e.currentTarget)} style={{fontSize:11,fontWeight:500,letterSpacing:'0.12em',textTransform:'uppercase',color:accentText,background:accentBg,padding:'13px 26px',borderRadius:2,textDecoration:'none'}}>View work</a>
              <a href="#" onMouseEnter={e=>handleHoverEnter(e.currentTarget)} onMouseLeave={e=>handleHoverLeave(e.currentTarget)} style={{fontSize:11,fontWeight:400,letterSpacing:'0.1em',textTransform:'uppercase',color:text2,textDecoration:'none',display:'flex',alignItems:'center',gap:8}}>
                Get in touch
                <svg width="13" height="13" fill="none" viewBox="0 0 13 13"><path d="M1.5 6.5h10M8 2.5l4 4-4 4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </a>
            </div>
          </div>

          <div className="hero-right" style={{display:'flex',flexDirection:'column',justifyContent:'center',padding:'120px 0 100px 64px',position:'relative',zIndex:1,gap:16}}>
            <p className="anim-6" style={{fontSize:10,fontWeight:500,letterSpacing:'0.16em',textTransform:'uppercase',color:text3}}>Featured projects</p>
            {[
              {title:'Financial Onboarding',meta:'Tier-1 · USSD + React Native',tag:'UX · Fintech',fill:light?'linear-gradient(135deg,#c0d4e8,#90b8d8)':'linear-gradient(135deg,#0d1e30,#1a3a55)'},
              {title:'Policy Infographic Suite',meta:'Communication design',tag:'Data · Policy',fill:light?'linear-gradient(135deg,#d8c0e8,#b890d8)':'linear-gradient(135deg,#1e1228,#3a1f50)'},
            ].map((p,i)=>(
              <a key={i} href="#" className={i===0?'anim-7':'anim-8'} onMouseEnter={e=>handleHoverEnter(e.currentTarget)} onMouseLeave={e=>handleHoverLeave(e.currentTarget)}
                style={{border:`1px solid ${border}`,borderRadius:4,overflow:'hidden',textDecoration:'none',display:'block',transition:'border-color .3s,transform .35s'}}>
                <div style={{height:160,position:'relative',overflow:'hidden'}}>
                  <div style={{width:'100%',height:'100%',background:p.fill,transition:'transform .5s'}}/>
                  <div style={{position:'absolute',inset:0,opacity:.1,backgroundImage:`linear-gradient(rgba(200,245,101,.4) 1px,transparent 1px),linear-gradient(90deg,rgba(200,245,101,.4) 1px,transparent 1px)`,backgroundSize:'32px 32px'}}/>
                  <span style={{position:'absolute',bottom:10,left:10,fontSize:9,fontWeight:500,letterSpacing:'0.12em',textTransform:'uppercase',color:light?'rgba(74,114,0,0.8)':'rgba(200,245,101,0.7)',background:light?'rgba(255,255,255,0.5)':'rgba(0,0,0,0.35)',padding:'3px 7px',borderRadius:2}}>{p.tag}</span>
                </div>
                <div style={{padding:'14px 18px',background:bg2,display:'flex',alignItems:'center',justifyContent:'space-between'}}>
                  <div>
                    <div style={{fontFamily:"'Playfair Display',serif",fontSize:15,fontWeight:700,color:text}}>{p.title}</div>
                    <div style={{fontSize:11,color:text3,marginTop:2,letterSpacing:'0.04em'}}>{p.meta}</div>
                  </div>
                  <svg width="16" height="16" fill="none" viewBox="0 0 16 16" style={{color:accent,opacity:.6}}><path d="M3 13L13 3M13 3H6M13 3v7" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </div>
              </a>
            ))}
          </div>

          {/* Horizontal divider */}
          <div style={{position:'absolute',bottom:72,left:0,right:0,height:1,background:border}}/>
          {/* Scroll hint */}
          <div className="anim-9" style={{opacity: showScroll ? 1 : 0, transition: 'opacity 0.4s ease', pointerEvents: 'none', position: 'fixed', bottom: '20px', left: '50%', transform: 'translateX(-50%)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px', zIndex: 50}}>
            <div style={{width:1,height:28,background:`linear-gradient(to bottom,${accent},transparent)`,animation:'scrollDrop 2s ease-in-out infinite'}}/>
            <span style={{fontSize:9,letterSpacing:'0.2em',textTransform:'uppercase',color:text3}}>Scroll</span>
          </div>
        </section>

        {/* SERVICES */}
        <RevealSection>
          <section className="services" style={{padding:'96px 48px',position:'relative',zIndex:1}}>
            <div style={{display:'flex',alignItems:'flex-end',justifyContent:'space-between',paddingBottom:24,borderBottom:`1px solid ${border}`,marginBottom:56}}>
              <div>
                <p style={{fontSize:10,fontWeight:500,letterSpacing:'0.18em',textTransform:'uppercase',color:accent,marginBottom:10}}>∑ What I do</p>
                <h2 style={{fontFamily:"'Playfair Display',serif",fontSize:'clamp(30px,3.8vw,48px)',fontWeight:700,letterSpacing:'-.02em',lineHeight:1.1,color:text}}>
                  Services <em style={{fontStyle:'italic',fontWeight:400,color:text2}}>& capabilities</em>
                </h2>
              </div>
              <a href="#" onMouseEnter={e=>handleHoverEnter(e.currentTarget)} onMouseLeave={e=>handleHoverLeave(e.currentTarget)} style={{fontSize:11,fontWeight:400,letterSpacing:'0.1em',textTransform:'uppercase',color:text2,textDecoration:'none',display:'flex',alignItems:'center',gap:8,whiteSpace:'nowrap'}}>
                Work with me <svg width="13" height="13" fill="none" viewBox="0 0 13 13"><path d="M1.5 6.5h10M8 2.5l4 4-4 4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </a>
            </div>
            <div className="services-grid" style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:1,background:border,border:`1px solid ${border}`}}>
              {[
                {n:'x₁',title:'Interaction & UX Design',desc:'End-to-end product design — from research and service blueprints through to polished interfaces and design systems.',tags:['Service design','UI/UX','Prototyping']},
                {n:'x₂',title:'Data & Visual Communication',desc:'Translating complex data, research, and policy into infographics, dashboards, and reports people actually understand.',tags:['Infographics','Dashboards','Reports']},
                {n:'x₃',title:'Presentation & Brand',desc:'Investor decks, pitch presentations, and brand communication designed to land the room every time.',tags:['Pitch decks','Brand identity','Advertising']},
              ].map((s,i)=>(
                <div key={i} onMouseEnter={e=>handleHoverEnter(e.currentTarget)} onMouseLeave={e=>handleHoverLeave(e.currentTarget)}
                  style={{background:bg,padding:'36px 32px',position:'relative',overflow:'hidden',transition:'background .25s',cursor:'none'}}
                  onMouseOver={e=>{(e.currentTarget as HTMLElement).style.background=bg3}}
                  onMouseOut={e=>{(e.currentTarget as HTMLElement).style.background=bg}}>
                  <span style={{fontFamily:"'Playfair Display',serif",fontSize:11,fontStyle:'italic',color:text3,marginBottom:20,display:'block'}}>{s.n}</span>
                  <div style={{fontFamily:"'Playfair Display',serif",fontSize:20,fontWeight:700,color:text,letterSpacing:'-.01em',lineHeight:1.2,marginBottom:12}}>{s.title}</div>
                  <p style={{fontSize:13,fontWeight:300,color:text2,lineHeight:1.75}}>{s.desc}</p>
                  <div style={{display:'flex',flexWrap:'wrap',gap:6,marginTop:20}}>
                    {s.tags.map(t=>(
                      <span key={t} style={{fontSize:10,fontWeight:400,letterSpacing:'0.08em',textTransform:'uppercase',color:text3,border:`1px solid ${border}`,padding:'4px 10px',borderRadius:2}}>{t}</span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>
        </RevealSection>

        {/* WORK */}
        <RevealSection>
          <section className="work" style={{padding:'0 48px 96px',position:'relative',zIndex:1}}>
            <div style={{display:'flex',alignItems:'flex-end',justifyContent:'space-between',paddingBottom:24,borderBottom:`1px solid ${border}`,marginBottom:56}}>
              <div>
                <p style={{fontSize:10,fontWeight:500,letterSpacing:'0.18em',textTransform:'uppercase',color:accent,marginBottom:10}}>∫ Selected work</p>
                <h2 style={{fontFamily:"'Playfair Display',serif",fontSize:'clamp(30px,3.8vw,48px)',fontWeight:700,letterSpacing:'-.02em',lineHeight:1.1,color:text}}>
                  Projects that <em style={{fontStyle:'italic',fontWeight:400,color:text2}}>matter</em>
                </h2>
              </div>
              <a href="#" onMouseEnter={e=>handleHoverEnter(e.currentTarget)} onMouseLeave={e=>handleHoverLeave(e.currentTarget)} style={{fontSize:11,fontWeight:400,letterSpacing:'0.1em',textTransform:'uppercase',color:text2,textDecoration:'none',display:'flex',alignItems:'center',gap:8,whiteSpace:'nowrap'}}>
                All work <svg width="13" height="13" fill="none" viewBox="0 0 13 13"><path d="M1.5 6.5h10M8 2.5l4 4-4 4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </a>
            </div>
            <div className="work-grid" style={{display:'grid',gridTemplateColumns:'repeat(12,1fr)',gap:1,background:border,border:`1px solid ${border}`}}>
              {[
                {span:7,fill:light?'linear-gradient(150deg,#b8d0e4,#8ab4d0)':'linear-gradient(150deg,#0d1e30,#1a3a55)',tag:'Interaction design',name:'Express Tier-1 Onboarding',desc:'Hybrid USSD + mobile onboarding for unbanked users. Zero regulatory penalties across 12 months.',ratio:'4/3'},
                {span:5,fill:light?'linear-gradient(150deg,#d0b8e4,#b48ad0)':'linear-gradient(150deg,#1e1228,#3a1f50)',tag:'Data visualisation',name:'Policy Communication',desc:'Research to infographic — complex policy made accessible.',ratio:'16/9'},
                {span:4,fill:light?'linear-gradient(150deg,#b8e0cc,#8ad0b0)':'linear-gradient(150deg,#0d2218,#1a4a2e)',tag:'Dashboard',name:'Analytics Platform',desc:'',ratio:'16/9'},
                {span:4,fill:light?'linear-gradient(150deg,#e0e0b8,#d0d08a)':'linear-gradient(150deg,#1e1c0d,#3a381a)',tag:'Presentation',name:'Investor Deck',desc:'',ratio:'16/9'},
                {span:4,fill:light?'linear-gradient(150deg,#e0b8b8,#d08a8a)':'linear-gradient(150deg,#1e0d0d,#4a1a1a)',tag:'Photography',name:'Editorial Series',desc:'',ratio:'16/9'},
              ].map((w,i)=>(
                <div key={i} onMouseEnter={e=>handleHoverEnter(e.currentTarget)} onMouseLeave={e=>handleHoverLeave(e.currentTarget)}
                  style={{gridColumn:`span ${w.span}`,background:bg,overflow:'visible',cursor:'none',transition:'background .25s'}}
                  onMouseOver={e=>{(e.currentTarget as HTMLElement).style.background=bg3}}
                  onMouseOut={e=>{(e.currentTarget as HTMLElement).style.background=bg}}>
                  <div style={{width:'100%',overflow:'hidden',height: w.span===7 ? 400 : w.span===5 ? 300 : 220}}>
                    <div style={{width:'100%',height:'100%',background:w.fill,transition:'transform .5s'}}/>
                  </div>
                  <div style={{padding:'18px 22px'}}>
                    <span style={{fontSize:10,fontWeight:500,letterSpacing:'0.12em',textTransform:'uppercase',color:accent,marginBottom:6,display:'block'}}>{w.tag}</span>
                    <div style={{fontFamily:"'Playfair Display',serif",fontSize:w.span===7?22:18,fontWeight:700,color:text,letterSpacing:'-.01em',lineHeight:1.2}}>{w.name}</div>
                    {w.desc&&<p style={{fontSize:12,color:text2,marginTop:5,lineHeight:1.6}}>{w.desc}</p>}
                  </div>
                </div>
              ))}
            </div>
          </section>
        </RevealSection>

        {/* ABOUT */}
        <RevealSection>
          <div className="about-strip" style={{display:'grid',gridTemplateColumns:'1fr 1fr',borderTop:`1px solid ${border}`,position:'relative',zIndex:1,margin:'0 48px'}}>
            <div style={{padding:'80px 64px 80px 0',borderRight:`1px solid ${border}`}}>
              <h2 style={{fontFamily:"'Playfair Display',serif",fontSize:'clamp(26px,3.2vw,42px)',fontWeight:700,letterSpacing:'-.02em',lineHeight:1.15,color:text}}>
                A designer who thinks <em style={{fontStyle:'italic',fontWeight:400,color:text2}}>in systems,</em> built on mathematics
              </h2>
              <p style={{fontSize:14,fontWeight:300,color:text2,lineHeight:1.85,marginTop:22}}>
                With a <strong style={{color:text,fontWeight:400}}>BSc in Mathematics</strong> and over eight years spanning interaction design, data visualisation, advertising, and UI/UX — I bring rigour to creative work and warmth to analytical problems.
              </p>
              <p style={{fontSize:14,fontWeight:300,color:text2,lineHeight:1.85,marginTop:14}}>
                Based between <strong style={{color:text,fontWeight:400}}>Nigeria and the UK</strong>. Currently open to senior design roles and consulting engagements.
              </p>
              <div style={{display:'flex',flexWrap:'wrap',gap:7,marginTop:28}}>
                {['Interaction design','Data viz','Service design','Infographics','Photography','Presentation design'].map(s=>(
                  <span key={s} onMouseEnter={e=>handleHoverEnter(e.currentTarget)} onMouseLeave={e=>handleHoverLeave(e.currentTarget)}
                    style={{fontSize:10,fontWeight:400,letterSpacing:'0.08em',textTransform:'uppercase',color:text2,border:`1px solid ${border}`,padding:'5px 12px',borderRadius:2,transition:'border-color .2s,color .2s',cursor:'none'}}>{s}</span>
                ))}
              </div>
            </div>
            <div style={{padding:'80px 0 80px 64px',display:'flex',flexDirection:'column',justifyContent:'space-between'}}>
              <div>
                <div style={{fontSize:11,letterSpacing:'0.1em',textTransform:'uppercase',color:text3,display:'flex',alignItems:'center',gap:10,marginBottom:24}}>
                  <span style={{width:7,height:7,borderRadius:'50%',background:accent,display:'inline-block'}}/>
                  Open to new work
                </div>
                <blockquote style={{fontFamily:"'Playfair Display',serif",fontSize:19,fontStyle:'italic',fontWeight:400,color:text,lineHeight:1.55,borderLeft:`2px solid ${accent}`,paddingLeft:22}}>
                  "The best design work happens where mathematics meets meaning — where rigour gives beauty its structure."
                </blockquote>
              </div>
              <a href="#" onMouseEnter={e=>handleHoverEnter(e.currentTarget)} onMouseLeave={e=>handleHoverLeave(e.currentTarget)}
                style={{fontSize:11,fontWeight:500,letterSpacing:'0.12em',textTransform:'uppercase',color:accentText,background:accentBg,padding:'13px 26px',borderRadius:2,textDecoration:'none',display:'inline-block',marginTop:36,alignSelf:'flex-start'}}>
                Read full story
              </a>
            </div>
          </div>
        </RevealSection>

        {/* FOOTER */}
        <RevealSection>
          <footer style={{borderTop:`1px solid ${border}`,padding:'80px 48px 40px',position:'relative',zIndex:1}}>
            <div className="footer-bottom-row" style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:28,alignItems:'start'}}>
              <div>
                <div style={{fontFamily:"'Playfair Display',serif",fontSize:14,fontWeight:700,color:text}}>Philip Ajibade</div>
                <div style={{fontSize:11,color:text2,marginTop:4}}>Designer & Mathematician</div>
              </div>
              <div style={{display:'flex',flexDirection:'column',gap:10}}>
                <div>
                  <div style={{fontSize:10,color:text3,letterSpacing:'0.05em'}}>Say hi</div>
                  <a href="mailto:hello@philipajibade.com" style={{fontSize:13,color:text,textDecoration:'none'}}>hello@philipajibade.com</a>
                </div>
                <div>
                  <div style={{fontSize:10,color:text3,letterSpacing:'0.05em'}}>Connect</div>
                  <a href="#" style={{fontSize:13,color:text,textDecoration:'none'}}>LinkedIn</a>
                </div>
              </div>
            </div>
            <div className="footer-copyright" style={{marginTop:40,textAlign:'center',fontSize:10,color:text3}}>
              All rights reserved © Philip Ajibade {new Date().getFullYear()}
            </div>
          </footer>
        </RevealSection>
        </div>
      </div>
    </>
  );
}

function RevealSection({children}:{children:React.ReactNode}){
  const ref = useRef<HTMLDivElement>(null);
  useEffect(()=>{
    const el = ref.current; if(!el) return;
    const io = new IntersectionObserver(([e])=>{if(e.isIntersecting){el.classList.add('vis');io.disconnect()}},{threshold:.1});
    io.observe(el);
    return ()=>io.disconnect();
  },[]);
  return <div ref={ref} className="reveal">{children}</div>;
}
