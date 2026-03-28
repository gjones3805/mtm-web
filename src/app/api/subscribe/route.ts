import { NextResponse } from "next/server";

type SubscribePayload = {
  email?: string;
  firstName?: string;
};

function getRegionFromApiKey(apiKey: string): string | null {
  const parts = apiKey.split("-");
  return parts.length > 1 ? parts[parts.length - 1] : null;
}

export async function POST(request: Request) {
  try {
    const { email, firstName } = (await request.json()) as SubscribePayload;

    if (!email || typeof email !== "string") {
      return NextResponse.json({ message: "A valid email address is required." }, { status: 400 });
    }

    const apiKey = process.env.MAILCHIMP_API_KEY;
    const audienceId = process.env.MAILCHIMP_AUDIENCE_ID;

    if (!apiKey || !audienceId) {
      return NextResponse.json(
        {
          message:
            "Mailchimp is not configured yet. Add MAILCHIMP_API_KEY and MAILCHIMP_AUDIENCE_ID.",
        },
        { status: 500 },
      );
    }

    const region = getRegionFromApiKey(apiKey);
    if (!region) {
      return NextResponse.json(
        { message: "Invalid Mailchimp API key format. Expected key ending in region suffix." },
        { status: 500 },
      );
    }

    const response = await fetch(`https://${region}.api.mailchimp.com/3.0/lists/${audienceId}/members`, {
      method: "POST",
      headers: {
        Authorization: `Basic ${Buffer.from(`anystring:${apiKey}`).toString("base64")}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email_address: email,
        status: "pending",
        merge_fields: {
          FNAME: firstName ?? "",
        },
      }),
      cache: "no-store",
    });

    const data = (await response.json()) as { title?: string; detail?: string; status?: number };

    if (!response.ok) {
      const alreadySubscribed = data.title === "Member Exists";
      if (alreadySubscribed) {
        return NextResponse.json(
          { message: "This email is already subscribed. Thank you for staying connected." },
          { status: 200 },
        );
      }

      return NextResponse.json(
        { message: data.detail ?? "Could not subscribe. Please try again." },
        { status: data.status ?? 500 },
      );
    }

    return NextResponse.json({ message: "Subscription successful. Please confirm in your inbox." });
  } catch {
    return NextResponse.json({ message: "Unexpected error. Please try again." }, { status: 500 });
  }
}
