interface Props {
  isReplayPlayList: boolean;
}

export const ReplayIcon: React.FC<Props> = ({ isReplayPlayList }) => {
  const color = isReplayPlayList ? "#7f4d4d" : "currentColor";

  return (
    <svg
      width="24px"
      height="24px"
      stroke-width="2.1"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      color={color}
    >
      <path
        d="M17 17H8C6.33333 17 3 16 3 12C3 8 6.33333 7 8 7H16C17.6667 7 21 8 21 12C21 13.4943 20.5348 14.57 19.865 15.3312"
        stroke={color}
        stroke-width="2.1"
        stroke-linecap="round"
        stroke-linejoin="round"
      ></path>
      <path
        d="M14.5 14.5L17 17L14.5 19.5"
        stroke={color}
        stroke-width="2.1"
        stroke-linecap="round"
        stroke-linejoin="round"
      ></path>
    </svg>
  );
};