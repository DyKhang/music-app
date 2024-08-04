import { useHome } from "../features/home/useHome";

export const Explore = () => {
  const { isPending, data, error } = useHome();
  console.log(data);

  if (error) return <p>Error</p>;

  return (
    <div>
      {isPending ? (
        "Is Loading..."
      ) : (
        <section className="flex mt-24 overflow-hidden">
          {data?.items?.map((item) => (
            <div className="px-[15px] w-[33.3%] flex-shrink-0">
              <img
                src={item.banner}
                className="object-cover rounded-[8px] w-full"
                key={item.banner}
              />
            </div>
          ))}
        </section>
      )}
    </div>
  );
};
