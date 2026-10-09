'use client';

import React, { useEffect } from 'react';
import Image from 'next/image';
import { X, Heart, Shield, Sparkles, Stethoscope } from 'lucide-react';
import { withBasePath } from '@/lib/basePath';

interface MoumitaMemorialModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function MoumitaMemorialModal({
  isOpen,
  onClose,
}: MoumitaMemorialModalProps) {
  // Close on Escape key press
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Prevent background scrolling when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 99999,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '24px 16px',
        backgroundColor: 'rgba(0, 0, 0, 0.85)',
        backdropFilter: 'blur(12px)',
      }}
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="moumita-modal-title"
    >
      <div
        style={{
          position: 'relative',
          width: '100%',
          maxWidth: '720px',
          maxHeight: '90vh',
          backgroundColor: '#11111d',
          border: '1px solid #2a2a44',
          borderRadius: '20px',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          boxShadow: '0 25px 80px rgba(0, 0, 0, 0.9)',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header bar */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '18px 24px',
            borderBottom: '1px solid #222238',
            backgroundColor: '#151524',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span
              style={{
                width: '8px',
                height: '8px',
                borderRadius: '50%',
                backgroundColor: '#f0006a',
                boxShadow: '0 0 8px #f0006a',
              }}
            />
            <span
              style={{
                fontSize: '0.75rem',
                fontFamily: 'monospace',
                fontWeight: 700,
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                color: '#f0006a',
              }}
            >
              Life Work &amp; Vision // Respect Giver
            </span>
          </div>

          <button
            onClick={onClose}
            aria-label="Close modal"
            style={{
              background: 'transparent',
              border: 'none',
              color: '#94a3b8',
              cursor: 'pointer',
              padding: '6px',
              borderRadius: '8px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'color 0.15s, background-color 0.15s',
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.color = '#ffffff';
              (e.currentTarget as HTMLElement).style.backgroundColor = 'rgba(255,255,255,0.08)';
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.color = '#94a3b8';
              (e.currentTarget as HTMLElement).style.backgroundColor = 'transparent';
            }}
          >
            <X style={{ width: 20, height: 20 }} />
          </button>
        </div>

        {/* Scrollable Modal Content */}
        <div
          style={{
            overflowY: 'auto',
            padding: '28px 24px',
            display: 'flex',
            flexDirection: 'column',
            gap: '24px',
          }}
        >
          {/* Profile Card */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
              gap: '24px',
              alignItems: 'center',
              padding: '20px',
              borderRadius: '16px',
              backgroundColor: '#161628',
              border: '1px solid #282845',
              flexWrap: 'wrap',
            }}
          >
            <div
              style={{
                position: 'relative',
                width: '120px',
                height: '140px',
                borderRadius: '14px',
                overflow: 'hidden',
                border: '2px solid rgba(240, 0, 106, 0.4)',
                flexShrink: 0,
                boxShadow: '0 8px 24px rgba(0,0,0,0.5)',
              }}
            >
              <Image
                src={withBasePath('/assets/moumita-debnath.jpg')}
                alt="Dr. Moumita Debnath"
                fill
                unoptimized
                style={{ objectFit: 'cover' }}
                sizes="120px"
                priority
              />
            </div>

            <div style={{ flex: 1, minWidth: '240px' }}>
              <span
                style={{
                  fontSize: '0.75rem',
                  fontWeight: 700,
                  color: '#00e5ff',
                  letterSpacing: '0.05em',
                  textTransform: 'uppercase',
                  display: 'inline-block',
                  marginBottom: '6px',
                }}
              >
                In Honor of Medical Excellence &amp; Care
              </span>
              <h2
                id="moumita-modal-title"
                style={{
                  fontSize: '1.5rem',
                  fontWeight: 800,
                  color: '#ffffff',
                  margin: '0 0 6px 0',
                  fontFamily: '"Orbitron", "Rajdhani", system-ui, sans-serif',
                }}
              >
                Dr. Moumita Debnath
              </h2>
              <p
                style={{
                  fontSize: '0.875rem',
                  color: '#94a3b8',
                  margin: '0 0 10px 0',
                  lineHeight: 1.5,
                }}
              >
                Post-Graduate Resident Doctor · Department of Pulmonary (Chest) Medicine
                <br />
                <span style={{ color: '#cbd5e1' }}>
                  R.G. Kar Medical College and Hospital
                </span>
              </p>
              <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                <span
                  style={{
                    fontSize: '0.75rem',
                    padding: '3px 10px',
                    borderRadius: '999px',
                    backgroundColor: 'rgba(240,0,106,0.12)',
                    color: '#f0006a',
                    border: '1px solid rgba(240,0,106,0.3)',
                    fontWeight: 600,
                  }}
                >
                  Doctor of the People
                </span>
                <span
                  style={{
                    fontSize: '0.75rem',
                    padding: '3px 10px',
                    borderRadius: '999px',
                    backgroundColor: 'rgba(0,229,255,0.12)',
                    color: '#00e5ff',
                    border: '1px solid rgba(0,229,255,0.3)',
                    fontWeight: 600,
                  }}
                >
                  Respect Giver Inspiration
                </span>
              </div>
            </div>
          </div>

          {/* Biography & Dedication */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <h3
              style={{
                fontSize: '1.05rem',
                fontWeight: 700,
                color: '#f1f5f9',
                margin: 0,
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
              }}
            >
              <Stethoscope style={{ width: 18, height: 18, color: '#f0006a' }} />
              Her Life and Devotion to Pulmonary Medicine
            </h3>
            <p
              style={{
                fontSize: '0.925rem',
                color: '#94a3b8',
                lineHeight: 1.7,
                margin: 0,
              }}
            >
              Dr. Moumita Debnath was a brilliant, hardworking postgraduate trainee doctor specializing in Chest Medicine
              at R.G. Kar Medical College. Known among colleagues and professors for her deep compassion and tireless work ethic,
              she routinely devoted herself to demanding clinical shifts caring for critically ill respiratory patients with warmth,
              gentle guidance, and clinical precision.
            </p>

            <h3
              style={{
                fontSize: '1.05rem',
                fontWeight: 700,
                color: '#f1f5f9',
                margin: '8px 0 0 0',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
              }}
            >
              <Shield style={{ width: 18, height: 18, color: '#00e5ff' }} />
              Commitment to Patient Dignity &amp; Compassion
            </h3>
            <p
              style={{
                fontSize: '0.925rem',
                color: '#94a3b8',
                lineHeight: 1.7,
                margin: 0,
              }}
            >
              She believed that medical care extends beyond clinical procedures — that listening attentively to patients,
              easing their anxieties, and extending unconditional respect are essential elements of true healing. Her approach
              to patient interaction set an inspiring benchmark for healthcare professionals.
            </p>

            <h3
              style={{
                fontSize: '1.05rem',
                fontWeight: 700,
                color: '#f1f5f9',
                margin: '8px 0 0 0',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
              }}
            >
              <Sparkles style={{ width: 18, height: 18, color: '#f5c518' }} />
              Why UltimateHealth Honors Her Legacy
            </h3>
            <p
              style={{
                fontSize: '0.925rem',
                color: '#94a3b8',
                lineHeight: 1.7,
                margin: 0,
              }}
            >
              UltimateHealth established the <strong style={{ color: '#ffffff' }}>Respect Giver Protocol</strong> inspired by
              her vision of empathetic healthcare. Healthcare is fundamentally about human beings — you cannot heal a person
              you do not respect. This open-source platform exists to carry forward her devotion to patient welfare, verified knowledge,
              and healthcare dignity for all.
            </p>
          </div>

          {/* Quote Banner */}
          <div
            style={{
              padding: '16px 20px',
              borderRadius: '12px',
              backgroundColor: 'rgba(244, 63, 94, 0.08)',
              borderLeft: '4px solid #f43f5e',
            }}
          >
            <p
              style={{
                fontSize: '0.95rem',
                fontStyle: 'italic',
                color: '#f8fafc',
                lineHeight: 1.6,
                margin: 0,
              }}
            >
              &ldquo;Healthcare begins with seeing the whole human being — body, mind, and dignity.
              If we can restore dignity to even one soul, we plant a seed of wellness that outlives us all.&rdquo;
            </p>
            <span
              style={{
                display: 'block',
                marginTop: '8px',
                fontSize: '0.8rem',
                fontFamily: 'monospace',
                fontWeight: 600,
                color: '#f43f5e',
              }}
            >
              &mdash; Dedicated with profound respect to Dr. Moumita Debnath
            </span>
          </div>

          {/* Legal Non-Commercial & Voluntary Removal Policy */}
          <div
            style={{
              marginTop: '16px',
              padding: '14px 16px',
              borderRadius: '10px',
              backgroundColor: '#151b26',
              border: '1px solid rgba(255, 255, 255, 0.08)',
            }}
          >
            <p style={{ fontSize: '0.78125rem', color: '#94a3b8', margin: 0, lineHeight: 1.55 }}>
              <strong style={{ color: '#cbd5e1' }}>Memorial &amp; Removal Notice:</strong> UltimateHealth is an independent, non-commercial open-source health education project. If family members, legal heirs, or authorized representatives wish for any name, image, or dedication to be modified or removed, please contact <a href="mailto:ultimate.health25@gmail.com" style={{ color: '#2dd4bf', textDecoration: 'underline' }}>ultimate.health25@gmail.com</a> and it will be updated or removed immediately without condition.
            </p>
          </div>
        </div>

        {/* Footer */}
        <div
          style={{
            padding: '16px 24px',
            borderTop: '1px solid #222238',
            backgroundColor: '#151524',
            display: 'flex',
            justifyContent: 'flex-end',
          }}
        >
          <button
            onClick={onClose}
            style={{
              padding: '10px 22px',
              borderRadius: '8px',
              backgroundColor: '#f0006a',
              color: '#ffffff',
              border: 'none',
              fontWeight: 700,
              fontSize: '0.875rem',
              cursor: 'pointer',
              transition: 'opacity 0.15s ease',
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.opacity = '0.9';
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.opacity = '1';
            }}
          >
            Close &amp; Honor Life Work
          </button>
        </div>
      </div>
    </div>
  );
}
