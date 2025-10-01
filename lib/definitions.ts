import { Groups } from "@/db/schema/user-group";

export type SessionPayload = {
  id: number;
  username: string;
  level: string;
  expiresAt: Date;
  group?: Groups;
}