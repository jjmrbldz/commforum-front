import EventCatPage from "@/components/pages/event/category/category-page";


export default async function Page({
  params
} : {
  params: Promise<{category: string}>
}) {
  const {category} = await params;
  
  return <EventCatPage title={category?.toUpperCase()} />
}