import ejs from "ejs";
import fs from "fs";
import path from "path";

const templatePath = path.join(
  process.cwd(),
  "src/templates/emails/email-template.ejs",
);
const template = fs.readFileSync(templatePath, "utf8");

const baseData = {
  username: "Wahab Bisola",
  actionUrl: "https://onegrowth.vercel.app",
};

const scenarios = [
  {
    name: "verification",
    data: {
      ...baseData,
      bannerTitle: "Verify Your Account!",
      message:
        "Thanks for registering with OneGrowth! To complete your registration, please verify your email address below.",
      actionLabel: "Verify Email",
      actionDescription: "confirm your email and activate your account",
    },
  },
  {
    name: "reset",
    data: {
      ...baseData,
      bannerTitle: "Reset Your Password",
      message:
        "We received a request to reset your password. If this was you, please proceed and complete your reset.",
      actionLabel: "Reset Password",
      actionDescription: "complete your password reset",
    },
  },
  {
    name: "welcome",
    data: {
      ...baseData,
      bannerTitle: "Welcome to OneGrowth!",
      message:
        "Your account has been successfully created. You can now access the platform and begin using tools designed to help you think clearly, stay consistent and make meaningful progress.",
      actionLabel: "Go to Dashboard",
      actionDescription: "access your dashboard",
    },
  },
];

scenarios.forEach((scenario) => {
  const html = ejs.render(template, scenario.data);
  const outputPath = path.join(process.cwd(), `preview-${scenario.name}.html`);
  fs.writeFileSync(outputPath, html);
  console.log(`Generated: ${outputPath}`);
});
