import LoginForm from "@/components/forms/login-form";
import Banner from "@/components/pages/home/banner";
import Widget from "@/components/widget/widget";
import { freeBoard, oReviewBoard } from "@/lib/constants";

export default function HomePage() {
  return (
    <div className="grid grid-cols-12 gap-4">
      <div className="col-span-9 py-4">
        <Banner />
        <div className="grid grid-cols-2 gap-4 mt-4">
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
      </div>
      <div className="col-span-3 py-4">
        <LoginForm />
      </div>
    </div>
  );
}
