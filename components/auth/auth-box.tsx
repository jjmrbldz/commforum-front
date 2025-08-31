import { Suspense } from "react";
import ProfileBox from "./profile-box";
import ProfileSkeleton from "../skeletons/profile-skeleton";

export default async function AuthBox() {
  return (
    <Suspense fallback={<ProfileSkeleton />}>
      <ProfileBox />
    </Suspense>
  );
}