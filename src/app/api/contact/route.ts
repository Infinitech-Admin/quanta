import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

function contactEmailHtml({
  name,
  email,
  subject,
  message,
}: {
  name: string;
  email: string;
  subject: string;
  message: string;
}) {
  return `
  <div style="padding:40px; font-family:Arial,Helvetica,sans-serif;">
    <table width="600" align="center" cellpadding="0" cellspacing="0" style="background:#f6f2e7; border-radius:12px; overflow:hidden; box-shadow:0 0 20px rgba(0,0,0,.1);">

      <!-- Header -->
      <tr>
        <td bgcolor="#1e3b2a" style="background:linear-gradient(160deg, #2ea043 0%, #1e3b2a 80%); padding:40px; text-align:center;">
          <img
            src="https://quantapaper.com.ph/themes/custom/bootstrap_sub/img/logo-white.png"
            width="170"
            alt="Quanta Paper"
            style="display:block; margin:0 auto;"
          />

          <h1 style="color:#f6f2e7; margin:24px 0 5px; font-size:24px; font-family:Georgia,serif;">
            Quanta Paper Corporation
          </h1>

          <p style="color:#e7f1e2; margin:0; font-size:14px;">
            Sustainable Paper Solutions
          </p>
        </td>
      </tr>

      <!-- Body -->
      <tr>
        <td style="padding:35px; background:#f6f2e7;">

          <table width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;  border-radius:12px;">
            <tr>
              <td style="padding:28px;">

                <!-- Name + Email row -->
                <table width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;">
                  <tr>
                    <td width="50%" style="padding-right:10px; vertical-align:top;">
                      <p style="margin:0 0 6px; font-size:11px; letter-spacing:0.08em; text-transform:uppercase; color:#b98a52;">
                        Full Name
                      </p>
                      <table width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;">
                        <tr>
                          <td style="width:100%; background:#ffffff; border:1px solid #e2ddd0; border-radius:8px; padding:12px 14px; color:#1e3b2a; font-size:14px;">
                            ${name}
                          </td>
                        </tr>
                      </table>
                    </td>
                    <td width="50%" style="padding-left:10px; vertical-align:top;">
                      <p style="margin:0 0 6px; font-size:11px; letter-spacing:0.08em; text-transform:uppercase; color:#b98a52;">
                        Email Address
                      </p>
                      <table width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;">
                        <tr>
                          <td style="width:100%; background:#ffffff; text-decoration: none; border:1px solid #e2ddd0; border-radius:8px; padding:12px 5px; color:#1e3b2a; font-size:14px;">${email}</td>
                        </tr>
                      </table>
                    </td>
                  </tr>
                </table>

                <!-- Subject -->
                <table width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse; margin-top:20px;">
                  <tr>
                    <td>
                      <p style="margin:0 0 6px; font-size:11px; letter-spacing:0.08em; text-transform:uppercase; color:#b98a52;">
                        Subject
                      </p>
                      <table width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;">
                        <tr>
                          <td style="width:100%; background:#ffffff; border:1px solid #e2ddd0; border-radius:8px; padding:12px 14px; color:#1e3b2a; font-size:14px;">
                            ${subject}
                          </td>
                        </tr>
                      </table>
                    </td>
                  </tr>
                </table>

                <!-- Message -->
                <table width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse; margin-top:20px;">
                  <tr>
                   <td>
                     <p style="margin:0 0 6px; font-size:11px; letter-spacing:0.08em; text-transform:uppercase; color:#b98a52;">
                       Message
                     </p>
                     <table width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;">
                       <tr>
                          <td style="background:#ffffff; border:1px solid #e2ddd0; border-radius:8px; padding:12px 14px; color:#1e3b2a; font-size:14px;">
                            ${message}
                          </td>
                      </tr>
                    </table>
                  </td>
                  </tr>
                </table>

              </td>
            </tr>
          </table>
        </td>
      </tr>

      <!-- Footer -->
      <tr>
        <td bgcolor="#1e3b2a" style="background:#1e3b2a; color:#ffffff; text-align:center; padding:30px; font-size:13px;">
         <strong style="color:#9bb87e;">Quanta Paper Corporation</strong><br><br>

        <a href="mailto:wecare@quantapaper.com" style="font-size:13px; color:#e7f1e2; text-decoration:underline;">
          wecare@quantapaper.com
        </a>

        <p style="font-size:11px; line-height:1.2; color:#f6f2e7; margin:7px 0 0;">
          (632) 8533.9250
        </p>

        <p style="font-size:11px; line-height:1.2; color:#f6f2e7; margin:7px 0 0;">
          149-A Rev. Aglipay St., Brgy. Old Zañiga<br/>
          Mandaluyong City, Philippines
        </p>

        <hr style="border:none; border-top:1px solid #9bb87e; margin:12px 0;" />

        <p style="text-align:center; font-size:10px; letter-spacing:0.05em; color:#efe8d6; margin:0;">
          COPYRIGHT 2026 QUANTA PAPER CORPORATION
        </p>
        </td>
      </tr>
    </table>
  </div>
`;
}

export async function POST(req: NextRequest) {
  const data = await req.json();

  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT),
    secure: process.env.SMTP_PORT === "465",
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  try {
    const result = await transporter.sendMail({
      from: `"Quanta Paper Corporation Website" <${process.env.SMTP_USER}>`,
      to: process.env.CONTACT_RECEIVER_EMAIL,
      subject: `New Contact Form Submission - Subject: ${data.subject} from ${data.name}`,
      html: contactEmailHtml({
        name: String(data.name),
        email: String(data.email),
        subject: String(data.subject),
        message: String(data.message),
      }),
    });

    console.log("Email sent successfully:", result);
  } catch (error) {
    console.error("Error sending email:", error);
    return NextResponse.json({ message: "error" }, { status: 500 });
  }
  return NextResponse.json({ message: "success" });
}
