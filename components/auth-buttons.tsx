import { Button } from "./ui/button";


export default function AuthFormButtons() {
  return (
    <div className="flex items-center">
      <Button size={'xs'} className="flex-1 font-light">로그인</Button>
      <Button size={'xs'} className="flex-1 border-x-1 border-neutral-700 font-light">회원가입</Button>
      <Button size={'xs'} className="flex-1 font-light">정보찾기</Button>
    </div>
  )
}