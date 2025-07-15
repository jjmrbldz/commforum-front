import LoginForm from "@/components/forms/login-form";
import Banner from "@/components/pages/home/banner";


export default function Home() {
  return (
    <div className="grid grid-cols-12 gap-4">
      <div className="col-span-9 py-4">
        <Banner />
      </div>
      <div className="col-span-3 py-4">
        <LoginForm />
      </div>
    </div>
  );
}
