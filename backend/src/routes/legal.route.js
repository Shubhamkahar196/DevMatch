import { Router } from "express";

const router = Router();

const privacyPolicy = `
Privacy Policy

Last updated: ${new Date().toISOString().slice(0, 10)}

This Privacy Policy describes how DevMatch ("we", "us", "our") collects, uses, and shares information when you use our website and services.

1. Information we collect
- Account information (e.g., name, email, profile details) that you provide during signup.
- Authentication data (e.g., password is stored securely as a hashed value).
- Usage data (e.g., pages accessed and interactions with features).

2. How we use information
- To provide and maintain the service.
- To manage accounts and authentication.
- To enable features such as profiles, connections, and requests.
- To communicate with you related to your account.

3. Cookies and similar technologies
We may use cookies to keep you authenticated and to remember your preferences.

4. Data sharing
We do not sell your personal information. We may share information with:
- Service providers that help us operate the service.
- Legal authorities, if required by law.

5. Data retention
We retain information for as long as necessary to provide the service, comply with legal obligations, and resolve disputes.

6. Your rights
Depending on your location, you may have rights to access, correct, or delete your personal information. Contact us using the email below.

7. Security
We use reasonable technical and organizational safeguards designed to protect personal information.

Contact
If you have questions about this Privacy Policy, contact us at: support@example.com
`;

const termsOfService = `
Terms of Service

Last updated: ${new Date().toISOString().slice(0, 10)}

Welcome to DevMatch. By accessing or using our service, you agree to these Terms of Service.

1. Acceptance of terms
By using the service, you agree to be bound by these Terms.

2. Eligibility and accounts
You must provide accurate information and maintain the security of your account.

3. User content
You are responsible for content you submit (including profile information).

4. Acceptable use
You agree not to:
- Violate any applicable laws or regulations.
- Interfere with or disrupt the service.
- Attempt unauthorized access.

5. Termination
We may suspend or terminate access if you violate these Terms.

6. Disclaimers
The service is provided "as is" without warranties of any kind.

7. Limitation of liability
To the maximum extent permitted by law, we are not liable for indirect, incidental, special, or consequential damages.

8. Changes to the Terms
We may update these Terms from time to time. Continued use after updates means you accept the changes.

Contact
If you have questions about these Terms, contact us at: support@example.com
`;

router.get("/privacy-policy", (req, res) => {
  res.status(200).json({
    success: true,
    policy: privacyPolicy.trim(),
  });
});

router.get("/terms-of-service", (req, res) => {
  res.status(200).json({
    success: true,
    policy: termsOfService.trim(),
  });
});

export default router;

