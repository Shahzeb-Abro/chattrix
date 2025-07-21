import {
  differenceInSeconds,
  differenceInMinutes,
  differenceInHours,
  differenceInDays,
  differenceInWeeks,
  differenceInMonths,
  differenceInYears,
} from "date-fns";

export function formatShortTime(date: Date | string): string {
  const now = new Date();
  const target = new Date(date);

  const seconds = differenceInSeconds(now, target);
  if (seconds < 60) return `${seconds}s`;

  const minutes = differenceInMinutes(now, target);
  if (minutes < 60) return `${minutes}m`;

  const hours = differenceInHours(now, target);
  if (hours < 24) return `${hours}h`;

  const days = differenceInDays(now, target);
  if (days < 7) return `${days}d`;

  const weeks = differenceInWeeks(now, target);
  if (weeks < 4) return `${weeks}w`;

  const months = differenceInMonths(now, target);
  if (months < 12) return `${months}mo`;

  const years = differenceInYears(now, target);
  return `${years}y`;
}
