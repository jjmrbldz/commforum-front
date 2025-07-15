
import AuthButtons from "./auth-buttons";
import UserButtons from "./user-buttons";

export default function AuthUserButtons() {
  const isAuthenticated = false;

  return isAuthenticated ? (
    <UserButtons />
  ) : (
    <AuthButtons />
  )
}