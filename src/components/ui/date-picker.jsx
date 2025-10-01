import * as React from "react";
import { format } from "date-fns";
import { Calendar } from "./calendar.jsx";
import { Button } from "./button.jsx";
import { Popover, PopoverTrigger, PopoverContent } from "./popover.jsx";
import { Calendar as CalendarIcon } from "lucide-react";

function toIsoDateString(date) {
  if (!date) return "";
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function fromIsoDateString(value) {
  if (!value) return undefined;
  const d = new Date(value);
  return Number.isNaN(d.getTime()) ? undefined : d;
}

export function DatePicker({ value, onChange, placeholder = "Pick a date" }) {
  const selectedDate = fromIsoDateString(value);

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className="w-full justify-start text-left font-normal"
          type="button"
        >
          <CalendarIcon className="mr-2 size-4" />
          {selectedDate ? (
            format(selectedDate, "dd-MM-yyyy")
          ) : (
            <span className="text-muted-foreground">{placeholder}</span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent
        className="w-auto p-0"
        align="start"
        data-slot="popover-content"
      >
        <Calendar
          mode="single"
          selected={selectedDate}
          onSelect={(d) => onChange?.(toIsoDateString(d))}
          captionLayout="dropdown"
          initialFocus
        />
      </PopoverContent>
    </Popover>
  );
}
