'use client';

import React from 'react';
import Link from 'next/link';
import { useLocale } from 'next-intl';
import {
  ShieldCheck,
  Lock,
  FileText,
  UserCheck,
  Activity,
  HeartHandshake,
  Database,
  History,
  FileCheck2,
  Mail,
  AlertTriangle,
  CheckCircle2,
} from 'lucide-react';
import SiteHeader from '@/components/home/SiteHeader';
import { Footer } from '@/components/ui/footer';

export default function HipaaClient() {
  const locale = useLocale();

  return (
    <>
      <SiteHeader />
      <main
        style={{
          minHeight: '100vh',
          background: 'var(--explorer-bg, #f8fafc)',
          color: 'var(--explorer-text-primary, #0f172a)',
        }}
      >
        {/* Hero Section */}
        <section
          style={{
            paddingTop: '130px',
            paddingBottom: '40px',
            borderBottom: '1px solid var(--explorer-border, #e2e8f0)',
            background: 'linear-gradient(180deg, #f0f4ff 0%, #f8fafc 100%)',
          }}
        >
          <div
            style={{
              maxWidth: '1100px',
              margin: '0 auto',
              padding: '0 24px',
              textAlign: 'center',
            }}
          >
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '6px 14px',
                borderRadius: '9999px',
                background: '#e0e7ff',
                color: '#3730a3',
                fontSize: '13px',
                fontWeight: 600,
                marginBottom: '16px',
              }}
            >
              <ShieldCheck size={16} />
              <span>HIPAA Compliance &amp; Notice of Privacy Practices</span>
            </div>
            <h1
              style={{
                fontSize: 'clamp(28px, 4vw, 42px)',
                fontWeight: 800,
                color: '#1e1b4b',
                lineHeight: 1.25,
                marginBottom: '16px',
              }}
            >
              Safeguarding Your Health Data &amp; Care Team Privacy
            </h1>
            <p
              style={{
                maxWidth: '780px',
                margin: '0 auto',
                fontSize: '16px',
                color: '#475569',
                lineHeight: 1.6,
              }}
            >
              How UltimateHealth protects your Personal Health Logs and Care Team doctor interactions
              in strict compliance with the Health Insurance Portability and Accountability Act (HIPAA)
              and federal privacy standards.
            </p>
          </div>
        </section>

        {/* Content Container */}
        <div
          style={{
            maxWidth: '1100px',
            margin: '0 auto',
            padding: '40px 24px 80px',
          }}
        >
          {/* Quick Notice Banner */}
          <div
            style={{
              padding: '20px 24px',
              borderRadius: '16px',
              border: '1px solid #c7d2fe',
              background: '#eef2ff',
              display: 'flex',
              gap: '16px',
              alignItems: 'flex-start',
              marginBottom: '40px',
            }}
          >
            <Lock size={24} style={{ color: '#4f46e5', flexShrink: 0, marginTop: '2px' }} />
            <div>
              <h3 style={{ margin: '0 0 6px', fontSize: '16px', fontWeight: 700, color: '#1e1b4b' }}>
                Your Health Information is Protected
              </h3>
              <p style={{ margin: 0, fontSize: '14px', color: '#334155', lineHeight: 1.5 }}>
                Whether you record blood pressure, log symptoms, or consult with doctors in your
                Care Team, your health data is classified as Electronic Protected Health Information (ePHI)
                and guarded with end-to-end encryption, strict role-based access, and immutable audit logging.
              </p>
            </div>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
              gap: '24px',
              marginBottom: '48px',
            }}
          >
            {/* Card 1: Personal Log Data */}
            <div
              style={{
                padding: '28px',
                borderRadius: '16px',
                border: '1px solid #e2e8f0',
                background: '#ffffff',
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  marginBottom: '16px',
                }}
              >
                <div
                  style={{
                    width: '42px',
                    height: '42px',
                    borderRadius: '10px',
                    background: '#ecfdf5',
                    color: '#059669',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <Activity size={22} />
                </div>
                <h2 style={{ margin: 0, fontSize: '20px', fontWeight: 700, color: '#0f172a' }}>
                  1. Personal Log Safeguards
                </h2>
              </div>
              <ul style={{ paddingLeft: '20px', margin: 0, color: '#475569', fontSize: '14px', lineHeight: 1.8 }}>
                <li>
                  <strong>Patient Ownership:</strong> You have exclusive ownership over your vitals, symptoms, medications, and wellness entries.
                </li>
                <li>
                  <strong>Selective Sharing:</strong> Personal logs are private by default. You explicitly decide which entries or categories are visible to your Care Team.
                </li>
                <li>
                  <strong>Field-Level Encryption:</strong> Sensitive health values are encrypted using AES-256 before storage in our secure databases.
                </li>
                <li>
                  <strong>Consent Revocation:</strong> You can revoke a provider&apos;s access to your personal logs at any time with immediate effect.
                </li>
              </ul>
            </div>

            {/* Card 2: Care Team & Doctor Interaction */}
            <div
              style={{
                padding: '28px',
                borderRadius: '16px',
                border: '1px solid #e2e8f0',
                background: '#ffffff',
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  marginBottom: '16px',
                }}
              >
                <div
                  style={{
                    width: '42px',
                    height: '42px',
                    borderRadius: '10px',
                    background: '#eff6ff',
                    color: '#2563eb',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <HeartHandshake size={22} />
                </div>
                <h2 style={{ margin: 0, fontSize: '20px', fontWeight: 700, color: '#0f172a' }}>
                  2. Care Team &amp; Clinician Interaction
                </h2>
              </div>
              <ul style={{ paddingLeft: '20px', margin: 0, color: '#475569', fontSize: '14px', lineHeight: 1.8 }}>
                <li>
                  <strong>Verified Medical Credentials:</strong> Only healthcare professionals with verified state licenses or NPI credentials receive clinical access.
                </li>
                <li>
                  <strong>Encrypted Consultations:</strong> Chat messages, notes, and telehealth sessions are transmitted through TLS 1.3 encrypted channels.
                </li>
                <li>
                  <strong>Append-Only Clinical Notes:</strong> Doctor notes cannot be altered or deleted. Modifications are appended as timestamped amendments.
                </li>
                <li>
                  <strong>Tenant Isolation:</strong> Care providers can only access records for patients actively assigned to their care panel.
                </li>
              </ul>
            </div>
          </div>

          {/* Section: Technical & Administrative Safeguards */}
          <section
            style={{
              padding: '32px',
              borderRadius: '20px',
              background: '#ffffff',
              border: '1px solid #e2e8f0',
              marginBottom: '40px',
            }}
          >
            <h2
              style={{
                fontSize: '22px',
                fontWeight: 800,
                color: '#1e1b4b',
                marginBottom: '20px',
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
              }}
            >
              <Database size={24} style={{ color: '#6366f1' }} />
              Technical Safeguards (45 CFR § 164.312)
            </h2>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
                gap: '20px',
              }}
            >
              <div style={{ padding: '16px', background: '#f8fafc', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
                <h4 style={{ margin: '0 0 8px', fontSize: '15px', fontWeight: 700, color: '#0f172a', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <CheckCircle2 size={16} color="#16a34a" /> Access Control
                </h4>
                <p style={{ margin: 0, fontSize: '13px', color: '#64748b', lineHeight: 1.5 }}>
                  Unique user identification, multi-factor authentication (MFA), and role-based permissions preventing unauthorized exposure.
                </p>
              </div>

              <div style={{ padding: '16px', background: '#f8fafc', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
                <h4 style={{ margin: '0 0 8px', fontSize: '15px', fontWeight: 700, color: '#0f172a', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <CheckCircle2 size={16} color="#16a34a" /> Immutable Audit Logs
                </h4>
                <p style={{ margin: 0, fontSize: '13px', color: '#64748b', lineHeight: 1.5 }}>
                  Every view, export, creation, or update of personal health logs or clinical interactions is logged with timestamps and actor identities.
                </p>
              </div>

              <div style={{ padding: '16px', background: '#f8fafc', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
                <h4 style={{ margin: '0 0 8px', fontSize: '15px', fontWeight: 700, color: '#0f172a', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <CheckCircle2 size={16} color="#16a34a" /> Automatic Session Timeout
                </h4>
                <p style={{ margin: 0, fontSize: '13px', color: '#64748b', lineHeight: 1.5 }}>
                  Sessions automatically terminate after periods of inactivity to protect personal logs against unauthorized terminal access.
                </p>
              </div>

              <div style={{ padding: '16px', background: '#f8fafc', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
                <h4 style={{ margin: '0 0 8px', fontSize: '15px', fontWeight: 700, color: '#0f172a', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <CheckCircle2 size={16} color="#16a34a" /> Transmission Security
                </h4>
                <p style={{ margin: 0, fontSize: '13px', color: '#64748b', lineHeight: 1.5 }}>
                  Enforced TLS 1.3 protocol prevents packet interception. No patient health identifiers are exposed in URL query parameters.
                </p>
              </div>
            </div>
          </section>

          {/* Section: Patient Rights */}
          <section
            style={{
              padding: '32px',
              borderRadius: '20px',
              background: '#ffffff',
              border: '1px solid #e2e8f0',
              marginBottom: '40px',
            }}
          >
            <h2
              style={{
                fontSize: '22px',
                fontWeight: 800,
                color: '#1e1b4b',
                marginBottom: '16px',
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
              }}
            >
              <FileCheck2 size={24} style={{ color: '#0284c7' }} />
              Your Rights Under the HIPAA Privacy Rule
            </h2>
            <div style={{ display: 'grid', gap: '14px', color: '#475569', fontSize: '14px', lineHeight: 1.6 }}>
              <div style={{ padding: '12px 16px', background: '#f1f5f9', borderRadius: '10px' }}>
                <strong style={{ color: '#0f172a' }}>Right to Inspect and Copy:</strong> You can view, download, and export your personal logs and care team consultation summaries at any time.
              </div>
              <div style={{ padding: '12px 16px', background: '#f1f5f9', borderRadius: '10px' }}>
                <strong style={{ color: '#0f172a' }}>Right to Request Amendments:</strong> You may request corrections to any inaccurate health log or submit an addendum to care team notes.
              </div>
              <div style={{ padding: '12px 16px', background: '#f1f5f9', borderRadius: '10px' }}>
                <strong style={{ color: '#0f172a' }}>Right to an Accounting of Disclosures:</strong> You have the right to request a record of all disclosures of your health information outside routine treatment.
              </div>
              <div style={{ padding: '12px 16px', background: '#f1f5f9', borderRadius: '10px' }}>
                <strong style={{ color: '#0f172a' }}>Right to Confidential Communications:</strong> You have the right to specify communication preferences and receive notifications without sensitive medical data on lock screens.
              </div>
              <div style={{ padding: '12px 16px', background: '#f1f5f9', borderRadius: '10px' }}>
                <strong style={{ color: '#0f172a' }}>Right to Account Deletion &amp; Data Purge:</strong> When you request account deletion via{' '}
                <Link href={`/${locale}/delete-account`} style={{ color: '#4f46e5', fontWeight: 600 }}>
                  Account Deletion
                </Link>
                , your personal logs are permanently erased or de-identified according to statutory health record retention guidelines.
              </div>
            </div>
          </section>

          {/* Privacy Officer Contact */}
          <div
            style={{
              padding: '24px',
              borderRadius: '16px',
              background: '#faf5ff',
              border: '1px solid #e9d5ff',
              display: 'flex',
              flexWrap: 'wrap',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '16px',
            }}
          >
            <div>
              <h3 style={{ margin: '0 0 4px', fontSize: '16px', fontWeight: 700, color: '#581c87' }}>
                Questions or Compliance Concerns?
              </h3>
              <p style={{ margin: 0, fontSize: '14px', color: '#6b21a8' }}>
                Contact the UltimateHealth Privacy Officer for HIPAA compliance inquiries, Business Associate Agreements (BAAs), or rights requests.
              </p>
            </div>
            <a
              href="mailto:privacy@ultimatehealth.blog"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '10px 18px',
                borderRadius: '10px',
                background: '#7e22ce',
                color: '#ffffff',
                textDecoration: 'none',
                fontSize: '14px',
                fontWeight: 600,
              }}
            >
              <Mail size={16} />
              <span>privacy@ultimatehealth.blog</span>
            </a>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
