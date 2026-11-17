'use client'

import Link from 'next/link'
import { useState } from 'react'
import { ArrowLeft, ArrowRight, BriefcaseBusiness, CarFront, Check, Clock3, MapPin, ShieldCheck, Users } from 'lucide-react'

type RideClass = 'Economy' | 'Comfort' | 'Premium' | 'SUV'

const rideClasses: { name: RideClass; detail: string; icon: typeof CarFront }[] = [
  { name: 'Economy', detail: 'Everyday rides', icon: CarFront },
  { name: 'Comfort', detail: 'A little more room', icon: Users },
  { name: 'Premium', detail: 'Arrive in style', icon: BriefcaseBusiness },
  { name: 'SUV', detail: 'Space for the group', icon: Users },
]

export default function RideBookingPage() {
  const [rideClass, setRideClass] = useState<RideClass>('Economy')
  const [pickup, setPickup] = useState('')
  const [destination, setDestination] = useState('')
  const [rideDate, setRideDate] = useState('')
  const [rideTime, setRideTime] = useState('')
  const [passengers, setPassengers] = useState('1')
  const [submitted, setSubmitted] = useState(false)

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setSubmitted(true)
  }

  return (
    <main className="ride-page">
      <header className="ride-header">
        <Link className="ride-back" href="/"><ArrowLeft size={16} /> Back to Niicor</Link>
        <Link className="wordmark" href="/" aria-label="Niicor home"><span className="brand-symbol">n</span>niicor<span className="wordmark-period">.</span></Link>
        <span className="ride-header-note"><ShieldCheck size={15} /> MADE FOR GHANA</span>
      </header>
      <div className="ride-layout">
        <section className="ride-intro">
          <div className="eyebrow"><span className="eyebrow-line" /> YOUR NEXT RIDE</div>
          <h1>Let&apos;s make<br />getting there<br /><em>the easy part.</em></h1>
          <p>Share a few details and see your ride plan come together.</p>
          <div className="ride-assurance"><ShieldCheck size={17} /><span>Thoughtful journeys, from pickup to arrival.</span></div>
          <div className="ride-location-art" aria-hidden="true"><span className="art-route art-route-one" /><span className="art-route art-route-two" /><span className="art-pin art-pin-one"><MapPin size={17} /></span><span className="art-pin art-pin-two"><MapPin size={17} /></span><span className="art-dot" /></div>
        </section>
        <section className="ride-form-card" aria-labelledby="ride-form-title">
          {submitted ? (
            <div className="ride-preview-result" role="status">
              <span className="ride-result-icon"><Check size={24} /></span>
              <div className="eyebrow"><span className="eyebrow-line" /> RIDE PLAN PREVIEW</div>
              <h2 id="ride-form-title">Your details<br />are all set.</h2>
              <div className="preview-route"><span className="route-point route-point-start" /><div><small>PICK-UP</small><strong>{pickup}</strong></div><span className="preview-route-line" /><span className="route-point route-point-end" /><div><small>DROP-OFF</small><strong>{destination}</strong></div></div>
              <div className="preview-meta"><span>{rideClass}</span><span>{rideDate}</span><span>{rideTime}</span><span>{passengers} passenger{passengers === '1' ? '' : 's'}</span></div>
              <div className="not-connected-note"><Clock3 size={16} /><p>This is a preview only. No ride has been booked or sent to a driver because dispatch is not connected yet.</p></div>
              <button className="button button-dark ride-edit-button" type="button" onClick={() => setSubmitted(false)}>Edit ride details <ArrowLeft size={15} /></button>
            </div>
          ) : (
            <>
              <div className="ride-card-heading"><div><div className="eyebrow"><span className="eyebrow-line" /> BOOK A RIDE</div><h2 id="ride-form-title">Where are you going?</h2></div><span className="ride-card-number">01 <span>/ 03</span></span></div>
              <form className="ride-form" onSubmit={handleSubmit}>
                <div className="ride-location-fields">
                  <label className="ride-input-row"><span className="route-point route-point-start" /><span className="ride-input-content"><span>YOUR PICK-UP</span><input required value={pickup} onChange={(event) => setPickup(event.target.value)} placeholder="Street, landmark or area" /></span></label>
                  <span className="ride-input-connector" />
                  <label className="ride-input-row"><span className="route-point route-point-end" /><span className="ride-input-content"><span>YOUR DESTINATION</span><input required value={destination} onChange={(event) => setDestination(event.target.value)} placeholder="Where would you like to go?" /></span></label>
                </div>
                <fieldset className="ride-class-fieldset"><legend>CHOOSE YOUR RIDE</legend><div className="ride-class-grid">{rideClasses.map(({ name, detail, icon: Icon }) => <button key={name} type="button" className={rideClass === name ? 'ride-class-option selected' : 'ride-class-option'} aria-pressed={rideClass === name} onClick={() => setRideClass(name)}><Icon size={19} strokeWidth={1.6} /><strong>{name}</strong><span>{detail}</span>{rideClass === name && <Check className="ride-class-check" size={13} />}</button>)}</div></fieldset>
                <div className="ride-schedule-fields"><label><span>DATE</span><input required type="date" value={rideDate} onChange={(event) => setRideDate(event.target.value)} /></label><label><span>TIME</span><input required type="time" value={rideTime} onChange={(event) => setRideTime(event.target.value)} /></label><label><span>PEOPLE</span><select value={passengers} onChange={(event) => setPassengers(event.target.value)} aria-label="Number of passengers"><option value="1">1 passenger</option><option value="2">2 passengers</option><option value="3">3 passengers</option><option value="4">4 passengers</option><option value="5">5 passengers</option><option value="6">6 passengers</option></select></label></div>
                <button className="button button-lime ride-submit" type="submit">Preview ride details <ArrowRight size={17} /></button>
                <p className="ride-form-disclaimer">Fare estimates and driver matching will be available when live maps and dispatch are connected.</p>
              </form>
            </>
          )}
        </section>
      </div>
      <footer className="ride-footer"><span>© 2026 NIICOR MOBILITY</span><span>ACCRA, GHANA <span className="ghana-colors"><i /><i /><i /></span></span></footer>
    </main>
  )
}
