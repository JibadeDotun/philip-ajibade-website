'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';

const posts = [
  { slug:'design-and-mathematics', title:'Where design meets mathematics', excerpt:'The tools of mathematical thinking — abstraction, proof, structure — are more useful to designers than most realise.', category:'Mathematics & Design', date:'March 2025', readTime:'6 min read' },
  { slug:'complexity-to-clarity', title:'From complexity to clarity: a design framework', excerpt:'Every complex problem has a structure underneath it. The designer\'s job is to find that structure and make it visible.', category:'Design Thinking', date:'February 2025', readTime:'8 min read' },
  { slug:'unbanked-by-design', title:'Unbanked by design: lessons from fintech in Nigeria', excerpt:'Designing for users without smartphones, reliable data or government ID taught me more about UX than any textbook.', category:'Case Study', date:'January 2025', readTime:'10 min read' },
  { slug:'systems-thinking-designer', title:'Why every designer should think in systems', excerpt:'Surface-level design solves surface-level problems. Systems thinking is what separates good design from great design.', category:'Design Thinking', date:'December 2024', readTime:'5 min read' },
  { slug:'mathematics-of-good-typography', title:'The mathematics of good typography', excerpt:'Type is not decoration. It is a system of relationships — ratios, scales, rhythm — that can be reasoned about precisely.', category:'Mathematics & Design', date:'November 2024', readTime:'7 min read' },
];

