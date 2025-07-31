import BaccCatPage from "@/components/pages/baccarat/category/category-page";

export default async function Page({
  params
} : {
  params: Promise<{category: string}>
}) {
  const {category} = await params;
  
  return <BaccCatPage title={category?.toUpperCase()} />
}