import InquiryForm from "@/components/forms/inquiry-form";
import { openGame } from "./actions";
import InquiryList from "@/components/pages/inquiry/inquiry-list";
import NotOkMessage from "@/components/not-ok-message";
import PageHeader from "@/components/page-header";
import GameIframe from "@/components/game-ifram";


export default async function TazzaBaccaratPage() {

  const res = await openGame();
  if (!res.ok) return <NotOkMessage message={res.message} />  
  
  return (
    <div className="space-y-4">
      <PageHeader title={decodeURIComponent("타짜 바카라 [Tournament]")} />
      {/* <GameIframe src={`http://192.168.68.113:5173/?authToken=${res.data}`} /> */}
      <GameIframe src={`/game/mini-baccarat-tournament/index.html/?gameId=2&authToken=${res.data}`} />
    </div>
  )
}