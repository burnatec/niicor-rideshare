'use client'

import Link from 'next/link'
import { useState } from 'react'
import { ArrowLeft, ArrowRight, Check, CircleDollarSign, Clock3, MapPin, ShieldCheck, UserRound, CarFront, Building2 } from 'lucide-react'

type VehiclePlan = 'my-car' | 'rent' | 'fleet'

const options: { id: VehiclePlan; label: string; description: string; icon: typeof CarFront }[] = [
  { id: 'my-car', label: 'My own car', description: 'I have a vehicle', icon: CarFront },
  { id: 'rent', label: 'Rent a car', description: 'I need a vehicle', icon: CircleDollarSign },
  { id: 'fleet', label: 'Fleet partner', description: 'I manage vehicles', icon: Building2 },
]

export default function DriveWithNiicorPage() {
  const [vehiclePlan, setVehiclePlan] = useState<VehiclePlan>('my-car')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [city, setCity] = useState('Accra')
  const [ready, setReady] = useState(false)

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setReady(true)
  }

  return (
    <main className="drive-page">
      <header className="ride-header">
        <Link className="ride-back" href="/"><ArrowLeft size={16} /> Back to Niicor</Link>
        <Link className="wordmark" href="/" aria-label="Niicor home"><span className="brand-symbol">n</span>niicor<span className="wordmark-period">.</span></Link>
        <span className="ride-header-note"><ShieldCheck size={15} /> BUILT AROUND PEOPLE</span>
      </header>
      <section className="drive-hero">
        <div className="drive-hero-copy"><div className="eyebrow eyebrow-light"><span className="eyebrow-line" /> DRIVE WITH NIICOR</div><h1>Good work<br />moves <em>you forward.</em></h1><p>Join a growing community of drivers and fleet partners, and help make every journey a better one.</p><a className="button button-lime" href="#interest">Tell us about yourself <ArrowRight size={16} /></a></div>
        <div className="drive-hero-aside"><span className="drive-big-mark">n<span>.</span></span><span>YOUR CITY. YOUR PACE.</span></div>
        <div className="drive-hero-bottom"><span>01 / A WAY FORWARD</span><span>ACCRA · GHANA</span></div>
      </section>
      <section className="drive-benefits">
        <div className="drive-section-heading"><div className="eyebrow"><span className="eyebrow-line" /> A GOOD FIT FOR YOU</div><h2>Room to find<br />your <em>own rhythm.</em></h2><p>Whether you drive your own car, want to rent one, or run a fleet, there are a few ways to be part of what we&apos;re building.</p></div>
        <div className="drive-benefit-grid"><article><span className="benefit-icon"><Clock3 size={20} /></span><span className="benefit-index">01</span><h3>Your time, your terms.</h3><p>Choose when you&apos;re available. Flexibility should work both ways.</p></article><article><span className="benefit-icon"><CircleDollarSign size={20} /></span><span className="benefit-index">02</span><h3>Clear from the start.</h3><p>We believe in straightforward terms and earnings you can understand.</p></article><article><span className="benefit-icon"><ShieldCheck size={20} /></span><span className="benefit-index">03</span><h3>People in your corner.</h3><p>Helpful guidance as you get started, with support along the way.</p></article></div>
      </section>
      <section className="drive-interest-section" id="interest">
        <div className="drive-interest-aside"><div className="eyebrow"><span className="eyebrow-line" /> START A CONVERSATION</div><h2>Every good thing<br />starts with <em>hello.</em></h2><p>Share a few basics so we can understand what kind of partnership you&apos;re interested in.</p><div className="driver-steps"><div><span>1</span><p><strong>Tell us about you</strong><small>A few contact details and your city.</small></p></div><div><span>2</span><p><strong>Choose your path</strong><small>Your vehicle, a rental, or your fleet.</small></p></div><div><span>3</span><p><strong>We&apos;ll take it from here</strong><small>Next steps can be shared once onboarding is connected.</small></p></div></div></div>
        <div className="drive-interest-card">
          {ready ? <div className="drive-ready" role="status"><span className="drive-ready-icon"><Check size={24} /></span><div className="eyebrow"><span className="eyebrow-line" /> INTEREST FORM PREVIEW</div><h2>Thanks, {name.split(' ')[0] || 'there'}.</h2><p>Your details are ready for review, but have not been sent or saved. Driver onboarding is not connected yet.</p><div className="drive-ready-summary"><span><UserRound size={16} /> {name}</span><span><MapPin size={16} /> {city}, Ghana</span><span>{options.find((option) => option.id === vehiclePlan)?.label}</span></div><button className="button button-dark" type="button" onClick={() => setReady(false)}>Edit details <ArrowLeft size={15} /></button></div> : <><div className="drive-form-heading"><div className="eyebrow"><span className="eyebrow-line" /> DRIVER & PARTNER INTEREST</div><h2>A few details to get started.</h2><p>No documents needed at this stage.</p></div><form className="drive-form" onSubmit={handleSubmit}><label className="drive-field"><span>YOUR NAME</span><input required autoComplete="name" value={name} onChange={(event) => setName(event.target.value)} placeholder="First and last name" /></label><div className="drive-contact-fields"><label className="drive-field"><span>EMAIL ADDRESS</span><input required type="email" autoComplete="email" value={email} onChange={(event) => setEmail(event.target.value)} placeholder="you@example.com" /></label><label className="drive-field"><span>PHONE NUMBER</span><input required type="tel" autoComplete="tel" value={phone} onChange={(event) => setPhone(event.target.value)} placeholder="+233 20 000 0000" /></label></div><label className="drive-field"><span>YOUR CITY</span><select value={city} onChange={(event) => setCity(event.target.value)}><option>Accra</option><option>Tema</option><option>Kumasi</option><option>Takoradi</option><option>Cape Coast</option><option>Other</option></select></label><fieldset className="drive-plan-fieldset"><legend>HOW WOULD YOU LIKE TO GET STARTED?</legend><div className="drive-plan-options">{options.map(({ id, label, description, icon: Icon }) => <button key={id} type="button" className={vehiclePlan === id ? 'drive-plan-option selected' : 'drive-plan-option'} aria-pressed={vehiclePlan === id} onClick={() => setVehiclePlan(id)}><Icon size={18} /><strong>{label}</strong><span>{description}</span>{vehiclePlan === id && <Check className="drive-plan-check" size={13} />}</button>)}</div></fieldset><button className="button button-lime drive-submit" type="submit">Preview my details <ArrowRight size={16} /></button><p className="drive-notice"><ShieldCheck size={14} /> This is a local preview only. Your details are not transmitted or stored.</p></form></>}
        </div>
      </section>
      <footer className="ride-footer"><span>© 2026 NIICOR MOBILITY</span><span>ACCRA, GHANA <span className="ghana-colors"><i /><i /><i /></span></span></footer>
    </main>
  )
}
