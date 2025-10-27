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
import { AffiliateData, PointExchangeFormData } from "@/types";
import { NumberFormatter } from "../number-formatter";
import {exchangePoint} from "@/app/point-exchange/actions";

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
  const form = useForm<PointExchangeFormData>({
    resolver: zodResolver(pointExchangesSchema(affiliate || {companyName: "", minExchangeAmount: 0, maxExchangeAmount: 0})),
    defaultValues: {
      amount: 0,
    },
    mode: "onChange",
  });

  function onSubmit(data: PointExchangeFormData) {
    console.log(data)

    startTransition(async () => {
      const res = await exchangePoint({amount: data.amount, affiliateId: affiliate.id});
      
      if (!res.ok) {
        if (res.fieldErrors) {
          Object.entries(res.fieldErrors).forEach(([name, message]) => {
            form.setError(name as keyof PointExchangeFormData, { message: (message as string[])[0]  });
          });
        } else {
          toast.error(res.message, {
            position: "bottom-right",
          });
        }
        return;
      }
      toast.success(res.message, {
        position: "bottom-right",
      });
      setAffilliate(undefined);
    })
  }

  return (
    <Form {...form}>
      <form 
        onSubmit={form.handleSubmit(onSubmit)} 
      >
        <div className={cn("flex flex-col gap-3")}>
          <div className="">
            <div className="">
              <div className="">{affiliate?.companyName}</div>
              <div className=""><span className="text-muted-foreground">MIN:</span> <NumberFormatter value={affiliate?.minExchangeAmount} suffix=" 원" /> <span className="text-muted-foreground">MAX:</span> <NumberFormatter value={affiliate?.maxExchangeAmount} suffix=" 원" /></div>
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
                    min={affiliate?.minExchangeAmount}
                    max={affiliate?.maxExchangeAmount}
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
          
          <Button size={'sm'} className="mt-2" type="submit" disabled={!form.formState.isValid} loading={isPending}>
            <span>Submit</span>
          </Button>
        </div>
      </form>
    </Form>
   
      
  )
}