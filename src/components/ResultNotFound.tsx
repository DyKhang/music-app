import { MusicalNoteIcon } from "@heroicons/react/24/outline";

interface Props {
  title: string;
}

export const ResultNotFound: React.FC<Props> = ({ title }) => {
  return (
    <div className="mt-[30px] flex h-[220px] flex-col items-center justify-center gap-[20px] bg-[rgba(0,0,0,0.05)] py-[30px] text-[#696969]">
      <MusicalNoteIcon className="size-[90px]" />
      {title}
    </div>
  );
};
