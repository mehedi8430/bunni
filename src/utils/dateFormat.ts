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
