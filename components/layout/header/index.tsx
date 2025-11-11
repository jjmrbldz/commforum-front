import BotHeader from "./bot-header";
import MidHeader from "./mid-header";
import TopHeader from "./top-header";

export default function Header() {
  return (
    <>
      <div className="relative z-5">
        <div className="bg-[url(/images/header-bg.jpg)] bg-center bg-cover bg-no-repeat border-bottom relative">
          <TopHeader />
          <div className="h-full w-full absolute top-0 bg-radial from-[#12141A]/0 to-[#12141A] to-84% z-0"></div>
          <div className="h-[4px] mt-1 bg-linear-to-b from-22% from-red-500 to-red-900"></div>
          <MidHeader />
        </div>
      </div>
      <BotHeader />
    </>
  )
}