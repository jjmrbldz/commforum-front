export const koreanWeekdays = ['일', '월', '화', '수', '목', '금', '토'];

// MENU
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

export const userMenuList: {
  title: string;
  href: string;
  isModal?: boolean;
}[] = [
  { title: "내글반응", href: "/response", isModal: true },
  { title: "쪽지함", href: "/memo", isModal: true },
  { title: "팔로우", href: "/follow", isModal: true },
  { title: "스크랩", href: "/scrap", isModal: true },
  { title: "마이페이지", href: "/mypage", isModal: false },
  { title: "내글관리", href: "/mypost", isModal: true },
  { title: "사진등록", href: "/myphoto", isModal: true },
  { title: "정보수정", href: "/memberconfirm/register", isModal: false },
  { title: "탈퇴하기", href: "/memberconfirm/leave", isModal: false },
]

export const memberMenuList: {
  title: string;
  href: string;
  isModal?: boolean;
}[] = [
  { title: "회원가입", href: "/register", isModal: false },
  { title: "아이디/비밀번호 찾기", href: "/forgot-password", isModal: false },
]

export const serviceMenuList: {
  title: string;
  href: string;
  isModal?: boolean;
  requiresAuth?: boolean;
}[] = [
  { title: "자주하시는 질문(FAQ)", href: "/faq", isModal: false },
  { title: "1:1 문의", href: "/inquiry", isModal: false, requiresAuth: true },
  { title: "새글모음", href: "/post/new", isModal: false, },
  { title: "현재접속자", href: "/online-users", isModal: false, requiresAuth: true },
]

// OPTIONS
export const searchTypeOptions = [
  { label: "게시물", value: "post"},
  { label: "태그", value: "tag"},
]
export const searchOperatorOptions = [
  { label: "또는", value: "or"},
  { label: "그리고", value: "and"},
]