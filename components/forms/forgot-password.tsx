import { Mail, RefreshCcw, Volume2 } from "lucide-react";
import { Card } from "../ui/card";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import Image from "next/image";
import { Button } from "../ui/button";

export default function ForgotPasswordForm() {
  return (
    <Card className="max-w-md gap-0 mx-auto p-6 mt-10 space-y-4 border border-gray-200 rounded-none shadow-none">
      <h1 className="text-lg font-semibold flex items-center gap-2">
        🔍 회원정보찾기
      </h1>

      <p className="text-sm text-gray-500">
        회원가입 시 등록하신 이메일 주소를 입력해 주세요. 해당 이메일로 아이디와 비밀번호 정보를 보내드립니다.
      </p>

      <div className="space-y-2">
        <Label htmlFor="email" className="text-sm font-medium">
          이메일 주소
        </Label>
        <div className="relative">
          <Input id="email" type="email" placeholder="example@email.com" />
          <Mail className="absolute right-2 top-1 h-5 w-5 text-gray-400" />
        </div>
      </div>

      <div className="flex items-start gap-2 mt-4">
        <Image
          src="/captcha.png"
          alt="Captcha"
          width={120}
          height={50}
          className="border"
        />
        <div className="flex flex-row gap-0">
          <Button size="icon" variant="outline">
            <Volume2 className="h-4 w-4" />
          </Button>
          <Button size="icon" variant="outline">
            <RefreshCcw className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <p className="text-xs text-gray-500 mb-2">자동등록방지 숫자를 순서대로 입력하세요.</p>

      <Input type="text" className="" placeholder="숫자 입력" />

      <div className="flex justify-center gap-2 mt-4">
        <Button variant={'default'} className="">확인</Button>
        <Button variant="outline">닫기</Button>
      </div>
    </Card>
  )
}