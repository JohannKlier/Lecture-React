// Define formatNumber at the component level
export function formatNumber(value) {
    return value % 1 === 0 ? value.toFixed(0) : Math.round(value * 100) % 10 === 0 ? value.toFixed(1) : value.toFixed(2);
  }