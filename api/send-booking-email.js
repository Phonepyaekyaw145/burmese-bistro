import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({
      success: false,
      message: "Method not allowed",
    });
  }

  try {
    const { name, email, table, date, time, occasion } = req.body;

    const data = await resend.emails.send({
      from: "Burmese Bistro <onboarding@resend.dev>",
      to: email,
      subject: "Your Booking is Confirmed 🍽️",
      html: `
        <div style="font-family:sans-serif;padding:20px">
          <h1>Booking Confirmed 🎉</h1>

          <p>Hello ${name},</p>

          <p>
            Your reservation at <strong>Burmese Bistro</strong>
            has been confirmed.
          </p>

          <div style="
            background:#f5f5f5;
            padding:16px;
            border-radius:12px;
            margin-top:20px;
          ">
            <p><strong>Table:</strong> ${table}</p>
            <p><strong>Date:</strong> ${date}</p>
            <p><strong>Time:</strong> ${time}</p>
            <p><strong>Occasion:</strong> ${occasion || "Not specified"}</p>
          </div>

          <p style="margin-top:20px">
            We look forward to serving you 🍜
          </p>
        </div>
      `,
    });

    return res.status(200).json({
      success: true,
      data,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      error,
    });
  }
}
