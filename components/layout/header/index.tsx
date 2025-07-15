import BotHeader from "./bot-header";
import TopHeader from "./top-header";

export default function Header() {
  return (
    <div className="border-b-3 border-cyan-500 pb-2 relative z-5">
      <div className="max-w-7xl m-auto">
        <TopHeader />
        <BotHeader />
      </div>
    </div>
  )
}