export const koreanWeekdays = ['일', '월', '화', '수', '목', '금', '토'];

// MENU
export const menuList: {
  title: string;
  href: string;
  triggerClassName?: string;
  contentClassname?: string;
  linkClassName?: string;
  children?: {
    title: string;
    href: string;
  }[];
}[] = [
  {
    title: "HOME",
    href: "/",
  },
  {
    title: "타짜365",
    href: "/tazza",
  },
  // {
  //   title: "보증사이트",
  //   href: "/verified",
  // },
  // {
  //   title: "미니게임",
  //   href: "/minigame",
  // },
  // {
  //   title: "연예",
  //   href: "/entertainment",
  // },
  // {
  //   title: "스포츠",
  //   href: "/sports",
  // },
  // {
  //   title: "위너브라더",
  //   href: "/board/notice",
  //   triggerClassName: "hover:!bg-blue-500",
  //   contentClassname: "min-w-[170px] !border-t-3 border-blue-500",
  //   linkClassName: "hover:!bg-blue-500 hover:!text-white hover:!font-bold",
  //   children: [
  //     {
  //       title: "위너공지사항",
  //       href: "/board/notice?subcategory=winner",
  //     },
  //   ]
  // },
  // {
  //   title: "보증 사이트",
  //   href: "/board/warranty1",
  //   triggerClassName: "hover:!bg-red-500",
  //   contentClassname: "min-w-[170px] border-t-3 border-red-500",
  //   linkClassName: "hover:!bg-red-500 hover:!text-white hover:!font-bold",
  //   children: [
  //     {
  //       title: "보증 바카라 카지노",
  //       href: "/board/warranty1",
  //     },
  //     {
  //       title: "보증 슬롯 카지노",
  //       href: "/board/warranty2",
  //     },
  //   ]
  // },
  
  // {
  //   title: "위너바카라",
  //   href: "/baccarat",
  //   triggerClassName: "hover:!bg-teal-500",
  //   contentClassname: "min-w-[170px] border-t-3 border-teal-500",
  //   linkClassName: "hover:!bg-teal-500 hover:!text-white hover:!font-bold",
  //   children: [
  //     {
  //       title: "위너 바카라",
  //       href: "/baccarat",
  //     },
  //     {
  //       title: "꽁머니 바카라",
  //       href: "/baccarat-money",
  //     },
  //     {
  //       title: "명예의전당",
  //       href: "/board/winner",
  //     },
  //   ]
  // },
  // {
  //   title: "이벤트",
  //   href: "/event/winner",
  //   triggerClassName: "hover:!bg-slate-500",
  //   contentClassname: "min-w-[170px] border-t-3 border-slate-500",
  //   linkClassName: "hover:!bg-slate-500 hover:!text-white hover:!font-bold",
  //   children: [
  //     {
  //       title: "위너 이벤트",
  //       href: "/event/winner",
  //     },
  //     {
  //       title: "회원 이벤트",
  //       href: "/event/user",
  //     },
  //     {
  //       title: "보증 이벤트",
  //       href: "/event/warrant",
  //     },
  //   ]
  // },
  // {
  //   title: "포인트교환",
  //   href: "/point",
  //   triggerClassName: "hover:!bg-stone-500",
  //   contentClassname: "min-w-[170px] border-t-3 border-stone-500",
  //   linkClassName: "hover:!bg-stone-500 hover:!text-white hover:!font-bold",
  //   children: [
  //     {
  //       title: "위브 포인트 교환",
  //       href: "/event/winner",
  //     },
  //   ]
  // },
  // {
  //   title: "먹튀카지노",
  //   href: "/board/casino",
  //   triggerClassName: "hover:!bg-zinc-500",
  //   contentClassname: "min-w-[170px] border-t-3 border-zinc-500",
  //   linkClassName: "hover:!bg-zinc-500 hover:!text-white hover:!font-bold",
  //   children: [
  //     {
  //       title: "먹튀 카지노",
  //       href: "/board/casino",
  //     },
  //   ]
  // },
  // {
  //   title: "커뮤니티",
  //   href: "/board/free",
  //   // triggerClassName: "hover:!bg-indigo-500",
  //   // contentClassname: "min-w-[170px] border-t-3 border-indigo-500",
  //   // linkClassName: "hover:!bg-indigo-500 hover:!text-white hover:!font-bold",
  //   children: [
  //     {
  //       title: "자유게시판",
  //       href: "/board/free",
  //     },
  //     {
  //       title: "온카 후기 게시판",
  //       href: "/board/onca",
  //     },
  //     {
  //       title: "슬롯 후기 게시판",
  //       href: "/board/slot",
  //     },
  //     {
  //       title: "가입인사",
  //       href: "/board/signup",
  //     },
  //     {
  //       title: "출석체크",
  //       href: "/board/attendance",
  //     },
  //     {
  //       title: "카지노 노하우",
  //       href: "/board/gambling-tip",
  //     },
  //   ]
  // },
  // {
  //   title: "갤러리",
  //   href: "/board/gallery",
  //   children: [
  //     {
  //       title: "Gallery 1",
  //       href: "/board/gallery/1",
  //     },
  //   ]
  // },
  {
    title: "고객지원",
    href: "/support",
    children: [
      {
        title: "1:1 문의",
        href: "/inquiry",
      },
      {
        title: "TG 문의",
        href: "/telegram",
      },
    ]
  },
];

