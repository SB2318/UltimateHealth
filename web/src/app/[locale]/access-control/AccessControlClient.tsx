'use client';

import React from 'react';
import Link from 'next/link';
import { useLocale } from 'next-intl';
import {
  ShieldCheck,
  Lock,
  UserCheck,
  Crown,
  Globe,
  Users,
  KeyRound,
  Check,
  X,
  Layers,
  ArrowRight,
  Shield,
  FileCheck,
  Sliders,
} from 'lucide-react';
import SiteHeader from '@/components/home/SiteHeader';
import { Footer } from '@/components/ui/footer';

export default function AccessControlClient() {
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
        {/* ── Header Section ── */}
        <section
          style={{
            paddingTop: '130px',
            paddingBottom: '36px',
            borderBottom: '1px solid var(--explorer-border, #e2e8f0)',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          <div
            style={{
              maxWidth: '1200px',
              margin: '0 auto',
              padding: '0 24px',
              position: 'relative',
              zIndex: 1,
            }}
          >
            {/* Specification Badges */}
            <div
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '8px',
                alignItems: 'center',
                marginBottom: '14px',
              }}
            >
              <span
                style={{
                  fontSize: '0.72rem',
                  fontWeight: 800,
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  color: '#0d9488',
                  background: 'rgba(13, 148, 136, 0.10)',
                  border: '1px solid rgba(13, 148, 136, 0.25)',
                  padding: '4px 10px',
                  borderRadius: '6px',
                  fontFamily: 'monospace',
                }}
              >
                Access Control Specification
              </span>
              <span
                style={{
                  fontSize: '0.72rem',
                  fontWeight: 800,
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  color: '#2563eb',
                  background: 'rgba(37, 99, 235, 0.10)',
                  border: '1px solid rgba(37, 99, 235, 0.25)',
                  padding: '4px 10px',
                  borderRadius: '6px',
                  fontFamily: 'monospace',
                }}
              >
                RBAC &amp; Content Ownership
              </span>
            </div>

            <h1
              style={{
                fontSize: 'clamp(1.85rem, 4vw, 2.75rem)',
                fontWeight: 800,
                letterSpacing: '-0.02em',
                lineHeight: 1.2,
                color: 'var(--site-heading, #0f172a)',
                fontFamily: 'system-ui, -apple-system, sans-serif',
                margin: '0 0 12px',
              }}
            >
              Role-Based Access Control (RBAC) &amp; Privileges Specification
            </h1>
            <p
              style={{
                fontSize: '0.98rem',
                lineHeight: 1.65,
                color: 'var(--explorer-text-secondary, #475569)',
                maxWidth: '860px',
                margin: 0,
              }}
            >
              Defines the permissions hierarchy, access boundaries, content ownership rules, and administrative guardrails enforced across the UltimateHealth platform.
            </p>
          </div>
        </section>

        {/* ── Main Content Container ── */}
        <div
          style={{
            maxWidth: '1200px',
            margin: '0 auto',
            padding: '36px 24px 80px',
            width: '100%',
            boxSizing: 'border-box',
          }}
        >
          {/* ── Section 1: Architecture & Enforcement Layers ── */}
          <div style={{ marginBottom: '44px' }}>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                marginBottom: '10px',
              }}
            >
              <Layers size={20} color="#0d9488" />
              <h2
                style={{
                  fontSize: '1.3rem',
                  fontWeight: 800,
                  margin: 0,
                  color: 'var(--site-heading, #0f172a)',
                }}
              >
                1. Architecture &amp; Enforcement Layers
              </h2>
            </div>
            <p
              style={{
                fontSize: '0.92rem',
                lineHeight: 1.6,
                color: 'var(--explorer-text-secondary, #475569)',
                marginBottom: '16px',
              }}
            >
              Access control is enforced at three sequential architectural layers on every request:
            </p>

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                gap: '16px',
              }}
            >
              {/* Layer 1 */}
              <div
                style={{
                  background: 'var(--explorer-surface, #ffffff)',
                  border: '1px solid var(--explorer-border, #e2e8f0)',
                  borderRadius: '12px',
                  padding: '20px',
                }}
              >
                <div
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                    fontSize: '0.72rem',
                    fontWeight: 800,
                    color: '#0d9488',
                    background: 'rgba(13, 148, 136, 0.10)',
                    padding: '3px 8px',
                    borderRadius: '4px',
                    marginBottom: '10px',
                    fontFamily: 'monospace',
                  }}
                >
                  <Lock size={12} /> Layer 1
                </div>
                <h3
                  style={{
                    fontSize: '1.02rem',
                    fontWeight: 700,
                    margin: '0 0 6px',
                    color: 'var(--explorer-text-primary, #0f172a)',
                  }}
                >
                  Network &amp; Protocol Layer
                </h3>
                <p
                  style={{
                    fontSize: '0.86rem',
                    lineHeight: 1.55,
                    color: 'var(--explorer-text-secondary, #475569)',
                    margin: 0,
                  }}
                >
                  HTTPS/TLS enforcement, cross-origin resource sharing (CORS) origin filtering, and request rate limiting across all client interfaces.
                </p>
              </div>

              {/* Layer 2 */}
              <div
                style={{
                  background: 'var(--explorer-surface, #ffffff)',
                  border: '1px solid var(--explorer-border, #e2e8f0)',
                  borderRadius: '12px',
                  padding: '20px',
                }}
              >
                <div
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                    fontSize: '0.72rem',
                    fontWeight: 800,
                    color: '#2563eb',
                    background: 'rgba(37, 99, 235, 0.10)',
                    padding: '3px 8px',
                    borderRadius: '4px',
                    marginBottom: '10px',
                    fontFamily: 'monospace',
                  }}
                >
                  <KeyRound size={12} /> Layer 2
                </div>
                <h3
                  style={{
                    fontSize: '1.02rem',
                    fontWeight: 700,
                    margin: '0 0 6px',
                    color: 'var(--explorer-text-primary, #0f172a)',
                  }}
                >
                  Authentication Layer
                </h3>
                <p
                  style={{
                    fontSize: '0.86rem',
                    lineHeight: 1.55,
                    color: 'var(--explorer-text-secondary, #475569)',
                    margin: 0,
                  }}
                >
                  Session signature validation, token revocation checking upon logout or password reset, email verification state, and active account standing checks.
                </p>
              </div>

              {/* Layer 3 */}
              <div
                style={{
                  background: 'var(--explorer-surface, #ffffff)',
                  border: '1px solid var(--explorer-border, #e2e8f0)',
                  borderRadius: '12px',
                  padding: '20px',
                }}
              >
                <div
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                    fontSize: '0.72rem',
                    fontWeight: 800,
                    color: '#7c3aed',
                    background: 'rgba(124, 58, 237, 0.10)',
                    padding: '3px 8px',
                    borderRadius: '4px',
                    marginBottom: '10px',
                    fontFamily: 'monospace',
                  }}
                >
                  <ShieldCheck size={12} /> Layer 3
                </div>
                <h3
                  style={{
                    fontSize: '1.02rem',
                    fontWeight: 700,
                    margin: '0 0 6px',
                    color: 'var(--explorer-text-primary, #0f172a)',
                  }}
                >
                  Authorization &amp; Content Ownership Layer
                </h3>
                <p
                  style={{
                    fontSize: '0.86rem',
                    lineHeight: 1.55,
                    color: 'var(--explorer-text-secondary, #475569)',
                    margin: 0,
                  }}
                >
                  Resource ownership matching (creator ID vs. requester ID), role permission requirements, and reviewer prerequisite verification.
                </p>
              </div>
            </div>
          </div>

          {/* ── Section 2: Role Hierarchy ── */}
          <div style={{ marginBottom: '44px' }}>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                marginBottom: '10px',
              }}
            >
              <Users size={20} color="#0d9488" />
              <h2
                style={{
                  fontSize: '1.3rem',
                  fontWeight: 800,
                  margin: 0,
                  color: 'var(--site-heading, #0f172a)',
                }}
              >
                2. Role Hierarchy &amp; Scopes
              </h2>
            </div>
            <p
              style={{
                fontSize: '0.92rem',
                lineHeight: 1.6,
                color: 'var(--explorer-text-secondary, #475569)',
                marginBottom: '16px',
              }}
            >
              The platform defines four standard roles in order of increasing authority:
            </p>

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
                gap: '14px',
              }}
            >
              {/* Persona 1: Public */}
              <div
                style={{
                  background: 'var(--explorer-surface, #ffffff)',
                  border: '1px solid var(--explorer-border, #e2e8f0)',
                  borderRadius: '12px',
                  padding: '18px',
                  borderTop: '3px solid #64748b',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                  <Globe size={18} color="#64748b" />
                  <h4 style={{ margin: 0, fontSize: '0.98rem', fontWeight: 800 }}>Public / Guest</h4>
                </div>
                <p style={{ fontSize: '0.84rem', color: '#64748b', lineHeight: 1.5, margin: '0 0 10px' }}>
                  Unauthenticated visitors. Read-only access to published public content, public media, and application forms.
                </p>
                <span style={{ fontSize: '0.72rem', fontFamily: 'monospace', color: '#64748b', background: '#f1f5f9', padding: '2px 8px', borderRadius: '4px' }}>
                  Scope: Read-Only
                </span>
              </div>

              {/* Persona 2: User */}
              <div
                style={{
                  background: 'var(--explorer-surface, #ffffff)',
                  border: '1px solid var(--explorer-border, #e2e8f0)',
                  borderRadius: '12px',
                  padding: '18px',
                  borderTop: '3px solid #0d9488',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                  <UserCheck size={18} color="#0d9488" />
                  <h4 style={{ margin: 0, fontSize: '0.98rem', fontWeight: 800 }}>User / Author</h4>
                </div>
                <p style={{ fontSize: '0.84rem', color: '#64748b', lineHeight: 1.5, margin: '0 0 10px' }}>
                  Authenticated users. Can author and manage personal drafts, podcasts, and submit proposed revisions to existing articles.
                </p>
                <span style={{ fontSize: '0.72rem', fontFamily: 'monospace', color: '#0d9488', background: 'rgba(13, 148, 136, 0.10)', padding: '2px 8px', borderRadius: '4px' }}>
                  Scope: Own Content Only
                </span>
              </div>

              {/* Persona 3: Moderator */}
              <div
                style={{
                  background: 'var(--explorer-surface, #ffffff)',
                  border: '1px solid var(--explorer-border, #e2e8f0)',
                  borderRadius: '12px',
                  padding: '18px',
                  borderTop: '3px solid #2563eb',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                  <ShieldCheck size={18} color="#2563eb" />
                  <h4 style={{ margin: 0, fontSize: '0.98rem', fontWeight: 800 }}>Admin / Moderator</h4>
                </div>
                <p style={{ fontSize: '0.84rem', color: '#64748b', lineHeight: 1.5, margin: '0 0 10px' }}>
                  Verified editorial reviewers with signed agreements. Review queues, approve and publish submissions, or request revisions.
                </p>
                <span style={{ fontSize: '0.72rem', fontFamily: 'monospace', color: '#2563eb', background: 'rgba(37, 99, 235, 0.10)', padding: '2px 8px', borderRadius: '4px' }}>
                  Scope: Editorial Queue
                </span>
              </div>

              {/* Persona 4: Super Admin */}
              <div
                style={{
                  background: 'var(--explorer-surface, #ffffff)',
                  border: '1px solid var(--explorer-border, #e2e8f0)',
                  borderRadius: '12px',
                  padding: '18px',
                  borderTop: '3px solid #7c3aed',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                  <Crown size={18} color="#7c3aed" />
                  <h4 style={{ margin: 0, fontSize: '0.98rem', fontWeight: 800 }}>Super Admin</h4>
                </div>
                <p style={{ fontSize: '0.84rem', color: '#64748b', lineHeight: 1.5, margin: '0 0 10px' }}>
                  Platform administrators. Manage moderator accounts and onboarding, universal content override, and platform-wide configurations.
                </p>
                <span style={{ fontSize: '0.72rem', fontFamily: 'monospace', color: '#7c3aed', background: 'rgba(124, 58, 237, 0.10)', padding: '2px 8px', borderRadius: '4px' }}>
                  Scope: Full Governance
                </span>
              </div>
            </div>
          </div>

          {/* ── Section 3: Permissions Matrix ── */}
          <div style={{ marginBottom: '44px' }}>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                marginBottom: '10px',
              }}
            >
              <ShieldCheck size={20} color="#0d9488" />
              <h2
                style={{
                  fontSize: '1.3rem',
                  fontWeight: 800,
                  margin: 0,
                  color: 'var(--site-heading, #0f172a)',
                }}
              >
                3. Role Privileges &amp; Permissions Matrix
              </h2>
            </div>

            <div
              style={{
                background: 'var(--explorer-surface, #ffffff)',
                border: '1px solid var(--explorer-border, #e2e8f0)',
                borderRadius: '12px',
                overflow: 'hidden',
                boxShadow: '0 1px 3px rgba(0,0,0,0.03)',
              }}
            >
              <div style={{ overflowX: 'auto' }}>
                <table
                  style={{
                    width: '100%',
                    borderCollapse: 'collapse',
                    textAlign: 'left',
                    fontSize: '0.875rem',
                  }}
                >
                  <thead>
                    <tr
                      style={{
                        background: 'var(--explorer-bg, #f8fafc)',
                        borderBottom: '1px solid var(--explorer-border, #e2e8f0)',
                      }}
                    >
                      <th style={{ padding: '12px 18px', fontWeight: 800, color: '#0f172a' }}>
                        Privilege / Action
                      </th>
                      <th style={{ padding: '12px 14px', fontWeight: 800, color: '#64748b', textAlign: 'center' }}>
                        🌐 Public
                      </th>
                      <th style={{ padding: '12px 14px', fontWeight: 800, color: '#0d9488', textAlign: 'center' }}>
                        👤 User / Author
                      </th>
                      <th style={{ padding: '12px 14px', fontWeight: 800, color: '#2563eb', textAlign: 'center' }}>
                        🛡️ Moderator
                      </th>
                      <th style={{ padding: '12px 14px', fontWeight: 800, color: '#7c3aed', textAlign: 'center' }}>
                        👑 Super Admin
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      {
                        action: 'Read Published Articles, Podcasts, Glossary',
                        pub: 'yes',
                        user: 'yes',
                        admin: 'yes',
                        super: 'yes',
                      },
                      {
                        action: 'Stream Public Audio, Cover Images, Avatars',
                        pub: 'yes',
                        user: 'yes',
                        admin: 'yes',
                        super: 'yes',
                      },
                      {
                        action: 'Submit Reviewer / Admin Application',
                        pub: 'yes',
                        user: 'yes',
                        admin: 'no',
                        super: 'no',
                      },
                      {
                        action: 'Create & Edit Own Content (Articles, Podcasts)',
                        pub: 'no',
                        user: 'Own Only',
                        admin: 'Own Only',
                        super: 'Any Content',
                      },
                      {
                        action: 'Delete Own Content',
                        pub: 'no',
                        user: 'Own Only',
                        admin: 'Own Only',
                        super: 'Any Content',
                      },
                      {
                        action: 'Submit Article Improvement',
                        pub: 'no',
                        user: 'Assigned Only',
                        admin: 'Assigned Only',
                        super: 'Any',
                      },
                      {
                        action: 'Review & Moderate Submitted Content',
                        pub: 'no',
                        user: 'no',
                        admin: 'Assigned Only',
                        super: 'Any',
                      },
                      {
                        action: 'Publish / Discard Content',
                        pub: 'no',
                        user: 'no',
                        admin: 'Assigned Only',
                        super: 'Any',
                      },
                      {
                        action: 'View Internal Admin Agreements',
                        pub: 'no',
                        user: 'no',
                        admin: 'Own Only',
                        super: 'All Agreements',
                      },
                      {
                        action: 'View Onboarded Admin Resumes / Docs',
                        pub: 'no',
                        user: 'no',
                        admin: 'Own Only',
                        super: 'All Resumes',
                      },
                      {
                        action: 'Review & Accept Admin Applicants',
                        pub: 'no',
                        user: 'no',
                        admin: 'no',
                        super: 'yes',
                      },
                      {
                        action: 'Provision Admin Profiles from Applicants',
                        pub: 'no',
                        user: 'no',
                        admin: 'no',
                        super: 'yes',
                      },
                      {
                        action: 'Block / Unblock Moderators',
                        pub: 'no',
                        user: 'no',
                        admin: 'no',
                        super: 'yes',
                      },
                      {
                        action: 'Delete Moderator Accounts',
                        pub: 'no',
                        user: 'no',
                        admin: 'no',
                        super: 'yes',
                      },
                      {
                        action: 'Manage Platform Languages',
                        pub: 'no',
                        user: 'no',
                        admin: 'no',
                        super: 'yes',
                      },
                      {
                        action: 'Permanent File & Asset Deletions',
                        pub: 'no',
                        user: 'no',
                        admin: 'no',
                        super: 'yes',
                      },
                    ].map((row, idx) => (
                      <tr
                        key={row.action}
                        style={{
                          borderBottom: '1px solid var(--explorer-border, #e2e8f0)',
                          background: idx % 2 === 0 ? 'transparent' : 'rgba(0,0,0,0.012)',
                        }}
                      >
                        <td style={{ padding: '11px 18px', fontWeight: 600, color: 'var(--explorer-text-primary, #0f172a)' }}>
                          {row.action}
                        </td>
                        <td style={{ padding: '11px 14px', textAlign: 'center' }}>
                          <MatrixBadge status={row.pub} />
                        </td>
                        <td style={{ padding: '11px 14px', textAlign: 'center' }}>
                          <MatrixBadge status={row.user} />
                        </td>
                        <td style={{ padding: '11px 14px', textAlign: 'center' }}>
                          <MatrixBadge status={row.admin} />
                        </td>
                        <td style={{ padding: '11px 14px', textAlign: 'center' }}>
                          <MatrixBadge status={row.super} />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* ── Section 4: Detailed Role Profiles ── */}
          <div style={{ marginBottom: '44px' }}>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                marginBottom: '10px',
              }}
            >
              <FileCheck size={20} color="#0d9488" />
              <h2
                style={{
                  fontSize: '1.3rem',
                  fontWeight: 800,
                  margin: 0,
                  color: 'var(--site-heading, #0f172a)',
                }}
              >
                4. Detailed Role Profiles &amp; Allowed Actions
              </h2>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {/* 4.1 Public */}
              <div
                style={{
                  background: 'var(--explorer-surface, #ffffff)',
                  border: '1px solid var(--explorer-border, #e2e8f0)',
                  borderRadius: '12px',
                  padding: '20px',
                }}
              >
                <h3 style={{ fontSize: '1.05rem', fontWeight: 800, margin: '0 0 8px', color: '#0f172a' }}>
                  4.1. 🌐 Public / Guest (Unauthenticated)
                </h3>
                <p style={{ fontSize: '0.85rem', color: '#64748b', margin: '0 0 10px', lineHeight: 1.55 }}>
                  <strong>Identity:</strong> Anonymous client or unregistered visitor.<br />
                  <strong>Scope:</strong> Read-only access to published public content and onboarding entry points.
                </p>
                <ul style={{ margin: 0, paddingLeft: '18px', fontSize: '0.85rem', lineHeight: 1.65, color: 'var(--explorer-text-secondary, #475569)' }}>
                  <li>View published articles and related recommendations</li>
                  <li>Search and browse medical glossary definitions</li>
                  <li>Stream published podcasts, playlists, and episodes</li>
                  <li>Stream public media assets (.jpg, .jpeg, .mp3, avatars)</li>
                  <li>Submit application to join the editorial review board</li>
                  <li>Submit inquiries via contact portal</li>
                  <li>Register for a new account or authenticate</li>
                </ul>
              </div>

              {/* 4.2 User */}
              <div
                style={{
                  background: 'var(--explorer-surface, #ffffff)',
                  border: '1px solid var(--explorer-border, #e2e8f0)',
                  borderRadius: '12px',
                  padding: '20px',
                }}
              >
                <h3 style={{ fontSize: '1.05rem', fontWeight: 800, margin: '0 0 8px', color: '#0f172a' }}>
                  4.2. 👤 Authenticated User / Author / Contributor
                </h3>
                <p style={{ fontSize: '0.85rem', color: '#64748b', margin: '0 0 10px', lineHeight: 1.55 }}>
                  <strong>Identity:</strong> Registered platform user with authenticated session.<br />
                  <strong>Scope:</strong> Personal profile management, content authoring, community engagement, and collaborative improvements.
                </p>
                <ul style={{ margin: 0, paddingLeft: '18px', fontSize: '0.85rem', lineHeight: 1.65, color: 'var(--explorer-text-secondary, #475569)' }}>
                  <li><strong>Article Lifecycle:</strong> Create new article drafts; edit and delete own articles (enforced: author ID must match authenticated user).</li>
                  <li><strong>Podcast &amp; Audio Creation:</strong> Create and update own podcasts and playlists; publish and edit own audio episodes.</li>
                  <li><strong>Collaborative Improvements:</strong> Submit proposed revisions and corrections to published articles.</li>
                  <li><strong>User Interactions:</strong> Like, save, repost, comment on articles and podcasts; delete personal notifications.</li>
                </ul>
              </div>

              {/* 4.3 Moderator */}
              <div
                style={{
                  background: 'var(--explorer-surface, #ffffff)',
                  border: '1px solid var(--explorer-border, #e2e8f0)',
                  borderRadius: '12px',
                  padding: '20px',
                }}
              >
                <h3 style={{ fontSize: '1.05rem', fontWeight: 800, margin: '0 0 8px', color: '#0f172a' }}>
                  4.3. 🛡️ Admin / Moderator / Reviewer
                </h3>
                <p style={{ fontSize: '0.85rem', color: '#64748b', margin: '0 0 10px', lineHeight: 1.55 }}>
                  <strong>Identity:</strong> Verified editorial reviewer with active standing and uploaded signed agreement.<br />
                  <strong>Scope:</strong> Peer review, quality control, editorial feedback, and publication workflows.
                </p>
                <ul style={{ margin: 0, paddingLeft: '18px', fontSize: '0.85rem', lineHeight: 1.65, color: 'var(--explorer-text-secondary, #475569)' }}>
                  <li><strong>Articles Review Queue:</strong> Self-assign articles from queue, track review progress, submit review feedback, approve and publish peer-reviewed articles (preserving reviewer attribution), discard submissions failing guidelines, unassign oneself before completion.</li>
                  <li><strong>Article Improvement Queue:</strong> Pick unassigned edit requests, review proposed changes and check for content loss, publish approved improvements, discard invalid requests.</li>
                  <li><strong>Podcast Review Queue:</strong> Review submitted audio, approve and publish (preserving reviewer attribution), discard inappropriate submissions.</li>
                  <li><strong>Medical Glossary Review Queue:</strong> Pick unassigned terms, approve and publish glossary entries, send feedback to author or reject.</li>
                  <li><strong>Agreements &amp; Workload:</strong> Sign and upload digital agreements, view personal agreement document, view assigned workload and review metrics.</li>
                </ul>
              </div>

              {/* 4.4 Super Admin */}
              <div
                style={{
                  background: 'var(--explorer-surface, #ffffff)',
                  border: '1px solid var(--explorer-border, #e2e8f0)',
                  borderRadius: '12px',
                  padding: '20px',
                  borderLeft: '4px solid #7c3aed',
                }}
              >
                <h3 style={{ fontSize: '1.05rem', fontWeight: 800, margin: '0 0 8px', color: '#0f172a' }}>
                  4.4. 👑 Super Admin (Full Privilege)
                </h3>
                <p style={{ fontSize: '0.85rem', color: '#64748b', margin: '0 0 10px', lineHeight: 1.55 }}>
                  <strong>Identity:</strong> Platform governing administrator.<br />
                  <strong>Scope:</strong> System governance, administrator account lifecycle, data retention, infrastructure cleanup, and master settings.
                </p>
                <ul style={{ margin: 0, paddingLeft: '18px', fontSize: '0.85rem', lineHeight: 1.65, color: 'var(--explorer-text-secondary, #475569)' }}>
                  <li><strong>Universal Content Override:</strong> Edit, delete, publish, or discard any article, podcast, playlist, episode, or glossary term across all users.</li>
                  <li><strong>Moderator Account Lifecycle:</strong> Inspect all applicant submissions and resumes, update application status, provision new Admin / Moderator accounts from approved applicants, view all admins, block or unblock moderator accounts, delete moderator accounts.</li>
                  <li><strong>Storage &amp; Asset Management:</strong> Access internal agreements and onboarded applicant documents; execute permanent deletions of files and records when necessary.</li>
                  <li><strong>Platform Master Settings:</strong> Manage platform system languages and platform-wide options.</li>
                </ul>
              </div>
            </div>
          </div>

          {/* ── Section 5: Guardrails & Practical Rules ── */}
          <div>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                marginBottom: '10px',
              }}
            >
              <Shield size={20} color="#0d9488" />
              <h2
                style={{
                  fontSize: '1.3rem',
                  fontWeight: 800,
                  margin: 0,
                  color: 'var(--site-heading, #0f172a)',
                }}
              >
                5. System Guardrails &amp; Safety Rules
              </h2>
            </div>

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr)))',
                gap: '14px',
              }}
            >
              <div
                style={{
                  background: 'var(--explorer-surface, #ffffff)',
                  border: '1px solid var(--explorer-border, #e2e8f0)',
                  borderRadius: '12px',
                  padding: '18px',
                }}
              >
                <h4 style={{ fontSize: '0.94rem', fontWeight: 800, margin: '0 0 6px', color: '#0d9488' }}>
                  Author Ownership Rule
                </h4>
                <p style={{ fontSize: '0.84rem', color: '#64748b', lineHeight: 1.5, margin: 0 }}>
                  A user can only update or delete content they authored. Requests to modify another author&apos;s work are rejected at the authorization layer.
                </p>
              </div>

              <div
                style={{
                  background: 'var(--explorer-surface, #ffffff)',
                  border: '1px solid var(--explorer-border, #e2e8f0)',
                  borderRadius: '12px',
                  padding: '18px',
                }}
              >
                <h4 style={{ fontSize: '0.94rem', fontWeight: 800, margin: '0 0 6px', color: '#2563eb' }}>
                  Reviewer Prerequisites
                </h4>
                <p style={{ fontSize: '0.84rem', color: '#64748b', lineHeight: 1.5, margin: 0 }}>
                  A moderator account must be verified, unblocked, and have a valid signed agreement on file before access to the editorial queue is granted.
                </p>
              </div>

              <div
                style={{
                  background: 'var(--explorer-surface, #ffffff)',
                  border: '1px solid var(--explorer-border, #e2e8f0)',
                  borderRadius: '12px',
                  padding: '18px',
                }}
              >
                <h4 style={{ fontSize: '0.94rem', fontWeight: 800, margin: '0 0 6px', color: '#e11d48' }}>
                  Confidential Storage Rule
                </h4>
                <p style={{ fontSize: '0.84rem', color: '#64748b', lineHeight: 1.5, margin: 0 }}>
                  Admin agreements and applicant resumes are not public assets. They are accessible only by the individual moderator or a Super Admin.
                </p>
              </div>

              <div
                style={{
                  background: 'var(--explorer-surface, #ffffff)',
                  border: '1px solid var(--explorer-border, #e2e8f0)',
                  borderRadius: '12px',
                  padding: '18px',
                }}
              >
                <h4 style={{ fontSize: '0.94rem', fontWeight: 800, margin: '0 0 6px', color: '#7c3aed' }}>
                  Administrative Self-Protection
                </h4>
                <p style={{ fontSize: '0.84rem', color: '#64748b', lineHeight: 1.5, margin: 0 }}>
                  Super Admin accounts cannot be blocked or deleted via the system, and administrators cannot block or delete their own accounts.
                </p>
              </div>
            </div>
          </div>
        </div>

        <Footer />
      </main>
    </>
  );
}

