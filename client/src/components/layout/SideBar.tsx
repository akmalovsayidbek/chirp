import { useState } from "react";
import { Avatar, Button, Card, Divider } from "@heroui/react";

const Sidebar = () => {
  return (
    <div className="sticky top-[72px] hidden h-fit w-[250px] flex-none md:block lg:w-[300px]">
      <div className="space-y-5">
        <WhoToFollow />
        <TrendingTopics />
      </div>
    </div>
  );
};

const WhoToFollow = () => {
  const [isFollowed, setIsFollowed] = useState(false);

  return (
    <Card className="p-4">
      <div>
        <div className="flex items-center justify-between">
          <div className="flex gap-[10px]">
            <Avatar
              isBordered
              radius="full"
              size="md"
              src="https://heroui.com/avatars/avatar-1.png"
            />
            <div className="flex flex-col gap-1 items-start justify-center">
              <h4 className="text-small font-semibold leading-none text-default-600">
                Zoey Lang
              </h4>
              <h5 className="text-small tracking-tight text-default-400">
                @zoeylang
              </h5>
            </div>
          </div>
          <Button
            className={
              isFollowed
                ? "bg-transparent text-foreground border-default-200"
                : ""
            }
            color="primary"
            radius="full"
            size="sm"
            variant={isFollowed ? "bordered" : "solid"}
            onPress={() => setIsFollowed(!isFollowed)}
          >
            {isFollowed ? "Unfollow" : "Follow"}
          </Button>
        </div>
        <Divider className="my-[10px] h-[0.5px]" />
      </div>
      <div>
        <div className="flex items-center justify-between">
          <div className="flex gap-[10px]">
            <Avatar
              isBordered
              radius="full"
              size="md"
              src="https://heroui.com/avatars/avatar-1.png"
            />
            <div className="flex flex-col gap-1 items-start justify-center">
              <h4 className="text-small font-semibold leading-none text-default-600">
                Zoey Lang
              </h4>
              <h5 className="text-small tracking-tight text-default-400">
                @zoeylang
              </h5>
            </div>
          </div>
          <Button
            className={
              isFollowed
                ? "bg-transparent text-foreground border-default-200"
                : ""
            }
            color="primary"
            radius="full"
            size="sm"
            variant={isFollowed ? "bordered" : "solid"}
            onPress={() => setIsFollowed(!isFollowed)}
          >
            {isFollowed ? "Unfollow" : "Follow"}
          </Button>
        </div>
        <Divider className="my-[10px] h-[0.5px]" />
      </div>
      <div>
        <div className="flex items-center justify-between">
          <div className="flex gap-[10px]">
            <Avatar
              isBordered
              radius="full"
              size="md"
              src="https://heroui.com/avatars/avatar-1.png"
            />
            <div className="flex flex-col gap-1 items-start justify-center">
              <h4 className="text-small font-semibold leading-none text-default-600">
                Zoey Lang
              </h4>
              <h5 className="text-small tracking-tight text-default-400">
                @zoeylang
              </h5>
            </div>
          </div>
          <Button
            className={
              isFollowed
                ? "bg-transparent text-foreground border-default-200"
                : ""
            }
            color="primary"
            radius="full"
            size="sm"
            variant={isFollowed ? "bordered" : "solid"}
            onPress={() => setIsFollowed(!isFollowed)}
          >
            {isFollowed ? "Unfollow" : "Follow"}
          </Button>
        </div>
        <Divider className="my-[10px] h-[0.5px]" />
      </div>
      <div>
        <div className="flex items-center justify-between">
          <div className="flex gap-[10px]">
            <Avatar
              isBordered
              radius="full"
              size="md"
              src="https://heroui.com/avatars/avatar-1.png"
            />
            <div className="flex flex-col gap-1 items-start justify-center">
              <h4 className="text-small font-semibold leading-none text-default-600">
                Zoey Lang
              </h4>
              <h5 className="text-small tracking-tight text-default-400">
                @zoeylang
              </h5>
            </div>
          </div>
          <Button
            className={
              isFollowed
                ? "bg-transparent text-foreground border-default-200"
                : ""
            }
            color="primary"
            radius="full"
            size="sm"
            variant={isFollowed ? "bordered" : "solid"}
            onPress={() => setIsFollowed(!isFollowed)}
          >
            {isFollowed ? "Unfollow" : "Follow"}
          </Button>
        </div>
      </div>
    </Card>
  );
};

const TrendingTopics = () => {
  return (
    <Card className="p-4">
      <div className="flex flex-col gap-1">
        <h4 className="text-sm font-semibold text-default-600">#ReactJS</h4>
        <span className="text-tiny text-default-400">120K posts</span>
        <Divider className="my-[10px] h-[0.5px]" />
      </div>
      <div className="flex flex-col gap-1">
        <h4 className="text-sm font-semibold text-default-600">#ReactJS</h4>
        <span className="text-tiny text-default-400">120K posts</span>
        <Divider className="my-[10px] h-[0.5px]" />
      </div>
      <div className="flex flex-col gap-1">
        <h4 className="text-sm font-semibold text-default-600">#ReactJS</h4>
        <span className="text-tiny text-default-400">120K posts</span>
        <Divider className="my-[10px] h-[0.5px]" />
      </div>
      <div className="flex flex-col gap-1">
        <h4 className="text-sm font-semibold text-default-600">#ReactJS</h4>
        <span className="text-tiny text-default-400">120K posts</span>
      </div>
    </Card>
  );
};

export default Sidebar;
