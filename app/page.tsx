'use client'

import { useState } from 'react'
import {
  ArrowDownRight,
  ArrowRight,
  ArrowUpRight,
  BriefcaseBusiness,
  CalendarDays,
  CarFront,
  Check,
  ChevronDown,
  Clock3,
  MapPin,
  Menu,
  MoveUpRight,
  ShieldCheck,
  Smartphone,
  Sparkles,
  Users,
  X,
} from 'lucide-react'

const services = [
  { number: '01', title: 'Everyday rides', copy: 'A better way to get across town. Reliable rides, right when you need them.', icon: CarFront, tag: 'RIDE-HAILING' },
  { number: '02', title: 'Go your own way', copy: 'The right car for a weekend away, a business trip, or a longer stay.', icon: CalendarDays, tag: 'CAR RENTAL' },
  { number: '03', title: 'Move your team', copy: 'Thoughtful transport for teams, guests, and the moments that matter.', icon: BriefcaseBusiness, tag: 'FOR BUSINESS' },
]

const vehicles = [
  { name: 'Toyota Corolla', type: 'Economy · Automatic', price: 'From GH₵ 450 / day', image: 'https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?auto=format&fit=crop&w=1000&q=85', alt: 'Modern white sedan available for rental' },
  { name: 'Hyundai Tucson', type: 'SUV · Automatic', price: 'From GH₵ 850 / day', image: 'https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?auto=format&fit=crop&w=1000&q=85', alt: 'Premium SUV available for rental' },
  { name: 'Mercedes-Benz E-Class', type: 'Premium · Automatic', price: 'From GH₵ 1,800 / day', image: 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?auto=format&fit=crop&w=1000&q=85', alt: 'Luxury sedan available for rental' },
]

export default function Page() {
  const [bookingMode, setBookingMode] = useState<'ride' | 'rental'>('ride')
  const [pickup, setPickup] = useState('')
  const [destination, setDestination] = useState('')
  const [notice, setNotice] = useState('')
  const [menuOpen, setMenuOpen] = useState(false)

  function handleBooking(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (!pickup.trim() || !destination.trim()) {
      setNotice('Add both locations to continue.')
      return
    }
    setNotice('Your details are ready. Booking requests will be available when the service is connected.')
  }

  return (
    <main>
      <div className="announcement"><span className="announcement-dot" /> MOVING GHANA, WITH YOU <span className="announcement-divider">/</span> NOW IN ACCRA <ArrowUpRight aria-hidden="true" size={13} /></div>
      <header className="site-header">
        <a className="wordmark" href="#home" aria-label="Niicor home"><span className="brand-symbol">n</span>niicor<span className="wordmark-period">.</span></a>
        <button className="mobile-menu-toggle" aria-label={menuOpen ? 'Close navigation' : 'Open navigation'} aria-expanded={menuOpen} onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? <X /> : <Menu />}</button>
        <nav className={menuOpen ? 'main-nav is-open' : 'main-nav'} aria-label="Main navigation">
          <a href="#services" onClick={() => setMenuOpen(false)}>What we do</a>
          <a href="#rentals" onClick={() => setMenuOpen(false)}>Car rental</a>
          <a href="#partners" onClick={() => setMenuOpen(false)}>Drive with us</a>
          <a href="#business" onClick={() => setMenuOpen(false)}>Business</a>
        </nav>
        <div className="header-actions"><a className="login-link" href="#contact">Log in</a><a className="button button-dark button-small" href="#book">Get moving <ArrowUpRight size={15} /></a></div>
      </header>

      <section className="hero" id="home">
        <div className="hero-backdrop" role="img" aria-label="A car on a sunlit Accra street" />
        <div className="hero-grain" />
        <div className="hero-content">
          <div className="eyebrow eyebrow-light"><span className="eyebrow-line" /> YOUR CITY. YOUR WAY.</div>
          <h1>Good things<br />are <em>going places.</em></h1>
          <p className="hero-copy">The ride you need. The car you want. A smoother way to get there, right here in Ghana.</p>
          <a className="hero-cta" href="#book">Find your way <span><ArrowDownRight size={19} /></span></a>
        </div>
        <div className="hero-caption"><span>05°36&apos; N&nbsp; 00°11&apos; W</span><span>ACCRA, GHANA</span></div>
        <div className="hero-side-note"><span className="side-note-line" /> A little closer to everywhere.</div>

        <div className="booking-card" id="book">
          <div className="booking-head"><div><div className="eyebrow"><span className="eyebrow-line" /> LET&apos;S GET YOU THERE</div><h2>Where to?</h2></div><span className="booking-mark"><MapPin size={17} /></span></div>
          <div className="booking-tabs" role="tablist" aria-label="Choose a service">
            <button role="tab" aria-selected={bookingMode === 'ride'} className={bookingMode === 'ride' ? 'booking-tab active' : 'booking-tab'} onClick={() => { setBookingMode('ride'); setNotice('') }}><CarFront size={17} /> Get a ride</button>
            <button role="tab" aria-selected={bookingMode === 'rental'} className={bookingMode === 'rental' ? 'booking-tab active' : 'booking-tab'} onClick={() => { setBookingMode('rental'); setNotice('') }}><CalendarDays size={16} /> Rent a car</button>
          </div>
          <form className="booking-form" onSubmit={handleBooking}>
            <label className="location-field"><span className="field-marker pickup-marker" /><span className="field-content"><span>{bookingMode === 'ride' ? 'PICK-UP LOCATION' : 'PICK-UP CITY'}</span><input value={pickup} onChange={(event) => setPickup(event.target.value)} placeholder="Where from?" aria-label="Pickup location" /></span></label>
            <div className="route-connector" />
            <label className="location-field"><span className="field-marker destination-marker" /><span className="field-content"><span>{bookingMode === 'ride' ? 'DROP-OFF LOCATION' : 'DROP-OFF CITY'}</span><input value={destination} onChange={(event) => setDestination(event.target.value)} placeholder="Where to?" aria-label="Destination location" /></span></label>
            <button className="button button-lime booking-submit" type="submit">{bookingMode === 'ride' ? 'Explore rides' : 'Browse cars'} <ArrowRight size={17} /></button>
            {notice && <p className="booking-notice" role="status">{notice}</p>}
          </form>
          <div className="booking-foot"><ShieldCheck size={14} /> A little more peace of mind, every trip.</div>
        </div>
        <a className="hero-scroll" href="#services"><span>SCROLL TO EXPLORE</span><span className="scroll-line" /></a>
      </section>

      <section className="intro-section" id="services">
        <div className="section-topline"><span>01 / A BETTER WAY TO MOVE</span><span>MADE FOR THE WAY GHANA MOVES <ArrowDownRight size={14} /></span></div>
        <div className="intro-grid"><h2>More than<br />a <em>way there.</em></h2><div className="intro-copy"><p>From the first hello to the last mile, we bring rides, rentals, and the people who make it all happen together.</p><a className="text-link" href="#about">A little about Niicor <ArrowUpRight size={15} /></a></div></div>
        <div className="service-grid">{services.map(({ number, title, copy, icon: Icon, tag }) => <article className="service-card" key={number}><div className="service-card-top"><span>{number}</span><Icon size={20} strokeWidth={1.5} /></div><span className="service-tag">{tag}</span><h3>{title}</h3><p>{copy}</p><a href={number === '02' ? '#rentals' : number === '03' ? '#business' : '#book'} aria-label={`Explore ${title}`}><ArrowUpRight size={17} /></a></article>)}</div>
      </section>

      <section className="rental-section" id="rentals">
        <div className="rental-heading"><div><div className="eyebrow"><span className="eyebrow-line" /> TAKE THE LONG WAY</div><h2>A car that fits<br />your <em>kind of day.</em></h2></div><div className="rental-aside"><p>Easy-going rentals for wherever life takes you. Pick your dates, find your fit, and enjoy the drive.</p><a className="text-link" href="#book" onClick={() => setBookingMode('rental')}>Explore all cars <ArrowUpRight size={15} /></a></div></div>
        <div className="vehicle-grid">{vehicles.map((vehicle, index) => <article className="vehicle-card" key={vehicle.name}><a className="vehicle-image" href="#book" onClick={() => setBookingMode('rental')}><img src={vehicle.image} alt={vehicle.alt} loading="lazy" /><span className="vehicle-index">0{index + 1} / 03</span><span className="vehicle-arrow"><ArrowUpRight size={17} /></span></a><div className="vehicle-info"><div><h3>{vehicle.name}</h3><p>{vehicle.type}</p></div><span className="vehicle-price">{vehicle.price}</span></div></article>)}</div>
        <p className="price-note">Illustrative starting prices. Availability and final pricing are confirmed when rental services are connected.</p>
      </section>

      <section className="statement-section" id="about"><div className="statement-index">A NOTE FROM US <span>—</span> 02</div><Sparkles className="statement-spark" size={21} /><h2>Every journey<br />has a <em>better side.</em></h2><p>Good people. Thoughtful service. A little more ease in getting where life is taking you.</p><div className="statement-bottom"><span>THAT&apos;S THE NIICOR WAY.</span><MoveUpRight size={17} /></div></section>

      <section className="partner-section" id="partners"><div className="partner-copy"><div className="eyebrow"><span className="eyebrow-line" /> THERE&apos;S ROOM FOR YOU</div><h2>Let&apos;s move<br /><em>forward, together.</em></h2><p>Bring your wheels, your know-how, or your big idea. We&apos;re building a better way to move, and there&apos;s a place for you in it.</p><a className="button button-dark" href="#contact">Find your fit <ArrowRight size={16} /></a></div><div className="partner-tiles"><a className="partner-tile tile-driver" href="#contact"><span>FOR DRIVERS</span><h3>Make your<br />own way.</h3><span className="tile-arrow"><ArrowUpRight size={18} /></span><div className="tile-decoration"><CarFront size={110} strokeWidth={0.7} /></div></a><a className="partner-tile tile-fleet" href="#contact"><span>FOR FLEET PARTNERS</span><h3>Good things<br />work better<br />together.</h3><span className="tile-arrow"><ArrowUpRight size={18} /></span><div className="tile-decoration"><Users size={100} strokeWidth={0.7} /></div></a></div></section>

      <section className="business-section" id="business"><div className="business-icon"><BriefcaseBusiness size={22} /></div><div className="business-copy"><span>FOR THE WAY YOU WORK</span><h2>Getting business<br />where it needs to go.</h2><p>Thoughtful travel for your team, your guests, and everything in between.</p></div><a className="business-link" href="#contact" aria-label="Talk to us about business transportation"><ArrowUpRight size={21} /></a></section>

      <section className="app-section"><div className="app-icon"><Smartphone size={20} /></div><div><span className="app-label">GOOD THINGS, ON THE GO</span><h2>Your next move<br />starts right here.</h2><p>We&apos;re getting the Niicor app ready. Stay tuned.</p></div><span className="app-badge"><Clock3 size={14} /> COMING SOON</span></section>

      <footer className="site-footer" id="contact"><div className="footer-main"><div className="footer-brand"><a className="wordmark wordmark-light" href="#home"><span className="brand-symbol">n</span>niicor<span className="wordmark-period">.</span></a><p>A better way to get there.<br />Proudly moving Ghana.</p></div><div className="footer-column"><span>EXPLORE</span><a href="#services">What we do</a><a href="#rentals">Car rental</a><a href="#partners">Drive with us</a><a href="#business">Business</a></div><div className="footer-column"><span>THE DETAILS</span><a href="#contact">Help & support</a><a href="#contact">Privacy</a><a href="#contact">Terms</a><a href="#contact">Get in touch</a></div><a className="footer-contact" href="mailto:hello@niicor.com">LET&apos;S TALK <ArrowUpRight size={15} /></a></div><div className="footer-bottom"><span>© 2026 NIICOR MOBILITY</span><span>MADE FOR GHANA <span className="ghana-colors"><i /><i /><i /></span></span><span>ACCRA, GHANA <ChevronDown size={13} /></span></div></footer>
    </main>
  )
}
