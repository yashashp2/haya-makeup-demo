import { useEffect, useRef, useState } from 'react'
import { ArrowDown, ArrowRight, ArrowUpRight, Camera as Instagram, MapPin, Menu, Sparkles, X } from 'lucide-react'
import EnquiryForm from './components/EnquiryForm'
import { asset, services, social } from './data/content'

const nav = ['Home', 'About', 'Services', 'Portfolio', 'Contact']
const looks = [
  { name: 'The bridal edit', category: 'Bridal', file: 'bridal.jpg', alt: 'Illustrative bridal makeup with sculpted waves and a delicate hair accessory' },
  { name: 'Soft, luminous, you', category: 'Soft glam', file: 'soft-glam.jpg', alt: 'Illustrative soft glam bridal portrait with luminous skin and neutral lips' },
  { name: 'A little more glamour', category: 'Full glam', file: 'glam.jpg', alt: 'Illustrative beauty portrait with warm pink makeup' },
  { name: 'The finishing touch', category: 'Hair', file: 'hair.jpg', alt: 'Illustrative romantic brunette updo with loose curls' },
]

function Photo({ file, alt, className = '' }: { file: string; alt: string; className?: string }) {
  return <figure className={`photo ${className}`}><img src={asset(file)} alt={alt} width={1000} height={1500} loading="lazy" /><figcaption>ILLUSTRATIVE IMAGE · NOT HAYA’S WORK</figcaption></figure>
}

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [filter, setFilter] = useState('All looks')
  const menuButton = useRef<HTMLButtonElement>(null)
  useEffect(() => {
    function close(event: KeyboardEvent) { if (event.key === 'Escape' && menuOpen) { setMenuOpen(false); menuButton.current?.focus() } }
    window.addEventListener('keydown', close)
    return () => window.removeEventListener('keydown', close)
  }, [menuOpen])
  return <>
    <a href="#main" className="skip-link">Skip to content</a>
    <div className="demo-banner">INDEPENDENT DESIGN CONCEPT <span>— Not an official or authorised website.</span></div>
    <header className="site-header">
      <a href="#home" className="wordmark" aria-label="Haya Makeup and Hair home">HAYA<span>MAKEUP & HAIR</span></a>
      <nav aria-label="Main navigation" className="desktop-nav">{nav.map(item => <a key={item} href={`#${item.toLowerCase()}`}>{item}</a>)}</nav>
      <a href="#contact" className="button primary header-book">Book an Appointment <ArrowUpRight size={15} /></a>
      <button ref={menuButton} className="menu-toggle" aria-expanded={menuOpen} aria-controls="mobile-navigation" aria-label={menuOpen ? 'Close menu' : 'Open menu'} onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? <X /> : <Menu />}</button>
      <nav id="mobile-navigation" aria-label="Mobile navigation" className="mobile-nav" hidden={!menuOpen}>{nav.map(item => <a key={item} href={`#${item.toLowerCase()}`} onClick={() => setMenuOpen(false)}>{item}</a>)}<a href="#contact" onClick={() => setMenuOpen(false)}>Book an Appointment <ArrowUpRight size={16} /></a></nav>
    </header>
    <main id="main">
      <section id="home" className="hero" aria-labelledby="hero-title">
        <img className="hero-image" src={asset('soft-glam.jpg')} alt="Illustrative bridal beauty portrait; not an example of Haya’s work" width={1000} height={1500} fetchPriority="high" />
        <div className="hero-wash" />
        <div className="hero-copy">
          <p className="eyebrow flex items-center gap-2"><span className="fine-line" /> MAKEUP & HAIR ARTISTRY · LONDON</p>
          <h1 id="hero-title">Beauty, Elegance<br />& <em>Confidence</em></h1>
          <p className="hero-description">Bridal, glam and occasion make-up<br className="desktop-break" /> and hairstyling in London.</p>
          <div className="hero-actions"><a href="#portfolio" className="button primary">Explore My Work <ArrowUpRight size={17} /></a><a href="#contact" className="text-link">Enquire About a Booking <ArrowRight size={16} /></a></div>
          <p className="hero-location"><MapPin size={13} /> LONDON, UNITED KINGDOM</p>
        </div>
        <span className="hero-caption">ILLUSTRATIVE PHOTOGRAPH · DESIGN CONCEPT</span>
        <a href="#about" className="discover" aria-label="Discover the introduction"><ArrowDown size={15} /></a>
      </section>
      <div className="signature-strip" aria-hidden="true"><span>BRIDAL BEAUTY</span><Sparkles size={15} /><span>SOFT GLAM</span><Sparkles size={15} /><span>OCCASION MAKEUP</span><Sparkles size={15} /><span>BEAUTIFUL HAIR</span></div>

      <section id="about" className="section intro container">
        <div className="intro-visual"><Photo file="glam.jpg" alt="Illustrative luminous beauty portrait against a pink backdrop" /><span className="intro-monogram" aria-hidden="true">h.</span><span className="vertical-note" aria-hidden="true">THE ART OF FEELING LIKE YOU</span></div>
        <div className="intro-copy"><p className="eyebrow">A LITTLE INTRODUCTION</p><h2>Makeup That Makes<br />You Feel <em>Beautiful</em></h2><div className="short-rule" /><p>For the moments you’ll remember, and the way you want to feel in them.</p><p>Haya Makeup Artist offers bridal, glam and occasion make-up and hairstyling in London. From softly defined beauty to a more striking finish, explore a look that feels right for you.</p><a className="text-link" href="#services">Find Your Look <ArrowUpRight size={17} /></a></div>
      </section>

      <section id="services" className="section services-section">
        <div className="container"><div className="section-heading"><div><p className="eyebrow">THE BEAUTY MENU</p><h2>A look for <em>every occasion.</em></h2></div><p>From your first inspiration<br />to the finishing touch.</p></div>
          <div className="service-features">
            {[{file:'soft-glam.jpg',title:'Makeup',detail:'SOFTLY RADIANT. BEAUTIFULLY DEFINED.'},{file:'bridal.jpg',title:'Bridal',detail:'YOUR DAY. YOUR KIND OF BEAUTIFUL.'},{file:'hair.jpg',title:'Hair',detail:'EFFORTLESS MOVEMENT. ELEGANT DETAIL.'}].map(s => <a href="#contact" className="service-feature" key={s.title}><img src={asset(s.file)} alt={`${s.title} inspiration, illustrative placeholder`} loading="lazy" width={1000} height={1500} /><div><span className="eyebrow">{s.detail}</span><h3>{s.title}<ArrowUpRight size={24} /></h3></div><span className="feature-placeholder">ILLUSTRATIVE IMAGE</span></a>)}
          </div>
          <div className="service-list">{services.map((service, index) => <article className="service-item" key={service.name}><span className="service-number">0{index + 1}</span><div><h3>{service.name}</h3><p>{service.description}</p></div><div className="service-price">{service.price === null ? <span className="price-enquire">On enquiry</span> : <><span>£{service.price}</span><small>Subject to confirmation</small></>}</div></article>)}</div>
          <p className="price-note">Indicative prices supplied for this demo may be outdated or incomplete. All prices, availability and package inclusions are subject to confirmation directly with Haya.</p>
        </div>
      </section>

      <section id="portfolio" className="section portfolio container">
        <div className="section-heading"><div><p className="eyebrow">THE INSPIRATION EDIT</p><h2>Beautiful in <em>every detail.</em></h2></div><a href={social.instagram} target="_blank" rel="noreferrer" className="text-link">See Haya’s Work on Instagram <ArrowUpRight size={17} /></a></div>
        <p className="portfolio-note">A visual moodboard for this concept. These licensed placeholder photographs are not Haya’s work or clients.</p>
        <div className="filters" role="group" aria-label="Filter inspiration images">{['All looks','Bridal','Soft glam','Full glam','Hair'].map(f => <button key={f} aria-pressed={f === filter} onClick={() => setFilter(f)}>{f}</button>)}</div>
        <div className="portfolio-grid">{looks.filter(l => filter === 'All looks' || filter === l.category).map((look) => <article className="look" key={look.name}><Photo file={look.file} alt={look.alt} /><div className="look-caption"><h3>{look.name}</h3><span>{look.category}</span></div></article>)}</div>
        <p className="sr-only" role="status">{filter === 'All looks' ? 4 : 1} inspiration {filter === 'All looks' ? 'images' : 'image'} shown</p>
      </section>

      <section className="bridal-section" id="bridal"><Photo file="bridal-veil.jpg" alt="Illustrative bride beneath a flowing pearl-detailed veil" /><div className="bridal-copy"><p className="eyebrow">FOR YOUR ONCE-IN-A-LIFETIME</p><h2>Unmistakably you.<br /><em>Unforgettably bridal.</em></h2><p>A softly romantic look. A touch of glamour. A vision that feels entirely your own.</p><p>Begin with your wedding date, location and the make-up and hair you have in mind. Ask Haya about availability, a bridal trial and what your chosen package includes.</p><a href="#contact" className="button light">Let’s Talk About Your Day <ArrowUpRight size={17} /></a><span className="bridal-signature" aria-hidden="true">Your moment, beautifully.</span></div></section>

      <section className="section booking-steps container"><div className="center-heading"><p className="eyebrow">FROM INSPIRATION TO OCCASION</p><h2>A beautiful beginning,<br /><em>in three simple steps.</em></h2></div><div className="steps-grid">{[{title:'Explore Services',text:'Find the make-up and hair that speaks to you. Save a little inspiration for your occasion.'},{title:'Send Your Enquiry',text:'Prepare your message below, then share your date, location and ideas with Haya on Instagram.'},{title:'Confirm Arrangements',text:'Discuss availability, the final price and all booking details directly with Haya.'}].map((step,i) => <article key={step.title}><span className="step-number">0{i+1}</span><h3>{step.title}</h3><p>{step.text}</p></article>)}</div><p className="small muted text-center">A proposed website journey, not a verified booking policy.</p></section>

      <section id="contact" className="section contact-section"><div className="container contact-grid"><div className="contact-copy"><p className="eyebrow">LET’S CREATE YOUR LOOK</p><h2>Your occasion.<br />Your beauty.<br /><em>Your moment.</em></h2><p>Tell a little of your story.<br />The date, the place, the look you love.</p><div className="contact-rule" /><p className="small">Prefer to get in touch directly?<br />Bookings are currently arranged via Instagram DM.</p><a className="text-link" href={social.instagram} target="_blank" rel="noreferrer"><Instagram size={17} /> @its_hayamakeupartist <ArrowUpRight size={15} /></a><p className="small muted mt-6 flex items-center gap-2"><MapPin size={14} /> Based in London, United Kingdom</p></div><EnquiryForm /></div></section>

      <section className="social-section container"><Sparkles size={24} strokeWidth={1} /><p className="eyebrow">A LITTLE BEAUTY IN YOUR FEED</p><h2>Stay <em>inspired.</em></h2><p>Explore Haya’s own work and connect on social.</p><div className="social-links"><a href={social.instagram} target="_blank" rel="noreferrer"><Instagram size={18} /><span><small>INSTAGRAM</small>@its_hayamakeupartist</span><ArrowUpRight size={17} /></a><a href={social.tiktok} target="_blank" rel="noreferrer"><span className="tiktok-icon" aria-hidden="true">♪</span><span><small>TIKTOK</small>@hayamakeupartist0</span><ArrowUpRight size={17} /></a></div></section>
    </main>
    <footer><div className="container footer-top"><div><a href="#home" className="wordmark">HAYA<span>MAKEUP & HAIR</span></a><p>Beauty, Elegance & Confidence.<br />London, United Kingdom</p></div><div><span className="eyebrow">EXPLORE</span><a href="#about">About</a><a href="#services">Services</a><a href="#portfolio">Portfolio</a><a href="#contact">Contact</a></div><div><span className="eyebrow">CONNECT</span><a href={social.instagram} target="_blank" rel="noreferrer">Instagram <ArrowUpRight size={13} /></a><a href={social.tiktok} target="_blank" rel="noreferrer">TikTok <ArrowUpRight size={13} /></a><a href={`${import.meta.env.BASE_URL}image-credits.html`}>Photography credits</a></div><div className="footer-note"><span className="eyebrow">A NOTE ON THIS CONCEPT</span><p>An independent, speculative design for Haya Makeup Artist. This is not an official or authorised website. Photographs are licensed illustrative placeholders. Services and prices require confirmation.</p></div></div><div className="container footer-bottom"><span>© {new Date().getFullYear()} Haya Makeup Artist · Independent website concept</span><a href="#home">Back to top ↑</a></div></footer>
  </>
}

