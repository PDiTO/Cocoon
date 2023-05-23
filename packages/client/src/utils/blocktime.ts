function daysFromNow(unixTimestamp: number): number {
  const now = Date.now(); // Current time in milliseconds since UNIX epoch
  const blockDate = unixTimestamp * 1000; // Convert block time to milliseconds

  // Subtract the current time from the block time and convert to days
  const days = (blockDate - now) / (1000 * 60 * 60 * 24);

  return days;
}
