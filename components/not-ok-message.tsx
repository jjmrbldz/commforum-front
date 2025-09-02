import { AlertCircleIcon } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "./ui/alert";


export default function NotOkMessage({
  message, 
  variant = "warn", 
  title = "Uh oh!"
 }: {
  message: string; 
  variant?: "warn" | "default" | "destructive" | "info" | null | undefined; 
  title?: string;
}) {
  return (
    <Alert variant={variant}>
      <AlertCircleIcon />
      {title && (
        <AlertTitle>{title}</AlertTitle>
      )}
      <AlertDescription>
        {message}
      </AlertDescription>
    </Alert>
  )
}