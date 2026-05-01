import { ReactNode } from "react";

export default function Layout({children}: {children: ReactNode}) {
  return (
    <div className="max-w-7xl m-auto">
      {children}
    </div>
  )
}