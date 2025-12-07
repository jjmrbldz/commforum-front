import { Groups } from "@/db/schema/user-group";

export type SessionPayload = {
  id: number;
  username: string;
  level: number;
  expiresAt: Date;
  group?: Groups;
  minBet?: number;
  maxBet?: number;
  minBetTournament?: number;
  maxBetTournament?: number;
}