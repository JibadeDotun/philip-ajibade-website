'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';

export default function HirePage() {
  const [light, setLight] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [showScroll, setShowScroll] = useState(true);

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const cursorRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const symRef = useRef<HTMLDivElement>(null);

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

  const hoverSymbols = ['∇', '∫', '∑', '∂', 'φ', '∞', '∴', '∵', 'π', 'λ', 'δ', '∈', '⊂', '≡', '∮'];
  const handleHoverEnter = (el: HTMLElement) => {
    el.dataset.hovered = 'true';
    document.body.classList.add('cursor-hover');
    if (symRef.current) {
      symRef.current.style.opacity = '1';
      symRef.current.textContent = hoverSymbols[Math.floor(Math.random() * hoverSymbols.length)];
    }
  };
  const handleHoverLeave = (el: HTMLElement) => {
    delete el.dataset.hovered;
    document.body.classList.remove('cursor-hover');
    if (symRef.current) symRef.current.style.opacity = '0';
  };

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      if (cursorRef.current) {
        cursorRef.current.style.left = e.clientX + 'px';
        cursorRef.current.style.top = e.clientY + 'px';
      }
      if (ringRef.current) {
        ringRef.current.style.left = e.clientX + 'px';
        ringRef.current.style.top = e.clientY + 'px';
      }
    };
    window.addEventListener('mousemove', onMove);
    let animId: number;
    const animRing = () => {
      animId = requestAnimationFrame(animRing);
    };
    animRing();
    return () => {
      window.removeEventListener('mousemove', onMove);
      cancelAnimationFrame(animId);
    };
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const draw = () => {
      const W = window.innerWidth;
      const H = window.innerHeight;
      canvas.width = W;
      canvas.height = H;
      ctx.clearRect(0, 0, W, H);
      ctx.fillStyle = light ? '#1a1a18' : '#f0ede6';
      ctx.font = '11px "DM Sans", monospace';
      ctx.textAlign = 'center';
      const exprs = [
        '∇f(x,y)=0',
        '∫₀^∞e⁻ˣdx=1',
        'φ=(1+√5)/2',
        'eⁱᵖⁱ+1=0',
        '∑ᵢ₌₁ⁿi=n(n+1)/2',
        'd/dx[xⁿ]=nxⁿ⁻¹',
        'P(A|B)=P(B|A)P(A)/P(B)',
        '∂u/∂t=α∂²u/∂x²',
        'lim sin(x)/x=1',
        'det(A)≠0',
        '∀ε>0∃δ>0',
        'n!=n·(n-1)!',
        'rank(M)=n',
        'aᵀa=I',
      ];
      ctx.globalAlpha = 0.3;
      for (let x = 70; x < W; x += 70)
        for (let y = 70; y < H; y += 70) {
          ctx.beginPath();
          ctx.arc(x, y, 0.9, 0, Math.PI * 2);
          ctx.fill();
        }
      ctx.globalAlpha = 0.55;
      exprs.forEach((e, i) => {
        const fx = ((Math.sin(i * 2.4 + 7) * 0.5 + 0.5) * 0.86 + 0.07) * W;
        const fy = ((Math.cos(i * 1.8 + 3) * 0.5 + 0.5) * 0.86 + 0.07) * H;
        ctx.save();
        ctx.translate(fx, fy);
        ctx.rotate(Math.sin(i * 1.1) * 0.1);
        ctx.fillText(e, 0, 0);
        ctx.restore();
      });
      ctx.globalAlpha = 1;
    };

    draw();
    window.addEventListener('resize', draw);
    return () => window.removeEventListener('resize', draw);
  }, [light]);

  const bg = light ? '#f5f3ee' : '#0c0c0b';
  const border = light ? 'rgba(0,0,0,0.07)' : 'rgba(255,255,255,0.07)';
  const text = light ? '#1a1a18' : '#f0ede6';
  const text2 = light ? '#6b6960' : '#9c9a90';
  const text3 = light ? '#b8b6ae' : '#3e3d38';
  const accent = light ? '#4a7200' : '#c8f565';
  const bg2 = light ? '#f0ede6' : '#1a1a18';
  const cardBg = light ? '#e9e7e2' : '#1b1b19';

  return (
    <>
      <style>{`
        *,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
        html{scroll-behavior:smooth}
        body{cursor:none;overflow-x:hidden;font-family:'DM Sans',sans-serif;font-weight:300;line-height:1.6}
        #cur{position:fixed;width:8px;height:8px;border-radius:50%;pointer-events:none;z-index:9999;transform:translate(-50%,-50%);mix-blend-mode:difference;transition:width .2s,height .2s}
        #ring{position:fixed;width:32px;height:32px;border-radius:50%;pointer-events:none;z-index:9998;transform:translate(-50%,-50%);transition:width .35s,height .35s,opacity .3s;opacity:0.4}
        #sym{position:fixed;font-family:'Playfair Display',serif;font-style:italic;font-size:12px;pointer-events:none;z-index:9997;transform:translate(14px,-18px);opacity:0;transition:opacity .25s;white-space:nowrap}
        .anim-1{opacity:1;transform:translateY(0)}
        .reveal{opacity:1;transform:translateY(0)}
        .step-card{border-top:1px solid ${accent};padding:24px;}
        .step-card h3{font-family:'Playfair Display',serif;font-size:16px;font-weight:700;margin:8px 0;color:${text}}
        .input-label{font-size:10px;text-transform:uppercase;letter-spacing:.1em;color:${text3};margin-bottom:6px;}
        .input-field{width:100%;background:${bg2};border:1px solid ${border};padding:12px 16px;border-radius:2px;color:${text};font-family:'DM Sans',sans-serif;font-size:14px;}
        .input-field:focus{outline:none;border-color:${accent}}
        @media (max-width:767px){body{cursor:auto!important}#cur,#ring,#sym{display:none!important}.nav{padding:16px 20px !important}.nav-links{display:none !important}.hamburger{display:block !important;padding-left:20px !important}.theme-toggle{display:none !important}.logo-wrapper{display:none !important}.nav-actions{justify-content:flex-end}.hero{padding:130px 20px 20px 20px!important}.hero-inner{grid-template-columns:1fr!important}.process-grid{grid-template-columns:1fr!important}.contact-columns{grid-template-columns:1fr!important}.cv-cta{flex-direction:column;align-items:flex-start}.cv-cta button{width:100%}}
        @media (min-width:768px){.mobile-theme-toggle{display:none!important}}
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
              {['Work', 'About', 'Photography', 'Blog'].map((l) => (
                <Link key={l} href={l === 'Work' ? '/work' : l === 'About' ? '/about' : '#'} onMouseEnter={(e) => { handleHoverEnter(e.currentTarget as HTMLElement); (e.currentTarget as HTMLElement).style.color = text; }} onMouseLeave={(e) => { handleHoverLeave(e.currentTarget as HTMLElement); (e.currentTarget as HTMLElement).style.color = text2; }} style={{ fontSize: 12, fontWeight: 400, letterSpacing: '0.1em', textTransform: 'uppercase', color: text2, textDecoration: 'none', transition: 'color .2s ease' }}>{l}</Link>
              ))}
            </div>
            <div className="nav-actions" style={{ display: 'flex', alignItems: 'center', gap: 14, order: 4 }}>
              <button className="theme-toggle" onClick={() => setLight((l) => !l)} style={{ width: 34, height: 34, borderRadius: '50%', background: 'transparent', border: `1px solid ${border}`, cursor: 'none', color: text2, fontSize: 13, display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'border-color .2s,color .2s' }}>{light ? '☾' : '☀'}</button>
              <Link href="/hire" onMouseEnter={(e) => { handleHoverEnter(e.currentTarget as HTMLElement); (e.currentTarget as HTMLElement).style.opacity = '0.85'; }} onMouseLeave={(e) => { handleHoverLeave(e.currentTarget as HTMLElement); (e.currentTarget as HTMLElement).style.opacity = '1'; }} style={{ fontSize: 11, fontWeight: 500, letterSpacing: '0.12em', textTransform: 'uppercase', color: bg, background: accent, padding: '9px 20px', borderRadius: 2, textDecoration: 'none', transition: 'opacity .2s ease', cursor: 'none' }}>Hire me</Link>
            </div>
          </div>
        </nav>

        <button className="mobile-theme-toggle" onClick={() => setLight((l) => !l)} style={{ position: 'fixed', bottom: '24px', right: '20px', zIndex: 90, width: 34, height: 34, borderRadius: '50%', border: `1px solid ${border}`, background: 'transparent', color: text, cursor: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{light ? '☾' : '☀'}</button>

        <div className="mobile-menu-overlay" style={menuOpen ? { display: 'flex', opacity: 1, visibility: 'visible', pointerEvents: 'auto', position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.95)', zIndex: 999, alignItems: 'center', justifyContent: 'center', transition: 'opacity .2s ease,visibility .2s ease' } : { display: 'none', opacity: 0, visibility: 'hidden', pointerEvents: 'none' }}>
          <button className="mobile-menu-close" onClick={() => setMenuOpen(false)} style={{ position: 'absolute', top: 20, right: 24, fontSize: 24, border: 'none', background: 'transparent', color: text, cursor: 'none' }}>✕</button>
          <button className="theme-toggle-mobile" onClick={() => setLight((l) => !l)} style={{ position: 'absolute', top: 20, left: 24, fontSize: 22, border: 'none', background: 'transparent', color: text, cursor: 'none' }}>{light ? '☾' : '☀'}</button>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%', gap: 22 }}>
            {['Work', 'About', 'Photography', 'Blog'].map((l) => (
              <Link key={l} href={l === 'Work' ? '/work' : l === 'About' ? '/about' : '#'} onClick={() => setMenuOpen(false)} style={{ fontSize: 24, fontWeight: 700, color: text, textDecoration: 'none', transition: 'color .2s ease' }}>{l}</Link>
            ))}
          </div>
        </div>

        <div className="page-inner" style={{ maxWidth: 1400, width: '100%', margin: '0 auto', position: 'relative', paddingTop: '100px' }}>
          <section className="hero" style={{ display: 'grid', gridTemplateColumns: '1fr', gap: 24, padding: '56px 48px' }}>
            <div style={{ maxWidth: 760 }}>
              <div style={{ fontSize: 11, letterSpacing: '0.12em', textTransform: 'uppercase', color: text3, marginBottom: 10 }}>→ Work with me</div>
              <h1 style={{ fontFamily: 'Playfair Display,serif', fontSize: 'clamp(48px,5.5vw,72px)', fontWeight: 900, margin: '0 0 14px', lineHeight: 1.08, color: text }}>
                Let's build<br />
                <span style={{ fontStyle: 'italic' }}>something great</span>
              </h1>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, margin: '12px 0' }}>
                <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#4caf50', animation: 'pulse 1.4s infinite' }} />
                <span style={{ fontSize: 13, color: text }}>Currently available for new projects</span>
              </div>
              <p style={{ fontSize: 15, color: text2, marginTop: 6 }}>Senior design roles · Consulting engagements · Freelance projects</p>
            </div>
          </section>

          <section style={{ padding: '40px 48px', marginBottom: 40 }}>
            <div style={{ fontSize: 11, letterSpacing: '.12em', textTransform: 'uppercase', color: text3, marginBottom: 8 }}>f(x) Process</div>
            <h2 style={{ fontFamily: 'Playfair Display,serif', fontSize: 36, margin: '0 0 24px', color: text }}>How we work together</h2>
            <div className="process-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 18 }}>
              {[{
                step: '01',
                title: 'Discovery',
                desc: 'We start with a conversation about your goals, constraints and vision. No briefs, no forms — just a real discussion.',
              }, {
                step: '02',
                title: 'Proposal',
                desc: 'I\'ll send a clear scope of work, timeline and what to expect. Everything defined before we begin.',
              }, {
                step: '03',
                title: 'Design',
                desc: 'Iterative, collaborative design with regular check-ins. You\'re involved throughout, not just at the end.',
              }, {
                step: '04',
                title: 'Delivery',
                desc: 'Polished final files, documentation and a handover that actually makes sense to your team.',
              }].map((item) => (
                <div key={item.step} className="step-card" style={{ background: cardBg, borderRadius: 6 }}>
                  <div style={{ fontFamily: 'Playfair Display,serif', fontStyle: 'italic', fontSize: 18, color: accent }}>{item.step}</div>
                  <h3>{item.title}</h3>
                  <p style={{ fontSize: 13, color: text2, lineHeight: 1.7, margin: 0 }}>{item.desc}</p>
                </div>
              ))}
            </div>
          </section>

          <section style={{ padding: '40px 48px', marginBottom: 40 }}>
            <div className="contact-columns" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 40 }}>
              <div>
                <h2 style={{ fontFamily: 'Playfair Display,serif', fontSize: 28, margin: '0 0 16px', color: text }}>Get in touch</h2>
                <p style={{ fontSize: 15, color: text2, lineHeight: 1.7, marginBottom: 24 }}>Whether you have a project in mind or just want to explore possibilities — I'd love to hear from you.</p>
                <div style={{ marginBottom: 18 }}>
                  <div className="input-label">Email</div>
                  <a href="mailto:hello@philipajibade.com" style={{ fontSize: 15, color: text, textDecoration: 'none' }} onMouseEnter={(e) => (e.currentTarget.style.color = accent)} onMouseLeave={(e) => (e.currentTarget.style.color = text)}>hello@philipajibade.com</a>
                </div>
                <div style={{ marginBottom: 18 }}>
                  <div className="input-label">LinkedIn</div>
                  <a href="https://linkedin.com/in/philip-ajibade" target="_blank" rel="noreferrer" style={{ fontSize: 15, color: text, textDecoration: 'none' }} onMouseEnter={(e) => (e.currentTarget.style.color = accent)} onMouseLeave={(e) => (e.currentTarget.style.color = text)}>linkedin.com/in/philip-ajibade</a>
                </div>
                <p style={{ fontSize: 12, color: text3, fontStyle: 'italic', marginTop: 12 }}>I typically respond within 24 hours.</p>
              </div>

              <div style={{ background: cardBg, border: `1px solid ${border}`, borderRadius: 6, padding: 22 }}>
                <div style={{ marginBottom: 14 }}>
                  <div className="input-label">Name</div>
                  <input className="input-field" type="text" placeholder="Your full name" />
                </div>
                <div style={{ marginBottom: 14 }}>
                  <div className="input-label">Email</div>
                  <input className="input-field" type="email" placeholder="you@example.com" />
                </div>
                <div style={{ marginBottom: 14 }}>
                  <div className="input-label">Subject</div>
                  <input className="input-field" type="text" placeholder="Project name or reason" />
                </div>
                <div style={{ marginBottom: 14 }}>
                  <div className="input-label">What are you looking for?</div>
                  <select className="input-field" style={{ appearance: 'none' }}>
                    {['Interaction Design', 'Data Visualisation', 'Presentation Design', 'Service Design', 'Photography', 'Other'].map((option) => (
                      <option key={option} value={option}>{option}</option>
                    ))}
                  </select>
                </div>
                <div style={{ marginBottom: 16 }}>
                  <div className="input-label">Message</div>
                  <textarea className="input-field" style={{ minHeight: 140, resize: 'vertical' }} placeholder="Tell me about your needs" />
                </div>
                <button style={{ width: '100%', background: accent, color: bg, border: 'none', borderRadius: 2, padding: '12px 16px', textTransform: 'uppercase', letterSpacing: '.08em', fontWeight: 700, cursor: 'none' }}>Send message →</button>
              </div>
            </div>
          </section>

          <section style={{ textAlign: 'center', padding: '40px 20px 80px', borderTop: `1px solid ${border}`, borderBottom: `1px solid ${border}`, marginBottom: 40 }}>
            <div style={{ fontFamily: 'Playfair Display,serif', fontStyle: 'italic', fontSize: 28, color: text, marginBottom: 10 }}>"Good design is not about making things look nice. It's about making things work beautifully."</div>
            <div style={{ fontSize: 12, color: text3 }}>— Philip Ajibade</div>
          </section>
        </div>

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
              <div><div style={{ fontSize: 10, color: text3, letterSpacing: '.05em' }}>Connect</div><a href="#" style={{ fontSize: 13, color: text, textDecoration: 'none' }}>LinkedIn</a></div>
            </div>
          </div>
          <div style={{ marginTop: 40, textAlign: 'center', fontSize: 10, color: text3 }}>All rights reserved © Philip Ajibade {new Date().getFullYear()}</div>
        </footer>
      </div>
    </>
  );
}
