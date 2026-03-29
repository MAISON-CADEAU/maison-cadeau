import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_APP_PASSWORD,
  },
});

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const title = formData.get("title") as string;
    const email = formData.get("email") as string;
    const content = formData.get("content") as string;
    const file = formData.get("file") as File | null;

    if (!title || !email || !content) {
      return NextResponse.json({ error: "필수 항목을 입력해주세요." }, { status: 400 });
    }

    const attachments = [];
    if (file && file.size > 0) {
      const buffer = Buffer.from(await file.arrayBuffer());
      attachments.push({ filename: file.name, content: buffer });
    }

    await transporter.sendMail({
      from: `"메종카도 문의" <${process.env.GMAIL_USER}>`,
      replyTo: email,
      to: process.env.INQUIRY_RECEIVER,
      subject: `[문의] ${title}`,
      html: `
        <h2>${title}</h2>
        <p><strong>보내는 사람:</strong> ${email}</p>
        <hr />
        <p style="white-space: pre-line">${content}</p>
      `,
      attachments,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("이메일 전송 오류:", error);
    return NextResponse.json({ error: "이메일 전송에 실패했습니다." }, { status: 500 });
  }
}
