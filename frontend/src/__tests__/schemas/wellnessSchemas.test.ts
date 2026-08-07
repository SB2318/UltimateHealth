import {wellnessLogPayloadSchema} from '../../schemas/zod/wellnessSchemas';

describe('wellnessLogPayloadSchema', () => {
  it('passes with date only (metrics omitted - optional per contract)', () => {
    const result = wellnessLogPayloadSchema.safeParse({date: '2026-08-07'});
    expect(result.success).toBe(true);
  });

  it('passes with date and valid metrics', () => {
    const result = wellnessLogPayloadSchema.safeParse({
      date: '2026-08-07',
      metrics: {steps: 5000, waterMl: 1500, sleepHours: 7.5, breathingSessionMinutes: 5},
    });
    expect(result.success).toBe(true);
  });

  it('fails when date is missing', () => {
    const result = wellnessLogPayloadSchema.safeParse({metrics: {steps: 5000}});
    expect(result.success).toBe(false);
  });

  it('fails when date is in the wrong format', () => {
    const result = wellnessLogPayloadSchema.safeParse({date: '07-08-2026'});
    expect(result.success).toBe(false);
  });

  it('fails on negative metric values', () => {
    const result = wellnessLogPayloadSchema.safeParse({
      date: '2026-08-07',
      metrics: {steps: -100},
    });
    expect(result.success).toBe(false);
  });

  it('fails when sleepHours exceeds 24', () => {
    const result = wellnessLogPayloadSchema.safeParse({
      date: '2026-08-07',
      metrics: {sleepHours: 25},
    });
    expect(result.success).toBe(false);
  });

  it('does not coerce strings to numbers', () => {
    const result = wellnessLogPayloadSchema.safeParse({
      date: '2026-08-07',
      metrics: {steps: '5000'},
    });
    expect(result.success).toBe(false);
  });
});