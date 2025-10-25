import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

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

export function capitalizeFirstLetter(title: string | undefined) {
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

export function convertTotalFollow(totalFollow: number) {
  if (totalFollow >= 1000) {
    return `${Math.floor(totalFollow / 1000)}K`;
  } else {
    return totalFollow;
  }
}

export function timestampToFormat(timestamp: number) {
  const date = new Date(timestamp * 1000);
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();
  return `${day < 10 ? `0${day}` : day}.${month}.${year}`;
}

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function checkWhiteSpaceOfString(str: string) {
  return str[0] === " " || str.at(-1) === " ";
}
