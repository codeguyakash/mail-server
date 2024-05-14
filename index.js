import express from "express";
import { Resend } from "resend";

const app = express();
app.use(express.json());
const PORT = process.env.PORT || 8080;
const resend = new Resend(process.env.RESEND_API_KEY);

app.post("/", async (req, res) => {
  const { name, email, phone, pincode, isResidential, isCommercial } = req.body;
  if (!(name, email, phone, pincode, isResidential, isCommercial))
    return res.send("Fields Required");
  try {
    const { data, error } = await resend.emails.send({
      from: "Akash (codeguyakash) <codeguyakash@resend.dev>",
      to: ["codeguyakash@gmail.com"],
      subject: "Node Js Server",
      html: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Inquiry Email</title>
</head>
<body>
    <p>Dear,</p>
    <p>I hope this email finds you well. My name is <strong>${name}</strong>, and I am reaching out regarding [mention the purpose of the inquiry, e.g., your product/service, an event, etc.].</p>
    <p>I found your contact information through your website, and I am interested in [briefly explain the reason for the inquiry, e.g., learning more about your product features, discussing a potential collaboration, etc.].</p>
    <p>Here are my contact details:</p>
    <ul>
        <li><strong>Name:</strong> ${name}</li>
        <li><strong>Email:</strong> ${email}</li>
        <li><strong>Phone:</strong> ${phone}</li>
        <li><strong>Pincode:</strong> ${pincode}</li>
        <li><strong>Type</strong> ${
          isResidential ? "Residential" : "Commercial"
        }</li>

    </ul>
    <p>I would appreciate it if you could provide me with further information regarding [specific details you are seeking, any questions you have, etc.].</p>
    <p>Thank you for your time and attention to this matter. I look forward to hearing from you soon.</p>
    <p>Warm regards,</p>
    <p>${name}</p>
</body>
</html>
`,
    });
    console.log(error);
    if (error)
      return res.status(error.statusCode).json({ error: error.message });

    res.status(200).json({ data });
  } catch (error) {
    return res.status(500).json({ error });
  }
});

app.listen(PORT, () => {
  console.log(`[Server Running...${PORT}]`);
});
