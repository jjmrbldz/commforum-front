import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Volume2, RefreshCcw } from "lucide-react";
import Image from "next/image";

export default function RegisterForm() {
  return (
    <form className="space-y-6">
      <Card className="p-4 space-y-4">
        <h3 className="font-semibold">사이트 이용정보 입력</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="username">아이디</Label>
            <Input id="username" placeholder="영문자, 숫자, _ 만 입력 가능. 최소 3자 이상 입력하세요." />
          </div>
          <div>
            <Label htmlFor="password">비밀번호</Label>
            <Input id="password" type="password" placeholder="영문/숫자/특수문자 조합 8자 이상" />
          </div>
          <div>
            <Label htmlFor="passwordConfirm">비밀번호 확인</Label>
            <Input id="passwordConfirm" type="password" />
          </div>
        </div>
      </Card>

      <Card className="p-4 space-y-4">
        <h3 className="font-semibold">개인정보 입력</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="name">이름</Label>
            <Input id="name" />
          </div>
          <div>
            <Label htmlFor="nickname">닉네임</Label>
            <Input id="nickname" placeholder="한글2자, 영문4자 이상" />
          </div>
          <div>
            <Label htmlFor="email">E-mail</Label>
            <Input id="email" type="email" />
          </div>
          <div>
            <Label htmlFor="phone">휴대전화번호</Label>
            <Input id="phone" type="tel" />
          </div>
        </div>
      </Card>

      <Card className="p-4 space-y-4">
        <h3 className="font-semibold">기타 개인정보설정</h3>
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <Checkbox id="mailing" defaultChecked />
            <Label htmlFor="mailing">메일링서비스 정보를 메일로 받겠습니다.</Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox id="sms" defaultChecked />
            <Label htmlFor="sms">SMS 수신여부 휴대폰 문자메세지를 받겠습니다.</Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox id="infoOpen" />
            <Label htmlFor="infoOpen">정보공개 다른분들이 나의 정보를 볼 수 있도록 합니다.</Label>
          </div>
        </div>
        <div>
          <Label htmlFor="recommender">추천인아이디</Label>
          <Input id="recommender" />
        </div>
        <div>
          <Label htmlFor="captcha">자동등록방지</Label>
          <div className="flex items-center space-x-2">
            <Image
              src="/captcha.png"
              alt="Captcha"
              width={120}
              height={50}
              className="border"
            />
            <button type="button" className="p-1 border rounded">
              <Volume2 className="w-5 h-5" />
            </button>
            <button type="button" className="p-1 border rounded">
              <RefreshCcw className="w-5 h-5" />
            </button>
          </div>
          <Input id="captcha" className="mt-2" placeholder="자동등록방지 숫자를 순서대로 입력하세요." />
        </div>
      </Card>

      <div className="flex justify-center gap-4">
        <Button type="submit" className="bg-red-600 hover:bg-red-700 text-white">회원가입</Button>
        <Button variant="outline" type="button">취소</Button>
      </div>
    </form>
  );
}
