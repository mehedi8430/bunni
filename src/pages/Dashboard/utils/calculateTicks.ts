// Function to calculate nice tick values
export function calculateTicks(
  min: number,
  max: number,
  tickCount: number = 5
) {
  const range = max - min;
  const roughStep = range / (tickCount - 1);

  // Find the magnitude of the step
  const magnitude = Math.pow(10, Math.floor(Math.log10(roughStep)));

  // Normalize the step to a "nice" number
  const normalizedStep = roughStep / magnitude;
  let niceStep;

  if (normalizedStep <= 1) niceStep = 1;
  else if (normalizedStep <= 2) niceStep = 2;
  else if (normalizedStep <= 5) niceStep = 5;
  else niceStep = 10;

  const step = niceStep * magnitude;

  // Calculate nice min and max
  const niceMin = Math.floor(min / step) * step;
  const niceMax = Math.ceil(max / step) * step;

  // Generate tick values
  const ticks = [];
  for (let i = niceMin; i <= niceMax; i += step) {
    ticks.push(Math.round(i * 100) / 100); // Round to avoid floating point issues
  }

  return { ticks, niceMin, niceMax };
}
