import Widget from "@/components/widget/widget";
import { baccBoard, casinoBoard, freeBoard, noticeFreeBoard, oEventsBoard, oReviewBoard, slotsBoard, specialBoard } from "@/lib/constants";

export default function BoardPage() {
  return (
    <>
      <div className="grid grid-cols-2 gap-4 my-4">
        <Widget {...{
          title: "온카,슬롯 후기",
          data: oReviewBoard,
          path: '/board', 
          rootClassname: '',
          isReviews: true,
        }} />
        <Widget {...{
          title: "자유게시판",
          data: freeBoard,
          path: '/board', 
          rootClassname: ''
        }} />
      </div>
      <Widget {...{
        title: "보증 바카라 카지노",
        data: baccBoard,
        path: '/board', 
        rootClassname: 'my-4',
        layout: 'basic-gallery',
      }} />
      <Widget {...{
        title: "보증 슬롯 카지노",
        data: slotsBoard,
        path: '/board', 
        rootClassname: 'my-4',
        layout: 'basic-gallery',
      }} />
      <Widget {...{
        title: "진행중 이벤트",
        data: oEventsBoard,
        path: '/board', 
        rootClassname: 'my-4',
        layout: 'basic-gallery',
      }} />
      <Widget {...{
        title: "스페셜",
        data: specialBoard,
        path: '/board', 
        rootClassname: 'my-4',
        layout: 'gallery',
        carouselSize: 3,
        hasItemPrefix: false,
        chunkData: false,
        hasContentTitle: false,
        loop: true
      }} />
      <div className="grid grid-cols-3 gap-4">  
        <Widget {...{
          title: "베스트글",
          data: noticeFreeBoard,
          path: '/board', 
          rootClassname: '',
          hasItemPrefix: false,
          carouselSize: 1,
          addCategory: true,
        }} />
        <Widget {...{
          title: "공지사항",
          data: noticeFreeBoard.slice(2, 4),
          path: '/board', 
          rootClassname: '',
          hasItemPrefix: false,
          carouselSize: 1,
          addCategory: true,
          showRank: false,
        }} />
        <Widget {...{
          title: "명예의 전당",
          data: noticeFreeBoard.slice(0, 1),
          path: '/board', 
          rootClassname: '',
          hasItemPrefix: false,
          carouselSize: 1,
          addCategory: true,
          showRank: false,
        }} />
      </div>
      <Widget {...{
        title: "먹튀 카지노",
        data: casinoBoard,
        path: '/board', 
        rootClassname: 'my-4',
        layout: 'gallery',
        carouselSize: 3,
        hasItemPrefix: false,
        chunkData: false,
        hasContentTitle: false,
        loop: true
      }} />
    </>
  );
}
