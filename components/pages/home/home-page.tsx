import BottomSection from "./bottom-section";
import AllPosts from "../all-posts";
import HomeRightPanel from "./home-right-panel";
import Banner from "./banner";

export default function HomePage() {
  return (
    <>
      <div className="max-w-7xl m-auto">
        <div className="grid md:grid-cols-12 gap-4 p-4 md:p-0">
          <div className="col-span-12 mt-4">
            <Banner />
          </div>
          <AllPosts />
          <HomeRightPanel />
        </div>
      </div>
      <BottomSection />
    </>
  );
}
