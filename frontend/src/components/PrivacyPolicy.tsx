import Footer from "./Footer";

const PrivacyPolicy = () => {
  const lastUpdated = new Date().toISOString().slice(0, 10);

  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-4">Privacy Policy</h1>
      <p className="text-sm opacity-70 mb-8">Last updated: {lastUpdated}</p>

      <div className="prose prose-neutral max-w-none">
        <h2>1. Information we collect</h2>
        <ul>
          <li>Account information (e.g., name, email, profile details) you provide.</li>
          <li>Authentication data (password is stored securely as a hashed value).</li>
          <li>Usage data related to how you use the service.</li>
        </ul>

        <h2>2. How we use information</h2>
        <ul>
          <li>To provide and maintain the service.</li>
          <li>To manage accounts and authentication.</li>
          <li>To enable features like profiles, connections, and requests.</li>
          <li>To communicate with you about your account.</li>
        </ul>

        <h2>3. Cookies and similar technologies</h2>
        <p>
          We may use cookies to keep you authenticated and to support core
          features.
        </p>

        <h2>4. Data sharing</h2>
        <p>
          We do not sell your personal information. We may share information with
          service providers that help us operate the service, and when required by
          law.
        </p>

        <h2>5. Data retention</h2>
        <p>
          We retain information as long as necessary to provide the service,
          comply with legal obligations, and resolve disputes.
        </p>

        <h2>6. Your rights</h2>
        <p>
          Depending on your location, you may have rights to access, correct, or
          delete personal information. Contact us using the information below.
        </p>

        <h2>7. Security</h2>
        <p>
          We use reasonable safeguards designed to protect personal information.
        </p>

        <h2>Contact</h2>
        <p>
          Questions? Email <strong>support@example.com</strong>.
        </p>
      </div>

      {/* Footer is already rendered by Body; included only if you navigate directly */}
      <Footer />
    </div>
  );
};

export default PrivacyPolicy;

