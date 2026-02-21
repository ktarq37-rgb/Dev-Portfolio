import { NextResponse } from "next/server";
import { Resend } from "resend";
import { z } from "zod";

export const dynamic = "force-dynamic";

const contactSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

export async function POST(request: Request) {
  try {
    const resend = new Resend(process.env.RESEND_API_KEY);

    const body = await request.json();
    const { name, email, message } = contactSchema.parse(body);

    const { error } = await resend.emails.send({
      from: "Portfolio Contact <onboarding@resend.dev>",
      to: "hsn46475@gmail.com",
      replyTo: email,
      subject: `New message from ${name} — Portfolio Contact`,
      html: `
        <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; max-width: 560px; margin: 0 auto; padding: 32px 24px; background: #0a0a0a; color: #e4e4e7; border-radius: 16px;">
          <h2 style="margin: 0 0 24px; font-size: 20px; color: #fff;">New Contact Message</h2>
          <table style="width: 100%; border-collapse: collapse; margin-bottom: 24px;">
            <tr>
              <td style="padding: 10px 0; color: #a1a1aa; font-size: 13px; width: 80px; vertical-align: top;">Name</td>
              <td style="padding: 10px 0; color: #fff; font-size: 14px;">${name}</td>
            </tr>
            <tr>
              <td style="padding: 10px 0; color: #a1a1aa; font-size: 13px; vertical-align: top;">Email</td>
              <td style="padding: 10px 0; font-size: 14px;"><a href="mailto:${email}" style="color: #a78bfa; text-decoration: none;">${email}</a></td>
            </tr>
          </table>
          <div style="padding: 16px; background: #18181b; border-radius: 12px; border: 1px solid #27272a;">
            <p style="margin: 0; font-size: 14px; line-height: 1.6; color: #d4d4d8; white-space: pre-wrap;">${message}</p>
          </div>
          <p style="margin: 24px 0 0; font-size: 11px; color: #52525b;">Sent from your portfolio contact form</p>
        </div>
      `,
    });

    if (error) {
      console.error("Resend error:", error);
      return NextResponse.json(
        { message: "Failed to send email. Please try again." },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Message sent successfully!",
    });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json(
        { message: err.errors[0].message },
        { status: 400 }
      );
    }
    console.error("Contact API error:", err);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
