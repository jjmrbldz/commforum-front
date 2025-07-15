import { useSheetStore } from "@/store/use-sheet-store";
import { Button } from "../ui/button";

export default function AuthButtons() {
  const { setSheet } = useSheetStore();
  return (
    <div className="flex items-center">
      <Button size={'xs'} className="flex-1 font-light" onClick={() => setSheet("user")}>로그인</Button>
      <Button size={'xs'} className="flex-1 border-x-1 border-neutral-700 font-light">회원가입</Button>
      <Button size={'xs'} className="flex-1 font-light">정보찾기</Button>
    </div>
  )
}