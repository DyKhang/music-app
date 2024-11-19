import { faClock } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { EllipsisHorizontalIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import { SideBarItem } from "../components/SideBarItem";
import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "../store";
import {
  closestCenter,
  DndContext,
  DragEndEvent,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { arrayMove, SortableContext } from "@dnd-kit/sortable";
import { restrictToVerticalAxis } from "@dnd-kit/modifiers";
import { setSongsWhenDrag } from "../features/player/playerSlice";

interface Props {
  isShow: boolean;
  showKaraoke: boolean;
}

export const PlayListSideBar: React.FC<Props> = ({ isShow, showKaraoke }) => {
  const [state, setState] = useState<"playlist" | "recent">("playlist");

  const songs = useSelector((state: RootState) => state.songs);
  const playedSongs = songs.filter((song) => song.isPlayed);
  const unPlayedSongs = songs.filter((song) => !song.isPlayed);
  const dispatch = useAppDispatch();

  // cursor move 0px then fire event drag, avoid case cursor click element then fire drag
  const pointerSensor = useSensor(PointerSensor, {
    activationConstraint: {
      distance: 0,
    },
  });
  const sensors = useSensors(pointerSensor);

  function handleDragEnd(e: DragEndEvent) {
    const { over, active } = e;

    if (over && active.id !== over.id) {
      const oldIndex = songs.findIndex((song) => song.encodeId === active.id);
      const newIndex = songs.findIndex((song) => song.encodeId === over.id);
      dispatch(
        setSongsWhenDrag({
          songs: arrayMove(songs, oldIndex, newIndex),
          activeSongId: active.id as string,
          overSongId: over.id as string,
        }),
      );
    }
  }

  return (
    <section
      className={`fixed right-[-330px] ${isShow && !showKaraoke && "translate-x-[-330px]"} top-0 z-[55] h-screen w-[330px] bg-[#e5e3df] px-[8px] pb-[150px] pt-[14px] shadow-2xl transition duration-700`}
    >
      <div className="flex items-center justify-between">
        <div className="flex rounded-full bg-[rgba(0,0,0,0.05)] p-[3px]">
          <div
            className={`cursor-pointer rounded-full ${state === "playlist" && "shadow-playListSideBarActiveTag bg-[hsla(0,0%,100%,0.3)] text-[#844d4d]"} px-[16px] py-[5px] text-[1.2rem]`}
            onClick={() => setState("playlist")}
          >
            Danh sách phát
          </div>
          <div
            className={`cursor-pointer rounded-full px-[16px] py-[5px] text-[1.2rem] ${state === "recent" && "shadow-playListSideBarActiveTag bg-[hsla(0,0%,100%,0.3)] text-[#844d4d]"}`}
            onClick={() => setState("recent")}
          >
            Nghe gần đây
          </div>
        </div>
        <div className="flex size-[32px] flex-shrink-0 cursor-pointer items-center justify-center rounded-full bg-[rgba(0,0,0,0.05)]">
          <FontAwesomeIcon icon={faClock} className="text-[1.4rem]" />
        </div>
        <div className="flex size-[32px] flex-shrink-0 cursor-pointer items-center justify-center rounded-full bg-[rgba(0,0,0,0.05)]">
          <EllipsisHorizontalIcon className="size-[20px]" />
        </div>
      </div>

      <DndContext
        modifiers={[restrictToVerticalAxis]}
        onDragEnd={handleDragEnd}
        sensors={sensors}
        collisionDetection={closestCenter}
      >
        <SortableContext
          items={songs.map(({ encodeId, ...rest }) => {
            return {
              id: encodeId,
              ...rest,
            };
          })}
        >
          <div className="mt-[14px] h-full overflow-y-scroll">
            {playedSongs.map((song) => (
              <SideBarItem key={song.encodeId} song={song} />
            ))}
            {unPlayedSongs.map((song) => (
              <SideBarItem key={song.encodeId} song={song} />
            ))}
          </div>
        </SortableContext>
      </DndContext>
    </section>
  );
};
