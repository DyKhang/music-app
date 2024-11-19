import { faPlay } from "@fortawesome/free-solid-svg-icons";
import { useInfoSong } from "../features/home/useInfoSong";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useAppDispatch } from "../store";
import { getSongReducer } from "../features/player/playerSlice";

interface Props {
  closeModal?: () => void;
  encodeId: string;
}

export const CarouselItemModal: React.FC<Props> = ({
  closeModal,
  encodeId,
}) => {
  const { data } = useInfoSong(encodeId);

  const dispatch = useAppDispatch();

  function handleClickPlay() {
    dispatch(getSongReducer({ id: encodeId, type: "play" }));
    closeModal!();
  }

  function handleClickAdd() {
    dispatch(getSongReducer({ id: encodeId, type: "addBottom" }));
    closeModal!();
  }

  return (
    <div className="flex w-[330px] flex-col items-center bg-[#f7f5f3] p-[20px]">
      <span className="text-center text-[1.4rem]">
        Bạn có muốn phát bài hát này? Danh sách phát hiện tại sẽ bị thay thế.
      </span>
      <div className="mb-[5px] mt-[10px] w-[180px] overflow-hidden rounded-[5px]">
        <img
          src={data?.data.data.thumbnailM}
          alt=""
          className="w-full object-cover"
        />
      </div>
      <h2 className="text-[1.4rem] font-[500]">{data?.data.data.title}</h2>
      <span className="text-[1.2rem] text-[#696969]">
        {data?.data.data.artistsNames}
      </span>

      <div
        onClick={handleClickPlay}
        className="mt-[30px] flex w-full cursor-pointer items-center justify-center gap-[5px] rounded-full bg-[#644646] px-[24px] py-[9px] text-[1.4rem] uppercase text-white hover:brightness-[0.9]"
      >
        <FontAwesomeIcon icon={faPlay} className="" /> Phát bài hát
      </div>
      <div
        onClick={handleClickAdd}
        className="mt-[10px] w-full cursor-pointer rounded-full bg-[#dbdbdb] px-[24px] py-[9px] text-center text-[1.4rem] uppercase hover:brightness-[0.9]"
      >
        thêm vào danh sách phát
      </div>
      <div
        className="mt-[10px] w-full cursor-pointer py-[8px] text-center text-[1.4rem] uppercase"
        onClick={closeModal}
      >
        Bỏ qua
      </div>
    </div>
  );
};
