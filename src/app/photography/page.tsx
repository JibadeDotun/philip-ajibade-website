'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';

const seriesOptions = ['All', 'Urban Identity', 'Editorial', 'Portraits', 'Abstract', 'Travel'];
const photos = [
  { id:1, title:'Lagos at dusk', series:'Urban Identity', height:280, fill:'linear-gradient(135deg,#1a1a2e,#2d2d4a)' },
  { id:2, title:'Market morning', series:'Urban Identity', height:380, fill:'linear-gradient(135deg,#1a2e1a,#2d4a2d)' },
  { id:3, title:'The waiting room', series:'Editorial', height:320, fill:'linear-gradient(135deg,#2e1a1a,#4a2d2d)' },
  { id:4, title:'Geometry in concrete', series:'Abstract', height:420, fill:'linear-gradient(135deg,#1a2e2e,#2d4a4a)' },
  { id:5, title:'Sunday service', series:'Portraits', height:260, fill:'linear-gradient(135deg,#2e2e1a,#4a4a2d)' },
  { id:6, title:'Northern rail', series:'Travel', height:360, fill:'linear-gradient(135deg,#2e1a2e,#4a2d4a)' },
  { id:7, title:'Brick lane', series:'Urban Identity', height:300, fill:'linear-gradient(135deg,#1a1a2e,#3a3a5a)' },
  { id:8, title:'Still life no.3', series:'Editorial', height:440, fill:'linear-gradient(135deg,#1a2e1a,#3a5a3a)' },
  { id:9, title:'Face in the crowd', series:'Portraits', height:290, fill:'linear-gradient(135deg,#2e1a1a,#5a3a3a)' },
  { id:10, title:'Shadows & light', series:'Abstract', height:350, fill:'linear-gradient(135deg,#1a2e2e,#3a5a5a)' },
  { id:11, title:'Victoria station', series:'Travel', height:410, fill:'linear-gradient(135deg,#2e2e1a,#5a5a3a)' },
  { id:12, title:'The architect', series:'Portraits', height:270, fill:'linear-gradient(135deg,#2e1a2e,#5a3a5a)' },
];

