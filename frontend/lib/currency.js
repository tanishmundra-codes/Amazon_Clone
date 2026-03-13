const usdFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

export function formatUSD(value) {
  return usdFormatter.format(Number(value) || 0);
}

export function formatUSDWhole(value) {
  return Math.floor(Number(value) || 0).toLocaleString("en-US");
}
