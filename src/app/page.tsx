import EmailSignupForm from "@/components/email-signup-form";
import Image from "next/image";

export default function Home() {
  const calendlyUrl = process.env.NEXT_PUBLIC_CALENDLY_EMBED_URL;

  return (
    <div className="page-shell flex flex-1 flex-col">
      <header className="sticky top-0 z-20 border-b border-line bg-surface/95 backdrop-blur">
        <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-4 md:px-10">
          <a aria-label="mediocre to masterful home" className="flex items-center" href="#top">
            <Image
              alt="mediocre to masterful logo"
              className="brand-logo hidden h-auto w-[320px] md:block"
              height={59}
              priority
              src="/mediocretomasterful_logo.png"
              width={300}
            />
            <Image
              alt="mediocre to masterful mark"
              className="brand-logo block h-auto w-12 md:hidden"
              height={60}
              priority
              src="/logo.png"
              width={51}
            />
          </a>
          <div className="flex items-center gap-4">
            <nav className="hidden items-center gap-5 text-sm text-muted md:flex">
              <a href="#about">About</a>
              <a href="#what-you-get">Session</a>
              <a href="#disclaimer">Disclaimer</a>
            </nav>
            <span className="rounded-full border border-line bg-surface px-3 py-1 text-xs font-semibold text-muted">
              Educational only - not advisory
            </span>
          </div>
        </div>
      </header>

      <main className="flex-1" id="top">
        <section className="section-wrap">
          <span className="eyebrow">Financial Education and Strategy</span>
          <div className="mb-5 mt-2">
            <Image
              alt="mediocre to masterful"
              className="brand-logo h-auto w-[300px] opacity-95 md:w-[380px]"
              height={79}
              src="/mediocretomasterful_logo.png"
              width={400}
            />
          </div>
          <h1 className="heading-main max-w-3xl">
            Helping Everyday People Understand Their Money and the Market
          </h1>
          <p className="body-copy mt-6 max-w-2xl">
            Clear, practical guidance to help you take confident next steps with your finances.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a className="btn-primary" href="#book-session">
              Book a Session
            </a>
            <a className="btn-secondary" href="#email-list">
              Join the Email List
            </a>
          </div>
          <p className="mt-5 max-w-3xl rounded-xl border border-line bg-surface/90 px-4 py-3 text-sm text-muted">
            Disclaimer: Content and sessions are for educational purposes only. mediocre to
            masterful is not a licensed financial advisor company and does not provide investment,
            legal, or tax advice.
          </p>
        </section>

        <section className="section-wrap pt-0" id="about">
          <div className="panel max-w-4xl">
            <h2 className="heading-section">About MTM</h2>
            <div className="mt-5 space-y-4 body-copy">
              <p>
                mediocre to masterful was built from lived experience: self-taught investors since
                high school and over seven years studying options and market behavior.
              </p>
              <p>
                The mission is simple. Help everyday professionals understand how money decisions
                connect, so they can move from uncertainty to structure.
              </p>
              <p>
                The focus in every session is clarity, confidence, and practical education you can
                use right away.
              </p>
            </div>
          </div>
        </section>

        <section className="section-wrap pt-0" id="who-this-is-for">
          <h2 className="heading-section">Who This Is For</h2>
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            {[
              "People unsure how to start investing",
              "People confused by their 401k allocation choices",
              "People wanting structure instead of guesswork",
              "People curious about markets and what to watch",
              "People wanting accountability and direction",
            ].map((item) => (
              <div className="panel" key={item}>
                <p className="text-lg text-foreground">{item}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="section-wrap pt-0" id="what-you-get">
          <h2 className="heading-section">What You Get in a Financial Clarity Session</h2>
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            {[
              "Personal review of your current financial setup and priorities",
              "Simple action plan with clear next steps",
              "Account setup direction for 401k and brokerage structure",
              "Investment education guidance, including options basics (educational only)",
              "Behavior strategy to stay consistent and avoid emotional decisions",
            ].map((item) => (
              <article className="panel" key={item}>
                <p className="text-lg text-foreground">{item}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="section-wrap pt-0" id="how-it-works">
          <h2 className="heading-section">How It Works</h2>
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {[
              { title: "Step 1", body: "Book your 60-minute Financial Clarity Session." },
              { title: "Step 2", body: "Meet virtually and walk through your goals and questions." },
              {
                title: "Step 3",
                body: "Receive a practical action plan for your next financial moves.",
              },
            ].map((step) => (
              <article className="panel" key={step.title}>
                <h3 className="font-[family-name:var(--font-fraunces)] text-2xl">{step.title}</h3>
                <p className="mt-3 text-muted">{step.body}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="section-wrap pt-0" id="book-session">
          <div className="panel overflow-hidden px-4 py-6 sm:p-6">
            <h2 className="heading-section">Book Your 60-Minute Financial Clarity Session</h2>
            <p className="mt-3 body-copy">
              Choose a time that works for you. Sessions are virtual, focused, and educational.
            </p>
            {calendlyUrl ? (
              <div className="mt-6 -mx-4 overflow-hidden rounded-xl border border-line bg-surface sm:mx-0">
                <iframe
                  className="block h-190 w-full border-0 bg-surface sm:h-175"
                  loading="lazy"
                  src={calendlyUrl}
                  title="Schedule your Financial Clarity Session"
                />
              </div>
            ) : (
              <div className="mt-6 rounded-xl border border-dashed border-line bg-surface p-5 text-muted">
                Add your Calendly link in NEXT_PUBLIC_CALENDLY_EMBED_URL to enable on-page
                scheduling.
              </div>
            )}
            <p className="mt-4 text-sm text-muted">
              Educational consultation only. Booking a session does not create an advisor-client
              relationship.
            </p>
          </div>
        </section>

        <section className="section-wrap pt-0">
          <EmailSignupForm />
        </section>

        <section className="section-wrap pt-0" id="disclaimer">
          <div className="panel">
            <h2 className="heading-section">Disclaimer</h2>
            <ul className="mt-5 space-y-3 text-lg text-muted">
              <li>All content is for educational purposes only.</li>
              <li>mediocre to masterful is not a licensed financial advisor company.</li>
              <li>No financial, investment, legal, or tax advice is provided.</li>
              <li>All investing involves risk, including possible loss of principal.</li>
              <li>No investment outcomes or returns are guaranteed.</li>
            </ul>
          </div>
        </section>

        <section className="section-wrap pt-0">
          <div className="rounded-2xl border border-brand/20 bg-gradient-to-r from-[#3a3674] to-[#635dab] px-6 py-10 text-white md:px-10">
            <h2 className="heading-section text-white">Book Your First Session</h2>
            <p className="mt-3 max-w-2xl text-lg text-indigo-100">
              Get clear direction, practical education, and a focused plan for your next steps.
            </p>
            <a className="mt-7 inline-flex rounded-full bg-white px-6 py-3 font-semibold text-[#3a3674]" href="#book-session">
              Book a Financial Clarity Session
            </a>
          </div>
        </section>
      </main>

      <footer className="border-t border-line bg-surface">
        <div className="mx-auto w-full max-w-6xl px-6 py-8 text-sm text-muted md:px-10">
          mediocre to masterful provides financial education and strategy support only. This website
          does not provide financial advice and does not guarantee investment outcomes.
        </div>
      </footer>
    </div>
  );
}
