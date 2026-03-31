'use client';

import { use, useEffect, useRef, useState } from 'react';
import Link from 'next/link';

interface Project {
  id:number;
  title:string;
  category:string;
  year:string;
  description:string;
  featured:boolean;
  fill:string;
  slug:string;
}

const projects: Project[] = [
  { id:1, title:'Express Tier-1 Onboarding', category:'Interaction Design', year:'2023', description:'Hybrid USSD + mobile onboarding for unbanked users. Zero regulatory penalties across 12 months.', featured:true, fill:'linear-gradient(135deg,#0d1e30,#1a3a55)', slug:'express-tier-1-onboarding' },
  { id:2, title:'Policy Infographic Suite', category:'Data Viz', year:'2023', description:'Translating complex policy research into accessible visual communication.', featured:false, fill:'linear-gradient(135deg,#1e1228,#3a1f50)', slug:'policy-infographic-suite' },
  { id:3, title:'Analytics Dashboard', category:'Data Viz', year:'2022', description:'Real-time data dashboard for operational decision making.', featured:false, fill:'linear-gradient(135deg,#0d2218,#1a4a2e)', slug:'analytics-dashboard' },
  { id:4, title:'Investor Pitch Deck', category:'Presentation', year:'2022', description:'Series A pitch deck for a fintech startup raising $4M.', featured:false, fill:'linear-gradient(135deg,#1e1c0d,#3a381a)', slug:'investor-pitch-deck' },
  { id:5, title:'Editorial Photography', category:'Photography', year:'2023', description:'Documentary series exploring urban identity in Lagos.', featured:false, fill:'linear-gradient(135deg,#1e0d0d,#4a1a1a)', slug:'editorial-photography' },
  { id:6, title:'Service Design Blueprint', category:'Service Design', year:'2021', description:'End-to-end service redesign for a public sector organisation.', featured:false, fill:'linear-gradient(135deg,#0d1a2e,#1a2a4a)', slug:'service-design-blueprint' },
  { id:7, title:'Brand Identity System', category:'Presentation', year:'2021', description:'Complete visual identity for a Lagos-based creative agency.', featured:false, fill:'linear-gradient(135deg,#1a0d1e,#3a1a4a)', slug:'brand-identity-system' },
];

function slugToTitle(slug:string){
  return slug.replace(/-/g,' ').replace(/\b\w/g, c=>c.toUpperCase());
}