export const userMenuList: {
  title: string;
  href: string;
  isModal?: boolean;
}[] = [
  // { title: "내글반응", href: "/response", isModal: true },
  // { title: "쪽지함", href: "/memo", isModal: true },
  // { title: "팔로우", href: "/follow", isModal: true },
  // { title: "스크랩", href: "/scrap", isModal: true },
  { title: "마이페이지", href: "/profile", isModal: false },
  { title: "내글관리", href: "/profile/posts", isModal: true },
  // { title: "사진등록", href: "/myphoto", isModal: true },
  // { title: "정보수정", href: "/memberconfirm/register", isModal: false },
  // { title: "탈퇴하기", href: "/memberconfirm/leave", isModal: false },
];

export const memberMenuList: {
  title: string;
  href: string;
  isModal?: boolean;
}[] = [
  { title: "회원가입", href: "/register", isModal: false },
  { title: "아이디/비밀번호 찾기", href: "/forgot-password", isModal: false },
];

export const serviceMenuList: {
  title: string;
  href: string;
  isModal?: boolean;
  requiresAuth?: boolean;
}[] = [
  // { title: "자주하시는 질문(FAQ)", href: "/faq", isModal: false },
  { title: "1:1 문의", href: "/inquiry", isModal: false, requiresAuth: true },
  { title: "새글모음", href: "/profile/posts/write", isModal: false, },
  // { title: "현재접속자", href: "/online-users", isModal: false, requiresAuth: true },
];

// OPTIONS
export const searchTypeOptions = [
  { label: "제목", value: "title"},
  { label: "내용", value: "content"},
];

export const searchOperatorOptions = [
  { label: "또는", value: "or"},
  { label: "그리고", value: "and"},
];

export const categoryTypeOptions = [
  { label: "Slot", value: "1"},
  { label: "Casino", value: "2"},
  { label: "Minigames", value: "3"},
  { label: "Sports", value: "4"},
  { label: "Free Board", value: "5"},
  { label: "Review Board", value: "6"},
];

// SAMPLE DATA
export const articleWidget = [
  { "id": 1, "rank": 1, "title": "NORWAY 8K", "description": "크라우드 펀딩은 자금의 모집자와 제공자간 거래가 온라인상에서 소셜미디어에 의한 쌍방향 소통을 바탕으로 한 관계 지향적이고 …", "author": "겨울비", "date": "2022-03-22", "img": "/images/article-img1.jpg" },
  { "id": 2, "rank": 2, "title": "NORWAY 8K", "description": "크라우드 펀딩은 자금의 모집자와 제공자간 거래가 온라인상에서 소셜미디어에 의한 쌍방향 소통을 바탕으로 한 관계 지향적이고 …", "author": "겨울비", "date": "2022-03-22", "img": "/images/article-img1.jpg" },
];

