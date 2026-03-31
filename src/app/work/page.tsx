'use client';

import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';

export default function WorkPage() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const cursorRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const symRef = useRef<HTMLDivElement>(null);
  const [light, setLight] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [showScroll, setShowScroll] = useState(true);
  const [activeFilter, setActiveFilter] = useState('All');

  const projects = [
    { id:1, title:'Express Tier-1 Onboarding', category:'Interaction Design', year:'2023', description:'Hybrid USSD + mobile onboarding for unbanked users. Zero regulatory penalties across 12 months.', featured:true, fill:'linear-gradient(135deg,#0d1e30,#1a3a55)', slug:'express-tier-1-onboarding' },
    { id:2, title:'Policy Infographic Suite', category:'Data Viz', year:'2023', description:'Translating complex policy research into accessible visual communication.', featured:false, fill:'linear-gradient(135deg,#1e1228,#3a1f50)', slug:'policy-infographic-suite' },
    { id:3, title:'Analytics Dashboard', category:'Data Viz', year:'2022', description:'Real-time data dashboard for operational decision making.', featured:false, fill:'linear-gradient(135deg,#0d2218,#1a4a2e)', slug:'analytics-dashboard' },
    { id:4, title:'Investor Pitch Deck', category:'Presentation', year:'2022', description:'Series A pitch deck for a fintech startup raising $4M.', featured:false, fill:'linear-gradient(135deg,#1e1c0d,#3a381a)', slug:'investor-pitch-deck' },
    { id:5, title:'Editorial Photography', category:'Photography', year:'2023', description:'Documentary series exploring urban identity in Lagos.', featured:false, fill:'linear-gradient(135deg,#1e0d0d,#4a1a1a)', slug:'editorial-photography' },
    { id:6, title:'Service Design Blueprint', category:'Service Design', year:'2021', description:'End-to-end service redesign for a public sector organisation.', featured:false, fill:'linear-gradient(135deg,#0d1a2e,#1a2a4a)', slug:'service-design-blueprint' },
    { id:7, title:'Brand Identity System', category:'Presentation', year:'2021', description:'Complete visual identity for a Lagos-based creative agency.', featured:false, fill:'linear-gradient(135deg,#1a0d1e,#3a1a4a)', slug:'brand-identity-system' },
  ];

  const categories = ['All','Interaction Design','Data Viz','Presentation','Photography','Service Design'];

  useEffect(() => {
    const handleNavScroll = () => setScrolled(window.scrollY > 40);
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

  const handleHoverEnter = (el: HTMLElement) => {
    el.dataset.hovered = 'true';
    document.body.classList.add('cursor-hover');
    if (symRef.current) symRef.current.style.opacity = '1';
    if (symRef.current) symRef.current.textContent = ['∇','∫','∑','∂','φ','∞','∴','∵','π','λ','δ','∈','⊂','≡','∮'][Math.floor(Math.random() * 15)];
  };
  const handleHoverLeave = (el: HTMLElement) => {
    delete el.dataset.hovered;
    document.body.classList.remove('cursor-hover');
    if (symRef.current) symRef.current.style.opacity = '0';
  };

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      if (cursorRef.current) { cursorRef.current.style.left = e.clientX + 'px'; cursorRef.current.style.top = e.clientY + 'px'; }
      if (ringRef.current) { ringRef.current.style.left = e.clientX + 'px'; ringRef.current.style.top = e.clientY + 'px'; }
    };
    window.addEventListener('mousemove', onMove);
    let animId: number;
    const animRing = () => {
      if (ringRef.current) {
        const x = parseFloat(ringRef.current.style.left || '0');
        const y = parseFloat(ringRef.current.style.top || '0');
        ringRef.current.style.left = `${x + (window.event ? (window.event as MouseEvent).clientX - x : 0) * 0.12}px`;
        ringRef.current.style.top = `${y + (window.event ? (window.event as MouseEvent).clientY - y : 0) * 0.12}px`;
      }
      animId = requestAnimationFrame(animRing);
    };
    animRing();
    return () => { window.removeEventListener('mousemove', onMove); cancelAnimationFrame(animId); };
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current; if (!canvas) return;
    const ctx = canvas.getContext('2d'); if (!ctx) return;
    const draw = () => {
      const W = window.innerWidth; const H = window.innerHeight;
      canvas.width = W; canvas.height = H;
      ctx.clearRect(0,0,W,H);
      ctx.fillStyle = light ? '#1a1a18' : '#f0ede6';
      ctx.font = '11px "DM Sans", monospace';
      ctx.textAlign = 'center';
      const exprs = ['∇f(x,y)=0','∫₀^∞e⁻ˣdx=1','φ=(1+√5)/2','eⁱᵖⁱ+1=0','∑ᵢ₌₁ⁿi=n(n+1)/2','d/dx[xⁿ]=nxⁿ⁻¹','P(A|B)=P(B|A)P(A)/P(B)','∂u/∂t=α∂²u/∂x²','lim sin(x)/x=1','det(A)≠0','∀ε>0∃δ>0','n!=n·(n-1)!','rank(M)=n','aᵀa=I'];
      ctx.globalAlpha = 0.3;
      for (let x=70;x<W;x+=70) for (let y=70;y<H;y+=70) { ctx.beginPath(); ctx.arc(x,y,0.9,0,Math.PI*2); ctx.fill(); }
      ctx.globalAlpha = 0.55;
      exprs.forEach((e,i)=>{
        const fx = ((Math.sin(i*2.4+7)*0.5+0.5)*0.86+0.07)*W;
        const fy = ((Math.cos(i*1.8+3)*0.5+0.5)*0.86+0.07)*H;
        ctx.save(); ctx.translate(fx,fy); ctx.rotate(Math.sin(i*1.1)*0.1); ctx.fillText(e,0,0); ctx.restore();
      });
      ctx.globalAlpha = 1;
    };
    draw();
    window.addEventListener('resize', draw);
    return () => window.removeEventListener('resize', draw);
  }, [light]);

  const text = light ? '#1a1a18' : '#f0ede6';
  const text2 = light ? '#6b6960' : '#9c9a90';
  const text3 = light ? '#b8b6ae' : '#3e3d38';
  const accent = light ? '#4a7200' : '#c8f565';
  const bg = light ? '#f5f3ee' : '#0c0c0b';
  const border = light ? 'rgba(0,0,0,0.07)' : 'rgba(255,255,255,0.07)';

  const filteredProjects = activeFilter === 'All' ? projects : projects.filter(p => p.category === activeFilter);
  const featured = filteredProjects.find(p => p.featured);
  const nonFeatured = filteredProjects.filter(p => !p.featured);

  return (
    <>
      <style>{`
        *,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
        html{scroll-behavior:smooth}
        body{cursor:none;overflow-x:hidden;font-family:'DM Sans',sans-serif;font-weight:300;line-height:1.6}
        #cur{position:fixed;width:8px;height:8px;border-radius:50%;pointer-events:none;z-index:9999;transform:translate(-50%,-50%);mix-blend-mode:difference;transition:width .2s,height .2s}
        #ring{position:fixed;width:32px;height:32px;border-radius:50%;pointer-events:none;z-index:9998;transform:translate(-50%,-50%);transition:width .35s,height .35s,opacity .3s;opacity:0.4}
        #sym{position:fixed;font-family:'Playfair Display',serif;font-style:italic;font-size:12px;pointer-events:none;z-index:9997;transform:translate(14px,-18px);opacity:0;transition:opacity .25s;white-space:nowrap}
        @keyframes fadeUp{from{opacity:0;transform:translateY(24px)}to{opacity:1;transform:translateY(0)}}
        .reveal{opacity:1;transform:translateY(0);transition:opacity .7s ease,transform .7s ease}
        .reveal.vis{opacity:1;transform:translateY(0)}
        .hero .anim-9{position:fixed !important;bottom:20px !important;left:50% !important;transform:translateX(-50%) !important;z-index:50 !important;}

        .mobile-menu-overlay {display:none;position:fixed;inset:0;opacity:0;visibility:hidden;z-index:999;align-items:center;justify-content:center;transition:opacity .2s ease,visibility .2s ease;}
        .nav-inner {max-width:1400px;width:100%;margin:0 auto;display:flex;align-items:center;justify-content:space-between;gap:24;position:relative;}
        .page-inner {max-width:1400px;width:100%;margin:0 auto;position:relative;}
        .filter-bar {overflow-x:auto;display:flex;gap:10px;align-items:center;padding:16px 0;}

        @media (hover:none){body{cursor:auto!important} #cur,#ring,#sym{display:none!important}}

        @media (max-width:767px){
          .nav {padding:16px 20px !important;}
          .nav-links {display:none !important;}
          .hamburger {display:block !important;padding-left:20px !important;}
          .theme-toggle {display:none !important;}
          .logo-wrapper {display:none !important;}
          .nav-actions {justify-content:flex-end;}
          .nav-actions > a {margin-right:20px !important;}
          .hero {padding:140px 20px 40px 20px !important;}
          .filter-bar {display:none !important;}
          .work-grid {grid-template-columns:1fr !important;}
        }

        @media (min-width:768px){.mobile-theme-toggle{display:none!important}.hero{padding:120px 48px 64px 48px !important;}.work-grid{grid-template-columns:repeat(3,1fr) !important;}}

        @media (min-width:768px) and (max-width:1024px){
          .nav {padding:16px 32px !important;}
          .hero {padding:120px 32px 64px 32px !important;}
          .work-grid {grid-template-columns:repeat(2,1fr) !important;}
        }
      `}</style>

      <div id="cur" ref={cursorRef} style={{background:accent}} />
      <div id="ring" ref={ringRef} style={{border:`1px solid ${accent}`}} />
      <div id="sym" ref={symRef} style={{color:accent}} />
      <canvas ref={canvasRef} style={{position:'fixed',inset:0,width:'100%',height:'100%',pointerEvents:'none',opacity:light?0.055:0.04,zIndex:0,transition:'opacity .4s'}} />

      <div style={{background:bg,color:text,minHeight:'100vh',position:'relative',transition:'background .4s,color .4s'}}>
        <nav className="nav" style={{position:'fixed',top:0,left:0,right:0,zIndex:100,background:scrolled?(light?'rgba(245,243,238,0.9)':'rgba(12,12,11,0.88)'):'transparent',borderBottom:`1px solid ${scrolled?border:'transparent'}`,backdropFilter:scrolled?'blur(18px)':'none',transition:'all .3s'}}>
          <div className="nav-inner" style={{padding:'22px 20px',display:'flex',alignItems:'center',justifyContent:'space-between',gap:24}}>
            <button className="hamburger" onClick={()=>setMenuOpen(o=>!o)} style={{border:'none',background:'transparent',color:text3,fontSize:22,cursor:'none',display:'none'}} aria-label="Open menu">☰</button>
            <a className="logo-wrapper" href="#" style={{textDecoration:'none',color:'inherit',cursor:'none'}}>
              <img src="/logo.svg" height="36" alt="P.Ajibade" style={{height:36,width:'auto',display:'block',transition:'filter .2s ease',filter:light?'brightness(0)':'brightness(0) invert(1) opacity(0.7)'}} />
            </a>
            <div className="nav-links" style={{display:'flex',gap:36,order:3}}>
              {['Work','Photography','Blog','About'].map(l=>(<a key={l} href="#" onMouseEnter={e=>{handleHoverEnter(e.currentTarget); e.currentTarget.style.color = text;}} onMouseLeave={e=>{handleHoverLeave(e.currentTarget); e.currentTarget.style.color = text2;}} style={{fontSize:12,fontWeight:400,letterSpacing:'0.1em',textTransform:'uppercase',color:text2,textDecoration:'none',transition:'color .2s ease'}}>{l}</a>))}
            </div>
            <div className="nav-actions" style={{display:'flex',alignItems:'center',gap:14,order:4}}>
              <button className="theme-toggle" onClick={()=>setLight(l=>!l)} onMouseEnter={e=>{handleHoverEnter(e.currentTarget); e.currentTarget.style.color = text;}} onMouseLeave={e=>{handleHoverLeave(e.currentTarget); e.currentTarget.style.color = text2;}} style={{width:34,height:34,borderRadius:'50%',background:'transparent',border:`1px solid ${border}`,cursor:'none',color:text2,fontSize:13,display:'flex',alignItems:'center',justifyContent:'center',transition:'border-color .2s,color .2s'}}>{light?'☾':'☀'}</button>
              <a href="/hire" onMouseEnter={e=>{handleHoverEnter(e.currentTarget); e.currentTarget.style.opacity='0.85';}} onMouseLeave={e=>{handleHoverLeave(e.currentTarget); e.currentTarget.style.opacity='1';}} style={{fontSize:11,fontWeight:500,letterSpacing:'0.12em',textTransform:'uppercase',color:bg,background:accent,padding:'9px 20px',borderRadius:2,textDecoration:'none',transition:'opacity .2s ease',cursor:'none'}}>Hire me</a>
            </div>
          </div>
        </nav>

        <button className="mobile-theme-toggle" onClick={()=>setLight(l=>!l)} style={{position:'fixed',bottom:'24px',right:'20px',zIndex:90,width:34,height:34,borderRadius:'50%',border:`1px solid ${border}`,background:'transparent',color:text,cursor:'none',display:'flex',alignItems:'center',justifyContent:'center'}}>{light?'☾':'☀'}</button>

        <div className={`mobile-menu-overlay ${menuOpen?'open':''}`}>
          <button className="mobile-menu-close" onClick={()=>setMenuOpen(false)} style={{position:'absolute',top:20,right:24,fontSize:24,border:'none',background:'transparent',color:text,cursor:'none'}}>✕</button>
          <button className="theme-toggle-mobile" onClick={()=>setLight(l=>!l)} style={{position:'absolute',top:20,left:24,fontSize:22,border:'none',background:'transparent',color:text,cursor:'none'}}>{light?'☾':'☀'}</button>
          <div style={{display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',height:'100%',gap:22}}>{['Work','Photography','Blog','About'].map(l=>(<a key={l} href="#" onClick={()=>setMenuOpen(false)} style={{fontSize:24,fontWeight:700,color:text,textDecoration:'none',transition:'color .2s ease'}}>{l}</a>))}</div>
        </div>

        <div className="page-inner" style={{maxWidth:1400,width:'100%',margin:'0 auto',position:'relative',paddingTop:'100px'}}>
          <section className="hero" style={{minHeight:'100vh',display:'grid',position:'relative',padding:'120px 48px 48px'}}>
            <div style={{gridColumn:'1/-1'}}>
              <p style={{fontSize:10,letterSpacing:'.16em',textTransform:'uppercase',color:text3}}>∫ Work</p>
              <h1 style={{fontFamily:'Playfair Display,serif',fontSize:'clamp(52px,6vw,80px)',fontWeight:900,lineHeight:1.05,margin:'10px 0',color:text}}>Selected<br/><em style={{fontStyle:'italic',fontWeight:400}}>projects</em></h1>
              <p style={{fontSize:14,color:text2,maxWidth:480,marginTop:14,lineHeight:1.6}}>A collection of design work spanning interaction design, data visualisation, brand communication and more.</p>
              <div style={{height:1,background:border,width:70,margin:'26px 0 0'}} />
            </div>

            <div className="filter-bar reveal anim-2" style={{gridColumn:'1/-1'}}>
              {categories.map(cat => {
                const selected = activeFilter === cat;
                return <button key={cat} onClick={()=>setActiveFilter(cat)} style={{fontSize:11,letterSpacing:'0.08em',textTransform:'uppercase',padding:'6px 16px',borderRadius:2,whiteSpace:'nowrap',border:selected?'none':`1px solid ${border}`,background:selected?accent:'transparent',color:selected?bg: text2,transition:'all .25s'}}> {cat}</button>;
              })}
            </div>
          </section>

          {featured && <section className="reveal anim-3" style={{marginBottom:32,position:'relative',border:`1px solid ${border}`,overflow:'hidden',borderRadius:6,background:featured.fill,height:480,display:'grid',alignItems:'end',transition:'transform .25s,border-color .25s',cursor:'pointer',textDecoration:'none'}} onMouseEnter={e=>(e.currentTarget.style.transform='scale(1.03)', e.currentTarget.style.borderColor=accent)} onMouseLeave={e=>(e.currentTarget.style.transform='scale(1)', e.currentTarget.style.borderColor=border)}>
            <div style={{position:'absolute',inset:0,background:'linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.4) 50%, transparent 100%)'}} />
            <div style={{position:'relative',padding:32,color:'#fff'}}> 
              <div style={{fontSize:11,letterSpacing:'.12em',textTransform:'uppercase',marginBottom:8,color:'rgba(200,245,101,0.9)'}}>{featured.category}</div>
              <h2 style={{fontFamily:'Playfair Display,serif',fontSize:32,fontWeight:900,margin:0,color:'#f0ede6'}}>{featured.title}</h2>
              <div style={{fontSize:12,color:'rgba(240,237,230,0.6)',margin:'8px 0'}}>{featured.year}</div>
              <p style={{fontSize:14,color:'rgba(240,237,230,0.75)',maxWidth:530,lineHeight:1.5}}>{featured.description}</p>
              <a href="#" style={{marginTop:16,display:'inline-flex',alignItems:'center',fontSize:11,fontWeight:700,letterSpacing:'.12em',textTransform:'uppercase',color:'#fff',textDecoration:'none'}}>View project →</a>
            </div>
          </section>}

          <section className="work-grid reveal anim-4" style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:'20px',marginBottom:120}}>
            {nonFeatured.map(p => (
              <Link key={p.id} href={`/work/${p.slug}`} style={{textDecoration:'none'}}>
                <article style={{border:`1px solid ${border}`,borderRadius:6,overflow:'hidden',background:bg,transition:'transform .2s,border-color .2s',cursor:'pointer'}} onMouseEnter={e=>{e.currentTarget.style.transform='translateY(-3px)'; e.currentTarget.style.borderColor=accent;}} onMouseLeave={e=>{e.currentTarget.style.transform='translateY(0)'; e.currentTarget.style.borderColor=border;}}>
                  <div style={{width:'100%',aspectRatio:'4 / 3',background:p.fill}} />
                  <div style={{padding:16}}>
                    <div style={{fontSize:10,letterSpacing:'.12em',textTransform:'uppercase',color:accent,marginBottom:6}}>{p.category}</div>
                    <h3 style={{fontFamily:'Playfair Display,serif',fontSize:18,fontWeight:700,margin:'0 0 4px',color:text}}>{p.title}</h3>
                    <div style={{fontSize:11,color:text3,marginBottom:8}}>{p.year}</div>
                    <p style={{fontSize:13,color:text2,lineHeight:1.5}}>{p.description}</p>
                  </div>
                </article>
              </Link>
            ))}
          </section>
        </div>

        <div className="anim-9" style={{position:'fixed',bottom:20,left:'50%',transform:'translateX(-50%)',display:'flex',flexDirection:'column',alignItems:'center',gap:'6px',zIndex:50,pointerEvents:'none',opacity:showScroll?1:0,transition:'opacity .4s'}}>
          <div style={{width:1,height:28,background:`linear-gradient(to bottom,${accent},transparent)`,animation:'scrollDrop 2s ease-in-out infinite'}} />
          <span style={{fontSize:9,letterSpacing:'0.2em',textTransform:'uppercase',color:text3}}>Scroll</span>
        </div>

        <footer style={{borderTop:`1px solid ${border}`,padding:'80px 48px 40px',position:'relative',zIndex:1}}>
          <div className="footer-bottom-row" style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:28,alignItems:'start'}}>
            <div>
              <div style={{fontFamily:'Playfair Display,serif',fontSize:14,fontWeight:700,color:text}}>Philip Ajibade</div>
              <div style={{fontSize:11,color:text2,marginTop:4}}>Designer</div>
            </div>
            <div style={{display:'flex',flexDirection:'column',gap:10}}>
              <div><div style={{fontSize:10,color:text3,letterSpacing:'0.05em'}}>Say hi</div><a href="mailto:hello@philipajibade.com" style={{fontSize:13,color:text,textDecoration:'none'}}>hello@philipajibade.com</a></div>
              <div><div style={{fontSize:10,color:text3,letterSpacing:'0.05em'}}>Connect</div><a href="https://linkedin.com/in/philip-ajibade" target="_blank" rel="noreferrer" style={{fontSize:13,color:text,textDecoration:'none'}}>linkedin.com/in/philip-ajibade</a></div>
            </div>
          </div>
          <div style={{marginTop:40,textAlign:'center',fontSize:10,color:text3}}>All rights reserved © Philip Ajibade {new Date().getFullYear()}</div>
        </footer>
      </div>
    </>
  );
}
