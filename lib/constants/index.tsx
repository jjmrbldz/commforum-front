export const koreanWeekdays = ['일', '월', '화', '수', '목', '금', '토'];

export const menuList: {
  title: string;
  href: string;
  triggerClassName: string;
  contentClassname: string;
  linkClassName: string;
  children?: {
    title: string;
    href: string;
  }[];
}[] = [
  {
    title: "위너브라더",
    href: "/board/notice",
    triggerClassName: "hover:!bg-blue-500",
    contentClassname: "min-w-[170px] !border-t-3 border-blue-500",
    linkClassName: "hover:!bg-blue-500 hover:!text-white hover:!font-bold",
    children: [
      {
        title: "위너공지사항",
        href: "/board/notice?subcategory=winner",
      },
    ]
  },
  {
    title: "보증 사이트",
    href: "/board/warranty1",
    triggerClassName: "hover:!bg-red-500",
    contentClassname: "min-w-[170px] border-t-3 border-red-500",
    linkClassName: "hover:!bg-red-500 hover:!text-white hover:!font-bold",
    children: [
      {
        title: "보증 바카라 카지노",
        href: "/board/warranty1",
      },
      {
        title: "보증 슬롯 카지노",
        href: "/board/warranty2",
      },
    ]
  },
  {
    title: "커뮤니티",
    href: "/board/free",
    triggerClassName: "hover:!bg-indigo-500",
    contentClassname: "min-w-[170px] border-t-3 border-indigo-500",
    linkClassName: "hover:!bg-indigo-500 hover:!text-white hover:!font-bold",
    children: [
      {
        title: "자유게시판",
        href: "/board/free",
      },
      {
        title: "온카 후기 게시판",
        href: "/board/onca",
      },
      {
        title: "슬롯 후기 게시판",
        href: "/board/slot",
      },
      {
        title: "가입인사",
        href: "/board/signup",
      },
      {
        title: "출석체크",
        href: "/board/attendance",
      },
      {
        title: "카지노 노하우",
        href: "/board/gambling-tip",
      },
    ]
  },
  {
    title: "위너바카라",
    href: "/baccarat",
    triggerClassName: "hover:!bg-teal-500",
    contentClassname: "min-w-[170px] border-t-3 border-teal-500",
    linkClassName: "hover:!bg-teal-500 hover:!text-white hover:!font-bold",
    children: [
      {
        title: "위너 바카라",
        href: "/baccarat",
      },
      {
        title: "꽁머니 바카라",
        href: "/baccarat-money",
      },
      {
        title: "명예의전당",
        href: "/board/winner",
      },
    ]
  },
  {
    title: "이벤트",
    href: "/event/winner",
    triggerClassName: "hover:!bg-slate-500",
    contentClassname: "min-w-[170px] border-t-3 border-slate-500",
    linkClassName: "hover:!bg-slate-500 hover:!text-white hover:!font-bold",
    children: [
      {
        title: "위너 이벤트",
        href: "/event/winner",
      },
      {
        title: "회원 이벤트",
        href: "/event/user",
      },
      {
        title: "보증 이벤트",
        href: "/event/warrant",
      },
    ]
  },
  {
    title: "포인트교환",
    href: "/point",
    triggerClassName: "hover:!bg-stone-500",
    contentClassname: "min-w-[170px] border-t-3 border-stone-500",
    linkClassName: "hover:!bg-stone-500 hover:!text-white hover:!font-bold",
    children: [
      {
        title: "위브 포인트 교환",
        href: "/event/winner",
      },
    ]
  },
  {
    title: "먹튀카지노",
    href: "/board/casino",
    triggerClassName: "hover:!bg-zinc-500",
    contentClassname: "min-w-[170px] border-t-3 border-zinc-500",
    linkClassName: "hover:!bg-zinc-500 hover:!text-white hover:!font-bold",
    children: [
      {
        title: "먹튀 카지노",
        href: "/board/casino",
      },
    ]
  },
]