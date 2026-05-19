import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req, res) {
  try {
    const { name, email, table, date, time, occasion } = req.body;

    const data = await resend.emails.send({
      from: "Burmese Bistro <onboarding@resend.dev>",
      to: [email],
      subject: "Your Booking is Confirmed 🍽️",
      html: `
        <div style="font-family:sans-serif">
          <h2>Booking Confirmed</h2>

          <p>Hello ${name},</p>

          <p>Your reservation has been confirmed.</p>

          <ul>
            <li><b>Table:</b> ${table}</li>
            <li><b>Date:</b> ${date}</li>
            <li><b>Time:</b> ${time}</li>
            <li><b>Occasion:</b> ${occasion || "Regular Dining"}</li>
          </ul>

          <p>Thank you for choosing Burmese Bistro ❤️</p>
        </div>
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