export const freeBoard = [
  { "id": 1, "rank": 1, "title": "❤모아소프트❤ 구글", "date": "07.14", "img": "/images/4.png" },
  { "id": 2, "rank": 2, "title": "🔯🔯 커뮤니티 자동", "date": "07.14", "img": "/images/5.png" },
  { "id": 3, "rank": 3, "title": "●토토 홍보 프로그램", "date": "07.14", "img": "/images/12.png" },
  { "id": 4, "rank": 4, "title": "●토토 홍보 프로그램", "date": "07.14", "img": "/images/4.png" },
  { "id": 5, "rank": 5, "title": "왕관게임 미투벳 자본", "date": "07.13", "img": "/images/5.png" },
  { "id": 6, "rank": 6, "title": "[헤이벳]카지노게임 최", "date": "07.14", "img": "/images/14.png" },
  { "id": 7, "rank": 7, "title": "💓💓💓 구글 도배프로", "date": "07.14", "img": "/images/12.png" },
  { "id": 8, "rank": 8, "title": "💓💓💓 사이트 자동", "date": "07.14", "img": "/images/16.png" },
  { "id": 9, "rank": 9, "title": "●토토 홍보 프로그랩", "date": "07.14", "img": "/images/20.jpg" },
  { "id": 10, "rank": 10, "title": "◎커뮤니티 자동 광고프", "date": "07.13", "img": "/images/16.png" },
  { "id": 11, "rank": 11, "title": "●토토 홍보 프로그랩", "date": "07.14", "img": "/images/5.png" },
  { "id": 12, "rank": 12, "title": "2025년 최신 파워볼오", "date": "07.15", "img": "/images/12.png" },
  { "id": 13, "rank": 13, "title": "❤모아소프트❤ 구글", "date": "07.14", "img": "/images/20.jpg" },
  { "id": 14, "rank": 14, "title": "🔯🔯 커뮤니티 자동", "date": "07.14", "img": "/images/14.png" },
  { "id": 15, "rank": 15, "title": "●카지노사이트 홍보", "date": "07.15", "img": "/images/15.png" },
  { "id": 16, "rank": 16, "title": "❤모아소프트❤백링크", "date": "07.13", "img": "/images/16.png" },
  { "id": 17, "rank": 17, "title": "●토토 홍보 프로그램", "date": "07.14", "img": "/images/5.png" },
  { "id": 18, "rank": 18, "title": "❤모아소프트❤ 구글", "date": "07.14", "img": "/images/18.png" },
  { "id": 19, "rank": 19, "title": "🔯🔯 구글 도배 홍", "date": "07.13", "img": "/images/5.png" },
  { "id": 20, "rank": 20, "title": "2025년 최신 파워볼오", "date": "07.13", "img": "/images/20.jpg" }
];

export const oReviewBoard = [
  { "id": 1, "rank": 1, "title": "파라오카지노 후기", "date": "11.30", reviews: 4, "img": "/images/or1.jpg" },
  { "id": 2, "rank": 2, "title": "아벤카지노 후기", "date": "11.30", reviews: 4, "img": "/images/or2.jpg" },
  { "id": 3, "rank": 3, "title": "아벤카지노 후기", "date": "09.08", reviews: 4, "img": "/images/or2.jpg" },
];

