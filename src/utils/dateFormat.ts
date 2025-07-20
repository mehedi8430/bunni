export function getTodayDate() {
  const today = new Date();

  const options: Intl.DateTimeFormatOptions = {
    day: "2-digit",
    month: "short",
    year: "numeric",
  };

  return new Intl.DateTimeFormat("en-GB", options).format(today);
}

export function getTodayDateWithTime(): string {
  const today = new Date();

  const dateFormatter = new Intl.DateTimeFormat("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

  const timeFormatter = new Intl.DateTimeFormat("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });

  const formattedDatePart = dateFormatter.format(today);
  const formattedTimePart = timeFormatter.format(today);

  const finalTimePart = formattedTimePart.replace(/ (AM|PM)/, (_, p1) =>
    p1.toLowerCase(),
  );

  return `${formattedDatePart} ${finalTimePart}`;
}

export function formatDateToShort(dateStr: string) {
  const date = new Date(dateStr);
  if (isNaN(date.getTime())) return dateStr; // fallback if invalid
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = String(date.getFullYear()).slice(-2);
  return `${day}/${month}/${year}`;
}
