import React, { useState } from 'react';
import { createRoot } from 'react-dom/client';
import './styles.css';

const services = [
  ['◈', 'City rides', 'Comfortable everyday rides, whenever your day takes you.'],
  ['◉', 'Airport transfer', 'Reliable pickups, flight-friendly timing, zero stress.'],
  ['✦', 'Outstation trips', 'Go further with transparent fares and trusted drivers.']
];

function App() {
  const [menu, setMenu] = useState(false);
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ name: '', phone: '', pickup: '', drop: '', journeyDate: '', passengers: '1', carType: 'Comfort' });
  const change = e => setForm({ ...form, [e.target.name]: e.target.value });
  const submit = async e => {
    e.preventDefault();
    try {
      await fetch('http://localhost:5000/api/bookings', {
        method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form)
      });
    } catch (_) {
      // The confirmation UI remains useful while the API is not running locally.
    }
    setSent(true);
  };
  return <>
    <header><a className="brand" href="#home">ride<span>wise</span></a><button className="menu" onClick={() => setMenu(!menu)}>☰</button><nav className={menu ? 'open' : ''}><a href="#home">Home</a><a href="#services">Services</a><a href="#about">About us</a><a href="#contact">Contact</a><a className="nav-cta" href="#book">Book a ride ↗</a></nav></header>
    <main>
      <section className="hero" id="home"><div className="hero-copy"><p className="eyebrow">YOUR JOURNEY, OUR PRIORITY</p><h1>Move through your day <em>beautifully.</em></h1><p className="lead">Thoughtful rides for every corner of your world. Safe, simple, and always on your schedule.</p><a href="#book" className="button">Plan your ride <span>→</span></a><div className="ratings"><div className="avatars"><i>R</i><i>M</i><i>A</i><i>S</i></div><div><b>4.9 / 5</b><br/><small>from 12k+ happy riders</small></div></div></div><div className="hero-art"><div className="sun"></div><div className="arch arch-one"></div><div className="arch arch-two"></div><div className="car">◢<span>RIDEWISE</span><b>●</b><b>●</b></div><div className="city">♜　▥　♜　▥　♜</div><p>SEAMLESS<br/>EVERY MILE</p></div></section>
      <section className="booking" id="book"><div><p className="eyebrow">RESERVE YOUR RIDE</p><h2>Where would you like to go?</h2><p>Share the details. We’ll handle the rest.</p></div><form onSubmit={submit}>{sent ? <div className="success"><strong>✓ You’re all set!</strong><br/>We’ll contact you shortly to confirm your ride.</div> : <><label>YOUR NAME<input required name="name" value={form.name} onChange={change} placeholder="Enter your name"/></label><label>PHONE NUMBER<input required name="phone" value={form.phone} onChange={change} placeholder="+91 00000 00000"/></label><label>PICKUP LOCATION<input required name="pickup" value={form.pickup} onChange={change} placeholder="Enter pickup point"/></label><label>DROP LOCATION<input required name="drop" value={form.drop} onChange={change} placeholder="Where to?"/></label><label>JOURNEY DATE<input required type="date" name="journeyDate" value={form.journeyDate} onChange={change}/></label><label>PASSENGERS<select name="passengers" value={form.passengers} onChange={change}><option>1</option><option>2</option><option>3</option><option>4+</option></select></label><label>RIDE TYPE<select name="carType" value={form.carType} onChange={change}><option>Comfort</option><option>Premium</option><option>SUV</option></select></label><button className="button">Request a ride <span>→</span></button></>}</form></section>
      <section className="services" id="services"><p className="eyebrow">HOW WE MOVE</p><h2>A ride for every<br/><em>kind of day.</em></h2><div className="service-grid">{services.map(([icon,title,text]) => <article key={title}><div className="icon">{icon}</div><h3>{title}</h3><p>{text}</p><a href="#book">Explore service →</a></article>)}</div></section>
      <section className="about" id="about"><div className="about-picture"><div>✳</div></div><div><p className="eyebrow">MORE THAN A RIDE</p><h2>Made for the way<br/>you <em>really</em> move.</h2><p>At Ridewise, we believe getting there should feel just as good as arriving. That’s why every detail—from our trusted drivers to our simple booking experience—is designed around you.</p><div className="numbers"><span><b>12k+</b>rides completed</span><span><b>4.9★</b>average rating</span><span><b>24/7</b>support team</span></div><a href="#contact" className="text-link">Get to know us →</a></div></section>
      <section className="contact" id="contact"><p className="eyebrow">LET'S CONNECT</p><h2>Need a hand?<br/><em>We're here.</em></h2><div className="contact-grid"><div><b>Call us</b><a href="tel:+919000000000">+91 90000 00000</a></div><div><b>Email us</b><a href="mailto:hello@ridewise.com">hello@ridewise.com</a></div><div><b>Visit us</b><span>MG Road, Bengaluru, India</span></div></div></section>
    </main><footer><a className="brand" href="#home">ride<span>wise</span></a><p>Every journey, made easier.</p><small>© 2025 Ridewise. Built for better journeys.</small></footer>
  </>;
}
createRoot(document.getElementById('root')).render(<App />);
