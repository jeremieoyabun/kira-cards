import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Privacy Policy — Kira Cards',
  description: 'Privacy Policy for Kira Cards, upcoming TCG and sports cards retailer in Phuket, Thailand.',
}

export default function PrivacyPolicy() {
  return (
    <div className="privacy-page">
      <a href="/" className="privacy-back">&larr; Back to Home</a>
      <h1>Privacy Policy</h1>
      <p className="privacy-updated">Last updated: March 11, 2026</p>

      <section>
        <h2>1. Introduction</h2>
        <p>Welcome to Kira Cards (&quot;we&quot;, &quot;us&quot;, or &quot;our&quot;). We are an upcoming TCG and sports cards retailer based in Phuket, Thailand. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website <strong>www.kira-cards.com</strong> (the &quot;Site&quot;).</p>
        <p>By using our Site, you agree to the collection and use of information in accordance with this policy.</p>
      </section>

      <section>
        <h2>2. Information We Collect</h2>
        <h3>Personal Information</h3>
        <p>We may collect personal information that you voluntarily provide to us when you:</p>
        <ul>
          <li>Subscribe to our notification list (email address)</li>
          <li>Fill out our contact form (name, email address, message)</li>
          <li>Place an order through our store (name, email, shipping address, phone number)</li>
        </ul>
        <h3>Automatically Collected Information</h3>
        <p>When you visit our Site, we may automatically collect certain information, including:</p>
        <ul>
          <li>Browser type and version</li>
          <li>Operating system</li>
          <li>Referring website</li>
          <li>Pages visited and time spent</li>
          <li>IP address</li>
          <li>Device information</li>
        </ul>
      </section>

      <section>
        <h2>3. How We Use Your Information</h2>
        <p>We use the information we collect for the following purposes:</p>
        <ul>
          <li>To send you notifications about our launch and product availability</li>
          <li>To respond to your inquiries and contact requests</li>
          <li>To process and fulfill orders</li>
          <li>To improve our website and user experience</li>
          <li>To comply with legal obligations</li>
          <li>To prevent fraud and ensure security</li>
        </ul>
      </section>

      <section>
        <h2>4. Sharing of Information</h2>
        <p>We do not sell, trade, or rent your personal information to third parties. We may share your information only in the following circumstances:</p>
        <ul>
          <li><strong>Service providers:</strong> We may share information with trusted third-party service providers who assist us in operating our website, processing payments, or delivering products.</li>
          <li><strong>Legal requirements:</strong> We may disclose information if required to do so by law or in response to valid requests by public authorities.</li>
          <li><strong>Business transfers:</strong> In the event of a merger, acquisition, or sale of assets, your information may be transferred as part of that transaction.</li>
        </ul>
      </section>

      <section>
        <h2>5. Data Retention</h2>
        <p>We retain your personal information only for as long as necessary to fulfill the purposes outlined in this Privacy Policy, unless a longer retention period is required or permitted by law.</p>
      </section>

      <section>
        <h2>6. Data Security</h2>
        <p>We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the Internet is 100% secure, and we cannot guarantee absolute security.</p>
      </section>

      <section>
        <h2>7. Cookies</h2>
        <p>Our Site may use cookies and similar tracking technologies to enhance your browsing experience. You can set your browser to refuse cookies, but some features of the Site may not function properly without them.</p>
      </section>

      <section>
        <h2>8. Third-Party Links</h2>
        <p>Our Site may contain links to third-party websites (e.g., social media platforms, payment processors). We are not responsible for the privacy practices or content of these external sites. We encourage you to review their privacy policies before providing any personal information.</p>
      </section>

      <section>
        <h2>9. Children&apos;s Privacy</h2>
        <p>Our Site is not intended for children under the age of 13. We do not knowingly collect personal information from children under 13. If you believe we have collected information from a child under 13, please contact us immediately so we can take appropriate action.</p>
      </section>

      <section>
        <h2>10. Your Rights</h2>
        <p>Depending on your location, you may have the following rights regarding your personal data:</p>
        <ul>
          <li>Access and receive a copy of your personal data</li>
          <li>Request correction of inaccurate data</li>
          <li>Request deletion of your personal data</li>
          <li>Object to or restrict the processing of your data</li>
          <li>Withdraw consent at any time</li>
          <li>Unsubscribe from our notification list at any time</li>
        </ul>
        <p>To exercise any of these rights, please contact us using the information below.</p>
      </section>

      <section>
        <h2>11. Thailand PDPA Compliance</h2>
        <p>We comply with Thailand&apos;s Personal Data Protection Act (PDPA). We collect and process personal data based on legitimate purposes such as consent, contractual necessity, and legal obligations. You have the right to lodge a complaint with the relevant Thai authorities if you believe your data protection rights have been violated.</p>
      </section>

      <section>
        <h2>12. Changes to This Policy</h2>
        <p>We may update this Privacy Policy from time to time. Any changes will be posted on this page with an updated &quot;Last updated&quot; date. We encourage you to review this policy periodically.</p>
      </section>

      <section>
        <h2>13. Contact Us</h2>
        <p>If you have any questions or concerns about this Privacy Policy or our data practices, please contact us at:</p>
        <ul>
          <li><strong>Email:</strong> contact@kira-cards.com</li>
          <li><strong>Phone:</strong> +66 62 096 0153</li>
          <li><strong>Location:</strong> Phuket, Thailand</li>
        </ul>
      </section>
    </div>
  )
}
