import { useNavigate } from "react-router";
import { BannerItemChild } from "../api/homeApi";
import { Modal } from "./Modal";
import { CarouselItemModal } from "./CarouselItemModal";

interface Props {
  item: BannerItemChild;
  index: number;
  slideItemRef: React.MutableRefObject<(HTMLDivElement | null)[]>;
}

export const CarouselItem: React.FC<Props> = ({
  slideItemRef,
  item,
  index,
}) => {
  const navigate = useNavigate();
  const isPlayList = item.type === 4;

  return isPlayList ? (
    <div
      className="w-[33.3%] flex-shrink-0 cursor-pointer px-[15px]"
      key={item.banner}
      ref={(el) => (slideItemRef!.current[index] = el)}
      onClick={() => navigate(`/album/${item.encodeId}`)}
    >
      <img src={item.banner} className="w-full rounded-[8px] object-cover" />
    </div>
  ) : (
    <Modal>
      <Modal.Open open={item.encodeId}>
        <div
          className="w-[33.3%] flex-shrink-0 cursor-pointer px-[15px]"
          key={item.banner}
          ref={(el) => (slideItemRef!.current[index] = el)}
        >
          <img
            src={item.banner}
            className="w-full rounded-[8px] object-cover"
          />
        </div>
      </Modal.Open>
      <Modal.Window name={item.encodeId}>
        <CarouselItemModal encodeId={item.encodeId} />
      </Modal.Window>
    </Modal>
  );
};
