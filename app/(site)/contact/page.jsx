export default function ContactPage() {
  return (
    <div className="container-px max-w-2xl mx-auto py-16">
      <h1 className="text-3xl font-bold mb-6">Contact Us</h1>
      <p className="text-[var(--muted)] mb-8">
        Have a question or want to report an issue? Reach out and our team will get back to you.
      </p>
      <form className="card p-6 space-y-4">
        <div>
          <label className="text-sm font-semibold block mb-1.5">Name</label>
          <input className="w-full border border-[var(--line)] rounded-lg px-3 py-2.5 outline-none focus:border-[var(--green)]" />
        </div>
        <div>
          <label className="text-sm font-semibold block mb-1.5">Email</label>
          <input type="email" className="w-full border border-[var(--line)] rounded-lg px-3 py-2.5 outline-none focus:border-[var(--green)]" />
        </div>
        <div>
          <label className="text-sm font-semibold block mb-1.5">Message</label>
          <textarea rows={5} className="w-full border border-[var(--line)] rounded-lg px-3 py-2.5 outline-none focus:border-[var(--green)]" />
        </div>
        <button type="submit" className="btn-primary px-8 py-2.5">Send Message</button>
      </form>
    </div>
  );
}
