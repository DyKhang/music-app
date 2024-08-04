import { useQuery } from "@tanstack/react-query";
import { getHome } from "../../api/apiHome";

interface BannerItem {
  banner: string;
  cover: string;
  link: string;
}

export interface Section {
  sectionType: string;
  items: BannerItem[];
}

export function useHome() {
  const { isPending, data, error } = useQuery({
    queryKey: ["banner"],
    queryFn: async () => {
      const response = await getHome();
      const data: Section = response.data.data.items[0];
      return data;
    },
  });

  return { isPending, data, error };
}
