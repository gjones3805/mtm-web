# mediocre to masterful

Professional one-page site for mediocre to masterful financial education services.

## Positioning

- Financial education and strategy support only.
- Not a licensed financial advisor company.
- No investment, legal, or tax advice.
- No guaranteed outcomes.

## Local Development

1. Install dependencies:

```bash
npm install
```

2. Create local environment file:

```bash
cp .env.example .env.local
```

3. Add your values in `.env.local`:
- `NEXT_PUBLIC_CALENDLY_EMBED_URL`
- `NEXT_PUBLIC_ZOOM_SCHEDULER_EMBED_URL` (preferred scheduler embed URL for `/schedule`)
- `STRIPE_SECRET_KEY`
- `STRIPE_PRICE_ID`
- `STRIPE_PROMO_CODE_REGISTER` (optional campaign promotion code for targeted links)
- `MAILCHIMP_API_KEY`
- `MAILCHIMP_AUDIENCE_ID`

4. Start development server:

```bash
npm run dev
```

5. Open `http://localhost:3000`.

## Key Features

- Landing page sections:
	- Hero
	- About MTM
	- Who This Is For
	- What You Get
	- How It Works
	- Disclaimer
	- Final CTA
- Checkout-first registration flow for the 60-minute Financial Clarity Session.
- Stripe-powered Register Now checkout flow via `/api/create-checkout-session`.
- Coupon support in Stripe Checkout (customer-entered promo codes plus optional campaign-based pre-applied discounts).
- Post-payment redirect to `/schedule` with scheduler iframe embed.
- Mailchimp-powered email signup form (`/api/subscribe`).
- Persistent non-advisor disclaimers across key conversion points.

## Mailchimp API Notes

The subscribe endpoint lives at `src/app/api/subscribe/route.ts`.

- It creates contacts with `pending` status (double opt-in flow).
- It gracefully handles "Member Exists" responses.
- It requires API key region suffix format (example: `...-us21`).

## Stripe Checkout Notes

The checkout endpoint lives at `src/app/api/create-checkout-session/route.ts`.

- `POST /api/create-checkout-session` returns a Stripe Checkout URL for the Register button flow.
- `GET /api/create-checkout-session?campaignKey=register` supports targeted campaign links with pre-applied discounts.
- `allow_promotion_codes` is enabled so users can enter valid Stripe promo codes directly in Checkout.
- Successful payment redirects to `/schedule`.

## Deployment (Vercel)

1. Push repository to GitHub.
2. Import project in Vercel.
3. Add environment variables from `.env.example`.
4. Deploy.
5. Validate:
	 - Register button opens Stripe Checkout
	 - Successful payment redirects to `/schedule`
	 - Scheduler iframe loads on `/schedule`
	 - Email form submits and double opt-in email is received
	 - Disclaimer content appears in hero, dedicated section, and footer

## Additional Launch Guidance

See `docs/launch-playbook.md` for:
- Brand name ideas
- Calendly integration checklist
- Stripe integration plan (phase 1.1)
- Email capture setup checklist
- Compliance reminders
