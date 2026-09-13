export function capitalizeFirstLetter(title?: string) {
  const newTitle = title
    ?.split(" ")
    .map((item) => item[0].toLocaleUpperCase() + item.slice(1))
    .join(" ");

  return newTitle;
}
