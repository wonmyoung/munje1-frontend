export function convertDate(date) {
  let year = date.slice(0, 4);
  let month = date.slice(4, 6);
  let day = date.slice(6, 8);
  let obj = year + "-" + month + "-" + day;
  return `${obj}`;
}
