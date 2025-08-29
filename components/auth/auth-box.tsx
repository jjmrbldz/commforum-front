import ProfileBox from "./profile-box";
import { getUserSession } from "@/lib/session";

export default async function AuthBox() {
  const user = await getUserSession();
  return <ProfileBox user={user} />;
}