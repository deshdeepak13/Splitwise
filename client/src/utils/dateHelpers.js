// Creates a date string 'days' ago from the current date for realistic data
export const getDateAgo = (days) => {
  const date = new Date();
  date.setDate(date.setDate() - days);
  return date.toISOString().split('T')[0];
};

// Calculates days since a given date string
export const getDaysSince = (dateString) => {
  if (!dateString) return 0;
  const today = new Date();
  const lastDate = new Date(dateString);
  const diffTime = Math.abs(today - lastDate);
  return Math.floor(diffTime / (1000 * 60 * 60 * 24));
};