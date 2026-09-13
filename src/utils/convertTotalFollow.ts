export function convertTotalFollow(totalFollow: number) {
  if (totalFollow >= 1000) {
    return `${Math.floor(totalFollow / 1000)}K`;
  } else {
    return totalFollow;
  }
}
