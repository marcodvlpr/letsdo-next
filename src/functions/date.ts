export function getDate(date: Date) {
  console.log(date.getUTCDay());
  return date.toLocaleString("pt-BR", {
    dateStyle: "short",
    timeStyle: "short",
  });
}
