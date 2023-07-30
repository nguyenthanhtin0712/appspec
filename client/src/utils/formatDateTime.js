export function formatDateTime(date) {
  const dateObject = new Date(date);
  const year = dateObject.getFullYear();
  const month = String(dateObject.getMonth() + 1).padStart(2, '0');
  const day = String(dateObject.getDate()).padStart(2, '0');
  const hour = String(dateObject.getHours()).padStart(2, '0');
  const minute = String(dateObject.getMinutes()).padStart(2, '0');
  const second = String(dateObject.getSeconds()).padStart(2, '0');
  const formattedDateString = `${year}-${month}-${day} ${hour}:${minute}:${second}`;
  return formattedDateString;
}
