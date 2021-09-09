export const formatDate = (datetime) => {
  const newDate = new Date(datetime);

  const year = newDate.getFullYear();
  const month = newDate.getMonth();
  const day = newDate.getDate();

  return `${day}/${month}/${year}`;
};

export const formatTime = (datetime) => {
  const newDate = new Date(datetime);

  const hour = newDate.getHours();
  const minute = newDate.getMinutes();

  return `${hour}:${minute}`;
};

export const formatDateTime = (datetime) =>
  `${formatDate(datetime)} ${formatTime(datetime)}`;
