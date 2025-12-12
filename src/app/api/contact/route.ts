import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

// Ensure Node.js runtime (Nodemailer is not supported in the Edge runtime)
export const runtime = "nodejs";

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const { name, email, phone, message } = (body ?? {}) as {
            name?: string;
            email?: string;
            phone?: string;
            message?: string;
        };

        if (!name || !email || !message) {
            return NextResponse.json({ ok: false, error: "Missing fields" }, { status: 400 });
        }

        const host = process.env.SMTP_HOST;
        const user = process.env.SMTP_USER;
        const pass = process.env.SMTP_PASS;
        const port = Number(process.env.SMTP_PORT || 587);
        const secure = String(process.env.SMTP_SECURE || "").toLowerCase() === "true" || port === 465;
        const to = process.env.MAIL_TO || "kontakt@bezawaryjni.pl";
        const from = process.env.MAIL_FROM || (user ? `Bezawaryjni Formularz <${user}>` : "no-reply@bezawaryjni.local");

        if (!host || !user || !pass) {
            console.error("SMTP not configured. Set SMTP_HOST, SMTP_USER, SMTP_PASS.");
            return NextResponse.json({ ok: false, error: "Email service not configured" }, { status: 500 });
        }

        const transporter = nodemailer.createTransport({ host, port, secure, auth: { user, pass } });

        const subject = `Nowa wiadomość z formularza – ${name}`;
        const plain = [
            `Imię i nazwisko: ${name}`,
            `E-mail: ${email}`,
            `Telefon: ${phone || "-"}`,
            "",
            "Wiadomość:",
            message,
            "",
            `Data: ${new Date().toLocaleString("pl-PL")}`,
        ].join("\n");

        const html = `
      <div style="font-family:Inter,Segoe UI,Roboto,Arial,sans-serif;line-height:1.6;color:#111">
        <h2 style="margin:0 0 12px 0;font-size:18px">Nowa wiadomość z formularza</h2>
        <table style="border-collapse:collapse;min-width:320px">
          <tr><td style="padding:4px 8px;color:#555">Imię i nazwisko:</td><td style="padding:4px 8px;color:#111"><strong>${escapeHtml(
            name
        )}</strong></td></tr>
          <tr><td style="padding:4px 8px;color:#555">E-mail:</td><td style="padding:4px 8px"><a href="mailto:${encodeURIComponent(
            email
        )}">${escapeHtml(email)}</a></td></tr>
          <tr><td style="padding:4px 8px;color:#555">Telefon:</td><td style="padding:4px 8px">${phone ? `<a href="tel:${encodeURIComponent(
            phone
        )}">${escapeHtml(phone)}</a>` : "-"}</td></tr>
        </table>
        <div style="margin-top:12px;padding:12px;border:1px solid #eee;border-radius:8px;background:#fafafa;white-space:pre-wrap">${escapeHtml(
            message
        )}</div>
        <p style="margin-top:12px;color:#666;font-size:12px">Data: ${escapeHtml(new Date().toLocaleString("pl-PL"))}</p>
      </div>
    `;

        await transporter.sendMail({ from, to, subject, text: plain, html });

        return NextResponse.json({ ok: true });
    } catch (e) {
        console.error("/api/contact error:", e);
        return NextResponse.json({ ok: false, error: "Server error" }, { status: 500 });
    }
}

function escapeHtml(input: string) {
    return input
        .replaceAll(/&/g, "&amp;")
        .replaceAll(/</g, "&lt;")
        .replaceAll(/>/g, "&gt;")
        .replaceAll(/"/g, "&quot;")
        .replaceAll(/'/g, "&#39;");
}
