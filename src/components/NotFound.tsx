import { MusicalNoteIcon } from "@heroicons/react/24/outline";

interface Props {
  title: string;
}

export const NotFound: React.FC<Props> = ({ title }) => {
  return (
    <div className="mt-[30px] flex h-[220px] flex-col items-center justify-center gap-[20px] bg-[rgba(0,0,0,0.05)] py-[30px] text-text-secondary">
      <MusicalNoteIcon className="size-[90px]" />
      {title}
    </div>
  );
};
