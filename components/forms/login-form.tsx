import { Lock, User } from "lucide-react";
import { useForm } from "react-hook-form";
import { LoginFormSchema } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginFormSchema } from "@/lib/schema/form";
import { Input } from "../ui/input";
import { Form, FormControl, FormField, FormItem, FormMessage } from "../ui/form";
import { Checkbox } from "../ui/checkbox";
import { Label } from "../ui/label";
import { toast } from "sonner";
import { Button } from "../ui/button";


export default function LoginForm() {
  const form = useForm<LoginFormSchema>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      username: "",
      password: "",
      isKeepSigednIn: false,
    },
  });

  function onSubmit(data: LoginFormSchema) {
    toast("You submitted the following values", {
      description: (
        <pre className="mt-2 w-[320px] rounded-md bg-neutral-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
      position: "bottom-right"
    })
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="flex flex-col gap-2">
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
            name="isKeepSigednIn"
            render={(({field}) => (
              <FormItem  id="isKeepSigednIn" className="col-span-12">
                <FormControl id="isKeepSigednIn">
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
                    <Label htmlFor="remember-me" className="text-xs font-light">자동로그인 및 로그인 상태 유지</Label>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            ))}
          />
          <Button size={'sm'} className="mt-2" type="submit" loading={form.formState.isLoading}>Login</Button>
        </div>
      </form>
    </Form>
   
      
  )
}