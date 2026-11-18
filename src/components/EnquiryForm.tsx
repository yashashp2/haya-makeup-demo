import { useRef, useState, type FormEvent } from 'react'
import { ArrowUpRight, Check, Copy, RotateCcw } from 'lucide-react'
import { services, social } from '../data/content'

export default function EnquiryForm() {
  const [message, setMessage] = useState('')
  const [copyStatus, setCopyStatus] = useState('')
  const result = useRef<HTMLDivElement>(null)
  const form = useRef<HTMLFormElement>(null)
  const today = new Date()
  const minDate = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`

  function prepare(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const data = new FormData(event.currentTarget)
    const value = (key: string) => String(data.get(key) || '').trim()
    const date = new Date(`${value('date')}T12:00:00`).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })
    setMessage(`Hi Haya, I would like to enquire about ${value('service')}.\n\nName: ${value('name')}\nEmail: ${value('email')}${value('phone') ? `\nTelephone: ${value('phone')}` : ''}\nPreferred date: ${date}\nEvent location: ${value('location')}${value('notes') ? `\n\nAdditional notes: ${value('notes')}` : ''}\n\nPlease could you confirm availability, pricing and the booking arrangements? Thank you!`)
    setCopyStatus('')
    requestAnimationFrame(() => result.current?.focus())
  }

  async function copy() {
    try { await navigator.clipboard.writeText(message); setCopyStatus('Copied. You can now paste your message into Instagram.') }
    catch { setCopyStatus('Automatic copying is unavailable. Select the message below and copy it manually.') }
  }

  function clear() { form.current?.reset(); setMessage(''); setCopyStatus(''); form.current?.querySelector('input')?.focus() }

  return <div className="enquiry-form">
    <div className="form-note"><span className="eyebrow">A DEMONSTRATION, WITH CARE</span><p>This form prepares a message for you to copy. Nothing is sent or saved by this website. A booking is only confirmed directly with Haya.</p></div>
    <form ref={form} onSubmit={prepare} autoComplete="off" onChange={() => { setMessage(''); setCopyStatus('') }}>
      <div className="form-grid">
        <label>Full name <span>*</span><input name="name" required pattern=".*\S.*" maxLength={100} placeholder="Your name" /></label>
        <label>Email <span>*</span><input name="email" type="email" required maxLength={150} placeholder="you@example.com" /></label>
        <label>Telephone <span className="optional">(optional)</span><input name="phone" type="tel" maxLength={40} placeholder="Your contact number" /></label>
        <label>Service <span>*</span><select name="service" required defaultValue=""><option value="" disabled>Select a service</option>{services.map(s => <option key={s.name}>{s.name}</option>)}<option>Makeup & hair / not sure yet</option></select></label>
        <label>Preferred date <span>*</span><input aria-label="Preferred date" name="date" type="date" min={minDate} required /></label>
        <label>Event location <span>*</span><input name="location" required pattern=".*\S.*" maxLength={150} placeholder="Town or venue area" /></label>
        <label className="full">A little about your occasion <span className="optional">(optional)</span><textarea name="notes" rows={3} maxLength={1500} placeholder="Your occasion, the look you love, and anything else you’d like to share…" /></label>
      </div>
      <p className="small muted">* Required to prepare your message. Please use example details when trying this demo.</p>
      <button className="button primary" type="submit">Prepare My Enquiry <ArrowUpRight size={17} /></button>
    </form>
    {message && <div ref={result} tabIndex={-1} className="enquiry-result">
      <h3>Your message is ready.</h3><p>It has not been sent. Copy it, open Haya’s Instagram profile, then choose Message and paste it. Instagram may require you to sign in.</p>
      <textarea aria-label="Prepared enquiry message" readOnly value={message} rows={11} onFocus={e => e.currentTarget.select()} />
      <div className="result-actions"><button className="button primary" onClick={copy}>{copyStatus.startsWith('Copied') ? <Check size={16} /> : <Copy size={16} />} Copy Message</button><a className="text-link" href={social.instagram} target="_blank" rel="noreferrer">Open Instagram <ArrowUpRight size={16} /></a></div>
      <p role="status" className="small">{copyStatus}</p>
    </div>}
    <button className="clear-button" type="button" onClick={clear}><RotateCcw size={13} /> Clear all details</button>
  </div>
}
