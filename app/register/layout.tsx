import { ReactNode } from "react";

export default function Layout({children}: {children: ReactNode}) {
  return (
   <div className="max-w-3xl mx-auto space-y-6 p-4">
      <h1 className="text-2xl font-bold flex items-center gap-2">
        🔐 Register
      </h1>
      {children}
    </div>
  )
}