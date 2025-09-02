import { AlertCircleIcon } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "./ui/alert";


export default function NotOkMessage({message}:{message: string}) {
  return (
    <Alert variant="warn">
      <AlertCircleIcon />
      <AlertTitle>Uh oh!</AlertTitle>
      <AlertDescription>
        {message}
      </AlertDescription>
    </Alert>
  )
}