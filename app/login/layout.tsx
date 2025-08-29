import { ReactNode } from "react";

export default function Layout({children}: {children: ReactNode}) {
  return (
    <div className="max-w-xl m-auto py-20">
      {children}
    </div>
  )
}