export default function ProjectCase({ params }:{ params: Promise<{ slug:string }> }){
  const { slug } = use(params);
  const project = projects.find(p=>p.slug===slug);
  const nextProject = projects[(projects.findIndex(p=>p.slug===slug)+1)%projects.length];

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const cursorRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const symRef = useRef<HTMLDivElement>(null);
  const [light,setLight]=useState(false);
  const [scrolled,setScrolled]=useState(false);
  const [menuOpen,setMenuOpen]=useState(false);
  const [showScroll,setShowScroll]=useState(true);

  useEffect(()=>{
    const handleNavScroll=()=>setScrolled(window.scrollY>40);
    window.addEventListener('scroll',handleNavScroll);
    handleNavScroll();
    return()=>window.removeEventListener('scroll',handleNavScroll);
  },[]);
  useEffect(()=>{
    const handleScrollHint=()=>{const scrollY=window.scrollY;const windowHeight=window.innerHeight;const docHeight=document.documentElement.scrollHeight;const distanceFromBottom=docHeight-scrollY-windowHeight;const pastHero=scrollY>windowHeight*0.8;const nearBottom=distanceFromBottom<300;setShowScroll(!pastHero&&!nearBottom);};
    window.addEventListener('scroll',handleScrollHint);
    handleScrollHint();
    return()=>window.removeEventListener('scroll',handleScrollHint);
  },[]);
  const hoverSymbols=['∇','∫','∑','∂','φ','∞','∴','∵','π','λ','δ','∈','⊂','≡','∮'];
  const handleHoverEnter=(el:HTMLElement)=>{el.dataset.hovered='true';document.body.classList.add('cursor-hover');if(symRef.current){symRef.current.style.opacity='1';symRef.current.textContent=hoverSymbols[Math.floor(Math.random()*hoverSymbols.length)];}};
  const handleHoverLeave=(el:HTMLElement)=>{delete el.dataset.hovered;document.body.classList.remove('cursor-hover');if(symRef.current) symRef.current.style.opacity='0';};
  useEffect(()=>{const onMove=(e:MouseEvent)=>{if(cursorRef.current){cursorRef.current.style.left=e.clientX+'px';cursorRef.current.style.top=e.clientY+'px';} if(ringRef.current){ringRef.current.style.left=e.clientX+'px';ringRef.current.style.top=e.clientY+'px';}};window.addEventListener('mousemove',onMove);let animId:number; const animRing=()=>{animId=requestAnimationFrame(animRing);};animRing();return()=>{window.removeEventListener('mousemove',onMove);cancelAnimationFrame(animId);};},[]);
  useEffect(()=>{const canvas=canvasRef.current; if(!canvas) return; const ctx=canvas.getContext('2d'); if(!ctx)return; const draw=()=>{const W=window.innerWidth; const H=window.innerHeight;canvas.width=W;canvas.height=H;ctx.clearRect(0,0,W,H);ctx.fillStyle=light?'#1a1a18':'#f0ede6';ctx.font='11px "DM Sans", monospace';ctx.textAlign='center';const exprs=['∇f(x,y)=0','∫₀^∞e⁻ˣdx=1','φ=(1+√5)/2','eⁱᵖⁱ+1=0','∑ᵢ₌₁ⁿi=n(n+1)/2','d/dx[xⁿ]=nxⁿ⁻¹','P(A|B)=P(B|A)P(A)/P(B)','∂u/∂t=α∂²u/∂x²','lim sin(x)/x=1','det(A)≠0','∀ε>0∃δ>0','n!=n·(n-1)!','rank(M)=n','aᵀa=I'];ctx.globalAlpha=0.3;for(let x=70;x<W;x+=70)for(let y=70;y<H;y+=70){ctx.beginPath();ctx.arc(x,y,0.9,0,Math.PI*2);ctx.fill();}ctx.globalAlpha=0.55;exprs.forEach((e,i)=>{const fx=((Math.sin(i*2.4+7)*0.5+0.5)*0.86+0.07)*W;const fy=((Math.cos(i*1.8+3)*0.5+0.5)*0.86+0.07)*H;ctx.save();ctx.translate(fx,fy);ctx.rotate(Math.sin(i*1.1)*0.1);ctx.fillText(e,0,0);ctx.restore();});ctx.globalAlpha=1;};draw();window.addEventListener('resize',draw);return()=>window.removeEventListener('resize',draw);},[light]);

  if(!project){
    return (
      <div style={{minHeight:'100vh',display:'flex',alignItems:'center',justifyContent:'center',fontSize:24}}>Project not found</div>
    );
  }

  const bg = light ? '#f5f3ee' : '#0c0c0b';
  const border = light ? 'rgba(0,0,0,0.07)' : 'rgba(255,255,255,0.07)';
  const text = light ? '#1a1a18' : '#f0ede6';
  const text2 = light ? '#6b6960' : '#9c9a90';
  const text3 = light ? '#b8b6ae' : '#3e3d38';
  const accent = light ? '#4a7200' : '#c8f565';
  const bg3 = light ? '#e2e0db' : '#1c1c1a';

  return (
    <>
      <style>{`
        *,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
        html{scroll-behavior:smooth}
        body{cursor:none;overflow-x:hidden;font-family:'DM Sans',sans-serif;font-weight:300;line-height:1.6}
        #cur{position:fixed;width:8px;height:8px;border-radius:50%;pointer-events:none;z-index:9999;transform:translate(-50%,-50%);mix-blend-mode:difference;transition:width .2s,height .2s}
        #ring{position:fixed;width:32px;height:32px;border-radius:50%;pointer-events:none;z-index:9998;transform:translate(-50%,-50%);transition:width .35s,height .35s,opacity .3s;opacity:0.4}
        #sym{position:fixed;font-family:'Playfair Display',serif;font-style:italic;font-size:12px;pointer-events:none;z-index:9997;transform:translate(14px,-18px);opacity:0;transition:opacity .25s;white-space:nowrap}
        .anim-1{opacity:1;transform:translateY(0);}
        .reveal{opacity:1;transform:translateY(0);}
        @media (hover:none){body{cursor:auto!important}#cur,#ring,#sym{display:none!important}}
        @media (max-width:767px){.nav{padding:16px 20px !important}.nav-links{display:none !important}.hamburger{display:block !important;padding-left:20px !important}.theme-toggle{display:none !important}.logo-wrapper{display:none !important}.nav-actions{justify-content:flex-end}.hero{padding:140px 20px 20px 20px!important}.meta-bar{grid-template-columns:1fr 1fr !important}.process-cards{grid-template-columns:1fr!important}.gallery-top{grid-template-columns:1fr!important}.gallery-bottom{grid-template-columns:1fr!important}}
        @media (min-width:768px){.mobile-theme-toggle{display:none!important}}
      `}</style>

      <div id="cur" ref={cursorRef} style={{background:accent}} />
      <div id="ring" ref={ringRef} style={{border:`1px solid ${accent}`}} />
      <div id="sym" ref={symRef} style={{color:accent}} />
      <canvas ref={canvasRef} style={{position:'fixed',inset:0,width:'100%',height:'100%',pointerEvents:'none',opacity:light?0.055:0.04,zIndex:0,transition:'opacity .4s'}} />

      <div style={{background:bg,color:text,minHeight:'100vh',position:'relative',transition:'background .4s,color .4s'}}>
        <nav className="nav" style={{position:'fixed',top:0,left:0,right:0,zIndex:100,background:scrolled?(light?'rgba(245,243,238,0.9)':'rgba(12,12,11,0.88)'):'transparent',borderBottom:`1px solid ${scrolled?border:'transparent'}`,backdropFilter:scrolled?'blur(18px)':'none',transition:'all .3s'}}>
          <div className="nav-inner" style={{padding:'22px 20px',display:'flex',alignItems:'center',justifyContent:'space-between',gap:24}}>
            <button className="hamburger" onClick={()=>setMenuOpen(o=>!o)} style={{border:'none',background:'transparent',color:text3,fontSize:22,cursor:'none',display:'none'}} aria-label="Open menu">☰</button>
            <Link className="logo-wrapper" href='/' style={{textDecoration:'none',color:'inherit',cursor:'none'}}><img src="/logo.svg" height="36" alt="P.Ajibade" style={{height:36,width:'auto',display:'block',filter: light?'brightness(0)':'brightness(0) invert(1) opacity(0.7)'}} /></Link>
            <div className="nav-links" style={{display:'flex',gap:36,order:3}}>
              {['Work','Photography','Blog','About'].map(l=>(<Link key={l} href={l==='Work'?'/work':'#'} onMouseEnter={e=>{handleHoverEnter(e.currentTarget as HTMLElement); (e.currentTarget as HTMLElement).style.color=text;}} onMouseLeave={e=>{handleHoverLeave(e.currentTarget as HTMLElement); (e.currentTarget as HTMLElement).style.color=text2;}} style={{fontSize:12,fontWeight:400,letterSpacing:'0.1em',textTransform:'uppercase',color:text2,textDecoration:'none',transition:'color .2s ease'}}>{l}</Link>))}
            </div>
            <div className="nav-actions" style={{display:'flex',alignItems:'center',gap:14,order:4}}>
              <button className="theme-toggle" onClick={()=>setLight(l=>!l)} style={{width:34,height:34,borderRadius:'50%',background:'transparent',border:`1px solid ${border}`,cursor:'none',color:text2,fontSize:13,display:'flex',alignItems:'center',justifyContent:'center',transition:'border-color .2s,color .2s'}}>{light?'☾':'☀'}</button>
              <Link href="#" onMouseEnter={e=>{handleHoverEnter(e.currentTarget as HTMLElement); (e.currentTarget as HTMLElement).style.opacity='0.85';}} onMouseLeave={e=>{handleHoverLeave(e.currentTarget as HTMLElement); (e.currentTarget as HTMLElement).style.opacity='1';}} style={{fontSize:11,fontWeight:500,letterSpacing:'0.12em',textTransform:'uppercase',color:bg,background:accent,padding:'9px 20px',borderRadius:2,textDecoration:'none',transition:'opacity .2s ease',cursor:'none'}}>Hire me</Link>
            </div>
          </div>
        </nav>

        <button className="mobile-theme-toggle" onClick={()=>setLight(l=>!l)} style={{position:'fixed',bottom:'24px',right:'20px',zIndex:90,width:34,height:34,borderRadius:'50%',border:`1px solid ${border}`,background:'transparent',color:text,cursor:'none',display:'flex',alignItems:'center',justifyContent:'center'}}>{light?'☾':'☀'}</button>

        <div className="mobile-menu-overlay" style={menuOpen ? {display:'flex',opacity:1,visibility:'visible',pointerEvents:'auto',position:'fixed',inset:0,background:'rgba(0,0,0,0.95)',zIndex:999,alignItems:'center',justifyContent:'center',transition:'opacity .2s ease,visibility .2s ease'} : {display:'none',opacity:0,visibility:'hidden',pointerEvents:'none'}}> 
          <button className="mobile-menu-close" onClick={()=>setMenuOpen(false)} style={{position:'absolute',top:20,right:24,fontSize:24,border:'none',background:'transparent',color:text,cursor:'none'}}>✕</button>
          <button className="theme-toggle-mobile" onClick={()=>setLight(l=>!l)} style={{position:'absolute',top:20,left:24,fontSize:22,border:'none',background:'transparent',color:text,cursor:'none'}}>{light?'☾':'☀'}</button>
          <div style={{display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',height:'100%',gap:22}}>{['Work','Photography','Blog','About'].map(l=>(<Link key={l} href={l==='Work'?'/work':'#'} onClick={()=>setMenuOpen(false)} style={{fontSize:24,fontWeight:700,color:text,textDecoration:'none',transition:'color .2s ease'}}>{l}</Link>))}</div>
        </div>

        <div className="page-inner" style={{maxWidth:1400,width:'100%',margin:'0 auto',position:'relative',paddingTop:'100px'}}>
          <section className="hero" style={{minHeight:'100vh',display:'grid',gridTemplateColumns:'repeat(12,1fr)',gap:24,position:'relative',padding:'60px 48px 48px'}}>
            <div style={{gridColumn:'1 / span 7'}}>
              <div style={{fontSize:11,letterSpacing:'0.12em',textTransform:'uppercase',color:text3,marginBottom:10}}>Work / {project.title}</div>
              <h1 style={{fontFamily:'Playfair Display,serif',fontSize:'clamp(52px,6vw,80px)',fontWeight:900,margin:'0 0 18px',color:text}}>{project.title}</h1>
              <div style={{fontSize:14,color:text2,marginBottom:12}}>{project.category} · {project.year}</div>
              <div style={{fontSize:14,color:text2,fontStyle:'italic'}}>End-to-end Design Lead · 12 months</div>
            </div>
            <div style={{gridColumn:'8 / span 5', minHeight:'50vh', background:project.fill, borderRadius:8, border:`1px solid ${border}`}} />
          </section>

          <section className="meta-bar" style={{display:'grid',gridTemplateColumns:'repeat(4,1fr)',gap:18,padding:'26px 48px',border:`1px solid ${border}`,borderRadius:6,marginBottom:40}}>
            {[{label:'Client',value:'Acme Corp'},{label:'Discipline',value:project.category},{label:'Year',value:project.year},{label:'Duration',value:'12 months'}].map(item=>(
              <div key={item.label} style={{border:`1px solid ${border}`,borderRadius:4,padding:12}}>
                <div style={{fontSize:10,textTransform:'uppercase',letterSpacing:'.08em',color:text3,marginBottom:6}}>{item.label}</div>
                <div style={{fontFamily:'Playfair Display,serif',fontSize:14,color:text}}>{item.value}</div>
              </div>
            ))}
          </section>

          <section style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:24,marginBottom:40}}>
            <div style={{display:'flex',flexDirection:'column',gap:14}}>
              <h2 style={{fontFamily:'Playfair Display,serif',fontSize:32,margin:0,color:text}}>The brief</h2>
              <p style={{fontSize:15,color:text2,lineHeight:1.8}}>A short project overview describing user pain points, business goals and the opportunity space. We aimed to deliver inclusive, performant workflows optimized for scale.</p>
            </div>
            <div />
          </section>

          <section style={{position:'relative',marginBottom:40,padding:'24px',border:`1px solid ${border}`,borderRadius:6}}>
            <div style={{position:'absolute',top:8,right:16,fontSize:160,fontWeight:900,fontStyle:'italic',color:accent,opacity:0.06,zIndex:0}}>01</div>
            <h2 style={{fontFamily:'Playfair Display,serif',fontSize:34,position:'relative',zIndex:1,margin:'0 0 16px',color:text}}>The problem</h2>
            <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:24}}>
              <div style={{position:'relative',zIndex:1,color:text2,lineHeight:1.8}}>
                <p>Users struggled with confusing onboarding flows, high drop-off on form completion, and unclear error recovery paths. The product lacked trust signals and consistent terminology.</p>
              </div>
              <div style={{position:'relative',zIndex:1,height:'300px',background:'linear-gradient(135deg,#1e1c0d,#3a381a)',border:`1px solid ${border}`,borderRadius:6}} />
            </div>
          </section>

          <section style={{marginBottom:40}}>
            <h2 style={{fontFamily:'Playfair Display,serif',fontSize:32,margin:'0 0 18px',color:text}}>The approach</h2>
            <div className="process-cards" style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:18}}>
              {[
                {step:'x₁', title:'Research & Strategy', text:'Conducted stakeholder interviews, analytics review and competitive analysis.'},
                {step:'x₂', title:'Design & Iteration', text:'Rapid prototyping and usability testing across Android, iOS and web.'},
                {step:'x₃', title:'Delivery & Handoff', text:'Built design system components with developers and QA across sprint cycles.'},
              ].map(item=>(
                <div key={item.step} style={{border:`1px solid ${border}`,borderRadius:6,padding:20}}>
                  <div style={{fontSize:18,fontWeight:700,color:accent,marginBottom:8}}>{item.step}</div>
                  <h3 style={{fontFamily:'Playfair Display,serif',fontSize:16,fontWeight:700,margin:'0 0 8px',color:text}}>{item.title}</h3>
                  <p style={{color:text2,lineHeight:1.6,fontSize:13,margin:0}}>{item.text}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="gallery" style={{marginBottom:40}}>
            <div className="gallery-top" style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:16,marginBottom:16}}>
              <div style={{height:400,background:'linear-gradient(135deg,#271e4f,#3a3269)',border:`1px solid ${border}`,borderRadius:6,transition:'transform .2s',overflow:'hidden'}} />
              <div style={{height:400,background:'linear-gradient(135deg,#1e2a30,#3a4a55)',border:`1px solid ${border}`,borderRadius:6,transition:'transform .2s',overflow:'hidden'}} />
            </div>
            <div className="gallery-bottom" style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:16}}>
              <div style={{height:260,background:'linear-gradient(135deg,#2e1a29,#442f4a)',border:`1px solid ${border}`,borderRadius:6}} />
              <div style={{height:260,background:'linear-gradient(135deg,#173027,#2a4a45)',border:`1px solid ${border}`,borderRadius:6}} />
              <div style={{height:260,background:'linear-gradient(135deg,#312b17,#5a4f24)',border:`1px solid ${border}`,borderRadius:6}} />
            </div>
          </section>

          <section style={{marginBottom:40}}>
            <h2 style={{fontFamily:'Playfair Display,serif',fontSize:32,margin:'0 0 18px'}}>The outcome</h2>
            <div style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:18,marginBottom:18}}>
              {[{num:'0',label:'penalties'},{num:'12',label:'months'},{num:'40%',label:'retention lift'}].map((s)=>(
                <div key={s.label} style={{border:`1px solid ${border}`,borderRadius:6,padding:20,textAlign:'center'}}>
                  <div style={{fontFamily:'Playfair Display,serif',fontSize:52,color:accent,lineHeight:1}}>{s.num}</div>
                  <div style={{fontSize:12,color:text3,textTransform:'uppercase',letterSpacing:'.1em',marginTop:6}}>{s.label}</div>
                </div>
              ))}
            </div>
            <p style={{fontSize:15,color:text2,lineHeight:1.8}}>The final solution reduced onboarding completion time by 29%, helped secure new funding, and established a scalable design system for future products.</p>
          </section>

          <section style={{marginBottom:80,padding:22,border:`1px solid ${border}`,borderRadius:6,background:bg3}}>
            <div style={{fontSize:11,letterSpacing:'.12em',textTransform:'uppercase',color:text3}}>Next project</div>
            <Link href={`/work/${nextProject.slug}`} style={{display:'flex',alignItems:'center',justifyContent:'space-between',marginTop:8,padding:'16px',borderRadius:6,textDecoration:'none',color:text,transition:'background .25s',background:'transparent'}}>
              <span style={{fontFamily:'Playfair Display,serif',fontSize:28,fontWeight:900}}>{nextProject.title}</span>
              <span style={{fontSize:24}}>→</span>
            </Link>
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
              <div style={{fontSize:11,color:text3,marginTop:4}}>Designer</div>
            </div>
            <div style={{display:'flex',flexDirection:'column',gap:10}}>
              <div><div style={{fontSize:10,color:text3,letterSpacing:'.05em'}}>Say hi</div><a href="mailto:hello@philipajibade.com" style={{fontSize:13,color:text,textDecoration:'none'}}>hello@philipajibade.com</a></div>
              <div><div style={{fontSize:10,color:text3,letterSpacing:'.05em'}}>Connect</div><a href="#" style={{fontSize:13,color:text,textDecoration:'none'}}>LinkedIn</a></div>
            </div>
          </div>
          <div style={{marginTop:40,textAlign:'center',fontSize:10,color:text3}}>All rights reserved © Philip Ajibade {new Date().getFullYear()}</div>
        </footer>
      </div>
    </>
  );
}
