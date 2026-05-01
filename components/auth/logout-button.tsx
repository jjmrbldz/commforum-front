"use client"

import { useActionState } from "react";
import { Button } from "../ui/button"
import { logoutAction } from "@/app/actions";

export default function LogoutButton() {
  const [ , dispatch, isPending] = useActionState(logoutAction, undefined);

  return (
    <form action={dispatch}>
      <Button type="submit" size={"sm"} variant="secondary" className="text-xs flex-1 w-full" loading={isPending} >
        로그아웃
      </Button>
    </form>
  )
}
