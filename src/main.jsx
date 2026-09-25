import React, { useEffect, useRef, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { ArrowDown, ArrowRight, ArrowUpRight, Menu, MoveRight, X } from 'lucide-react';
import { AnimatePresence, motion, useInView } from 'framer-motion';
import './styles.css';

const email = 'mailto:hello@bridgeit.global?subject=Founding%20partner%20conversation';
const fadeUp = { hidden: { opacity: 0, y: 28 }, visible: { opacity: 1, y: 0 } };
const viewport = { once: true, amount: 0.25 };

function Mark() { return <span className="brand"><span className="brand-bridge">bridge</span><span className="brand-it">it</span><span className="brand-dot">.</span></span>; }
function Eyebrow({ children, light = false }) { return <p className={`eyebrow${light ? ' light' : ''}`}>{children}</p>; }
function Button({ children, href, variant = 'dark' }) { return <a className={`button ${variant}`} href={href}>{children}<ArrowRight size={17} strokeWidth={1.8} /></a>; }

function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => { const listener = () => setScrolled(window.scrollY > 18); window.addEventListener('scroll', listener, { passive: true }); return () => window.removeEventListener('scroll', listener); }, []);
  const links = [['The model', '#model'], ['For universities', '#universities'], ['Principles', '#principles']];
  return <header className={`header ${scrolled ? 'scrolled' : ''}`}><a href="#top" aria-label="Bridgeit home"><Mark /></a><nav className="desktop-nav">{links.map(([label, href]) => <a href={href} key={href}>{label}</a>)}<a className="header-cta" href={email}>Speak with us <ArrowUpRight size={14} /></a></nav><button className="menu" onClick={() => setOpen(!open)} aria-label="Toggle navigation" aria-expanded={open}>{open ? <X /> : <Menu />}</button><AnimatePresence>{open && <motion.nav initial={{ opacity: 0, y: -15 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -15 }} className="mobile-nav">{links.map(([label, href]) => <a href={href} key={href} onClick={() => setOpen(false)}>{label}</a>)}<a href={email}>Speak with us <ArrowUpRight size={17} /></a></motion.nav>}</AnimatePresence></header>;
}

function OrbitArt({ active }) {
  const panel = (delay, from) => ({ initial: false, animate: active ? { opacity: 1, x: 0, y: 0, rotate: 0 } : { opacity: 0, ...from }, transition: { delay: active ? delay : 0, duration: active ? .68 : .35, ease: [0.2, 0.8, 0.2, 1] } });
  return <div className="pathway-art" aria-hidden="true">
    <div className="pathway-glow" /><div className="pathway-grid" />
    <motion.div className="profile-panel" {...panel(.14, { x: 36, y: 0, rotate: 4 })}>
      <div className="profile-panel-head"><span className="profile-avatar">A</span><div><b>Student profile</b><small>Verified pathway</small></div><i>✓</i></div>
      <div className="profile-progress"><span>Profile strength</span><b>92%</b><i><em /></i></div>
      <div className="profile-lines"><span /><span /><span /></div>
      <div className="profile-tags"><b>Academic</b><b>Context</b><b>Ambition</b></div>
    </motion.div>
    <motion.div className="connection-line" initial={false} animate={active ? { scaleX: 1, opacity: 1 } : { scaleX: 0, opacity: 0 }} transition={{ delay: active ? .46 : 0, duration: active ? .52 : .25, ease: 'easeOut' }} />
    <motion.div className="connection-line second-connection" initial={false} animate={active ? { scaleX: 1, opacity: 1 } : { scaleX: 0, opacity: 0 }} transition={{ delay: active ? .56 : 0, duration: active ? .52 : .25, ease: 'easeOut' }} />
    <motion.div className="university-panel" {...panel(.6, { x: -24, y: 0, rotate: 0 })}><span>01</span><b>University<br />ready to meet them.</b><i>↗</i></motion.div>
    <motion.div className="university-panel partner-panel" {...panel(.72, { x: -18, y: 15, rotate: 0 })}><span>02</span><b>Funding aligned<br />with potential.</b><i>✓</i></motion.div>
    <div className="pathway-caption"><span>ONE PORTABLE PROFILE</span><i>→</i><span>MANY POSSIBILITIES</span></div>
  </div>;
}

function Hero() {
  const heroRef = useRef(null); const heroInView = useInView(heroRef, { amount: 0.28 });
  return <section className="hero" id="top" ref={heroRef}><div className="hero-grain" /><div className="hero-meta"><span>Global access, reimagined</span><span className="scroll-cue">Scroll to explore <i /></span></div><div className="hero-copy hero-reveal"><Eyebrow light>A new kind of pathway</Eyebrow><h1>The world’s talent<br />deserves <em>a way in.</em></h1><p>We’re developing the trusted infrastructure that connects extraordinary students, wherever they begin, with universities ready to invest in their potential.</p><div className="hero-actions"><Button href="#universities" variant="lime">For universities</Button><a className="quiet-button" href="#model">Discover the model <ArrowDown size={17} /></a></div></div><OrbitArt active={heroInView} /><div className="hero-foot">Independent by design. Global by default. <span>✦</span></div></section>;
}

