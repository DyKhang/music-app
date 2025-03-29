import { AxiosResponse } from "axios";
import { ArtistApi } from "../../../api/artistApi";
import { AwardIcon } from "../../../components/AwardIcon";
import { Modal } from "../../../components/Modal";
import { ArtistBiographyModal } from "./ArtistBiographyModal";

interface Props {
  data: AxiosResponse<ArtistApi, unknown> | undefined;
}

export const ArtistBiography: React.FC<Props> = ({ data }) => {
  return (
    <>
      <h2 className="mb-[20px] text-[2rem] font-[700]">
        Về {data?.data.data.name}
      </h2>
      <div className="flex w-[81%] flex-col gap-[30px] lg:flex-row">
        <img
          src={data?.data.data.thumbnailM}
          alt=""
          style={{
            objectPosition: "50% 20%",
          }}
          className="h-[300px] w-[450px] flex-shrink-0 rounded-[8px] object-cover"
        />
        <div>
          <div className="text-[1.4rem] text-[#696969]">
            {data?.data.data.sortBiography}

            <Modal>
              <Modal.Open open={data!.data.data.alias}>
                <span className="ml-[4px] cursor-pointer text-[1.2rem] font-[700] uppercase text-[#844d4d]">
                  Xem thêm
                </span>
              </Modal.Open>
              <Modal.Window name={data!.data.data.alias}>
                <ArtistBiographyModal
                  desc={data!.data.data.biography}
                  image={data!.data.data.thumbnail}
                  name={data!.data.data.name}
                />
              </Modal.Window>
            </Modal>
          </div>
          <div className="mt-[48px] flex gap-[30px]">
            <div className="hidden flex-col lg:flex">
              <span className="text-[2rem] font-[700]">
                {data?.data.data.totalFollow.toLocaleString("vi-VN")}
              </span>
              <span className="text-[1.4rem] text-[#696969]">
                Người quan tâm
              </span>
            </div>
            {data?.data.data.awards && (
              <>
                <div className="flex flex-col">
                  <span className="text-[2rem] font-[700]">
                    {data.data.data.awards.length}
                  </span>
                  <span className="text-[1.4rem] text-[#696969]">
                    Giải thưởng
                  </span>
                </div>
                <div className="size-[42px]">
                  <AwardIcon />
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};
