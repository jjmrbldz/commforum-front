"use client"

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "../ui/input";
import { Form, FormControl, FormField, FormItem, FormMessage } from "../ui/form";
import { toast } from "sonner";
import { Button } from "../ui/button";
import { Dispatch, SetStateAction, useTransition } from "react";
import { cn } from "@/lib/utils";
import { pointExchangesSchema } from "@/db/validations/point-exchange";
import { AffiliateData, PointExchangeFormData, PointExchangePayload } from "@/types";
import { NumberFormatter } from "../number-formatter";
import {exchangePoint} from "@/app/point-exchange/actions";
import { useUserStore } from "@/store/use-user-store";

interface Props {
  affiliate: AffiliateData;
  setAffilliate: Dispatch<SetStateAction<AffiliateData | undefined>>;
}

const formatWithCommas = (value: string) => {
  if (!value) return value;
  const [integer, decimal] = value.replace(/[^\d.]/g, "").split(".");
  const formatted = integer.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  return decimal !== undefined ? `${formatted}.${decimal}` : formatted;
};

export default function PointExchangeForm({affiliate,setAffilliate}: Props) {
  const [isPending, startTransition] = useTransition();
  const user = useUserStore(s => s.user);
  const form = useForm<PointExchangeFormData>({
    resolver: zodResolver(pointExchangesSchema(affiliate || {nameKor: "", minimumAmount: 0, maximumAmount: 0, type: ""})),
    defaultValues: {
      amount: 0,
    },
    mode: "onChange",
  });

  function onSubmit(data: PointExchangeFormData) {
    console.log(data)
    if (data.amount > (user?.point || 0)) {
      toast.error("포인트가 부족합니다.", {
        position: "top-right",
      });
      return;
    }
    if (affiliate.type === "bank" && (!user?.bankName || !user.accountNumber)) {
      toast.error("먼저 마이페이지에서 은행 정보를 설정해주세요.", {
        position: "top-right",
      });
      return;
    }
    startTransition(async () => {
      const payload: PointExchangePayload = {
        amount: data.amount, 
        type: affiliate.type,
        note: affiliate.nameKor,
        note1: affiliate.type === "bank" ? 
          `${user?.bankName} | ${user?.name} | ${user?.accountNumber}` : 
          affiliate.type?.toUpperCase(),
        note2: "Pending"
      }

      const res = await exchangePoint(payload);
      
      if (!res.ok) {
        if (res.fieldErrors) {
          Object.entries(res.fieldErrors).forEach(([name, message]) => {
            form.setError(name as keyof PointExchangeFormData, { message: (message as string[])[0]  });
          });
        } else {
          toast.error(res.message, {
            position: "top-right",
          });
        }
        return;
      }
      toast.success(res.message, {
        position: "top-right",
      });
      setAffilliate(undefined);
    })
  }

  return affiliate && (
    <Form {...form}>
      <form 
        onSubmit={form.handleSubmit(onSubmit)} 
      >
        <div className={cn("flex flex-col gap-3")}>
          <div className="">
            <div className="">
              <div className="">{affiliate?.nameKor}</div>
              <div className="">
                <span className="text-muted-foreground">MIN: </span> 
                <NumberFormatter value={affiliate?.minimumAmount} suffix=" 원" /> 
                &nbsp; &nbsp;
                <span className="text-muted-foreground">MAX: </span> 
                <NumberFormatter value={affiliate?.maximumAmount} suffix=" 원" />
              </div>
            </div>
          </div>
          <FormField 
            control={form.control}
            name="amount"
            render={(({field}) => (
              <FormItem className="col-span-12">
                <FormControl>
                  <Input 
                    inputMode="numeric"
                    placeholder="Amount"
                    id="amount"
                    autoComplete="amount"
                    value={
                      field.value
                        ? formatWithCommas(String(field.value))
                        : ""
                    }
                    min={affiliate?.minimumAmount}
                    max={affiliate?.maximumAmount}
                    onChange={(e) => {
                      const formatted = formatWithCommas(e.target.value);
                      e.target.value = formatted;
                      // store numeric value (remove commas)
                      const numeric = Number(formatted.replaceAll(",", ""));
                      field.onChange(isNaN(numeric) ? 0 : numeric);
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            ))}
          />

          {affiliate.type === "bank" && (
            <div className="my-2 p-2 bg-slate-50 rounded">
              <div className="">
                <div className="mb-1"><span className="text-muted-foreground">Affiliate Type:</span> {affiliate?.type?.toUpperCase()}</div>
                  <div className="">
                    <div className="">
                      <span className="text-muted-foreground">Bank name:</span> 
                      <span>{user?.bankName}</span>
                    </div>
                    <div className="">
                      <span className="text-muted-foreground">Account name:</span> 
                      <span>{user?.name}</span>
                    </div>
                    <div className="">
                      <span className="text-muted-foreground">Account no.:</span> 
                      <span>{user?.accountNumber}</span>
                    </div>
                  </div>
              </div>
            </div>
          )}
          
          <Button size={'sm'} className="mt-2" type="submit" disabled={!form.formState.isValid} loading={isPending}>
            <span>Submit</span>
          </Button>
        </div>
      </form>
    </Form>
   
      
  )
}