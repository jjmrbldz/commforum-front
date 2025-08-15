import BotHeader from "./bot-header";
import MidHeader from "./mid-header";
import TopHeader from "./top-header";

export default function Header() {
  return (
    <>
      <div className="relative z-5">
        <div className="bg-header border-bottom">
          <TopHeader />
          <MidHeader />
        </div>
      </div>
      <BotHeader />
    </>
  )
}