# mediocre to masterful v1 Launch Playbook

## Tech Stack Recommendation
- Next.js (App Router) for a fast, scalable landing page.
- Tailwind CSS for clean responsive styling and whitespace control.
- Vercel for easy deployment and preview links.
- Calendly inline embed for booking conversion.
- Mailchimp API for email capture.
- Stripe recommended for phase 1.1 payment flow.

## Brand Name Ideas
- mediocre to masterful Financial Clarity
- MTM Financial Education Studio
- mediocre to masterful Money Direction
- MTM Market and Money Clarity
- mediocre to masterful Financial Learning Lab

## Calendly Integration Instructions
1. In Calendly, create a 60-minute event named Financial Clarity Session.
2. Copy the event embed URL.
3. Add it to `.env.local` as `NEXT_PUBLIC_CALENDLY_EMBED_URL`.
4. Restart the dev server.
5. Verify the widget loads in the Book section and on mobile.
6. Keep the educational-only disclaimer visible near booking.

## Stripe Integration Instructions (Phase 1.1)
1. Create a Stripe product named Financial Clarity Session.
2. Create a one-time Price and copy its Price ID to `STRIPE_PRICE_ID`.
3. Add `STRIPE_SECRET_KEY` to environment config.
4. Create Stripe promotion codes for coupon entry and campaign discounts.
5. Optional: create a campaign promotion code for targeted links and save it as `STRIPE_PROMO_CODE_REGISTER`.
6. Use the Register button flow (`POST /api/create-checkout-session`) as the default conversion path.
7. For targeted campaign links, use `/api/create-checkout-session?campaignKey=register`.
8. Keep legal language beside payment actions:
   - Educational service only
   - Not financial advice
   - No investment guarantees

## Payment to Scheduling Flow
1. User clicks Register Now.
2. Site calls `/api/create-checkout-session` and redirects to Stripe Checkout.
3. User can enter a promo code directly in Checkout.
4. On payment success, Stripe redirects to `/schedule`.
5. `/schedule` renders scheduler iframe from `NEXT_PUBLIC_ZOOM_SCHEDULER_EMBED_URL`.

## Email Capture Setup (Mailchimp)
1. Create an Audience in Mailchimp for MTM updates.
2. Generate API key in Account -> Extras -> API keys.
3. Add `MAILCHIMP_API_KEY` and `MAILCHIMP_AUDIENCE_ID` to `.env.local`.
4. Confirm audience merge fields include `FNAME` (optional).
5. Submit a test email through the site form.
6. Confirm double opt-in email arrives and completes.
7. Publish a welcome email that sets expectations:
   - Practical educational insights
   - Frequency and unsubscribe option
   - Link to schedule a session

## Compliance Notes
- MTM must always be positioned as financial education and strategy support.
- Avoid wording that implies licensed advisory services.
- Avoid claims of guaranteed investment performance.
- Add Terms and Privacy pages in v1.1 and have legal review before paid campaigns.
