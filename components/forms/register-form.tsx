"use client"

import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { AlertCircleIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import { RegisterData, registerSchema } from "@/db/validations/register";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { toast } from "sonner";
import { useState, useTransition } from "react";
import registerAction from "@/app/register/actions";
import { Alert, AlertTitle } from "../ui/alert";
import { useRouter } from "next/navigation";
// import { useSheetStore } from "@/store/use-sheet-store";

export default function RegisterForm() {
  const [isPending, startTransition] = useTransition();
  const [serverError, setServerError] = useState<string | null>(null);
  const router = useRouter();
  // const setSheet = useSheetStore(state => state.setSheet);
  const form = useForm<RegisterData>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      username: "",
      password: "",
      passwordConfirm: "",
      name: "",
      nickname: "",
      email: null,
      phone: null,
      referralUsername: null,
      emailOptin: true,
    },
    mode: "onChange",
  });

  async function onSubmit(data: RegisterData) {
    if (isPending) return;
    setServerError(null);
    startTransition(async () => {
      const res = await registerAction(data);
      
      if (!res.ok) {
        if (res.fieldErrors) {
          Object.entries(res.fieldErrors).forEach(([name, message]) => {
            form.setError(name as keyof RegisterData, { message: message as string });
          });
        }
        if (res.message) setServerError(res.message);
        return;
      }
      toast.success(res.message, {
        position: "top-right"
      });
      router.push('/login');
      // setSheet("user");
    })
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        {serverError && (
           <Alert className="mb-4" variant="destructive">
            <AlertCircleIcon />
            <AlertTitle>{serverError}</AlertTitle>
          </Alert>
        )}
        <Card className="p-4 space-y-4">
          <h3 className="font-semibold">사이트 이용정보 입력</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField 
              control={form.control}
              name="username"
              render={(({field}) => (
                <FormItem className="">
                  <FormLabel htmlFor="username">아이디</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="영문자, 숫자, _ 만 입력 가능. 최소 3자 이상 입력하세요."
                      id="username"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              ))}
            />
            <FormField 
              control={form.control}
              name="password"
              render={(({field}) => (
                <FormItem className="">
                  <FormLabel htmlFor="password">비밀번호</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="영문/숫자/특수문자 조합 8자 이상"
                      id="password"
                      type="password"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              ))}
            />
            <FormField 
              control={form.control}
              name="passwordConfirm"
              render={(({field}) => (
                <FormItem className="">
                  <FormLabel htmlFor="passwordConfirm">비밀번호 확인</FormLabel>
                  <FormControl>
                    <Input 
                      id="passwordConfirm"
                      autoComplete="passwordConfirm"
                      type="password"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              ))}
            />
          </div>
        </Card>

        <Card className="p-4 space-y-4">
          <h3 className="font-semibold">개인정보 입력</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField 
              control={form.control}
              name="name"
              render={(({field}) => (
                <FormItem className="">
                  <FormLabel htmlFor="name">이름</FormLabel>
                  <FormControl>
                    <Input
                      id="name"
                      autoComplete="name"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              ))}
            />
            <FormField 
              control={form.control}
              name="nickname"
              render={(({field}) => (
                <FormItem className="">
                  <FormLabel htmlFor="nickname">닉네임</FormLabel>
                  <FormControl>
                    <Input
                      id="nickname"
                      placeholder="한글2자, 영문4자 이상"
                      autoComplete="nickname"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              ))}
            />
            <FormField 
              control={form.control}
              name="email"
              render={(({field}) => (
                <FormItem className="">
                  <FormLabel htmlFor="email">E-mail</FormLabel>
                  <FormControl>
                    <Input
                      id="email"
                      placeholder=""
                      autoComplete="email"
                      type="email"
                      {...field}
                      value={field.value || ""}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              ))}
            />
            <FormField 
              control={form.control}
              name="phone"
              render={(({field}) => (
                <FormItem className="">
                  <FormLabel htmlFor="phone">휴대전화번호</FormLabel>
                  <FormControl>
                    <Input
                      id="phone"
                      placeholder=""
                      autoComplete="phone"
                      type="tel"
                      pattern="[0-9]*"
                      inputMode="numeric"
                      maxLength={11}
                      {...field}
                      value={field.value || ""}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              ))}
            />
          </div>
        </Card>

        <Card className="p-4 space-y-4">
          <h3 className="font-semibold">기타 개인정보설정</h3>
          <div className="space-y-2">
            <FormField 
              control={form.control}
              name="emailOptin"
              render={(({field}) => (
                <FormItem className="flex items-center space-x-2">
                  <FormControl>
                    <Checkbox
                      itemID="emailOptin"
                      id="emailOptin"
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <FormLabel htmlFor="emailOptin" className="text-sm font-normal">
                    메일링서비스 정보를 메일로 받겠습니다.
                  </FormLabel>
                </FormItem>
              ))}
            />
            {/* <div className="flex items-center space-x-2">
              <Checkbox id="infoOpen" />
              <Label htmlFor="infoOpen">정보공개 다른분들이 나의 정보를 볼 수 있도록 합니다.</Label>
            </div> */}
          </div>
          <FormField 
            control={form.control}
            name="referralUsername"
            render={(({field}) => (
              <FormItem className="">
                <FormLabel htmlFor="referralUsername">추천인아이디</FormLabel>
                <FormControl>
                  <Input
                    id="referralUsername"
                    placeholder=""
                    autoComplete="username"
                    type="text"
                    {...field}
                    value={field.value || ""}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            ))}
          />
          {/* <div>
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
          </div> */}
        </Card>

        <div className="flex justify-center gap-4">
          <Button type="submit" className="bg-green-700 hover:bg-red-700 text-white" loading={isPending}>회원가입</Button>
          <Button variant="outline" type="button">취소</Button>
        </div>
      </form>
    </Form>
  );
}
