// // app/api/contact/route.ts
// import { NextResponse } from 'next/server';
// import nodemailer from 'nodemailer';

// // Validate environment variables at startup
// const SMTP_CONFIG = {
//   host: process.env.SMTP_HOST,
//   port: process.env.SMTP_PORT ? parseInt(process.env.SMTP_PORT) : 465,
//   secure: process.env.SMTP_PORT ? parseInt(process.env.SMTP_PORT) === 465 : true,
//   auth: {
//     user: process.env.SMTP_USER,
//     pass: process.env.SMTP_PASSWORD,
//   },
//   tls: {
//     rejectUnauthorized: process.env.NODE_ENV === 'production', // Strict SSL in production
//   },
// };

// // Validate required env vars
// function validateConfig() {
//   const requiredVars = ['SMTP_HOST', 'SMTP_USER', 'SMTP_PASSWORD'];
//   const missingVars = requiredVars.filter(varName => !process.env[varName]);

//   if (missingVars.length > 0) {
//     throw new Error(`Missing SMTP configuration: ${missingVars.join(', ')}`);
//   }
// }

// // Initialize transporter
// let transporter: nodemailer.Transporter;
// try {
//   validateConfig();
//   transporter = nodemailer.createTransport(SMTP_CONFIG);
// } catch (error) {
//   console.error('SMTP initialization failed:', error);
// }

// export async function POST(request: Request) {
//   // Check if SMTP is properly configured
//   if (!transporter) {
//     return NextResponse.json(
//       { success: false, error: 'Email service is currently unavailable' },
//       { status: 503 }
//     );
//   }

//   // Validate request
//   let payload: { email?: string; phone?: string; message?: string };
//   try {
//     payload = await request.json();

//     // Basic input validation
//     if (!payload.message?.trim()) {
//       return NextResponse.json(
//         { success: false, error: 'Message is required' },
//         { status: 400 }
//       );
//     }

//     if (!payload.email?.trim() && !payload.phone?.trim()) {
//       return NextResponse.json(
//         { success: false, error: 'Email or phone is required' },
//         { status: 400 }
//       );
//     }

//   } catch (error) {
//     return NextResponse.json(
//       { success: false, error: 'Invalid request format' },
//       { status: 400 }
//     );
//   }

//   // Prepare email content
//   const mailOptions = {
//     from: `"Tezcai Contact Form" <${process.env.SMTP_FROM_EMAIL || process.env.SMTP_USER}>`,
//     to: 'info@tezcai.com',
//     replyTo: payload.email || undefined,
//     subject: 'New Contact Form Submission',
//     text: [
//       `Email: ${payload.email || 'Not provided'}`,
//       `Phone: ${payload.phone || 'Not provided'}`,
//       `Message:\n${payload.message}`,
//     ].join('\n\n'),
//     html: `
//       <div style="font-family: Arial, sans-serif; line-height: 1.6;">
//         <h2 style="color: #2563eb;">New Contact Form Submission</h2>
//         <p><strong>Email:</strong> ${payload.email || 'Not provided'}</p>
//         <p><strong>Phone:</strong> ${payload.phone || 'Not provided'}</p>
//         <h3 style="margin-top: 1rem;">Message:</h3>
//         <p style="white-space: pre-wrap; background: #f3f4f6; padding: 1rem; border-radius: 0.5rem;">
//           ${payload.message}
//         </p>
//       </div>
//     `,
//   };

//   // Send email
//   try {
//     const info = await transporter.sendMail(mailOptions);
//     console.log('Email sent:', info.messageId);

//     return NextResponse.json(
//       { success: true, message: 'Thank you for your message!' },
//       { status: 200 }
//     );

//   } catch (error: any) {
//     console.error('Email send error:', error);

//     // Handle specific SMTP errors
//     let errorMessage = 'Failed to send message. Please try again later.';
//     if (error.code === 'ECONNECTION') {
//       errorMessage = 'Could not connect to email server';
//     } else if (error.responseCode === 535) {
//       errorMessage = 'Authentication failed. Please check email settings.';
//     }

//     return NextResponse.json(
//       { success: false, error: errorMessage },
//       { status: 500 }
//     );
//   }
// }



// app/api/contact/route.ts
import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

// Validate environment variables at startup
const SMTP_CONFIG = {
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT ? parseInt(process.env.SMTP_PORT) : 465,
    secure: process.env.SMTP_PORT ? parseInt(process.env.SMTP_PORT) === 465 : true,
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD,
    },
    tls: {
        rejectUnauthorized: process.env.NODE_ENV === 'production',
    },
};

