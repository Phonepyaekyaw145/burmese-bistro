import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).end();
  }

  try {
    const { name, email, phone, table, date, time, occasion } = req.body;

    const data = await resend.emails.send({
      from: "Burmese Bistro <onboarding@resend.dev>",
      to: [email],
      subject: "Booking Confirmed 🍽️",
      html: `
        <h2>Booking Confirmed</h2>

        <p>Hello ${name},</p>

        <p>Your booking has been confirmed successfully.</p>

        <ul>
          <li><b>Table:</b> ${table}</li>
          <li><b>Date:</b> ${date}</li>
          <li><b>Time:</b> ${time}</li>
          <li><b>Occasion:</b> ${occasion || "None"}</li>
          <li><b>Phone:</b> ${phone}</li>
        </ul>

        <p>Thank you for choosing Burmese Bistro ❤️</p>
      `,
    });

    res.status(200).json({
      success: true,
      data,
    });
  } catch (err) {
    console.error(err);

    res.status(500).json({
      success: false,
      error: err.message,
    });
  }
}
