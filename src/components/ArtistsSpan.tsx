import { useNavigate } from "react-router";

interface Props {
  artists: {
    alias: string;
    name: string;
  }[];
  className?: string;
}

export const ArtistsSpan: React.FC<Props> = ({
  artists,
  className = "cursor-pointer text-[1.2rem] text-text-secondary hover:text-text-item-hover hover:underline",
}) => {
  const navigate = useNavigate();

  return (
    <>
      {artists?.map((item, index) => (
        <span
          onClick={() => navigate(`/nghe-si/${item.alias}`)}
          key={item.alias}
          className={className}
        >
          {item.name}
          {index < artists.length - 1 && ", "}
        </span>
      ))}
    </>
  );
};
