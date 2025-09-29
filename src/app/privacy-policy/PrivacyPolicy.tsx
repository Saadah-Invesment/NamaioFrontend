'use client'
import React from 'react';

const PrivacyPolicy: React.FC = () => {
  return (
    <div className="privacy-policy-container text-white p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Tezcai Privacy Policy</h1>
      <p className="text-sm text-gray-500 mb-6">Effective Date: 14/08/2025</p>

      <div className="mb-6">
        <p className="mb-4">
          Tezcai ("we," "our," or "us") is committed to protecting your privacy and safeguarding your personal information. This Privacy Policy explains how we collect, use, store, and protect your data when you access or use our services, including our automated crypto trading software, website, and related services (collectively, the "Services").
        </p>
        <p className="mb-4">
          By using our Services, you agree to the practices described in this Privacy Policy. If you do not agree, please discontinue use of our Services.
        </p>
      </div>

      <div className="space-y-6">
        <section>
          <h2 className="text-xl font-semibold mb-2">1. Information We Collect</h2>
          <p className="mb-2">We may collect the following types of information:</p>

          <h3 className="text-lg font-medium mt-4 mb-2">1.1 Information You Provide Directly</h3>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong>Account Information:</strong> Name, email address, username, password, and any other details required to create or maintain your account.</li>
            <li><strong>Trading Platform Credentials:</strong> API keys and other connection details provided by you to enable the bot to trade on your behalf.</li>
            <li><strong>Billing Information:</strong> Payment method details, billing address, and transaction history.</li>
            <li><strong>Communication Data:</strong> Any messages or correspondence you send to us.</li>
          </ul>

          <h3 className="text-lg font-medium mt-4 mb-2">1.2 Information Collected Automatically</h3>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong>Usage Data:</strong> IP address, browser type, device information, operating system, and pages you visit on our website.</li>
            <li><strong>Activity Logs:</strong> Trading activity, bot performance metrics, and system interaction logs.</li>
            <li><strong>Cookies & Tracking Technologies:</strong> Small data files stored on your device to enhance user experience and gather analytics.</li>
          </ul>

          <h3 className="text-lg font-medium mt-4 mb-2">1.3 Information from Third Parties</h3>
          <ul className="list-disc pl-6 space-y-2">
            <li>Data from linked trading platforms (e.g., Binance) as authorized by you via API keys.</li>
            <li>Payment processors' confirmation of successful payments.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-2">2. How We Use Your Information</h2>
          <p className="mb-2">We process your information for the following purposes:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>To provide and operate our Services, including executing trades on your linked exchange account.</li>
            <li>To verify your identity and ensure secure account access.</li>
            <li>To process payments and maintain accurate billing records.</li>
            <li>To improve, personalize, and optimize our Services based on user behavior and feedback.</li>
            <li>To communicate with you about updates, support requests, and relevant offers.</li>
            <li>To comply with legal obligations, prevent fraud, and enforce our Terms & Conditions.</li>
          </ul>
          <p className="mt-2">We will never sell, rent, or trade your personal data to third parties for marketing purposes.</p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-2">3. How We Store and Protect Your Information</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong>Data Security:</strong> We use encryption (in transit and at rest), firewalls, access controls, and security monitoring to protect your data.</li>
            <li><strong>API Key Security:</strong> API keys are stored in encrypted format and are never shared with unauthorized parties.</li>
            <li><strong>Limited Access:</strong> Only authorized staff with a legitimate business need can access user data.</li>
            <li><strong>Data Retention:</strong> We retain your personal data only for as long as necessary to fulfill the purposes described in this policy or as required by law.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-2">4. Cookies and Tracking Technologies</h2>
          <p className="mb-2">We use cookies and similar tracking technologies to:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Keep you logged in to your account.</li>
            <li>Remember your preferences.</li>
            <li>Analyze site traffic and performance.</li>
          </ul>
          <p className="mt-2">You can adjust your browser settings to block cookies, but this may affect your ability to use certain features.</p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-2">5. Sharing of Your Information</h2>
          <p className="mb-2">We may share your data in the following limited circumstances:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong>Service Providers:</strong> With trusted partners who help us operate the Services (e.g., hosting providers, payment processors).</li>
            <li><strong>Legal Compliance:</strong> When required to comply with applicable laws, regulations, or legal processes.</li>
            <li><strong>Business Transfers:</strong> In the event of a merger, acquisition, or sale of assets, your data may be transferred to the new owner.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-2">6. Third-Party Services</h2>
          <p>Our Services may integrate with third-party platforms (e.g., Binance API). Your use of such services is subject to their privacy policies. We are not responsible for the privacy practices of these third parties.</p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-2">7. Your Rights</h2>
          <p className="mb-2">Depending on your location, you may have the right to:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Access, correct, or delete your personal information.</li>
            <li>Restrict or object to certain processing activities.</li>
            <li>Withdraw consent at any time (this may affect service availability).</li>
            <li>Request a copy of the personal data we hold about you.</li>
          </ul>
          <p className="mt-2">To exercise these rights, contact us at: <a href="mailto:info@tezcai.com" className="text-blue-400 hover:underline">info@tezcai.com</a></p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-2">8. International Data Transfers</h2>
          <p>Your data may be stored and processed in locations outside your country of residence. By using our Services, you consent to such transfers, which will be protected by appropriate safeguards.</p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-2">9. Children's Privacy</h2>
          <p>Our Services are not intended for individuals under 18 years of age. We do not knowingly collect data from children. If we discover that a child has provided us with personal information, we will delete it immediately.</p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-2">10. Changes to This Privacy Policy</h2>
          <p>We may update this Privacy Policy from time to time. We will notify you of any significant changes by posting the updated version on our website and updating the "Effective Date" above.</p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-2">11. Contact Us</h2>
          <p className="mb-2">If you have questions or concerns about this Privacy Policy or our data practices, please contact us:</p>
          <p>Tezcai<br />
            Email: <a href="mailto:info@tezcai.com" className="text-blue-400 hover:underline">info@tezcai.com</a><br />
            Website: <a href="https://www.tezcai.com" className="text-blue-400 hover:underline">www.tezcai.com</a></p>
        </section>

        <div className="flex justify-center">
          <button
            onClick={() => window.history.back()}
            className="px-6 py-3 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors"
          >
            Go Back
          </button>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;