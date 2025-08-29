
import { useUserStore } from "@/store/use-user-store";
import AuthButtons from "./auth-buttons";
import UserButtons from "./user-buttons";

export default function AuthUserButtons() {
  const user = useUserStore(state => state.user);

  return user ? (
    <UserButtons />
  ) : (
    <AuthButtons />
  )
}