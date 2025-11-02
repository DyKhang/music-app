export const NewReleaseItemSkeleton = () => {
  return (
    <div>
      <div className="relative flex size-[60px] w-full flex-shrink-0 cursor-pointer items-center justify-center overflow-hidden rounded-lg">
        <div className="w-full animate-pulse rounded bg-gray-200">abc</div>
        <div className="animate-pulse rounded bg-gray-200" />
      </div>

      <div className="flex min-w-0 flex-col gap-[3px] rounded">
        <div className="flex w-full items-center gap-[4px] hover:text-text-item-hover">
          <span className="animate-pulse rounded bg-gray-200">abc</span>
        </div>

        <div className="animate-pulse rounded bg-gray-200">abc</div>

        <span className="animate-pulse rounded bg-gray-200">abc</span>
      </div>
    </div>
  );
};
