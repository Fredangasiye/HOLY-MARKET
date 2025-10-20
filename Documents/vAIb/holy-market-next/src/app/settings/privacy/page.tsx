"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-black">
      <header className="relative p-6 pt-12">
        <div className="flex items-center justify-between">
          <Link href="/dashboard" className="p-2 bg-white/20 rounded-full">
            <ArrowLeft size={24} className="text-white" />
          </Link>
          <h1 className="text-2xl font-bold text-white">Privacy Policy</h1>
          <div className="w-10" />
        </div>
      </header>

      <main className="bg-white rounded-t-3xl p-6 min-h-[80vh]">
        <div className="prose max-w-3xl mx-auto">
          <p><strong>Effective Date:</strong> 20 October 2025</p>

          <p>
            This Privacy Policy explains how HOLY-MARKET ("we", "us", "our") collects, uses,
            discloses, and safeguards personal information when you use our website and services.
          </p>

          <h2>1. Information We Collect</h2>
          <ul>
            <li><strong>Account Data</strong>: name, email, password (hashed), phone number.</li>
            <li><strong>Business Data</strong>: business name, category, description, address, links, images.</li>
            <li><strong>Usage Data</strong>: device/browser info, IP address, pages visited, interactions.</li>
            <li><strong>Third-Party Sign-In</strong>: if you sign in with Google, we receive your name, email, and profile photo.</li>
          </ul>

          <h2>2. How We Use Your Information</h2>
          <ul>
            <li>Provide and maintain the platform and your account.</li>
            <li>Enable business listings, profiles, and discovery features.</li>
            <li>Improve site performance, security, and user experience.</li>
            <li>Communicate with you about your account, updates, and support.</li>
            <li>Comply with legal obligations and enforce our terms.</li>
          </ul>

          <h2>3. Legal Bases (EEA/UK)</h2>
          <ul>
            <li><strong>Contract</strong>: to provide requested services and manage your account.</li>
            <li><strong>Legitimate Interests</strong>: to secure and improve our services.</li>
            <li><strong>Consent</strong>: for optional features (e.g., marketing communications).</li>
            <li><strong>Legal Obligation</strong>: to comply with applicable laws.</li>
          </ul>

          <h2>4. Sharing of Information</h2>
          <ul>
            <li><strong>Service Providers</strong>: hosting, analytics, communications, and storage providers (e.g., Firebase, Vercel) who process data on our behalf under appropriate safeguards.</li>
            <li><strong>Public Content</strong>: information you choose to publish in your business listing is visible to other users and visitors.</li>
            <li><strong>Legal</strong>: to comply with law, protect rights, and prevent fraud or abuse.</li>
            <li><strong>Business Transfers</strong>: in connection with a merger, acquisition, or asset sale, in accordance with applicable law.</li>
          </ul>

          <h2>5. Data Retention</h2>
          <p>We retain personal data only as long as necessary for the purposes described above, unless a longer retention period is required or permitted by law.</p>

          <h2>6. International Transfers</h2>
          <p>Your information may be processed in countries outside your jurisdiction. Where required, we use appropriate safeguards (e.g., standard contractual clauses).</p>

          <h2>7. Your Rights</h2>
          <ul>
            <li>Access, correction, deletion, and portability of your data.</li>
            <li>Object to or restrict certain processing.</li>
            <li>Withdraw consent where processing is based on consent.</li>
            <li>Lodge a complaint with your local supervisory authority.</li>
          </ul>

          <h2>8. Security</h2>
          <p>We implement administrative, technical, and organizational measures designed to protect personal information. No system is 100% secure; please use unique, strong passwords.</p>

          <h2>9. Children</h2>
          <p>Our services are not intended for children under 16. We do not knowingly collect personal data from children under 16.</p>

          <h2>10. Third-Party Links</h2>
          <p>Our website may contain links to third-party sites. We are not responsible for their privacy practices. Review their policies before providing personal data.</p>

          <h2>11. Changes to this Policy</h2>
          <p>We may update this Privacy Policy periodically. We will post the updated version with a new effective date.</p>

          <h2>12. Contact Us</h2>
          <p>
            For questions or requests regarding this Privacy Policy, contact us at
            <br />
            <strong>privacy@holy-market.org</strong>
          </p>
        </div>
      </main>
    </div>
  );
}

