import { useActionState } from "react";
import { Button } from "../ui/button";
import { logoutAction } from "@/app/actions";
import { useRouter } from "next/navigation";
import { useSheetStore } from "@/store/use-sheet-store";

export default function UserButtons() {
  const [ , dispatch, isPending] = useActionState(logoutAction, undefined);
  const router = useRouter();
  const { setSheet } = useSheetStore();


  return (
    <form 
      action={() => {
        dispatch();
        setSheet(null)
      }} 
      className="flex items-center"
    >
      <Button type="button" size={'xs'} className="flex-1 font-light border-r-1 border-neutral-700" onClick={() => {
        router.push("/profile");
        setSheet(null)
      }}>내정보</Button>
      <Button type="submit" size={'xs'} className="flex-1 border-x-1 border-neutral-700 font-light" loading={isPending}>나가기</Button>
    </form>
  )
}