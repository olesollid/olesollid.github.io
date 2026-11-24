import type { Job } from '../data/types';

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
export const isPresent = (v: string) => v.trim().toLowerCase() === 'present';

function parse(value: string): { year: number; month?: number } {
  const m = /^(\d{4})(?:-(0[1-9]|1[0-2]))?$/.exec(value.trim());
  if (!m) throw new Error(`Invalid date "${value}". Use "YYYY", "YYYY-MM" or "Present".`);
  return { year: Number(m[1]), month: m[2] ? Number(m[2]) : undefined };
}

function format(value: string): string {
  if (isPresent(value)) return 'Present';
  const { year, month } = parse(value);
  return month ? `${MONTHS[month - 1]} ${year}` : String(year);
}

export const formatPeriod = (start: string, end: string) => `${format(start)} – ${format(end)}`;

// Comparable number of months. A year-only end counts as December, a year-only start as January.
function toMonths(value: string, isEnd: boolean): number {
  if (isPresent(value)) return Infinity;
  const { year, month } = parse(value);
  return year * 12 + (month ?? (isEnd ? 12 : 1)) - 1;
}

/** Ongoing entries first, then by end date (newest first), then by start date (newest first). */
export function sortEntries(entries: Job[]): Job[] {
  return [...entries].sort(
    (a, b) =>
      toMonths(b.end, true) - toMonths(a.end, true) || toMonths(b.start, false) - toMonths(a.start, false),
  );
}
