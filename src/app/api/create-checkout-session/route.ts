import { NextResponse } from "next/server";
import Stripe from "stripe";

export const runtime = "nodejs";

type CheckoutPayload = {
  campaignKey?: string;
};

type CampaignResolution = {
  campaignKey?: string;
  promotionCodeId?: string;
  error?: string;
};

type CheckoutUrlResult = {
  url?: string;
  error?: string;
  status: number;
};

function hasPlaceholderValue(value: string): boolean {
  return value.includes("your_") || value.includes("_your") || value.includes("changeme");
}

function getCampaignPromotionCode(campaignKey?: string): CampaignResolution {
  if (!campaignKey) {
    return {};
  }

  const normalizedCampaignKey = campaignKey.trim().toLowerCase();

  if (!normalizedCampaignKey) {
    return {};
  }

  const campaignEnvMap: Record<string, string> = {
    register: "STRIPE_PROMO_CODE_REGISTER",
  };

  const envVarName = campaignEnvMap[normalizedCampaignKey];

  if (!envVarName) {
    return { error: "Unknown campaign key." };
  }

  const promotionCodeId = process.env[envVarName];

  if (!promotionCodeId) {
    return {
      error: `Campaign \"${normalizedCampaignKey}\" is not configured.`,
    };
  }

  return {
    campaignKey: normalizedCampaignKey,
    promotionCodeId,
  };
}

function getOriginFromRequest(request: Request): string {
  const forwardedProto = request.headers.get("x-forwarded-proto");
  const forwardedHost = request.headers.get("x-forwarded-host");

  if (forwardedProto && forwardedHost) {
    return `${forwardedProto}://${forwardedHost}`;
  }

  return new URL(request.url).origin;
}

function getStripeClient(): Stripe | null {
  const secretKey = process.env.STRIPE_SECRET_KEY;
  if (!secretKey) {
    return null;
  }

  return new Stripe(secretKey);
}

async function createCheckoutUrl(request: Request, campaignKey?: string): Promise<CheckoutUrlResult> {
  const stripe = getStripeClient();
  const stripePriceId = process.env.STRIPE_PRICE_ID;
  const stripeSecretKey = process.env.STRIPE_SECRET_KEY;

  if (!stripe || !stripePriceId || !stripeSecretKey) {
    return {
      error:
        "Stripe is not configured yet. Add STRIPE_SECRET_KEY and STRIPE_PRICE_ID.",
      status: 500,
    };
  }

  if (hasPlaceholderValue(stripeSecretKey) || hasPlaceholderValue(stripePriceId)) {
    return {
      error:
        "Stripe config uses placeholder values. Replace STRIPE_SECRET_KEY and STRIPE_PRICE_ID in .env.local with real Stripe test values.",
      status: 500,
    };
  }

  if (!stripeSecretKey.startsWith("sk_")) {
    return {
      error: "STRIPE_SECRET_KEY is invalid. It should start with sk_test_ or sk_live_.",
      status: 500,
    };
  }

  if (!stripePriceId.startsWith("price_")) {
    return {
      error:
        "STRIPE_PRICE_ID is invalid. Use a Stripe Price ID (price_...), not a Product ID (prod_...).",
      status: 500,
    };
  }

  const campaignResolution = getCampaignPromotionCode(campaignKey);
  if (campaignResolution.error) {
    return {
      error: campaignResolution.error,
      status: 400,
    };
  }

  const origin = getOriginFromRequest(request);
  const successUrl = `${origin}/schedule?session_id={CHECKOUT_SESSION_ID}`;
  const cancelUrl = `${origin}/#register`;

  const sessionParams: Stripe.Checkout.SessionCreateParams = {
    mode: "payment",
    line_items: [{ price: stripePriceId, quantity: 1 }],
    success_url: successUrl,
    cancel_url: cancelUrl,
    allow_promotion_codes: true,
    metadata: campaignResolution.campaignKey
      ? { campaignKey: campaignResolution.campaignKey }
      : undefined,
  };

  if (campaignResolution.promotionCodeId) {
    sessionParams.discounts = [{ promotion_code: campaignResolution.promotionCodeId }];
  }

  let session: Stripe.Checkout.Session;

  try {
    session = await stripe.checkout.sessions.create(sessionParams);
  } catch (error) {
    if (error instanceof Stripe.errors.StripeError) {
      return {
        error:
          error.message ||
          "Stripe rejected the checkout request. Confirm STRIPE_SECRET_KEY, STRIPE_PRICE_ID, and promotion code configuration.",
        status: error.statusCode ?? 500,
      };
    }

    return {
      error: "Unexpected Stripe error while creating checkout.",
      status: 500,
    };
  }

  if (!session.url) {
    return {
      error: "Stripe did not return a checkout URL.",
      status: 500,
    };
  }

  return {
    url: session.url,
    status: 200,
  };
}

export async function POST(request: Request) {
  try {
    let payload: CheckoutPayload = {};

    try {
      payload = (await request.json()) as CheckoutPayload;
    } catch {
      payload = {};
    }

    const campaignKey =
      typeof payload.campaignKey === "string" ? payload.campaignKey : undefined;

    const result = await createCheckoutUrl(request, campaignKey);

    if (!result.url) {
      return NextResponse.json({ message: result.error }, { status: result.status });
    }

    return NextResponse.json({ url: result.url });
  } catch {
    return NextResponse.json({ message: "Unexpected error. Please try again." }, { status: 500 });
  }
}

export async function GET(request: Request) {
  try {
    const requestUrl = new URL(request.url);
    const campaignKey = requestUrl.searchParams.get("campaignKey") ?? undefined;

    const result = await createCheckoutUrl(request, campaignKey);

    if (!result.url) {
      return NextResponse.json({ message: result.error }, { status: result.status });
    }

    return NextResponse.redirect(result.url);
  } catch {
    return NextResponse.json({ message: "Unexpected error. Please try again." }, { status: 500 });
  }
}