import { useState } from "react";
import { DndContext, DragEndEvent } from "@dnd-kit/core";
import { arrayMove, SortableContext } from "@dnd-kit/sortable";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
interface Item {
  id: string;
  title: string;
}

export const Library = () => {
  const [items, setItems] = useState<Item[]>([
    { id: "1", title: "Item 1" },
    { id: "2", title: "Item 2" },
    { id: "3", title: "Item 3" },
  ]);

  function handleDragEnd(e: DragEndEvent) {
    const { over, active } = e;

    if (over && active.id !== over.id) {
      setItems((items) => {
        const oldIndex = items.findIndex((item) => item.id === active.id);
        const newIndex = items.findIndex((item) => item.id === over.id);
        return arrayMove(items, oldIndex, newIndex);
      });
    }
  }

  return (
    <>
      <div className="mt-[200px] space-y-[10px]">
        <DndContext onDragEnd={handleDragEnd}>
          <SortableContext items={items}>
            {items.map((item) => (
              <Item item={item} key={item.id} />
            ))}
          </SortableContext>
        </DndContext>
      </div>
    </>
  );
};

const Item = ({ item }: { item: Item }) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: item.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      key={item.id}
      className="flex justify-between bg-red-700 p-[10px] text-white"
    >
      {item.title}
      <span {...attributes} {...listeners} className="cursor-move">
        Drag
      </span>
    </div>
  );
};
