'use client'

import Link from 'next/link'
import { useMemo, useState } from 'react'
import { ArrowLeft, ArrowRight, ArrowUpRight, CalendarDays, CarFront, Check, ChevronDown, Fuel, Gauge, ShieldCheck, Users, X } from 'lucide-react'

type Category = 'All cars' | 'Economy' | 'SUV' | 'Premium' | 'Van'
type Period = 'Daily' | 'Weekly' | 'Monthly'

type RentalVehicle = {
  name: string
  category: Exclude<Category, 'All cars'>
  details: string
  image: string
  alt: string
  seats: number
  transmission: string
  fuel: string
  rates: Record<Period, number>
  description: string
}

const vehicles: RentalVehicle[] = [
  { name: 'Toyota Corolla', category: 'Economy', details: 'A reliable companion for the everyday.', image: 'https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?auto=format&fit=crop&w=1000&q=85', alt: 'White modern sedan', seats: 5, transmission: 'Automatic', fuel: 'Petrol', rates: { Daily: 450, Weekly: 2850, Monthly: 10500 }, description: 'Comfortable, efficient, and easy to live with. A practical choice for city errands and weekday commutes.' },
  { name: 'Hyundai Tucson', category: 'SUV', details: 'A little more room for the road ahead.', image: 'https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?auto=format&fit=crop&w=1000&q=85', alt: 'Modern dark SUV', seats: 5, transmission: 'Automatic', fuel: 'Petrol', rates: { Daily: 850, Weekly: 5400, Monthly: 19800 }, description: 'A confident, roomy SUV for family days, airport runs, and longer weekends out of town.' },
  { name: 'Mercedes-Benz E-Class', category: 'Premium', details: 'A considered arrival, wherever you go.', image: 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?auto=format&fit=crop&w=1000&q=85', alt: 'Luxury executive sedan', seats: 5, transmission: 'Automatic', fuel: 'Petrol', rates: { Daily: 1800, Weekly: 11500, Monthly: 42000 }, description: 'Refined comfort and generous space for business travel, special occasions, and airport transfers.' },
  { name: 'Toyota RAV4', category: 'SUV', details: 'Ready for the city and beyond.', image: 'https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?auto=format&fit=crop&w=1000&q=85', alt: 'Versatile SUV', seats: 5, transmission: 'Automatic', fuel: 'Petrol', rates: { Daily: 900, Weekly: 5700, Monthly: 21000 }, description: 'A versatile all-rounder with a comfortable cabin and room for the things you bring along.' },
]

const categories: Category[] = ['All cars', 'Economy', 'SUV', 'Premium', 'Van']
const periods: Period[] = ['Daily', 'Weekly', 'Monthly']
const money = (amount: number) => new Intl.NumberFormat('en-GH', { maximumFractionDigits: 0 }).format(amount)

export default function RentalsPage() {
  const [category, setCategory] = useState<Category>('All cars')
  const [period, setPeriod] = useState<Period>('Daily')
  const [selectedVehicle, setSelectedVehicle] = useState<RentalVehicle | null>(null)
  const [planPreview, setPlanPreview] = useState(false)
  const filteredVehicles = useMemo(() => vehicles.filter((vehicle) => category === 'All cars' || vehicle.category === category), [category])

  function selectVehicle(vehicle: RentalVehicle) {
    setSelectedVehicle(vehicle)
    setPlanPreview(false)
  }

  return (
    <main className="rentals-page">
      <header className="ride-header"><Link className="ride-back" href="/"><ArrowLeft size={16} /> Back to Niicor</Link><Link className="wordmark" href="/" aria-label="Niicor home"><span className="brand-symbol">n</span>niicor<span className="wordmark-period">.</span></Link><Link className="ride-header-note rentals-header-link" href="/drive">PARTNER WITH US <ArrowUpRight size={14} /></Link></header>
      <section className="rentals-hero"><div className="rentals-hero-copy"><div className="eyebrow eyebrow-light"><span className="eyebrow-line" /> NIICOR RENTALS</div><h1>A little more<br />room to <em>roam.</em></h1><p>Find a car that fits your plans. From a quick city run to a week away, the right ride makes all the difference.</p><a className="button button-lime" href="#browse">Find your car <ArrowRight size={16} /></a></div><div className="rentals-hero-stamp"><CalendarDays size={18} /><span>YOUR PLANS.<br />YOUR PACE.</span></div><div className="rentals-hero-caption">GH₵ / GHS <span>·</span> GHANA</div></section>
      <section className="rental-catalog" id="browse">
        <div className="rental-catalog-top"><div><div className="eyebrow"><span className="eyebrow-line" /> FIND YOUR FIT</div><h2>Good to <em>go.</em></h2></div><label className="period-select"><span>SHOW PRICES</span><select value={period} onChange={(event) => setPeriod(event.target.value as Period)} aria-label="Rental price period">{periods.map((option) => <option key={option}>{option}</option>)}</select><ChevronDown size={14} /></label></div>
        <div className="rental-catalog-meta"><div className="category-filters" role="group" aria-label="Filter vehicles by category">{categories.map((option) => <button key={option} type="button" className={category === option ? 'category-filter selected' : 'category-filter'} aria-pressed={category === option} onClick={() => { setCategory(option); setSelectedVehicle(null) }}>{option}</button>)}</div><p><span className="illustrative-dot" /> Illustrative vehicle examples · Live availability isn&apos;t connected</p></div>
        <div className="rental-listing-grid">{filteredVehicles.map((vehicle, index) => <article className="rental-listing-card" key={vehicle.name}><button className="rental-listing-image" type="button" onClick={() => selectVehicle(vehicle)} aria-label={`View example details for ${vehicle.name}`}><img src={vehicle.image} alt={vehicle.alt} loading="lazy" /><span className="listing-number">0{index + 1} / 0{filteredVehicles.length}</span><span className="listing-arrow"><ArrowUpRight size={17} /></span></button><div className="listing-body"><span className="listing-category">{vehicle.category.toUpperCase()}</span><h3>{vehicle.name}</h3><p>{vehicle.details}</p><div className="listing-specs"><span><Users size={14} /> {vehicle.seats} seats</span><span><Gauge size={14} /> {vehicle.transmission}</span><span><Fuel size={14} /> {vehicle.fuel}</span></div><div className="listing-bottom"><span className="listing-price"><strong>GH₵ {money(vehicle.rates[period])}</strong><small> / {period.toLowerCase()}</small></span><button type="button" onClick={() => selectVehicle(vehicle)}>See details <ArrowRight size={15} /></button></div></div></article>)}</div>
        {filteredVehicles.length === 0 && <div className="rental-empty"><span className="benefit-icon"><CarFront size={20} /></span><h3>No example cars in this category yet.</h3><p>Try another category to explore our illustrative vehicle range.</p><button className="text-link" onClick={() => setCategory('All cars')}>Show all cars <ArrowRight size={14} /></button></div>}
        {selectedVehicle && <section className="rental-detail-panel" aria-live="polite" aria-labelledby="rental-detail-title"><button className="rental-detail-close" type="button" aria-label="Close vehicle details" onClick={() => { setSelectedVehicle(null); setPlanPreview(false) }}><X size={18} /></button><div className="rental-detail-image"><img src={selectedVehicle.image} alt={selectedVehicle.alt} /></div><div className="rental-detail-copy"><div className="eyebrow"><span className="eyebrow-line" /> EXAMPLE VEHICLE DETAILS</div><h3 id="rental-detail-title">{selectedVehicle.name}</h3><p>{selectedVehicle.description}</p><div className="detail-features"><span><Users size={14} /> {selectedVehicle.seats} seats</span><span><Gauge size={14} /> {selectedVehicle.transmission}</span><span><Fuel size={14} /> {selectedVehicle.fuel}</span></div><div className="detail-rate-list">{periods.map((ratePeriod) => <div key={ratePeriod}><span>{ratePeriod}</span><strong>GH₵ {money(selectedVehicle.rates[ratePeriod])}</strong></div>)}</div><button className="button button-dark detail-plan-button" type="button" onClick={() => setPlanPreview(true)}>Preview rental plan <ArrowRight size={16} /></button>{planPreview && <p className="plan-preview-message" role="status"><Check size={15} /> This is an example only. No booking is created and availability or final pricing is not confirmed.</p>}</div></section>}
        <p className="rental-disclaimer"><ShieldCheck size={15} /> Prices and vehicle details shown are examples for interface preview only. This catalogue is not connected to live fleet inventory, booking, or payments.</p>
      </section>
      <section className="rentals-partner-strip"><div><span>HAVE A FLEET?</span><h2>Good journeys start with good partners.</h2></div><Link className="button button-dark" href="/drive">Explore partnership <ArrowUpRight size={15} /></Link></section>
      <footer className="ride-footer"><span>© 2026 NIICOR MOBILITY</span><span>ACCRA, GHANA <span className="ghana-colors"><i /><i /><i /></span></span></footer>
    </main>
  )
}

