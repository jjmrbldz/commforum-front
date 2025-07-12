import { koreanWeekdays } from "@/lib/constants";
import dayjs from "dayjs";

export default function DateToday() {
  const today = dayjs();
  const monthDay = today.format('MM월 DD일');
  const weekday = koreanWeekdays[today.day()]; // 0 (Sun) to 6 (Sat)

  return <span>{`${monthDay}(${weekday})`}</span>;
}