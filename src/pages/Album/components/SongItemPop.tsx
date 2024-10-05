import {
  faBan,
  faHeadphonesSimple,
  faMicrophone,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  ChevronRightIcon,
  ForwardIcon,
  HeartIcon,
  LinkIcon,
  PlusCircleIcon,
  QueueListIcon,
  ShareIcon,
} from "@heroicons/react/24/outline";
import { PopHoverTag } from "../../../components/PopHoverTag";
import { useInfoSong } from "../../../features/home/useInfoSong";

interface Props {
  encodeId: string;
}

export const SongItemPop: React.FC<Props> = ({ encodeId }) => {
  const { data, isLoading } = useInfoSong(encodeId);
  function calNumber(number: number) {
    let newNumber: string | number = number;

    if (newNumber >= 1000) {
      newNumber = newNumber + "";
      return newNumber[0] + "K";
    } else {
      return newNumber;
    }
  }

  if (isLoading) return null;

  return (
    <div className="w-[280px] p-[15px]">
      <div className="flex gap-[10px]">
        <div className="size-[40px] flex-shrink-0 overflow-hidden rounded-[4px]">
          <img
            src={data?.data.data.thumbnailM}
            alt=""
            className="w-full object-cover"
          />
        </div>
        <div>
          <h3 className="new-release-pop-title cursor-pointer text-[1.4rem] font-[500] hover:text-[#844d4d]">
            {data?.data.data.title}
          </h3>
          <div className="flex gap-[10px] text-[#a0a0a0]">
            <div className="flex items-center gap-[2px]">
              <HeartIcon className="size-[16px]" />
              <span className="text-[1.2rem]">
                {calNumber(data!.data.data.like)}
              </span>
            </div>
            <div className="flex items-center gap-[2px]">
              <FontAwesomeIcon
                icon={faHeadphonesSimple}
                className="text-[1.4rem]"
              />
              <span className="text-[1.2rem]">
                {calNumber(data!.data.data.listen)}
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className="mb-[10px] mt-[15px] flex h-[50px] rounded-[8px] bg-[rgba(0,0,0,0.05)]">
        <div className="flex flex-1 cursor-pointer flex-col items-center justify-center gap-2 rounded-[8px] py-[8px] hover:bg-[rgba(0,0,0,0.05)] hover:text-[#844d4d]">
          <FontAwesomeIcon icon={faMicrophone} />
          <span className="text-[1rem]">Lời bài hát</span>
        </div>
        <div className="flex flex-1 cursor-pointer flex-col items-center justify-center gap-2 rounded-[8px] py-[8px] hover:bg-[rgba(0,0,0,0.05)] hover:text-[#844d4d]">
          <FontAwesomeIcon icon={faBan} />
          <span className="text-[1rem]">Chặn</span>
        </div>
      </div>

      <div>
        <PopHoverTag
          title="Thêm vào danh sách phát"
          encodeId={encodeId}
          LeftIcon={() => <QueueListIcon />}
        />
        <PopHoverTag
          title="Phát tiếp theo"
          LeftIcon={() => <ForwardIcon />}
          encodeId={encodeId}
        />
        <PopHoverTag
          title="Phát nội dung tương tự"
          LeftIcon={() => (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="1em"
              height="1em"
              viewBox="0 0 24 24"
            >
              <path
                fill="currentColor"
                d="M5.99 4.929a.75.75 0 0 1 0 1.06a8.5 8.5 0 0 0 0 12.021a.75.75 0 0 1-1.061 1.06c-3.905-3.905-3.905-10.236 0-14.141a.75.75 0 0 1 1.06 0m13.081 0c3.905 3.905 3.905 10.237 0 14.142a.75.75 0 0 1-1.06-1.06a8.5 8.5 0 0 0 0-12.022a.75.75 0 1 1 1.06-1.06M8.818 7.757a.75.75 0 0 1 0 1.06a4.5 4.5 0 0 0 0 6.365a.75.75 0 0 1-1.06 1.06a6 6 0 0 1 0-8.485a.75.75 0 0 1 1.06 0m7.425 0a6 6 0 0 1 0 8.485a.75.75 0 1 1-1.061-1.06a4.5 4.5 0 0 0 0-6.364a.75.75 0 0 1 1.06-1.06M12 10.5a1.5 1.5 0 1 1 0 3a1.5 1.5 0 0 1 0-3"
              ></path>
            </svg>
          )}
        />
        <PopHoverTag
          title="Thêm vào playlist"
          LeftIcon={() => <PlusCircleIcon />}
        />
        <PopHoverTag title="Sao chép link" LeftIcon={() => <LinkIcon />} />
        <PopHoverTag
          title="Chia sẻ"
          LeftIcon={() => <ShareIcon />}
          RightIcon={() => <ChevronRightIcon />}
        />
      </div>
      <p className="mt-[6px] text-center text-[1.3rem] font-[500] text-[#696969]">
        Cung cấp bởi {data?.data.data.distributor}
      </p>
    </div>
  );
};