export default function BlogPage() {
  const [light, setLight] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [showScroll, setShowScroll] = useState(true);

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const cursorRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const symRef = useRef<HTMLDivElement>(null);

  useEffect(() => { const handleNavScroll=()=>setScrolled(window.scrollY>40); window.addEventListener('scroll', handleNavScroll); handleNavScroll(); return ()=>window.removeEventListener('scroll', handleNavScroll); }, []);
  useEffect(() => { const handleScrollHint=()=>{const scrollY=window.scrollY;const windowHeight=window.innerHeight;const docHeight=document.documentElement.scrollHeight;const distanceFromBottom=docHeight-scrollY-windowHeight;const pastHero=scrollY>windowHeight*0.8;const nearBottom=distanceFromBottom<300;setShowScroll(!pastHero&&!nearBottom);}; window.addEventListener('scroll',handleScrollHint);handleScrollHint();return()=>window.removeEventListener('scroll',handleScrollHint);} , []);

  const hoverSymbols=['∇','∫','∑','∂','φ','∞','∴','∵','π','λ','δ','∈','⊂','≡','∮'];
  const handleHoverEnter=(el:HTMLElement)=>{el.dataset.hovered='true';document.body.classList.add('cursor-hover');if(symRef.current){symRef.current.style.opacity='1';symRef.current.textContent=hoverSymbols[Math.floor(Math.random()*hoverSymbols.length)];}};
  const handleHoverLeave=(el:HTMLElement)=>{delete el.dataset.hovered;document.body.classList.remove('cursor-hover');if(symRef.current) symRef.current.style.opacity='0';};

  useEffect(()=>{const onMove=(e:MouseEvent)=>{if(cursorRef.current){cursorRef.current.style.left=e.clientX+'px';cursorRef.current.style.top=e.clientY+'px';} if(ringRef.current){ringRef.current.style.left=e.clientX+'px';ringRef.current.style.top=e.clientY+'px';}};window.addEventListener('mousemove',onMove);let animId:number;const animRing=()=>{animId=requestAnimationFrame(animRing);};animRing();return()=>{window.removeEventListener('mousemove',onMove);cancelAnimationFrame(animId);};},[]);
  useEffect(()=>{const canvas=canvasRef.current; if(!canvas)return; const ctx=canvas.getContext('2d'); if(!ctx)return; const draw=()=>{const W=window.innerWidth; const H=window.innerHeight; canvas.width=W; canvas.height=H; ctx.clearRect(0,0,W,H); ctx.fillStyle=light?'#1a1a18':'#f0ede6'; ctx.font='11px "DM Sans", monospace'; ctx.textAlign='center'; const exprs=['∇f(x,y)=0','∫₀^∞e⁻ˣdx=1','φ=(1+√5)/2','eⁱᵖⁱ+1=0','∑ᵢ₌₁ⁿi=n(n+1)/2','d/dx[xⁿ]=nxⁿ⁻¹','P(A|B)=P(B|A)P(A)/P(B)','∂u/∂t=α∂²u/∂x²','lim sin(x)/x=1','det(A)≠0','∀ε>0∃δ>0','n!=n·(n-1)!','rank(M)=n','aᵀa=I']; ctx.globalAlpha=0.3; for(let x=70;x<W;x+=70)for(let y=70;y<H;y+=70){ctx.beginPath();ctx.arc(x,y,0.9,0,Math.PI*2);ctx.fill();} ctx.globalAlpha=0.55; exprs.forEach((e,i)=>{const fx=((Math.sin(i*2.4+7)*0.5+0.5)*0.86+0.07)*W; const fy=((Math.cos(i*1.8+3)*0.5+0.5)*0.86+0.07)*H; ctx.save(); ctx.translate(fx,fy); ctx.rotate(Math.sin(i*1.1)*0.1); ctx.fillText(e,0,0); ctx.restore();}); ctx.globalAlpha=1;}; draw(); window.addEventListener('resize',draw); return()=>window.removeEventListener('resize',draw);},[light]);

  const bg = light ? '#f5f3ee' : '#0c0c0b';
  const border = light ? 'rgba(0,0,0,0.07)' : 'rgba(255,255,255,0.07)';
  const text = light ? '#1a1a18' : '#f0ede6';
  const text2 = light ? '#6b6960' : '#9c9a90';
  const text3 = light ? '#b8b6ae' : '#3e3d38';
  const accent = light ? '#4a7200' : '#c8f565';
  const bg3 = light ? '#e9e7e2' : '#1c1c1a';
  const bg2 = light ? '#f0ede6' : '#1a1a18';

  return (
    <>
      <style>{`
        *,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
        html{scroll-behavior:smooth}
        body{cursor:none;overflow-x:hidden;font-family:'DM Sans',sans-serif;font-weight:300;line-height:1.6}
        #cur{position:fixed;width:8px;height:8px;border-radius:50%;pointer-events:none;z-index:9999;transform:translate(-50%,-50%);mix-blend-mode:difference;transition:width .2s,height .2s}
        #ring{position:fixed;width:32px;height:32px;border-radius:50%;pointer-events:none;z-index:9998;transform:translate(-50%,-50%);transition:width .35s,height .35s,opacity .3s;opacity:0.4}
        #sym{position:fixed;font-family:'Playfair Display',serif;font-style:italic;font-size:12px;pointer-events:none;z-index:9997;transform:translate(14px,-18px);opacity:0;transition:opacity .25s;white-space:nowrap}
        .post-row{display:flex;justify-content:space-between;align-items:flex-start;gap:14px;padding:28px 0;border-bottom:1px solid ${border};transition:all .25s ease;text-decoration:none;color:inherit}
        .post-row:hover{background:${bg3};border-left:3px solid ${accent};padding-left:14px}
        .post-meta{display:flex;flex-direction:column;align-items:flex-end;gap:4px;text-align:right}
        .post-meta span{color:${text3}}
        .newsletter{display:flex;gap:10px;align-items:center;justify-content:center;margin-top:24px;flex-wrap:wrap}
        .newsletter input{background:${bg2};border:1px solid ${border};padding:12px 16px;border-radius:2px;color:${text};font-family:'DM Sans',sans-serif;font-size:14px;width:260px;}
        .newsletter button{background:${accent};color:${bg};border:none;border-radius:2px;padding:12px 18px;cursor:none;}
        @media (max-width:767px){body{cursor:auto!important}#cur,#ring,#sym{display:none!important}.nav{padding:16px 20px !important}.nav-links{display:none !important}.hamburger{display:block !important;padding-left:20px !important}.theme-toggle{display:none !important}.logo-wrapper{display:none !important}.nav-actions{justify-content:flex-end}.hero{padding:130px 20px 20px 20px!important}.hero-inner{grid-template-columns:1fr!important}.post-row{flex-direction:column;align-items:flex-start}.post-meta{align-items:flex-start;text-align:left}.newsletter{flex-direction:column;align-items:stretch}.newsletter input{width:100%!important}}@media (min-width:768px){.mobile-theme-toggle{display:none!important}}
      `}</style>

      <div id="cur" ref={cursorRef} style={{ background: accent }} />
      <div id="ring" ref={ringRef} style={{ border: `1px solid ${accent}` }} />
      <div id="sym" ref={symRef} style={{ color: accent }} />
      <canvas ref={canvasRef} style={{ position: 'fixed', inset: 0, width: '100%', height: '100%', pointerEvents: 'none', opacity: light ? 0.055 : 0.04, zIndex: 0, transition: 'opacity .4s' }} />

      <div style={{ background: bg, color: text, minHeight: '100vh', position: 'relative', transition: 'background .4s,color .4s' }}>
        <nav className="nav" style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100, background: scrolled ? (light ? 'rgba(245,243,238,0.9)' : 'rgba(12,12,11,0.88)') : 'transparent', borderBottom: `1px solid ${scrolled ? border : 'transparent'}`, backdropFilter: scrolled ? 'blur(18px)' : 'none', transition: 'all .3s' }}>
          <div className="nav-inner" style={{ padding: '22px 20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 24 }}>
            <button className="hamburger" onClick={() => setMenuOpen((o) => !o)} style={{ border: 'none', background: 'transparent', color: text3, fontSize: 22, cursor: 'none', display: 'none' }} aria-label="Open menu">☰</button>
            <Link className="logo-wrapper" href='/' style={{ textDecoration: 'none', color: 'inherit', cursor: 'none' }}><img src="/logo.svg" height="36" alt="P.Ajibade" style={{ height: 36, width: 'auto', display: 'block', filter: light ? 'brightness(0)' : 'brightness(0) invert(1) opacity(0.7)' }} /></Link>
            <div className="nav-links" style={{ display: 'flex', gap: 36, order: 3 }}>
              {['Work', 'Photography', 'Blog', 'About'].map((l) => {
                const href = l === 'Work' ? '/work' : l === 'About' ? '/about' : l === 'Blog' ? '/blog' : '#';
                return <Link key={l} href={href} onMouseEnter={(e) => { handleHoverEnter(e.currentTarget as HTMLElement); (e.currentTarget as HTMLElement).style.color = text; }} onMouseLeave={(e) => { handleHoverLeave(e.currentTarget as HTMLElement); (e.currentTarget as HTMLElement).style.color = text2; }} style={{ fontSize: 12, fontWeight: 400, letterSpacing: '0.1em', textTransform: 'uppercase', color: text2, textDecoration: 'none', transition: 'color .2s ease' }}>{l}</Link>;
              })}
            </div>
            <div className="nav-actions" style={{ display: 'flex', alignItems: 'center', gap: 14, order: 4 }}>
              <button className="theme-toggle" onClick={() => setLight((l) => !l)} style={{ width: 34, height: 34, borderRadius: '50%', background: 'transparent', border: `1px solid ${border}`, cursor: 'none', color: text2, fontSize: 13, display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'border-color .2s,color .2s' }}>{light ? '☾' : '☀'}</button>
              <Link href="/hire" onMouseEnter={(e) => { handleHoverEnter(e.currentTarget as HTMLElement); (e.currentTarget as HTMLElement).style.opacity = '0.85'; }} onMouseLeave={(e) => { handleHoverLeave(e.currentTarget as HTMLElement); (e.currentTarget as HTMLElement).style.opacity = '1'; }} style={{ fontSize: 11, fontWeight: 500, letterSpacing: '0.12em', textTransform: 'uppercase', color: bg, background: accent, padding: '9px 20px', borderRadius: 2, textDecoration: 'none', transition: 'opacity .2s ease', cursor: 'none' }}>Hire me</Link>
            </div>
          </div>
        </nav>

        <button className="mobile-theme-toggle" onClick={() => setLight((l) => !l)} style={{ position: 'fixed', bottom: '24px', right: '20px', zIndex: 90, width: 34, height: 34, borderRadius: '50%', border: `1px solid ${border}`, background: 'transparent', color: text, cursor: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{light ? '☾' : '☀'}</button>

        <div className={`mobile-menu-overlay ${menuOpen ? 'open' : ''}`} style={menuOpen ? { display: 'flex', opacity: 1, visibility: 'visible', pointerEvents: 'auto', position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.95)', zIndex: 999, alignItems: 'center', justifyContent: 'center', transition: 'opacity .2s ease,visibility .2s ease' } : { display: 'none', opacity: 0, visibility: 'hidden', pointerEvents: 'none' }}>
          <button className="mobile-menu-close" onClick={() => setMenuOpen(false)} style={{ position: 'absolute', top: 20, right: 24, fontSize: 24, border: 'none', background: 'transparent', color: text, cursor: 'none' }}>✕</button>
          <button className="theme-toggle-mobile" onClick={() => setLight((l) => !l)} style={{ position: 'absolute', top: 20, left: 24, fontSize: 22, border: 'none', background: 'transparent', color: text, cursor: 'none' }}>{light ? '☾' : '☀'}</button>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%', gap: 22 }}>
            {['Work', 'Photography', 'Blog', 'About'].map((l) => {
              const href = l === 'Work' ? '/work' : l === 'About' ? '/about' : l === 'Blog' ? '/blog' : '#';
              return <Link key={l} href={href} onClick={() => setMenuOpen(false)} style={{ fontSize: 24, fontWeight: 700, color: text, textDecoration: 'none', transition: 'color .2s ease' }}>{l}</Link>;
            })}
          </div>
        </div>

        <div className="page-inner" style={{ maxWidth: 1400, width: '100%', margin: '0 auto', position: 'relative', paddingTop: '100px' }}>
          <section className="hero" style={{ padding: '60px 48px 24px', marginBottom: 30 }}>
            <div style={{ maxWidth: 760 }}>
              <div style={{ fontSize: 11, letterSpacing: '0.12em', textTransform: 'uppercase', color: text3, marginBottom: 10 }}>∂ Blog</div>
              <h1 style={{ fontFamily: 'Playfair Display,serif', fontSize: 'clamp(48px,5.5vw,72px)', fontWeight: 900, margin: '0 0 16px', lineHeight: 1.08, color: text }}>
                Writing on<br />
                <span style={{ fontStyle: 'italic' }}>design & mathematics</span>
              </h1>
              <p style={{ fontSize: 15, color: text2, lineHeight: 1.8 }}>Thoughts on design thinking, mathematics, industry and the space where they meet.</p>
              <div style={{ height: 1, background: border, marginTop: 20 }} />
            </div>
          </section>

          <section style={{ padding: '0 48px', marginBottom: 40 }}>
            {posts.map((post) => (
              <Link key={post.slug} href={`/blog/${post.slug}`} className="post-row" style={{ textDecoration: 'none' }}>
                <div style={{ minWidth: 0 }}>
                  <div style={{ fontSize: 10, textTransform: 'uppercase', letterSpacing: '.1em', color: accent, marginBottom: 6 }}>{post.category}</div>
                  <div style={{ fontFamily: 'Playfair Display,serif', fontSize: 22, color: text, marginBottom: 6 }}>{post.title}</div>
                  <div style={{ fontSize: 13, color: text2, lineHeight: 1.5 }}>{post.excerpt}</div>
                </div>
                <div className="post-meta">
                  <span style={{ fontSize: 12 }}>{post.date}</span>
                  <span style={{ fontSize: 11 }}>{post.readTime} →</span>
                </div>
              </Link>
            ))}
          </section>

          <section style={{ padding: '30px 48px', borderTop: `1px solid ${border}`, borderBottom: `1px solid ${border}`, marginBottom: 40, textAlign: 'center' }}>
            <h3 style={{ fontFamily: 'Playfair Display,serif', fontSize: 24, marginBottom: 8, color: text }}>Stay in the loop</h3>
            <p style={{ fontSize: 14, color: text2, marginBottom: 16 }}>New essays on design, mathematics and craft. No noise.</p>
            <div className="newsletter">
              <input type="email" placeholder="Your email address" />
              <button>Subscribe</button>
            </div>
          </section>

          <div className="anim-9" style={{ position: 'fixed', bottom: 20, left: '50%', transform: 'translateX(-50%)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px', zIndex: 50, pointerEvents: 'none', opacity: showScroll ? 1 : 0, transition: 'opacity .4s' }}>
            <div style={{ width: 1, height: 28, background: `linear-gradient(to bottom,${accent},transparent)`, animation: 'scrollDrop 2s ease-in-out infinite' }} />
            <span style={{ fontSize: 9, letterSpacing: '0.2em', textTransform: 'uppercase', color: text3 }}>Scroll</span>
          </div>

          <footer style={{ borderTop: `1px solid ${border}`, padding: '80px 48px 40px', position: 'relative', zIndex: 1 }}>
            <div className="footer-bottom-row" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 28, alignItems: 'start' }}>
              <div>
                <div style={{ fontFamily: 'Playfair Display,serif', fontSize: 14, fontWeight: 700, color: text }}>Philip Ajibade</div>
                <div style={{ fontSize: 11, color: text3, marginTop: 4 }}>Designer</div>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                <div><div style={{ fontSize: 10, color: text3, letterSpacing: '.05em' }}>Say hi</div><a href="mailto:hello@philipajibade.com" style={{ fontSize: 13, color: text, textDecoration: 'none' }}>hello@philipajibade.com</a></div>
                <div><div style={{ fontSize: 10, color: text3, letterSpacing: '.05em' }}>Connect</div><a href="https://linkedin.com/in/philip-ajibade" target="_blank" rel="noreferrer" style={{ fontSize: 13, color: text, textDecoration: 'none' }}>linkedin.com/in/philip-ajibade</a></div>
              </div>
            </div>
            <div style={{ marginTop: 40, textAlign: 'center', fontSize: 10, color: text3 }}>All rights reserved © Philip Ajibade {new Date().getFullYear()}</div>
          </footer>
        </div>
      </div>
    </>
  );
}
