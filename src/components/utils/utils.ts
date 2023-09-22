export function formatDate(date: Date) {
  const day = date.getDate().toString();
  const month = (date.getMonth() + 1).toString();
  const year = date.getFullYear().toString();
  const formattedDate =
    year + "-" + month.padStart(2, "0") + "-" + day.padStart(2, "0");

  return formattedDate;
}

export function showCurrentDate() {
  const todayDate = new Date();
  const monthNames = [
    "Jan",
    "Feb",
    "March",
    "April",
    "May",
    "June",
    "July",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const year = todayDate.getFullYear();
  const date = monthNames[todayDate.getMonth()];
  const day = todayDate.getDate().toString().padStart(2, "0");

  return `${year}, ${date} ${day}`;
}
