export function getTodayDate() {
  const today = new Date();

  const options: Intl.DateTimeFormatOptions = {
    day: "2-digit",
    month: "short",
    year: "numeric",
  };

  return new Intl.DateTimeFormat("en-GB", options).format(today);
}

export function getTodayDateWithTime() {
  const today = new Date();

  const options: Intl.DateTimeFormatOptions = {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  };

  return new Intl.DateTimeFormat("en-GB", options).format(today);
}

// "05 Feb 2025  8:52pm"
