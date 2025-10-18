
export default function NewBadge({show}:{show?:boolean}) {
  return show && (<span className="bg-blue-500 text-[10px] inline-flex justify-center items-center size-4 rounded-full text-center text-white font-bold">N</span>)
}