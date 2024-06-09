import { resend } from "@/lib/resend";
import VerificationEmail from "../../emails/verification-email";
import { ApiResponse } from "@/types/ApiResponse";

export async function sendVerificationEmail(
  email: string,
  username: string,
  verifyCode: string
): Promise<ApiResponse> {
  try {
    const Email = await resend.emails.send({
      from: "onboarding@resend.dev",
      to: email,
      subject: "Mstrymessage | Verification Email",
      react: VerificationEmail({ otp: verifyCode, username }),
    });

    console.log(Email);

    return { success: true, message: "Verification email sent" };
  } catch (error) {
    console.error("Error sending verification email", error);
    return { success: false, message: "Failed to send verification email" };
  }
}
