import Image from "next/image";
import Link from "next/link";

export default function SchedulePage() {
  const schedulerUrl = process.env.NEXT_PUBLIC_GOOGLE_SCHEDULER_EMBED_URL;

  return (
    <div className="page-shell flex min-h-screen flex-col">
      <header className="border-b border-line bg-surface">
        <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-4 md:px-10">
          <Link aria-label="mediocre to masterful home" className="flex items-center" href="/">
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
          </Link>
          <span className="rounded-full border border-line bg-surface px-3 py-1 text-xs font-semibold text-muted">
            Educational only - not advisory
          </span>
        </div>
      </header>

      <main className="flex-1">
        <section className="section-wrap py-16 md:py-20">
          <h1 className="heading-main max-w-4xl">Payment Received. Schedule Your Google Calendar Session.</h1>
          <p className="body-copy mt-6 max-w-3xl">
            Thank you for registering. Choose a time below to book your 40-minute Financial
            Clarity Session.
          </p>

          {schedulerUrl ? (
            <>
              <div className="mt-6 -mx-4 overflow-hidden rounded-xl border border-line bg-surface sm:mx-0">
                <iframe
                  className="block h-190 w-full border-0 bg-surface sm:h-175"
                  loading="lazy"
                  src={schedulerUrl}
                  title="Schedule your Financial Clarity Session"
                />
              </div>
              <p className="mt-4 text-sm text-muted">
                Having trouble viewing the scheduler?{" "}
                <a className="underline" href={schedulerUrl} target="_blank" rel="noopener noreferrer">
                  Open the booking page in a new tab.
                </a>
              </p>
            </>
          ) : (
            <div className="mt-6 rounded-xl border border-dashed border-line bg-surface p-5 text-muted">
              Add NEXT_PUBLIC_GOOGLE_SCHEDULER_EMBED_URL in your environment settings to enable the
              scheduler page embed.
            </div>
          )}

          <p className="mt-4 text-sm text-muted">
            Educational consultation only. Sessions and materials are for educational purposes and
            do not constitute financial, legal, or tax advice.
          </p>
        </section>
      </main>
    </div>
  );
}