// Validate required env vars
function validateConfig() {
    const requiredVars = ['SMTP_HOST', 'SMTP_USER', 'SMTP_PASSWORD'];
    const missingVars = requiredVars.filter(varName => !process.env[varName]);

    if (missingVars.length > 0) {
        throw new Error(`Missing SMTP configuration: ${missingVars.join(', ')}`);
    }
}

// Initialize transporter
let transporter: nodemailer.Transporter;
try {
    validateConfig();
    transporter = nodemailer.createTransport(SMTP_CONFIG);
} catch (error) {
    console.error('SMTP initialization failed:', error);
}

export async function POST(request: Request) {
    if (!transporter) {
        return NextResponse.json(
            { success: false, error: 'Email service is currently unavailable' },
            { status: 503 }
        );
    }

    let payload: { email?: string; phone?: string; message?: string };
    try {
        payload = await request.json();

        if (!payload.message?.trim()) {
            return NextResponse.json(
                { success: false, error: 'Message is required' },
                { status: 400 }
            );
        }

        if (!payload.email?.trim() && !payload.phone?.trim()) {
            return NextResponse.json(
                { success: false, error: 'Email or phone is required' },
                { status: 400 }
            );
        }

    } catch (error) {
        return NextResponse.json(
            { success: false, error: 'Invalid request format' },
            { status: 400 }
        );
    }

    // Main email to your team
    const adminMailOptions = {
        from: `"Tezcai Contact Form" <${process.env.SMTP_FROM_EMAIL || process.env.SMTP_USER}>`,
        to: 'info@tezcai.com',
        replyTo: payload.email || undefined,
        subject: 'New Contact Form Submission',
        text: [
            `Email: ${payload.email || 'Not provided'}`,
            `Phone: ${payload.phone || 'Not provided'}`,
            `Message:\n${payload.message}`,
        ].join('\n\n'),
        html: `
      <div style="font-family: Arial, sans-serif; line-height: 1.6;">
        <h2 style="color: #2563eb;">New Contact Form Submission</h2>
        <p><strong>Email:</strong> ${payload.email || 'Not provided'}</p>
        <p><strong>Phone:</strong> ${payload.phone || 'Not provided'}</p>
        <h3 style="margin-top: 1rem;">Message:</h3>
        <p style="white-space: pre-wrap; background: #f3f4f6; padding: 1rem; border-radius: 0.5rem;">
          ${payload.message}
        </p>
      </div>
    `,
    };

    try {
        // Send email to admin first
        const adminInfo = await transporter.sendMail(adminMailOptions);
        console.log('Admin email sent:', adminInfo.messageId);

        // Only send confirmation if user provided email
        if (payload.email) {
            const confirmationMailOptions = {
                from: `"Tezcai Support" <${process.env.SMTP_FROM_EMAIL || process.env.SMTP_USER}>`,
                to: payload.email,
                subject: 'We received your message!',
                text: `Thank you for contacting Tezcai!\n\nWe've received your message and our team will get back to you soon.\n\nHere's what you sent us:\n\n${payload.message}\n\nBest regards,\nThe Tezcai Team`,
                html: `
          <div style="font-family: Arial, sans-serif; line-height: 1.6; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #2563eb;">Thank you for contacting Tezcai!</h2>
            <p>We've received your message and our team will get back to you soon.</p>
            
            <div style="margin: 2rem 0; padding: 1rem; border-left: 4px solid #2563eb; background: #f3f4f6;">
              <p style="font-style: italic;">Here's what you sent us:</p>
              <p style="white-space: pre-wrap;">${payload.message}</p>
            </div>
            
            <p>https://tezcai.com</p>
            
            <p style="margin-top: 2rem;">Best regards,<br>The Tezcai Team</p>
            
            <div style="margin-top: 2rem; padding-top: 1rem; border-top: 1px solid #e5e7eb; font-size: 0.8rem; color: #6b7280;">
              <p>This is an automated message. Please do not reply directly to this email.</p>
            </div>
          </div>
        `,
            };

            const confirmationInfo = await transporter.sendMail(confirmationMailOptions);
            console.log('Confirmation email sent:', confirmationInfo.messageId);
        }

        return NextResponse.json(
            {
                success: true,
                message: payload.email
                    ? 'Thank you for your message! A confirmation has been sent to your email.'
                    : 'Thank you for your message! Our team will contact you soon.'
            },
            { status: 200 }
        );

    } catch (error: any) {
        console.error('Email send error:', error);

        let errorMessage = 'Failed to send message. Please try again later.';
        if (error.code === 'ECONNECTION') {
            errorMessage = 'Could not connect to email server';
        } else if (error.responseCode === 535) {
            errorMessage = 'Authentication failed. Please check email settings.';
        }

        return NextResponse.json(
            { success: false, error: errorMessage },
            { status: 500 }
        );
    }
}