import BoardCatPage from "@/components/pages/board/category/category-page";


export default async function Page({
  params
} : {
  params: Promise<{segment: string[]}>
}) {
  const {segment} = await params;

  return <BoardCatPage title={segment[0]?.toLocaleUpperCase()} segment={segment} />
}