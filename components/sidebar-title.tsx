export default function SidebarTitle({title}: {title: string}) {
  return (
    <div className="uppercase font-bold text-xs">
      <div className="">{title}</div>
      <div className="border-b border-slate-700 dark:border-red-500 max-w-[36px] pb-2.5"></div>
    </div>
  )
}