export default function PhotographyPage() {
  const [light,setLight]=useState(false);
  const [scrolled,setScrolled]=useState(false);
  const [menuOpen,setMenuOpen]=useState(false);
  const [showScroll,setShowScroll]=useState(true);
  const [activeSeries,setActiveSeries]=useState('All');
  const [lightboxOpen,setLightboxOpen]=useState(false);
  const [activeIndex,setActiveIndex]=useState(0);

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const cursorRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const symRef = useRef<HTMLDivElement>(null);

  useEffect(()=>{const onScroll=()=>setScrolled(window.scrollY>40);window.addEventListener('scroll',onScroll);onScroll();return()=>window.removeEventListener('scroll',onScroll);},[]);
  useEffect(()=>{const onScrollHint=()=>{const scrollY=window.scrollY,wh=window.innerHeight,dh=document.documentElement.scrollHeight,diff=dh-scrollY-wh,past=scrollY>wh*0.8,near=diff<300;setShowScroll(!past&&!near)};window.addEventListener('scroll',onScrollHint);onScrollHint();return()=>window.removeEventListener('scroll',onScrollHint);},[]);

  const hoverSymbols=['∇','∫','∑','∂','φ','∞','∴','∵','π','λ','δ','∈','⊂','≡','∮'];
  const handleHoverEnter=(el:HTMLElement)=>{el.dataset.hovered='true';document.body.classList.add('cursor-hover');if(symRef.current){symRef.current.style.opacity='1';symRef.current.textContent=hoverSymbols[Math.floor(Math.random()*hoverSymbols.length)];}};
  const handleHoverLeave=(el:HTMLElement)=>{delete el.dataset.hovered;document.body.classList.remove('cursor-hover');if(symRef.current) symRef.current.style.opacity='0';};

  useEffect(()=>{const onMove=(e:MouseEvent)=>{if(cursorRef.current){cursorRef.current.style.left=e.clientX+'px';cursorRef.current.style.top=e.clientY+'px';} if(ringRef.current){ringRef.current.style.left=e.clientX+'px';ringRef.current.style.top=e.clientY+'px';}};window.addEventListener('mousemove',onMove);let id:number;const raf=()=>{id=requestAnimationFrame(raf)};raf();return()=>{window.removeEventListener('mousemove',onMove);cancelAnimationFrame(id);};},[]);
  useEffect(()=>{const canvas=canvasRef.current; if(!canvas) return; const ctx=canvas.getContext('2d'); if(!ctx) return; const draw=()=>{const W=window.innerWidth,H=window.innerHeight;canvas.width=W;canvas.height=H;ctx.clearRect(0,0,W,H);ctx.fillStyle=light?'#1a1a18':'#f0ede6';ctx.font='11px "DM Sans", monospace';ctx.textAlign='center';const exprs=['∇f(x,y)=0','∫₀^∞e⁻ˣdx=1','φ=(1+√5)/2','eⁱᵖⁱ+1=0','∑ᵢ₌₁ⁿi=n(n+1)/2','d/dx[xⁿ]=nxⁿ⁻¹','P(A|B)=P(B|A)P(A)/P(B)','∂u/∂t=α∂²u/∂x²','lim sin(x)/x=1','det(A)≠0','∀ε>0∃δ>0','n!=n·(n-1)!','rank(M)=n','aᵀa=I'];ctx.globalAlpha=0.3;for(let x=70;x<W;x+=70)for(let y=70;y<H;y+=70){ctx.beginPath();ctx.arc(x,y,0.9,0,Math.PI*2);ctx.fill();}ctx.globalAlpha=0.55;exprs.forEach((e,i)=>{const fx=((Math.sin(i*2.4+7)*0.5+0.5)*0.86+0.07)*W;const fy=((Math.cos(i*1.8+3)*0.5+0.5)*0.86+0.07)*H;ctx.save();ctx.translate(fx,fy);ctx.rotate(Math.sin(i*1.1)*0.1);ctx.fillText(e,0,0);ctx.restore();});ctx.globalAlpha=1};draw();window.addEventListener('resize',draw);return()=>window.removeEventListener('resize',draw);},[light]);

  useEffect(()=>{if(!lightboxOpen)return;const onKey=(e:KeyboardEvent)=>{if(e.key==='Escape'){setLightboxOpen(false);}else if(e.key==='ArrowRight'){setActiveIndex((i)=> (i+1)%filteredPhotos.length);}else if(e.key==='ArrowLeft'){setActiveIndex((i)=> (i-1+filteredPhotos.length)%filteredPhotos.length);}};window.addEventListener('keydown',onKey);return()=>window.removeEventListener('keydown',onKey);},[lightboxOpen]);

  const filterPhotos = activeSeries === 'All' ? photos : photos.filter(p=>p.series===activeSeries);
  const filteredPhotos = filterPhotos;
  const activePhoto=filteredPhotos[activeIndex]??null;

  const openLightbox=(index:number)=>{setActiveIndex(index);setLightboxOpen(true);};
  const closeLightbox=()=>setLightboxOpen(false);
  const nextPhoto=()=>setActiveIndex((i)=> (i+1)%filteredPhotos.length);
  const prevPhoto=()=>setActiveIndex((i)=> (i-1+filteredPhotos.length)%filteredPhotos.length);

  const bg = light ? '#f5f3ee':'#0c0c0b';
  const border = light ? 'rgba(0,0,0,0.07)' : 'rgba(255,255,255,0.07)';
  const text = light ? '#1a1a18':'#f0ede6';
  const text2 = light ? '#6b6960':'#9c9a90';
  const text3 = light ? '#b8b6ae':'#3e3d38';
  const accent = light ? '#4a7200':'#c8f565';
  const bg3 = light ? '#e9e7e2':'#1c1c1a';
  const bg2 = light ? '#f0ede6':'#1a1a18';

  return (
    <>
      <style>{`
        *,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
        html{scroll-behavior:smooth}
        body{cursor:none;overflow-x:hidden;font-family:'DM Sans',sans-serif;font-weight:300;line-height:1.6}
        #cur{position:fixed;width:8px;height:8px;border-radius:50%;pointer-events:none;z-index:9999;transform:translate(-50%,-50%);mix-blend-mode:difference;transition:width .2s,height .2s}
        #ring{position:fixed;width:32px;height:32px;border-radius:50%;pointer-events:none;z-index:9998;transform:translate(-50%,-50%);transition:width .35s,height .35s,opacity .3s;opacity:0.4}
        #sym{position:fixed;font-family:'Playfair Display',serif;font-style:italic;font-size:12px;pointer-events:none;z-index:9997;transform:translate(14px,-18px);opacity:0;transition:opacity .25s;white-space:nowrap}
        .series-pill{font-size:12px;padding:8px 14px;border-radius:999px;border:1px solid ${border};cursor:none;transition:all .25s;}
        .series-pill.active{background:${accent};color:${bg};border-color:${accent};}
        .series-pill:not(.active):hover{background:${bg3};}
        .masonry{column-gap:12px}
        .photo-card{position:relative;border-radius:4px;overflow:hidden;margin-bottom:12px;transition:filter .25s;cursor:none;}
        .photo-card:hover{filter:brightness(1.1)}
        .photo-overlay{position:absolute;inset:0;background:linear-gradient(180deg,rgba(0,0,0,0)70%,rgba(0,0,0,0.75));opacity:0;transition:opacity .3s;display:flex;flex-direction:column;justify-content:flex-end;padding:12px}
        .photo-card:hover .photo-overlay{opacity:1}
        .lightbox{position:fixed;inset:0;background:rgba(0,0,0,0.95);z-index:1000;display:flex;align-items:center;justify-content:center;padding:24px;opacity:1;animation:fadeIn .3s}
        .lightbox.hidden{opacity:0;pointer-events:none}
        .lightbox-content{max-height:80vh;max-width:90vw;display:flex;flex-direction:column;align-items:center;gap:12px}
        .lightbox-photo{width:auto;height:80vh;border-radius:6px;object-fit:cover}
        .lightbox-meta{color:#fff;text-align:center}
        .lightbox-btn{position:absolute;top:18px;font-size:24px;color:#fff;border:none;background:transparent;cursor:none;}
        .lightbox-close{right:22px}
        .lightbox-prev{left:22px}
        .lightbox-next{right:60px}
        @keyframes fadeIn{from{opacity:0}to{opacity:1}}
        @media (max-width:767px){body{cursor:auto!important}#cur,#ring,#sym{display:none!important}.nav{padding:16px 20px !important}.nav-links{display:none !important}.hamburger{display:block !important;padding-left:20px !important}.theme-toggle{display:none !important}.logo-wrapper{display:none !important}.nav-actions{justify-content:flex-end}.hero{padding:130px 20px 20px 20px!important}.series-filter{display:none!important}.masonry{column-count:1}.related-row{grid-template-columns:1fr!important}.bottom-strip{padding:24px 20px;}.mobile-theme-toggle{display:none!important}}
        @media (min-width:768px) and (max-width:1024px){.masonry{column-count:2}}
        @media (min-width:1025px){.masonry{column-count:3}}
      `}</style>

      <div id='cur' ref={cursorRef} style={{background:accent}} />
      <div id='ring' ref={ringRef} style={{border:`1px solid ${accent}`}} />
      <div id='sym' ref={symRef} style={{color:accent}} />
      <canvas ref={canvasRef} style={{position:'fixed',inset:0,width:'100%',height:'100%',pointerEvents:'none',opacity:light?0.055:0.04,zIndex:0,transition:'opacity .4s'}} />

      <div style={{background:bg,color:text,minHeight:'100vh',position:'relative',transition:'background .4s,color .4s'}}>
        <nav className='nav' style={{position:'fixed',top:0,left:0,right:0,zIndex:100,background:scrolled?(light?'rgba(245,243,238,0.9)':'rgba(12,12,11,0.88)'):'transparent',borderBottom:`1px solid ${scrolled?border:'transparent'}`,backdropFilter:scrolled?'blur(18px)':'none',transition:'all .3s'}}>
          <div style={{padding:'22px 20px',display:'flex',alignItems:'center',justifyContent:'space-between',gap:24}}>
            <button className='hamburger' onClick={()=>setMenuOpen(o=>!o)} style={{border:'none',background:'transparent',color:text3,fontSize:22,cursor:'none',display:'none'}}>☰</button>
            <Link href='/' style={{textDecoration:'none',color:'inherit',cursor:'none'}}><img src='/logo.svg' height='36' alt='P.Ajibade' style={{height:36,width:'auto',display:'block',filter:light?'brightness(0)':'brightness(0) invert(1) opacity(0.7)'}} /></Link>
            <div style={{display:'flex',gap:36,order:3}}>{['Work','Photography','Blog','About'].map(l=>{const href=l==='Work'?'/work':l==='About'?'/about':l==='Blog'?'/blog':'#';return <Link key={l} href={href} onMouseEnter={e=>{handleHoverEnter(e.currentTarget as HTMLElement); (e.currentTarget as HTMLElement).style.color=text}} onMouseLeave={e=>{handleHoverLeave(e.currentTarget as HTMLElement); (e.currentTarget as HTMLElement).style.color=text2}} style={{fontSize:12,fontWeight:400,letterSpacing:'0.1em',textTransform:'uppercase',color:text2,textDecoration:'none',transition:'color .2s ease'}}>{l}</Link>;})}</div>
            <div style={{display:'flex',alignItems:'center',gap:14,order:4}}>
              <button onClick={()=>setLight(l=>!l)} style={{width:34,height:34,borderRadius:'50%',background:'transparent',border:`1px solid ${border}`,cursor:'none',color:text2,fontSize:13,display:'flex',alignItems:'center',justifyContent:'center',transition:'border-color .2s,color .2s'}}>{light?'☾':'☀'}</button>
              <Link href='/hire' onMouseEnter={e=>{handleHoverEnter(e.currentTarget as HTMLElement); (e.currentTarget as HTMLElement).style.opacity='0.85'}} onMouseLeave={e=>{handleHoverLeave(e.currentTarget as HTMLElement); (e.currentTarget as HTMLElement).style.opacity='1'}} style={{fontSize:11,fontWeight:500,letterSpacing:'0.12em',textTransform:'uppercase',color:bg,background:accent,padding:'9px 20px',borderRadius:2,textDecoration:'none',transition:'opacity .2s ease',cursor:'none'}}>Hire me</Link>
            </div>
          </div>
        </nav>

        <button className='mobile-theme-toggle' onClick={()=>setLight(l=>!l)} style={{position:'fixed',bottom:'24px',right:'20px',zIndex:90,width:34,height:34,borderRadius:'50%',border:`1px solid ${border}`,background:'transparent',color:text,cursor:'none',display:'flex',alignItems:'center',justifyContent:'center'}}>{light?'☾':'☀'}</button>

        <div className={`mobile-menu-overlay ${menuOpen?'open':''}`} style={menuOpen?{display:'flex',opacity:1,visibility:'visible',pointerEvents:'auto',position:'fixed',inset:0,background:'rgba(0,0,0,0.95)',zIndex:999,alignItems:'center',justifyContent:'center',transition:'opacity .2s ease,visibility .2s ease'}:{display:'none',opacity:0,visibility:'hidden',pointerEvents:'none'}}>
          <button onClick={()=>setMenuOpen(false)} style={{position:'absolute',top:20,right:24,fontSize:24,border:'none',background:'transparent',color:text,cursor:'none'}}>✕</button>
          <button onClick={()=>setLight(l=>!l)} style={{position:'absolute',top:20,left:24,fontSize:22,border:'none',background:'transparent',color:text,cursor:'none'}}>{light?'☾':'☀'}</button>
          <div style={{display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',height:'100%',gap:22}}>{['Work','Photography','Blog','About'].map(l=>{const href=l==='Work'?'/work':l==='About'?'/about':l==='Blog'?'/blog':'#';return <Link key={l} href={href} onClick={()=>setMenuOpen(false)} style={{fontSize:24,fontWeight:700,color:text,textDecoration:'none',transition:'color .2s ease'}}>{l}</Link>;})}</div>
        </div>

        <div style={{maxWidth:1400,width:'100%',margin:'0 auto',position:'relative',paddingTop:'100px'}}>
          <section style={{padding:'60px 48px 24px'}}>
            <div style={{fontSize:11,letterSpacing:'0.12em',textTransform:'uppercase',color:text3,marginBottom:10}}>⊂ Photography</div>
            <h1 style={{fontFamily:'Playfair Display,serif',fontSize:'clamp(48px,5.5vw,72px)',fontWeight:900,lineHeight:1.08,margin:'0 0 14px',color:text}}>
              Seeing the<br />
              <span style={{fontStyle:'italic'}}>world precisely</span>
            </h1>
            <p style={{fontSize:15,color:text2,lineHeight:1.8,maxWidth:760}}>Documentary and editorial photography — finding structure, light and meaning in everyday moments.</p>
            <div style={{height:1,background:border,margin:'20px 0'}} />
          </section>

          <section className='series-filter' style={{display:'flex',gap:12,flexWrap:'wrap',padding:'0 48px 24px'}}>
            {seriesOptions.map((s)=> <button key={s} onClick={()=>setActiveSeries(s)} className={`series-pill ${activeSeries===s?'active':''}`} style={{cursor:'none'}}>{s}</button>)}
          </section>

          <section style={{padding:'0 48px 40px'}}>
            <div className='masonry'>
              {filteredPhotos.map((photo,index)=>(
                <div key={photo.id} className='photo-card' style={{height:photo.height,background:photo.fill}} onClick={()=>openLightbox(index)}>
                  <div className='photo-overlay'>
                    <div style={{fontFamily:'Playfair Display,serif',fontSize:16,color:'#fff'}}>{photo.title}</div>
                    <div style={{fontSize:12,color:'#ddd',textTransform:'uppercase',letterSpacing:'.08em'}}>{photo.series}</div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className='bottom-strip' style={{padding:'32px 48px',borderTop:`1px solid ${border}`,borderBottom:`1px solid ${border}`,textAlign:'center'}}>
            <div style={{fontFamily:'Playfair Display,serif',fontSize:20,color:text}}>All photography by Philip Ajibade</div>
            <div style={{fontSize:13,color:text3,margin:'8px 0'}}>Available for editorial and documentary commissions</div>
            <Link href='/hire' style={{fontSize:13,color:accent,textDecoration:'none',fontWeight:700}}>Get in touch →</Link>
          </section>
        </div>

        {!lightboxOpen ? null : (
          <div className='lightbox' onClick={closeLightbox}>
            <div className='lightbox-content' onClick={(e)=>e.stopPropagation()}>
              {activePhoto && (
                <>
                  <div style={{width:'auto',height:'80vh',borderRadius:4,background:activePhoto.fill,position:'relative',minWidth:'320px',minHeight:'200px'}} />
                  <div className='lightbox-meta'>
                    <div style={{fontFamily:'Playfair Display,serif',fontSize:18,color:'#fff'}}>{activePhoto.title}</div>
                    <div style={{fontSize:12,color:'#ccc',textTransform:'uppercase',letterSpacing:'.08em'}}>{activePhoto.series}</div>
                  </div>
                </>
              )}
              <button className='lightbox-btn lightbox-close' onClick={closeLightbox} style={{cursor:'none'}}>✕</button>
              <button className='lightbox-btn lightbox-prev' onClick={prevPhoto} style={{cursor:'none'}}>←</button>
              <button className='lightbox-btn lightbox-next' onClick={nextPhoto} style={{cursor:'none'}}>→</button>
            </div>
          </div>
        )}

        <div style={{position:'fixed',bottom:20,left:'50%',transform:'translateX(-50%)',display:'flex',flexDirection:'column',alignItems:'center',gap:'6px',zIndex:50,pointerEvents:'none',opacity:showScroll?1:0,transition:'opacity .4s'}}>
          <div style={{width:1,height:28,background:`linear-gradient(to bottom,${accent},transparent)`,animation:'scrollDrop 2s ease-in-out infinite'}} />
          <span style={{fontSize:9,letterSpacing:'0.2em',textTransform:'uppercase',color:text3}}>Scroll</span>
        </div>

        <footer style={{borderTop:`1px solid ${border}`,padding:'80px 48px 40px',position:'relative',zIndex:1}}>
          <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:28,alignItems:'start'}}>
            <div>
              <div style={{fontFamily:'Playfair Display,serif',fontSize:14,fontWeight:700,color:text}}>Philip Ajibade</div>
              <div style={{fontSize:11,color:text3,marginTop:4}}>Designer</div>
            </div>
            <div style={{display:'flex',flexDirection:'column',gap:10}}>
              <div><div style={{fontSize:10,color:text3,letterSpacing:'.05em'}}>Say hi</div><a href='mailto:hello@philipajibade.com' style={{fontSize:13,color:text,textDecoration:'none'}}>hello@philipajibade.com</a></div>
              <div><div style={{fontSize:10,color:text3,letterSpacing:'.05em'}}>Connect</div><a href='https://linkedin.com/in/philip-ajibade' target='_blank' rel='noreferrer' style={{fontSize:13,color:text,textDecoration:'none'}}>linkedin.com/in/philip-ajibade</a></div>
            </div>
          </div>
          <div style={{marginTop:40,textAlign:'center',fontSize:10,color:text3}}>All rights reserved © Philip Ajibade {new Date().getFullYear()}</div>
        </footer>
      </div>
    </>
  );
}
