export function getArrSlider(
  start: number,
  end: number,
  number: number,
): number[] {
  const output = [];
  const limit = start > end ? number : end;
  for (let i = start; i <= limit; i++) {
    output.push(i);
  }
  if (start > end) {
    for (let i = 0; i <= end; i++) {
      output.push(i);
    }
  }
  return output;
}

export function upperCaseFirstLetter(title: string | undefined) {
  const newTitle = title
    ?.split(" ")
    .map((item) => item[0].toLocaleUpperCase() + item.slice(1))
    .join(" ");

  return newTitle;
}

export function formatTime(time: number) {
  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time % 60);
  return `${minutes.toString().padStart(2, "0")}:${seconds
    .toString()
    .padStart(2, "0")}`;
}