function MatrixBadge({ status }: { status: string }) {
  if (status === 'yes') {
    return (
      <span
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: '22px',
          height: '22px',
          borderRadius: '50%',
          background: 'rgba(22, 163, 74, 0.12)',
          color: '#16a34a',
        }}
      >
        <Check size={13} strokeWidth={3} />
      </span>
    );
  }

  if (status === 'no') {
    return (
      <span
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: '22px',
          height: '22px',
          borderRadius: '50%',
          background: 'rgba(225, 29, 72, 0.10)',
          color: '#e11d48',
        }}
      >
        <X size={13} strokeWidth={3} />
      </span>
    );
  }

  return (
    <span
      style={{
        display: 'inline-block',
        fontSize: '0.72rem',
        fontWeight: 700,
        padding: '2px 8px',
        borderRadius: '4px',
        background: status.includes('Own')
          ? 'rgba(13, 148, 136, 0.10)'
          : status.includes('Assigned')
          ? 'rgba(37, 99, 235, 0.10)'
          : 'rgba(124, 58, 237, 0.10)',
        color: status.includes('Own')
          ? '#0d9488'
          : status.includes('Assigned')
          ? '#2563eb'
          : '#7c3aed',
        fontFamily: 'monospace',
      }}
    >
      {status}
    </span>
  );
}
