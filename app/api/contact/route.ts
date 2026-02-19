import { NextResponse } from "next/server";
import { z } from "zod";

const contactSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, message } = contactSchema.parse(body);

    // If RESEND_API_KEY is set, send a real email
    const resendKey = process.env.RESEND_API_KEY;
    const recipientEmail = process.env.CONTACT_EMAIL || "hassan@example.com";

    if (resendKey) {
      const res = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${resendKey}`,
        },
        body: JSON.stringify({
          from: "Portfolio Contact <onboarding@resend.dev>",
          to: [recipientEmail],
          subject: `New message from ${name}`,
          reply_to: email,
          html: `
            <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
              <h2 style="color: #a855f7;">New Contact Form Submission</h2>
              <p><strong>Name:</strong> ${name}</p>
              <p><strong>Email:</strong> ${email}</p>
              <hr style="border: 1px solid #e5e7eb; margin: 16px 0;" />
              <p><strong>Message:</strong></p>
              <p style="white-space: pre-wrap; color: #374151;">${message}</p>
            </div>
          `,
        }),
      });

      if (!res.ok) {
        const error = await res.json();
        console.error("Resend error:", error);
        throw new Error("Failed to send email");
      }
    } else {
      // Fallback: just log
      console.log("Contact form submitted (no RESEND_API_KEY set):", {
        name,
        email,
        message,
      });
    }

    return NextResponse.json({
      success: true,
      message: "Message sent successfully! I'll get back to you soon.",
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
      { message: "Failed to send message. Please try again later." },
      { status: 500 }
    );
  }
}
