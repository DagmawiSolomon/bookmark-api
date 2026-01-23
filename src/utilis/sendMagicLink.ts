const BASE_URL = process.env.BASE_URL || "http://localhost:3000";


export const sendMagicLink = async (email: string, token: string) => {
  const link = `${BASE_URL}/auth/magic/callback`;

  console.log(`Magic link for ${email}: ${link}: ${token}`);

  // Future: send email via SMTP / service
  // await emailService.send({
  //   to: email,
  //   subject: "Your Magic Login Link",
  //   html: `Click here: <a href="${link}">${link}</a>`,
  // });
};
