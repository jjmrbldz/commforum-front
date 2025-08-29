"use client"

import { Lock, LogIn, User } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "../ui/input";
import { Form, FormControl, FormField, FormItem, FormMessage } from "../ui/form";
import { Checkbox } from "../ui/checkbox";
import { Label } from "../ui/label";
import { toast } from "sonner";
import { Button } from "../ui/button";
import Link from "next/link";
import { LoginData, loginSchema } from "@/db/validations/login";
import { useTransition } from "react";
import loginAction from "@/app/actions";

export default function LoginForm() {
  const [isPending, startTransition] = useTransition();
  const form = useForm<LoginData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username: "",
      password: "",
      isKeepSignedIn: false,
    },
  });

  function onSubmit(data: LoginData) {
    startTransition(async () => {
      const res = await loginAction(data);
      console.log('', res)
      if (!res.ok) {
        if (res.fieldErrors) {
          Object.entries(res.fieldErrors).forEach(([name, message]) => {
            form.setError(name as keyof LoginData, { message: message[0] });
          });
        } else {
          toast.error(res.message, {
            position: "bottom-right",
          });
        }
        return;
      }
      toast.success(res.message, {
        position: "bottom-right",
      });
    })
  }

  return (
    <Form {...form}>
      <form 
        onSubmit={form.handleSubmit(onSubmit)} 
        className="space-y-8"
      >
        <div className="flex flex-col gap-3">
          <FormField 
            control={form.control}
            name="username"
            render={(({field}) => (
              <FormItem className="col-span-12">
                <FormControl>
                  <Input 
                    icon={<User size={'100%'} />}
                    placeholder="아이디"
                    id="username"
                    autoComplete="username"
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
              <FormItem className="col-span-12">
                <FormControl>
                  <Input 
                    icon={<Lock size={'100%'} />}
                    placeholder="비밀번호"
                    type="password"
                    id="password"
                    autoComplete="current-password"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            ))}
          />
          <FormField 
            control={form.control}
            name="isKeepSignedIn"
            render={(({field}) => (
              <FormItem  id="isKeepSignedIn" className="col-span-12">
                <FormControl id="isKeepSignedIn">
                  <div className="flex items-center gap-2">
                    <Checkbox 
                      id="remember-me"
                      checked={field.value}
                      onCheckedChange={(checked) => {
                        return checked
                          ? field.onChange(field.value = true)
                          : field.onChange(field.value = false)
                      }}
                    />
                    <Label htmlFor="remember-me" className="text-xs font-light">자동로그인</Label>
                    <Link href={'/register'} className="text-xs font-light ml-auto">회원가입</Link>
                    <span className="text-xs font-light">|</span>
                    <Link href={'/forgot-password'} className="text-xs font-light">정보찾기</Link>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            ))}
          />
          <Button size={'sm'} className="mt-2" type="submit" loading={isPending}>
            <LogIn />
            <span>Login</span>
          </Button>
        </div>
      </form>
    </Form>
   
      
  )
}