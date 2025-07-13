export const businessYearOptions = Array.from(
  { length: new Date().getFullYear() - 1900 + 1 },
  (_, i) => {
    const year = new Date().getFullYear() - i;
    return { value: year.toString(), label: year.toString() };
  },
);
