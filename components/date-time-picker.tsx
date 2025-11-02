// components/date-time-picker.tsx
"use client";

import * as React from "react";
import dayjs from "dayjs";
import { Calendar as CalendarIcon, Clock } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type DateTimePickerProps = {
  value?: Date;
  onChange?: (date?: Date) => void;
  placeholder?: string;
  minuteStep?: 1 | 5 | 10 | 15 | 20 | 30;
  disabled?: boolean;
  className?: string;
  /** When provided, disables all dates before this. */
  minDate?: Date;
  /** When provided, disables all dates after this. */
  maxDate?: Date;
  /** 12-hour clock with AM/PM. */
  use12Hour?: boolean;
};

export default function DateTimePicker({
  value,
  onChange,
  placeholder = "날짜와 시간을 선택하세요",
  minuteStep = 5,
  disabled,
  className,
  minDate,
  maxDate,
  use12Hour = false,
}: DateTimePickerProps) {
  const [open, setOpen] = React.useState(false);
  const date = value;

  // Track Select open states to prevent Popover from closing while any Select is open
  const [sOpen, setSOpen] = React.useState({ hour: false, minute: false, ampm: false });
  const isSelectOpen = sOpen.hour || sOpen.minute || sOpen.ampm;

  // Derived values for time selects
  const hours = React.useMemo(() => {
    return Array.from({ length: use12Hour ? 12 : 24 }, (_, i) => (use12Hour ? (i === 0 ? 12 : i) : i));
  }, [use12Hour]);

  const minutes = React.useMemo(() => {
    return Array.from({ length: Math.floor(60 / minuteStep) }, (_, i) => i * minuteStep);
  }, [minuteStep]);

  const currentHour = React.useMemo(() => {
    if (!date) return use12Hour ? 12 : 0;
    const h = date.getHours();
    return use12Hour ? ((h % 12) || 12) : h;
  }, [date, use12Hour]);

  const currentMinute = React.useMemo(() => (date ? date.getMinutes() - (date.getMinutes() % minuteStep) : 0), [date, minuteStep]);

  const ampm: "AM" | "PM" = React.useMemo(() => {
    if (!use12Hour) return "AM";
    if (!date) return "AM";
    return date.getHours() >= 12 ? "PM" : "AM";
  }, [date, use12Hour]);

  // --- Time bounds for the selected day (min/max at the time level) ---
  const minD = minDate ? dayjs(minDate) : null;
  const maxD = maxDate ? dayjs(maxDate) : null;
  const sameMinDay = React.useMemo(() => !!(date && minD && dayjs(date).isSame(minD, "day")), [date, minD]);
  const sameMaxDay = React.useMemo(() => !!(date && maxD && dayjs(date).isSame(maxD, "day")), [date, maxD]);

  const minHour = sameMinDay && minD ? minD.hour() : null;
  const minMinute = sameMinDay && minD ? minD.minute() : null;
  const maxHour = sameMaxDay && maxD ? maxD.hour() : null;
  const maxMinute = sameMaxDay && maxD ? maxD.minute() : null;

  const displayTo24 = React.useCallback((h: number, meridiem: "AM" | "PM") => {
    if (!use12Hour) return h;
    return meridiem === "PM" ? (h === 12 ? 12 : h + 12) : (h === 12 ? 0 : h);
  }, [use12Hour]);

  const baseHour24 = React.useMemo(() => displayTo24(currentHour, ampm), [currentHour, ampm, displayTo24]);

  const isHourDisabled = React.useCallback((displayHour: number) => {
    const h24 = displayTo24(displayHour, ampm);
    if (minHour !== null && h24 < minHour) return true;
    if (maxHour !== null && h24 > maxHour) return true;
    return false;
  }, [ampm, displayTo24, minHour, maxHour]);

  const isMinuteDisabled = React.useCallback((m: number) => {
    if (minHour !== null && baseHour24 === minHour && minMinute !== null && m < minMinute) return true;
    if (maxHour !== null && baseHour24 === maxHour && maxMinute !== null && m > maxMinute) return true;
    return false;
  }, [baseHour24, minHour, minMinute, maxHour, maxMinute]);

  function updateDate(partial: { day?: Date; hour?: number; minute?: number; ampm?: "AM" | "PM" }) {
    if (!date && !partial.day) return; // require a base day first
    const base = new Date(partial.day ? partial.day : (date as Date));

    let h = typeof partial.hour === "number" ? partial.hour : currentHour;
    let m = typeof partial.minute === "number" ? partial.minute : currentMinute;

    // normalize to your chosen step
    m = m - (m % minuteStep);

    let finalHour = h;
    if (use12Hour) {
      const isPM = (partial.ampm ?? ampm) === "PM";
      // convert 12h -> 24h
      if (isPM) {
        finalHour = h === 12 ? 12 : h + 12;
      } else {
        finalHour = h === 12 ? 0 : h;
      }
    }

    let next = dayjs(base).hour(finalHour).minute(m).second(0).millisecond(0).toDate();

    // clamp to min/max if provided
    if (minDate && next < minDate) next = new Date(minDate);
    if (maxDate && next > maxDate) next = new Date(maxDate);

    onChange?.(next);
  }

  const disabledDay = (d: Date) => {
    const dStart = dayjs(d).startOf("day");
    if (minDate && dStart.isBefore(dayjs(minDate).startOf("day"))) return true;
    if (maxDate && dStart.isAfter(dayjs(maxDate).startOf("day"))) return true;
    return false;
  };

  return (
    <Popover
      open={open}
      onOpenChange={(next) => {
        // Don't allow the popover to close while a Select dropdown is open
        if (!next && isSelectOpen) return;
        setOpen(next);
      }}
      modal={false}
    >
      <PopoverTrigger asChild>
        <Button
          type="button"
          variant={"outline"}
          className={cn(
            "w-full justify-start text-left font-normal border-input shadow-none",
            !date && "text-muted-foreground",
            className
          )}
          disabled={disabled}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {date ? (
            <span>{dayjs(date).format(use12Hour ? "MMM D, YYYY h:mm A" : "MMM D, YYYY HH:mm")}</span>
          ) : (
            <span>{placeholder}</span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent
        className="w-auto p-3"
        align="start"
        onCloseAutoFocus={(e) => e.preventDefault()}
        onPointerDownOutside={(e) => {
          const target = e.target as HTMLElement;
          if (target.closest('[data-radix-select-content]') || target.closest('[data-radix-select-portal]')) {
            e.preventDefault();
          }
        }}
        onFocusOutside={(e) => {
          const target = e.target as HTMLElement;
          if (target.closest('[data-radix-select-content]') || target.closest('[data-radix-select-portal]')) {
            e.preventDefault();
          }
        }}
        onInteractOutside={(e) => {
          const target = e.target as HTMLElement;
          if (target.closest('[data-radix-select-content]') || target.closest('[data-radix-select-portal]')) {
            e.preventDefault();
          }
        }}
      >
        <div className="flex flex-col gap-3 sm:flex-row sm:items-start">
          <Calendar
            mode="single"
            selected={date}
            onSelect={(d) => updateDate({ day: d ?? undefined })}
            disabled={disabledDay}
            initialFocus
          />

          <div className="flex flex-col gap-2 min-w-[220px]">
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4" />
              <span className="text-sm text-muted-foreground">시간</span>
            </div>
            <div className="grid grid-cols-3 gap-2">
              <Select
                open={sOpen.hour}
                onOpenChange={(o) => setSOpen((s) => ({ ...s, hour: o }))}
                value={String(currentHour)}
                onValueChange={(v) => updateDate({ hour: parseInt(v, 10) })}
              >
                <SelectTrigger aria-label="Hour">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="max-h-60">
                  {hours.map((h) => (
                  <SelectItem key={h} value={String(h)} disabled={isHourDisabled(h)}>
                    {use12Hour ? h.toString().padStart(2, "0") : h.toString().padStart(2, "0")}
                  </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select
                open={sOpen.minute}
                onOpenChange={(o) => setSOpen((s) => ({ ...s, minute: o }))}
                value={String(currentMinute)}
                onValueChange={(v) => updateDate({ minute: parseInt(v, 10) })}
              >
                <SelectTrigger aria-label="Minute">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="max-h-60">
                  {minutes.map((m) => (
                  <SelectItem key={m} value={String(m)} disabled={isMinuteDisabled(m)}>
                    {m.toString().padStart(2, "0")}
                  </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              {use12Hour ? (
                <Select
                  open={sOpen.ampm}
                  onOpenChange={(o) => setSOpen((s) => ({ ...s, ampm: o }))}
                  value={ampm}
                  onValueChange={(v: "AM" | "PM") => updateDate({ ampm: v })}
                >
                  <SelectTrigger aria-label="AM/PM">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="AM">AM</SelectItem>
                    <SelectItem value="PM">PM</SelectItem>
                  </SelectContent>
                </Select>
              ) : (
                <div className="flex items-center justify-center rounded-md border text-xs text-muted-foreground">24h</div>
              )}
            </div>

            <div className="flex justify-end gap-2 pt-1">
              <Button variant="ghost" size="sm" onClick={() => onChange?.(undefined)}>
                Clear
              </Button>
              <Button size="sm" onClick={() => setOpen(false)}>
                Done
              </Button>
            </div>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}

// --- Example usage with React Hook Form + Zod ---
// app/(demo)/datetime-form/page.tsx
// "use client";
// import dayjs from "dayjs";
// import { z } from "zod";
// import { useForm } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { DateTimePicker } from "@/components/date-time-picker";
// import { Button } from "@/components/ui/button";
// import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";

// const schema = z.object({
//   when: z.date({ required_error: "Please select date & time" }),
// });

// type FormValues = z.infer<typeof schema>;

// export default function DateTimeFormPage() {
//   const form = useForm<FormValues>({
//     resolver: zodResolver(schema),
//     defaultValues: { when: undefined as unknown as Date },
//     mode: "onChange",
//   });

//   function onSubmit(values: FormValues) {
//     // Save in ISO (Asia/Manila awareness handled on server as needed)
//     alert(`Submitting: ${values.when.toISOString()}`);
//   }

//   return (
//     <div className="mx-auto max-w-md space-y-6 p-6">
//       <h1 className="text-2xl font-semibold">Date & Time Picker</h1>
//       <Form {...form}>
//         <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
//           <FormField
//             control={form.control}
//             name="when"
//             render={({ field }) => (
//               <FormItem>
//                 <FormLabel>When</FormLabel>
//                 <FormControl>
//                   <DateTimePicker
//                     value={field.value}
//                     onChange={(d) => field.onChange(d)}
//                     minuteStep={5}
//                     use12Hour={false}
//                   />
//                 </FormControl>
//                 <FormMessage />
//               </FormItem>
//             )}
//           />

//           <div className="flex items-center gap-4">
//             <Button type="submit" disabled={!form.formState.isValid}>Submit</Button>
//             <pre className="text-xs text-muted-foreground">
//               {form.watch("when") ? `${dayjs(form.watch("when")).format("MMM D, YYYY HH:mm")}` : "(no value)"}
//             </pre>
//           </div>
//         </form>
//       </Form>
//     </div>
//   );
// }

// Notes:
// 1) Ensure shadcn/ui is installed and Calendar is set up (uses react-day-picker under the hood).
// 2) Add the component at: /components/date-time-picker.tsx and update import paths to match your project structure.
// 3) If you need min/max, pass minDate / maxDate. To switch to 12-hour mode, set use12Hour.
// 4) Uses dayjs for formatting/manipulation. Convert to ISO on submit for backend (e.g., Asia/Manila handling server-side).