function ModelCard({ number, title, children, icon }) { return <motion.article className="model-card" variants={fadeUp} initial="hidden" whileInView="visible" viewport={viewport} transition={{ duration: .65, delay: number * .1 }}><span>{String(number).padStart(2, '0')} / {title.split(' ')[0]}</span><div className={`model-icon ${icon}`}>{icon === 'star' ? '✦' : <><i /><i /><i /></>}</div><h3>{title}</h3><p>{children}</p></motion.article>; }

function Model() { return <section className="model section" id="model"><motion.div className="section-title" initial="hidden" whileInView="visible" viewport={viewport} transition={{ duration: .7 }} variants={fadeUp}><Eyebrow>How it works</Eyebrow><h2>One profile.<br /><em>Real possibility.</em></h2><p>Not an agency. Not a scholarship directory. Shared infrastructure, made for a global reality.</p></motion.div><div className="model-grid"><ModelCard number={1} title="Build once" icon="profile">Students create one holistic, portable profile of academic work, ambitions, context, and financial circumstances.</ModelCard><ModelCard number={2} title="Find fit" icon="star">They discover participating programs and institutions where their potential can become a meaningful match.</ModelCard><ModelCard number={3} title="Connect with trust" icon="link">Universities receive structured, consented applications from students who have actively chosen them.</ModelCard></div></section>; }

function Universities() { return <section className="universities" id="universities"><motion.div className="uni-copy section" initial="hidden" whileInView="visible" viewport={viewport} transition={{ duration: .7 }} variants={fadeUp}><Eyebrow light>For universities</Eyebrow><h2>Open the door<br />wider—<em>on your terms.</em></h2><p>Bridgeit is inviting a small number of founding universities to help define a more rigorous, thoughtful path to global talent.</p><Button href={email} variant="outline">Start a conversation</Button></motion.div><div className="uni-art" aria-hidden="true"><span className="vertical-word">WORLD</span><div className="art-orbit" /><motion.article className="float-card card-left" animate={{ y: [0, -12, 0], rotate: [-5, -3, -5] }} transition={{ repeat: Infinity, duration: 6, ease: 'easeInOut' }}><small>STRUCTURED</small><strong>Talent<br />without borders.</strong></motion.article><motion.article className="float-card card-right" animate={{ y: [0, -14, 0], rotate: [6, 8, 6] }} transition={{ repeat: Infinity, duration: 6, delay: 1, ease: 'easeInOut' }}><small>INDEPENDENT</small><strong>Your standards.<br />Your decisions.</strong></motion.article><span className="stamp">FOUNDING<br />CONVERSATIONS<br /><b>2026</b></span></div></section>; }

function Principles() { const values = [['Student dignity', 'Potential should travel farther than privilege. We design for clarity, agency, and respect.'], ['University independence', 'Bridgeit never makes admissions or financial-aid decisions. Institutions remain in control.'], ['Privacy by design', 'Information is collected intentionally, safeguarded rigorously, and shared only with consent.']]; return <section className="principles section" id="principles"><motion.div initial="hidden" whileInView="visible" viewport={viewport} variants={fadeUp}><Eyebrow>Non-negotiables</Eyebrow><h2>Built on<br /><em>earned trust.</em></h2></motion.div><div className="principle-list">{values.map(([title, copy], index) => <motion.article key={title} initial="hidden" whileInView="visible" viewport={viewport} variants={fadeUp} transition={{ delay: index * .1 }}><span>0{index + 1}</span><div><h3>{title}</h3><p>{copy}</p></div><MoveRight size={18} /></motion.article>)}</div></section>; }

function Invitation() { return <motion.section className="invitation" initial="hidden" whileInView="visible" viewport={viewport} variants={fadeUp}><div className="invitation-rings" /><Eyebrow>Pre-pilot · 2026</Eyebrow><h2>Good systems begin<br />with better questions.</h2><p>There is no public platform or partner network yet. We’re doing the essential early work—listening to universities, defining a responsible pilot, and building what the evidence says matters.</p><Button href={email}>Become a founding voice</Button></motion.section>; }
function Footer() { return <footer><a href="#top" aria-label="Back to top"><Mark /></a><p>Building the missing bridge between global talent and higher education.</p><a className="footer-email" href="mailto:hello@bridgeit.global">hello@bridgeit.global <ArrowUpRight size={15} /></a><small>© 2026 Bridgeit. An independent pre-launch initiative.</small></footer>; }
function App() { return <><Header /><main><Hero /><section className="manifesto section"><motion.div initial="hidden" whileInView="visible" viewport={viewport} variants={fadeUp}><Eyebrow>The gap we are here to close</Eyebrow><h2>Ambition is universal.<br /><em>Access is not.</em></h2></motion.div><motion.div className="manifesto-copy" initial="hidden" whileInView="visible" viewport={viewport} variants={fadeUp} transition={{ delay: .15 }}><p>Exceptional students should not have to navigate dozens of disconnected systems alone—or have their futures determined by where they happened to be born.</p><p>Bridgeit is designing a more coherent route: one that respects student ambition and university autonomy in equal measure.</p></motion.div></section><Model /><Universities /><Principles /><Invitation /></main><Footer /></>; }
createRoot(document.getElementById('root')).render(<App />);
