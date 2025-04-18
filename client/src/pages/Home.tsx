import FollowingFeed from "../components/home/FollowingFeed";
import ForYouFeed from "../components/home/ForYouFeed";
import Sidebar from "../components/layout/SideBar";
import { Tabs, Tab } from "@heroui/react";

const Home = () => {
  return (
    <main className="flex w-full min-w-0 gap-5">
      <div className="w-full min-w-0">
        <Tabs fullWidth variant="bordered" radius="full">
          <Tab key="for-you" title="ForYou" className="font-medium">
            <ForYouFeed />
          </Tab>
          <Tab key="following" title="Following" className="font-medium">
            <FollowingFeed />
          </Tab>
        </Tabs>
      </div>
      <Sidebar />
    </main>
  );
};

export default Home;
