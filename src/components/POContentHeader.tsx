import {
  ArrowUpRightIcon,
  ChevronRightIcon,
  ClipboardDocumentCheckIcon,
  FlagIcon,
  InformationCircleIcon,
  NewspaperIcon,
  PaintBrushIcon,
  PhoneIcon,
  PlayCircleIcon,
  ShieldCheckIcon,
} from "@heroicons/react/24/outline";
import { HoverTag } from "./HoverTag";
import { ThemePicker } from "./ThemePicker";

export const POContentHeader = () => {
  return (
    <div className="w-[300px] p-[6px]">
      <HoverTag
        title="Trình phát nhạc"
        LeftIcon={() => <PlayCircleIcon />}
        RightIcon={() => <ChevronRightIcon />}
      />
      <div className="group relative">
        <HoverTag
          title="Giao diện"
          LeftIcon={() => <PaintBrushIcon />}
          RightIcon={() => <ChevronRightIcon />}
        />
        <ThemePicker />
      </div>
      <div className="m-[10px] h-[1px] bg-[#dedcda]"></div>
      <HoverTag title="Giới thiệu" LeftIcon={() => <InformationCircleIcon />} />
      <HoverTag
        title="Thỏa thuận sử dụng"
        LeftIcon={() => <ClipboardDocumentCheckIcon />}
        RightIcon={() => <ArrowUpRightIcon className="text-[#bebdbc]" />}
      />
      <HoverTag
        title="Chính sách bảo mật"
        LeftIcon={() => <ShieldCheckIcon />}
        RightIcon={() => <ArrowUpRightIcon className="text-[#bebdbc]" />}
      />
      <HoverTag
        title="Báo cáo vi phạm bản quyền"
        LeftIcon={() => <FlagIcon />}
        RightIcon={() => <ArrowUpRightIcon className="text-[#bebdbc]" />}
      />
      <HoverTag
        title="Quảng cáo"
        LeftIcon={() => <NewspaperIcon />}
        RightIcon={() => <ArrowUpRightIcon className="text-[#bebdbc]" />}
      />
      <HoverTag
        title="Liên hệ"
        LeftIcon={() => <PhoneIcon />}
        RightIcon={() => <ArrowUpRightIcon className="text-[#bebdbc]" />}
      />
    </div>
  );
};
