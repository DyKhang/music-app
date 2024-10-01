import { faPlay } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useParams } from "react-router";

export const Album = () => {
  const { id } = useParams();

  console.log(id);

  return (
    <>
      <section className="flex gap-[30px]">
        <div className="mt-[40px] w-[300px]">
          <div className="album-img-shadow group/list relative cursor-pointer overflow-hidden rounded-[8px]">
            <img
              src="https://photo-resize-zmp3.zmdcdn.me/w600_r1x1_jpeg/cover/b/8/7/0/b87093d7201c164981d6132ca0673745.jpg"
              alt=""
              className="w-full object-cover transition-all duration-500 group-hover/list:scale-110"
            />
            <div className="absolute inset-0 hidden bg-black/50 group-hover/list:block"></div>
            <div className="absolute left-1/2 top-1/2 hidden size-[48px] -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-[0.5px] border-white text-white group-hover/list:flex">
              <FontAwesomeIcon
                icon={faPlay}
                className="translate-x-[1.5px] text-[2.4rem]"
              />
            </div>
          </div>
          <div className="mt-[12px]">
            <div className="flex flex-col items-center">
              <h1 className="text-center text-[2rem] font-[700]">
                Guitar V-Pop
              </h1>
              <div className="flex flex-col items-center text-[1.2rem] leading-[1.75] text-[#696969]">
                <span>Cập nhật: 20/06/2024</span>
                <span>Hoàng Yến Chibi, Thái Trinh, Hoàng Dũng, TRANG</span>
                <span>17K người yêu thích</span>
              </div>
              <div className="mt-[16px] cursor-pointer rounded-full bg-[#644646] px-[24px] py-[9px] text-[1.4rem] uppercase text-white hover:brightness-[0.9]">
                <FontAwesomeIcon
                  icon={faPlay}
                  className="mr-[5px] text-[1.6rem]"
                />
                <span>Tiếp tục phát</span>
              </div>
            </div>
          </div>
        </div>

        <div className="flex-1 pt-[40px]">
          <span>
            Lời tựa Trải lòng cùng những ca khúc V-Pop được phối với tiếng đàn
            guitar mộc mạc mà sâu lắng
          </span>
        </div>
      </section>
    </>
  );
};
