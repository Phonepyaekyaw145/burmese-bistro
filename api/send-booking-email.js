import SibApiV3Sdk from "sib-api-v3-sdk";

export default async function handler(req, res) {
  try {
    const { name, email, table, date, time, occasion } = req.body;

    // 🔑 Setup Brevo API
    let defaultClient = SibApiV3Sdk.ApiClient.instance;
    let apiKey = defaultClient.authentications["api-key"];
    apiKey.apiKey = process.env.BREVO_API_KEY;

    let apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();

    const response = await apiInstance.sendTransacEmail({
      sender: {
        email: "yourverifiedemail@gmail.com", // ⚠️ must be verified in Brevo
        name: "Burmese Bistro",
      },

      to: [{ email: email }],

      subject: "Your Booking is Confirmed 🍽️",

      htmlContent: `
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
      data: response,
    });
  } catch (err) {
    console.error("Email error:", err);

    res.status(500).json({
      success: false,
      error: err.message,
    });
  }
}
