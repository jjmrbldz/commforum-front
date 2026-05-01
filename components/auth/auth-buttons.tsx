import { Button } from "../ui/button";
import { useRouter } from "next/navigation";

export default function AuthButtons() {
  const router = useRouter();
  return (
    <div className="flex items-center">
      <Button size={'xs'} className="flex-1 font-light" onClick={() => router.push("/login")}>로그인</Button>
      <Button size={'xs'} className="flex-1 border-x-1 border-neutral-700 font-light" onClick={() => router.push("/register")}>회원가입</Button>
      <Button size={'xs'} className="flex-1 font-light" onClick={() => router.push("/forgot-password")}>정보찾기</Button>
    </div>
  )
}