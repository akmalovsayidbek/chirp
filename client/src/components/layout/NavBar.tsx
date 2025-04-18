import { RiSearch2Line } from "react-icons/ri";
import {
  Avatar,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Input,
  Switch,
} from "@heroui/react";
import logo from "../../assets/logo.png";
import { RiSunLine, RiMoonLine } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import { useTheme } from "next-themes";
import { useMutation } from "@tanstack/react-query";
import { logout } from "../../lib/api";
import queryClient from "../../config/queryClient";
import { GoPlus } from "react-icons/go";

const NavBar = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { theme, setTheme } = useTheme();

  if (!user) null;

  const { mutate, isPending } = useMutation({
    mutationFn: logout,
    onSettled: () => {
      queryClient.clear();
      navigate("/login", { replace: true });
    },
  });

  if (isPending) {
    return (
      <div className="grid h-screen place-items-center">
        <img src={logo} className="h-20 w-20" />
      </div>
    );
  }

  return (
    <div className="sticky h-[55px] top-0 z-10 bg-content1">
      <div className="mx-auto flex h-full max-w-7xl flex-wrap items-center justify-between gap-5 px-5">
        <img src={logo} className="w-11 h-11" />
        <div className="flex items-center gap-4">
          <div>
            <Input
              classNames={{
                base: "w-full max-w-[160px] sm:max-w-[200px] h-9",
                mainWrapper: "h-full",
                input: "text-small",
                inputWrapper:
                  "h-full font-normal text-default-500 bg-default-400/20 dark:bg-default-500/20",
              }}
              placeholder="Type to search..."
              size="sm"
              startContent={<RiSearch2Line size={18} />}
              type="search"
            />
          </div>
          <button className="hidden cursor-pointer sm:grid place-items-center w-9 h-9 rounded-full bg-default-200 hover:opacity-80">
            <GoPlus size={20} />
          </button>
          <Dropdown placement="bottom-end">
            <DropdownTrigger>
              <Avatar
                showFallback
                isBordered
                size="sm"
                className="cursor-pointer"
              />
            </DropdownTrigger>
            <DropdownMenu className="p-[2px]">
              <DropdownItem
                key="profile"
                className="h-10 rounded-lg"
                onClick={() => navigate(`/user/${user.username}`)}
              >
                <p className="font-medium">Profile</p>
              </DropdownItem>
              <DropdownItem
                key="settings"
                className="h-10 rounded-lg"
                onClick={() => navigate("/settings")}
              >
                <p className="font-medium">Settings</p>
              </DropdownItem>
              <DropdownItem
                key="dark-mode"
                isReadOnly
                className="h-10 rounded-lg"
                endContent={
                  <Switch
                    isSelected={theme === "dark"}
                    onValueChange={(isSelected) =>
                      setTheme(isSelected ? "dark" : "light")
                    }
                    color="success"
                    startContent={<RiMoonLine />}
                    endContent={<RiSunLine />}
                  />
                }
              >
                <p className="font-medium">Dark Mode</p>
              </DropdownItem>
              <DropdownItem
                key="logout"
                color="danger"
                className="group h-10 rounded-lg"
                onClick={() => mutate()}
              >
                <p className="font-medium text-danger group-hover:text-white">
                  Log Out
                </p>
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
