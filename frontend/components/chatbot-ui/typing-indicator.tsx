import { Dot } from "lucide-react";

export function TypingIndicator() {
  return (
    <div className="justify-left flex">
      <div className="rounded-lg bg-muted p-3">
        <div className="flex -space-x-1">
          <Dot className="h-5 w-5 animate-bounce" />
          <Dot className="h-5 w-5 animate-bounce delay-150" />
          <Dot className="h-5 w-5 animate-bounce delay-300" />
        </div>
      </div>
    </div>
  );
}
