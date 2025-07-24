import {
  differenceInSeconds,
  differenceInMinutes,
  differenceInHours,
  differenceInDays,
  differenceInWeeks,
  differenceInMonths,
  differenceInYears,
  isSameYear,
  isThisWeek,
  isYesterday,
  isToday,
  format,
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

export function formatLastSeen(date: Date) {
  if (isToday(date)) {
    return `Today at ${format(date, "hh:mm a")}`;
  }

  if (isYesterday(date)) {
    return `Yesterday at ${format(date, "hh:mm a")}`;
  }

  if (isThisWeek(date)) {
    return `${format(date, "EEEE")} at ${format(date, "hh:mm a")}`; // e.g., Monday
  }

  if (isSameYear(date, new Date())) {
    return format(date, "dd/MM/yyyy 'at' hh:mm a");
  }

  return format(date, "dd/MM/yyyy");
}