export const noticeFreeBoard = [
  { "id": 1, "rank": undefined, category: "자유", "title": "✡️✡️✡️커뮤니티 자동 홍보프로그램 / 구글 찌라시 프로그램 / 백링크 프로그램 / 텔레그램 자동 홍보프로그램 / 카카오톡 파워볼 오토픽 / DB추출프로그램✡️✡️✡️ - #텔레그램DB초대", "img": "", "date": "01.23", },
  { "id": 2, "rank": undefined, category: "자유", "title": "", "img": "", "date": "01.23", },
  { "id": 3, "rank": undefined, category: "자유", "title": "❤️❤️❤️커뮤니티 자동글쓰기 프로그램 / 텔레그램 자동 홍보프로그램 / 카카오톡 파워볼 오토픽 / 구글 찌라시 홍보프로그램 / 구글 백링크 프로그램 / DB추출프로그램❤️❤️❤️", "img": "", "date": "01.22", },
  { "id": 4, "rank": undefined, category: "자유", "title": "✡️✡️✡️구글 도배 홍보프로그램 / 토토/카지노 홍보프로그램 / 텔레그램 자동 홍보프로그램 / 카카오톡 파워볼 오토픽 / DB추출프로그램✡️✡️✡️ - #먹튀검증사이트 자동홍보", "img": "", "date": "01.22", },
  { "id": 5, "rank": undefined, category: "자유", "title": "❤️❤️❤️커뮤니티 자동글쓰기 프로그램 / 텔레그램 자동 홍보프로그램 / 카카오톡 파워볼 오토픽 / 구글 찌라시 홍보프로그램 / 구글 백링크 프로그램 / DB추출프로그램❤️❤️❤️", "img": "", "date": "01.22", },
  { "id": 6, "rank": undefined, category: "자유", "title": "✡️✡️✡️커뮤니티 자동 홍보프로그램 / 구글 찌라시 프로그램 / 백링크 프로그램 / 텔레그램 자동 홍보프로그램 / 카카오톡 파워볼 오토픽 / DB추출프로그램✡️✡️✡️ - #텔레그램DB초대", "img": "", "date": "01.23", },
  { "id": 7, "rank": undefined, category: "자유", "title": "", "img": "", "date": "01.23", },
  { "id": 8, "rank": undefined, category: "자유", "title": "❤️❤️❤️커뮤니티 자동글쓰기 프로그램 / 텔레그램 자동 홍보프로그램 / 카카오톡 파워볼 오토픽 / 구글 찌라시 홍보프로그램 / 구글 백링크 프로그램 / DB추출프로그램❤️❤️❤️", "img": "", "date": "01.22", },
  { "id": 9, "rank": undefined, category: "자유", "title": "✡️✡️✡️구글 도배 홍보프로그램 / 토토/카지노 홍보프로그램 / 텔레그램 자동 홍보프로그램 / 카카오톡 파워볼 오토픽 / DB추출프로그램✡️✡️✡️ - #먹튀검증사이트 자동홍보", "img": "", "date": "01.22", },
  { "id": 10, "rank": undefined, category: "자유", "title": "❤️❤️❤️커뮤니티 자동글쓰기 프로그램 / 텔레그램 자동 홍보프로그램 / 카카오톡 파워볼 오토픽 / 구글 찌라시 홍보프로그램 / 구글 백링크 프로그램 / DB추출프로그램❤️❤️❤️", "img": "", "date": "01.22", },
];

export const baccBoard = [
  { "id": 1, "rank": undefined, category: "자유", "title": "파라오 보증금 5천만원", "img": "/images/baccBoard1.jpg", "date": "01.23", },
  { "id": 2, "rank": undefined, category: "자유", "title": "스테이션 보증금 5천만원", "img": "/images/baccBoard2.jpg", "date": "01.23", },
  { "id": 3, "rank": undefined, category: "자유", "title": "소울카지노 보증금 5천만원", "img": "/images/baccBoard3.jpg", "date": "01.22", },
  { "id": 4, "rank": undefined, category: "자유", "title": "아벤카지노 보증금 5천만원", "img": "/images/baccBoard4.jpg", "date": "01.22", },
];

export const slotsBoard = [
  { "id": 1, "rank": undefined, category: "자유", "title": "빅2카지노 보증금 5,000만원", "img": "/images/slotBoard1.jpg", "date": "01.23", },
];

export const oEventsBoard = [];

export const specialBoard = [
  { "id": 1, "rank": undefined, category: "자유", "title": "파라오 보증금 5천만원", "img": "/images/special1.png", "date": "01.23", },
  { "id": 2, "rank": undefined, category: "자유", "title": "스테이션 보증금 5천만원", "img": "/images/special2.png", "date": "01.23", },
  { "id": 3, "rank": undefined, category: "자유", "title": "소울카지노 보증금 5천만원", "img": "/images/special3.png", "date": "01.22", },
  { "id": 4, "rank": undefined, category: "자유", "title": "아벤카지노 보증금 5천만원", "img": "/images/special4.png", "date": "01.22", },
];

export const casinoBoard = [
  { "id": 1, "rank": undefined, category: "자유", "title": "파라오 보증금 5천만원", "img": "/images/casinoBoard1.jpg", "date": "01.23", },
  { "id": 2, "rank": undefined, category: "자유", "title": "스테이션 보증금 5천만원", "img": "/images/casinoBoard2.jpg", "date": "01.23", },
  { "id": 3, "rank": undefined, category: "자유", "title": "소울카지노 보증금 5천만원", "img": "/images/casinoBoard3.jpg", "date": "01.22", },
  { "id": 4, "rank": undefined, category: "자유", "title": "아벤카지노 보증금 5천만원", "img": "/images/casinoBoard4.jpg", "date": "01.22", },
];

