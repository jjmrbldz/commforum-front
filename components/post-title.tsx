import { CheckCircle, MessageCircle } from "lucide-react"

export default function PostTitle() {
  return (
    <div className="space-y-2 border-b pb-4">
      <h1 className="text-xl font-bold">
        뉴헤븐카지노 온라인카지노 먹튀검증 업체 5,000만원 제휴종료
      </h1>
      <div className="flex items-center flex-wrap gap-2 text-sm text-muted-foreground">
        <span>
          작성자: <span className="text-foreground">가공운영자</span>
        </span>
        <Separator />
        <span>2022-08-01</span>
        <Separator />
        <div className="flex items-center gap-1">
          <CheckCircle className="w-4 h-4 text-green-500" />
          <span>96399</span>
        </div>
        <Separator />
        <div className="flex items-center gap-1">
          <MessageCircle className="w-4 h-4 text-blue-500" />
          <span>0</span>
        </div>
      </div>
    </div>
  )
}

function Separator() {
  return <span className="text-gray-300 px-1">|</span>
}
