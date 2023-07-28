export const formatDate = (date: Date) => {
  return date.toLocaleDateString('default', { day: 'numeric', month: 'short', year: 'numeric' });
};
