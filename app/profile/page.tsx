import NotOkMessage from "@/components/not-ok-message";
import Profile from "@/components/pages/profile/profile";
import { getLevelSettings } from "@/db/query/level";
import { requireUserSession } from "@/lib/session";


export default async function Page() {
  const user = await requireUserSession();
  if (!user) return <NotOkMessage variant={"warn"} message="Page not available" />
  const level = await getLevelSettings(Number(user.level) || 1);
  return (
    <>
      <Profile nextLevelExp={level[0].totalExp || 0} user={user} />
    </>
  )
}