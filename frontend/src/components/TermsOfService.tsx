import Footer from "./Footer";

const TermsOfService = () => {
  const lastUpdated = new Date().toISOString().slice(0, 10);

  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-4">Terms of Service</h1>
      <p className="text-sm opacity-70 mb-8">Last updated: {lastUpdated}</p>

      <div className="prose prose-neutral max-w-none">
        <h2>1. Acceptance of terms</h2>
        <p>
          By accessing or using DevMatch, you agree to these Terms of Service.
        </p>

        <h2>2. Eligibility and accounts</h2>
        <p>
          You must provide accurate information and maintain the security of
          your account.
        </p>

        <h2>3. User content</h2>
        <p>
          You are responsible for content you submit, including your profile
          information.
        </p>

        <h2>4. Acceptable use</h2>
        <ul>
          <li>Do not violate applicable laws.</li>
          <li>Do not interfere with or disrupt the service.</li>
          <li>Do not attempt unauthorized access.</li>
        </ul>

        <h2>5. Termination</h2>
        <p>
          We may suspend or terminate access if you violate these Terms.
        </p>

        <h2>6. Disclaimers</h2>
        <p>
          The service is provided "as is" without warranties of any kind.
        </p>

        <h2>7. Limitation of liability</h2>
        <p>
          To the maximum extent permitted by law, we are not liable for indirect,
          incidental, special, or consequential damages.
        </p>

        <h2>8. Changes to the Terms</h2>
        <p>
          We may update these Terms. Continued use after updates means you accept
          the changes.
        </p>

        <h2>Contact</h2>
        <p>
          Questions? Email <strong>support@example.com</strong>.
        </p>
      </div>

      <Footer />
    </div>
  );
};

export default TermsOfService;

