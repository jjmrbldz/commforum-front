

"use client";

import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Info } from "lucide-react";
import { useState } from "react";
import Terms from "../pages/register/terms";
import { useRouter } from "next/navigation";

export default function RegisterAgreementForm() {
  const [termsChecked, setTermsChecked] = useState(false);
  const [privacyChecked, setPrivacyChecked] = useState(false);
  const router = useRouter();

  return (
    <>

      <Alert variant={'info'}>
        <Info className="h-4 w-4" />
        <AlertDescription>
          회원가입약관 및 개인정보처리방침안내의 내용에 동의하셔야 회원가입 하실 수 있습니다.
        </AlertDescription>
      </Alert>

      {/* Terms of Service */}
      <Card className="p-4 space-y-3 border">
        <h2 className="font-semibold">📑 회원가입약관</h2>
        <ScrollArea className="h-40 border rounded-md p-3 text-sm text-gray-700 bg-gray-50">
          <Terms />
        </ScrollArea>

        <div className="flex items-center space-x-2">
          <Checkbox
            id="terms"
            checked={termsChecked}
            onCheckedChange={(val) => setTermsChecked(!!val)}
          />
          <Label htmlFor="terms">회원가입약관의 내용에 동의합니다.</Label>
        </div>
      </Card>

      {/* Privacy Policy */}
      <Card className="p-4 space-y-3 border">
        <h2 className="font-semibold">🔒 개인정보처리방침안내</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left border border-gray-300">
            <thead className="bg-gray-100 text-gray-700">
              <tr>
                <th className="border px-2 py-1">목적</th>
                <th className="border px-2 py-1">항목</th>
                <th className="border px-2 py-1">보유기간</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border px-2 py-1">이용자 식별 및 본인여부 확인</td>
                <td className="border px-2 py-1">아이디, 이름, 비밀번호</td>
                <td className="border px-2 py-1">회원 탈퇴 시까지</td>
              </tr>
              <tr>
                <td className="border px-2 py-1">고객서비스 이용에 관한 통지</td>
                <td className="border px-2 py-1">연락처 (이메일, 휴대전화번호)</td>
                <td className="border px-2 py-1">회원 탈퇴 시까지</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="flex items-center space-x-2">
          <Checkbox
            id="privacy"
            checked={privacyChecked}
            onCheckedChange={(val) => setPrivacyChecked(!!val)}
          />
          <Label htmlFor="privacy">개인정보처리방침안내 내용에 동의합니다.</Label>
        </div>
      </Card>

      {/* Submit */}
      <div className="flex justify-center mt-6">
        <Button
          className=""
          disabled={!termsChecked || !privacyChecked}
          onClick={() => {
            if (termsChecked && privacyChecked) {
              router.push('/register/form')
            }
          }}
        >
          회원가입
        </Button>
      </div>
    </>
  );
}
