

export default async function Page({
  params
} : {
  params: Promise<{category: string}>
}) {
  const {category} = await params;
  
  return (
    <>
      <div className="">{category}</div>
      
    </>
  )
}