import { Badge } from "@heroui/react";
import {
  RiHomeLine,
  RiHomeFill,
  RiNotificationLine,
  RiNotificationFill,
  RiBookmarkLine,
  RiBookmarkFill,
  RiMailLine,
  RiMailFill,
  RiAddCircleLine,
} from "react-icons/ri";
import { Link, useLocation } from "react-router-dom";

interface MenuBarProps {
  className?: string;
}

const MenuBar = ({ className }: MenuBarProps) => {
  const { pathname } = useLocation();

  const isActive = (path: string) => pathname === path;

  return (
    <div
      className={`relative flex sm:flex-col gap-[10px] bg-content1 ${className}`}
    >
      <Link to="/" className="w-full h-full block">
        <button
          className={`w-full h-full flex items-center justify-center sm:justify-start sm:py-[6px] sm:px-3 lg:pr-8 lg:py-2 gap-2 hover:bg-default-100 rounded-lg transition-colors duration-300 ${
            isActive("/") ? "text-black dark:text-white" : "text-default-500"
          }`}
        >
          {isActive("/") ? <RiHomeFill size={26} /> : <RiHomeLine size={26} />}
          <span className="hidden lg:inline">Home</span>
        </button>
      </Link>

      <Link to="/notifications" className="w-full h-full block">
        <button
          className={`w-full h-full flex items-center justify-center sm:justify-start sm:py-[6px] sm:px-3 lg:pr-8 lg:py-2 gap-2 hover:bg-default-100 rounded-lg transition-colors duration-300 ${
            isActive("/notifications")
              ? "text-black dark:text-white"
              : "text-default-500"
          }`}
        >
          <Badge
            size="sm"
            color="primary"
            content={5}
            shape="circle"
            showOutline={false}
            variant="shadow"
          >
            <div className="relative">
              {isActive("/notifications") ? (
                <RiNotificationFill size={26} />
              ) : (
                <RiNotificationLine size={26} />
              )}
            </div>
          </Badge>
          <span className="hidden lg:inline">Notifications</span>
        </button>
      </Link>

      <div className="sm:hidden cursor-pointer w-full h-full flex items-center justify-center sm:justify-start sm:py-[6px] sm:px-3 lg:pr-8 lg:py-2 gap-2 hover:bg-default-100 rounded-lg transition-colors duration-300">
        <button className="text-default-500">
          <RiAddCircleLine size={30} />
        </button>
      </div>

      <Link to="/messages" className="w-full h-full block">
        <button
          className={`w-full h-full flex items-center justify-center sm:justify-start sm:py-[6px] sm:px-3 lg:pr-8 lg:py-2 gap-2 hover:bg-default-100 rounded-lg transition-colors duration-300 ${
            isActive("/messages")
              ? "text-black dark:text-white"
              : "text-default-500"
          }`}
        >
          <Badge
            size="sm"
            color="primary"
            content={10}
            shape="circle"
            showOutline={false}
            variant="shadow"
          >
            <div className="relative">
              {isActive("/messages") ? (
                <RiMailFill size={26} />
              ) : (
                <RiMailLine size={26} />
              )}
            </div>
          </Badge>
          <span className="hidden lg:inline">Messages</span>
        </button>
      </Link>

      <Link to="/bookmarks" className="w-full h-full block">
        <button
          className={`w-full h-full flex items-center justify-center sm:justify-start sm:py-[6px] sm:px-3 lg:pr-8 lg:py-2 gap-2 hover:bg-default-100 rounded-lg transition-colors duration-300 ${
            isActive("/bookmarks")
              ? "text-black dark:text-white"
              : "text-default-500"
          }`}
        >
          {isActive("/bookmarks") ? (
            <RiBookmarkFill size={26} />
          ) : (
            <RiBookmarkLine size={26} />
          )}
          <span className="hidden lg:inline">Bookmarks</span>
        </button>
      </Link>
    </div>
  );
};

export default MenuBar;
