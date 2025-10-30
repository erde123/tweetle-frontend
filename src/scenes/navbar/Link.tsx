import { Link as RouterLink } from "react-router-dom";
import type { SelectedPage } from "@/shared/types";

type Props = {
  page: string;
  selectedPage: SelectedPage;
  setSelectedPage: (value: SelectedPage) => void;
};

const Link = ({ page, selectedPage, setSelectedPage }: Props) => {
  const lowerCasePage = page.toLowerCase().replace(/ /g, "") as SelectedPage;

  return (
    <RouterLink
      to={lowerCasePage === "home" ? "/" : `/${lowerCasePage}`}
      className={`${
        selectedPage === lowerCasePage
          ? "text-primary-500"
          : "text-gray-500"
      } transition duration-500 hover:text-primary-300`}
      onClick={() => setSelectedPage(lowerCasePage)}
    >
      {page}
    </RouterLink>
  );
};

export default Link;
