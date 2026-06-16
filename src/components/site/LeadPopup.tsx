"use client";
// Lead-capture popup: name / phone / email → leads list. Opens once per session
// after a short delay (and is dismissable). On submit it POSTs to the n8n CRM
// webhook when one is configured; otherwise it just shows the thank-you state.
import { useEffect, useState } from "react";

// Posts to the n8n CRM upsert webhook (the `crm/upsert` flow in
// n8n/vtechazena_automation.json) which upserts the lead into the Leads sheet by
// phone. Set NEXT_PUBLIC_LEAD_WEBHOOK to the live URL, e.g.
// "https://<n8n-host>/webhook/crm/upsert". Empty = collect + thank-you only (no network).
const LEAD_WEBHOOK = process.env.NEXT_PUBLIC_LEAD_WEBHOOK || "";
const SEEN_KEY = "vt_lead_seen";
const DELAY_MS = 12000;

export default function LeadPopup() {
  const [open, setOpen] = useState(false);
  const [sent, setSent] = useState(false);
  const [busy, setBusy] = useState(false);
  const [form, setForm] = useState({ name: "", phone: "", email: "" });

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (sessionStorage.getItem(SEEN_KEY)) return;
    const t = setTimeout(() => setOpen(true), DELAY_MS);
    return () => clearTimeout(t);
  }, []);

  const close = () => {
    setOpen(false);
    try {
      sessionStorage.setItem(SEEN_KEY, "1");
    } catch {}
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.phone.trim()) return;
    setBusy(true);
    try {
      if (LEAD_WEBHOOK) {
        await fetch(LEAD_WEBHOOK, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            full_name: form.name.trim(),
            phone: form.phone.trim(),
            source: "website",
            consent_pricing: true,
            notes: form.email.trim() ? `email: ${form.email.trim()}` : "",
          }),
        });
      }
    } catch {
      // swallow — we still thank the user; the lead can be retried/owner-followed
    } finally {
      setBusy(false);
      setSent(true);
      try {
        sessionStorage.setItem(SEEN_KEY, "1");
      } catch {}
    }
  };

  if (!open) return null;

  return (
    <div className="lead" role="dialog" aria-modal="true" aria-label="הצטרפות לרשימת לקוחות" onClick={close}>
      <div className="lead__panel" onClick={(e) => e.stopPropagation()}>
        <button className="lead__close" aria-label="סגירה" onClick={close}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
            <path d="M18 6 6 18M6 6l12 12" />
          </svg>
        </button>

        {sent ? (
          <div className="lead__done">
            <h3 className="lead__title">תודה רבה!</h3>
            <p className="lead__lead">קיבלנו את הפרטים שלכם ונהיה בקשר בקרוב.</p>
            <button className="btn btn--dark" onClick={close}>
              סגירה
            </button>
          </div>
        ) : (
          <>
            <span className="services-eyebrow">נשארים מעודכנים</span>
            <h3 className="lead__title">רוצים לשמוע על מבצעים ועדכונים?</h3>
            <p className="lead__lead">
              השאירו פרטים ונעדכן אתכם ביצירות חדשות, מבצעים והנחות בלעדיים.
            </p>
            <form className="lead__form" onSubmit={submit}>
              <input
                className="lead__input"
                type="text"
                placeholder="שם מלא"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                required
              />
              <input
                className="lead__input"
                type="tel"
                placeholder="טלפון"
                dir="ltr"
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
                required
              />
              <input
                className="lead__input"
                type="email"
                placeholder="אימייל"
                dir="ltr"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
              />
              <button className="btn btn--dark lead__submit" type="submit" disabled={busy}>
                {busy ? "שולח…" : "הצטרפות לרשימה"}
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
