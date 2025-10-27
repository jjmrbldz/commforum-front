"use client"

import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { AlertCircleIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { toast } from "sonner";
import { useState, useTransition } from "react";
import { Alert, AlertTitle } from "../ui/alert";
import { useRouter } from "next/navigation";
import { UserSession } from "@/types";
import { updateInfoSchema, UserInfoData } from "@/db/validations/update-info";
import { updateInfoAction } from "@/app/profile/actions";

export default function ProfileForm({user}:{user:UserSession}) {
  const [isPending, startTransition] = useTransition();
  const [serverError, setServerError] = useState<string | null>(null);
  const router = useRouter();
  // const setSheet = useSheetStore(state => state.setSheet);
  const form = useForm<UserInfoData>({
    resolver: zodResolver(updateInfoSchema),
    defaultValues: {
      username: user?.username,
      password: undefined,
      passwordConfirm: undefined,
      name: user?.name,
      nickname: user?.nickname,
      email: user?.email,
      phone: user?.phone,
    },
    mode: "onChange",
  });

  async function onSubmit(data: UserInfoData) {
    // return;
    if (isPending) return;
    setServerError(null);
    startTransition(async () => {
      const res = await updateInfoAction(data);
      
      if (!res.ok) {
        if (res.fieldErrors) {
          Object.entries(res.fieldErrors).forEach(([name, message]) => {
            form.setError(name as keyof UserInfoData, { message: message as string });
          });
        }
        if (res.message) setServerError(res.message);
        return;
      }
      toast.success(res.message, {
        position: "top-right"
      });
      form.setValue("password", undefined);
      form.setValue("passwordConfirm", undefined);
      router.refresh();
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
          {/* <h3 className="font-semibold">사이트 이용정보 입력</h3> */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField 
              control={form.control}
              name="username"
              disabled
              render={(({field}) => (
                <FormItem className="">
                  <FormLabel htmlFor="username">아이디</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="영문자, 숫자, _ 만 입력 가능. 최소 3자 이상 입력하세요."
                      id="username"
                      {...field}
                      disabled
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
                      value={field.value || ""}
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
          {/* <h3 className="font-semibold">개인정보 입력</h3> */}
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

        <div className="flex justify-center gap-4">
          <Button type="submit" className="bg-green-700 hover:bg-red-700 text-white" loading={isPending}>Save</Button>
          <Button variant="outline" type="button" onClick={() => form.reset()}>Cancel</Button>
        </div>
      </form>
    </Form>
  );
}