export const topComments = [
  { "id": 1, "rank": 1, "title": "음바페 나간다는데 이강인이 눈에 들어오겠냐", "author": "제니", "img": "", "date": "06.14", },
  { "id": 2, "rank": 2, "title": "ㅋㅋㅋㅋ", "author": "푸키", "img": "", "date": "11.30", },
  { "id": 3, "rank": 3, "title": "2023-05-20 11:06:57", "author": "읏짜아", "img": "", "date": "04.14", },
  { "id": 4, "rank": 4, "title": "아!! 이런 지금 돈이 없는데..", "author": "킹놈은디프런", "img": "", "date": "04.14", },
  { "id": 5, "rank": 5, "title": "나이스~", "author": "조디", "img": "", "date": "11.30", },
  { "id": 6, "rank": 6, "title": "음바페 나간다는데 이강인이 눈에 들어오겠냐", "author": "제니", "img": "", "date": "06.14", },
  { "id": 7, "rank": 7, "title": "ㅋㅋㅋㅋ", "author": "푸키", "img": "", "date": "11.30", },
  { "id": 8, "rank": 8, "title": "2023-05-20 11:06:57", "author": "읏짜아", "img": "", "date": "04.14", },
  { "id": 9, "rank": 9, "title": "아!! 이런 지금 돈이 없는데..", "author": "킹놈은디프런", "img": "", "date": "04.14", },
  { "id": 10, "rank": 10, "title": "나이스~", "author": "조디", "img": "", "date": "11.30", },
];

export const pointsTab = {
  tabNames: [
    { label: "활동포인트", value: "tab1"},
    { label: "바카라 토너먼트 순위", value: "tab2"},
  ],
  data: {
    "tab1": [
      { "rank": 1, "name": "skqgzv", "points": 33701500 },
      { "rank": 2, "name": "vdfbbfdv", "points": 1175200 },
      { "rank": 3, "name": "zxvdsds", "points": 1130500 },
      { "rank": 4, "name": "김현진", "points": 666000 },
      { "rank": 5, "name": "cxvsdvds", "points": 494200 },
      { "rank": 6, "name": "케이타", "points": 480039 },
      { "rank": 7, "name": "나홀훈양", "points": 448000 },
      { "rank": 8, "name": "충욱진구", "points": 441600 },
      { "rank": 9, "name": "신손욱덕", "points": 378700 },
      { "rank": 10, "name": "킹스맨", "points": 370300 },
      { "rank": 11, "name": "톡격자", "points": 306664 },
      { "rank": 12, "name": "기뻐아레스", "points": 304423 },
      { "rank": 13, "name": "상큼한곰문자", "points": 304275 },
      { "rank": 14, "name": "식섭빈력", "points": 296700 },
      { "rank": 15, "name": "개오천양", "points": 294300 },
      { "rank": 16, "name": "훌륭한차도남", "points": 287784 },
      { "rank": 17, "name": "대챈파", "points": 277917 },
      { "rank": 18, "name": "cocacola", "points": 267948 },
      { "rank": 19, "name": "주사파파", "points": 265647 },
      { "rank": 20, "name": "엉뚱한오마", "points": 263022 }
    ],
    "tab2": [
      { "rank": 1, "name": "선킴", "points": 0 },
      { "rank": 2, "name": "맨날이겨", "points": 0 },
      { "rank": 3, "name": "서울9잡이", "points": 0 },
      { "rank": 4, "name": "양타탁족", "points": 0 },
      { "rank": 5, "name": "케이타", "points": 0 },
      { "rank": 6, "name": "주사파파", "points": 0 },
      { "rank": 7, "name": "가을빛", "points": 0 },
      { "rank": 8, "name": "목격자", "points": 0 },
      { "rank": 9, "name": "카코탁탁", "points": 0 },
      { "rank": 10, "name": "대칭파", "points": 0 },
      { "rank": 11, "name": "상큼한곰문자", "points": 0 },
      { "rank": 12, "name": "기뻐아레스", "points": 0 },
      { "rank": 13, "name": "훌륭한차도남", "points": 0 },
      { "rank": 14, "name": "어지러운아무짝", "points": 0 },
      { "rank": 15, "name": "진절한루카", "points": 0 },
      { "rank": 16, "name": "서운한기가", "points": 0 },
      { "rank": 17, "name": "의심스러운승카", "points": 0 },
      { "rank": 18, "name": "겸손한피파", "points": 0 },
      { "rank": 19, "name": "훌안한탱자", "points": 0 },
      { "rank": 20, "name": "마르마크", "points": 0 }
    ]
  }
}