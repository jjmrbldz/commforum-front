import { Button } from "../ui/button";

export default function UserButtons() {
  return (
    <div className="flex items-center">
      <Button size={'xs'} className="flex-1 font-light border-r-1 border-neutral-700">내정보</Button>
      <Button size={'xs'} className="flex-1 border-x-1 border-neutral-700 font-light">나가기</Button>
    </div>
  )
}