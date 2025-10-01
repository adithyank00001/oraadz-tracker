import * as React from "react";
import {
  add,
  eachDayOfInterval,
  endOfMonth,
  endOfWeek,
  format,
  getDay,
  isEqual,
  isSameDay,
  isSameMonth,
  isToday,
  parse,
  startOfToday,
  startOfWeek,
} from "date-fns";
import {
  ChevronLeft as ChevronLeftIcon,
  ChevronRight as ChevronRightIcon,
  PlusCircle as PlusCircleIcon,
  Search as SearchIcon,
} from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useMediaQuery } from "@/hooks/use-media-query";
import { useTheme } from "@/contexts/ThemeContext";

const colStartClasses = [
  "col-start-7", // Sunday is now the 7th column
  "col-start-1", // Monday is now the 1st column
  "col-start-2",
  "col-start-3",
  "col-start-4",
  "col-start-5",
  "col-start-6",
];

export function FullScreenCalendar({ data }) {
  const today = startOfToday();
  const [selectedDay, setSelectedDay] = React.useState(today);
  const [currentMonth, setCurrentMonth] = React.useState(
    format(today, "MMM-yyyy")
  );
  const [popoverOpen, setPopoverOpen] = React.useState(false);
  const [popoverDate, setPopoverDate] = React.useState(null);
  const [popoverEvents, setPopoverEvents] = React.useState([]);
  const firstDayCurrentMonth = parse(currentMonth, "MMM-yyyy", new Date());
  const isDesktop = useMediaQuery("(min-width: 768px)");
  const { isDark } = useTheme();

  const days = eachDayOfInterval({
    start: startOfWeek(firstDayCurrentMonth, { weekStartsOn: 1 }),
    end: endOfWeek(endOfMonth(firstDayCurrentMonth), { weekStartsOn: 1 }),
  });

  // Handle opening the popover with events for a specific date
  function handleShowMoreEvents(day, events) {
    setPopoverDate(day);
    setPopoverEvents(events);
    setPopoverOpen(true);
  }

  // Handle keyboard events for popover dismissal
  React.useEffect(() => {
    function handleKeyDown(event) {
      if (event.key === "Escape" && popoverOpen) {
        setPopoverOpen(false);
      }
    }

    if (popoverOpen) {
      document.addEventListener("keydown", handleKeyDown);
      return () => document.removeEventListener("keydown", handleKeyDown);
    }
  }, [popoverOpen]);

  function previousMonth() {
    const firstDayNextMonth = add(firstDayCurrentMonth, { months: -1 });
    setCurrentMonth(format(firstDayNextMonth, "MMM-yyyy"));
  }

  function nextMonth() {
    const firstDayNextMonth = add(firstDayCurrentMonth, { months: 1 });
    setCurrentMonth(format(firstDayNextMonth, "MMM-yyyy"));
  }

  function goToToday() {
    setCurrentMonth(format(today, "MMM-yyyy"));
  }

  return (
    <div className="flex flex-1 flex-col w-full h-full bg-background min-w-0">
      <div className="flex flex-col space-y-4 p-4 md:flex-row md:items-center md:justify-between md:space-y-0 lg:flex-none bg-background min-w-0">
        <div className="flex flex-auto">
          <div className="flex items-center gap-4">
            <div className="hidden w-20 flex-col items-center justify-center rounded-lg border border-input bg-background p-0.5 md:flex shadow-sm hover:bg-accent hover:text-accent-foreground">
              <h1 className="p-1 text-xs uppercase text-foreground">
                {format(today, "MMM")}
              </h1>
              <div className="flex w-full items-center justify-center rounded-lg p-0.5 text-lg font-bold text-foreground">
                <span>{format(today, "d")}</span>
              </div>
            </div>
            <div className="flex flex-col">
              <h2 className="text-lg font-semibold text-foreground">
                {format(firstDayCurrentMonth, "MMMM, yyyy")}
              </h2>
              <p className="text-sm text-muted-foreground">
                {format(firstDayCurrentMonth, "MMM d, yyyy")} -{" "}
                {format(endOfMonth(firstDayCurrentMonth), "MMM d, yyyy")}
              </p>
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center gap-4 md:flex-row md:gap-6">
          <Button variant="outline" size="icon" className="hidden lg:flex">
            <SearchIcon size={16} strokeWidth={2} aria-hidden="true" />
          </Button>

          <Separator orientation="vertical" className="hidden h-6 lg:block" />

          <div className="inline-flex max-w-full -space-x-px rounded-lg shadow-sm shadow-black/5 md:w-auto rtl:space-x-reverse">
            <Button
              onClick={previousMonth}
              className="rounded-none shadow-none first:rounded-s-lg last:rounded-e-lg focus-visible:z-10 h-10 w-10 md:h-9 md:w-9 flex-shrink-0"
              variant="outline"
              size="icon"
              aria-label="Navigate to previous month"
            >
              <ChevronLeftIcon
                size={16}
                strokeWidth={2}
                aria-hidden="true"
                className="md:w-4 md:h-4"
              />
            </Button>
            <Button
              onClick={goToToday}
              className="min-w-0 flex-1 rounded-none shadow-none first:rounded-s-lg last:rounded-e-lg focus-visible:z-10 md:w-auto h-10 md:h-9 px-3 md:px-3 text-sm font-medium"
              variant="outline"
            >
              {format(firstDayCurrentMonth, "MMM")}
            </Button>
            <Button
              onClick={nextMonth}
              className="rounded-none shadow-none first:rounded-s-lg last:rounded-e-lg focus-visible:z-10 h-10 w-10 md:h-9 md:w-9 flex-shrink-0"
              variant="outline"
              size="icon"
              aria-label="Navigate to next month"
            >
              <ChevronRightIcon
                size={16}
                strokeWidth={2}
                aria-hidden="true"
                className="md:w-4 md:h-4"
              />
            </Button>
          </div>
        </div>
      </div>

      <div className="lg:flex lg:flex-auto lg:flex-col bg-background flex-1 w-full">
        <div
          className={`grid grid-cols-7 border ${
            isDark ? "border-border" : "border-black"
          } text-center text-xs font-semibold leading-6 lg:flex-none bg-background text-foreground w-full rounded-t-lg`}
        >
          <div
            className={`border-r ${
              isDark ? "border-border" : "border-black"
            } py-2.5 text-foreground rounded-tl-lg`}
          >
            Mon
          </div>
          <div
            className={`border-r ${
              isDark ? "border-border" : "border-black"
            } py-2.5 text-foreground`}
          >
            Tue
          </div>
          <div
            className={`border-r ${
              isDark ? "border-border" : "border-black"
            } py-2.5 text-foreground`}
          >
            Wed
          </div>
          <div
            className={`border-r ${
              isDark ? "border-border" : "border-black"
            } py-2.5 text-foreground`}
          >
            Thu
          </div>
          <div
            className={`border-r ${
              isDark ? "border-border" : "border-black"
            } py-2.5 text-foreground`}
          >
            Fri
          </div>
          <div
            className={`border-r ${
              isDark ? "border-border" : "border-black"
            } py-2.5 text-foreground`}
          >
            Sat
          </div>
          <div className="py-2.5 text-foreground rounded-tr-lg">Sun</div>
        </div>

        <div className="flex text-xs leading-6 lg:flex-auto bg-background w-full">
          <div
            className={`hidden w-full border-x ${
              isDark ? "border-border" : "border-black"
            } lg:grid lg:grid-cols-7 lg:grid-rows-5 bg-background min-h-[500px] rounded-b-lg`}
          >
            {days.map((day, dayIdx) =>
              !isDesktop ? (
                <button
                  onClick={() => setSelectedDay(day)}
                  key={dayIdx}
                  type="button"
                  className={cn(
                    !isToday(day) &&
                      isSameMonth(day, firstDayCurrentMonth) &&
                      "text-foreground",
                    !isToday(day) &&
                      !isSameMonth(day, firstDayCurrentMonth) &&
                      "text-muted-foreground",
                    isToday(day) && "font-semibold",
                    `flex h-14 flex-col border-b border-r ${
                      isDark ? "border-border" : "border-black"
                    } px-3 py-2 hover:bg-muted focus:z-10`
                  )}
                >
                  <time
                    dateTime={format(day, "yyyy-MM-dd")}
                    className={cn(
                      "ml-auto flex size-6 items-center justify-center rounded-full",
                      isToday(day) &&
                        isDark &&
                        "bg-white text-black font-semibold",
                      isToday(day) &&
                        !isDark &&
                        "bg-black text-white font-semibold"
                    )}
                  >
                    {format(day, "d")}
                  </time>
                  {data.filter((date) => isSameDay(date.day, day)).length >
                    0 && (
                    <div>
                      {data
                        .filter((date) => isSameDay(date.day, day))
                        .map((date) => (
                          <div
                            key={date.day.toString()}
                            className="-mx-0.5 mt-auto flex flex-wrap-reverse"
                          >
                            {date.events.map((event) => (
                              <span
                                key={event.id}
                                className="mx-0.5 mt-1 h-1.5 w-1.5 rounded-full bg-muted-foreground"
                              />
                            ))}
                          </div>
                        ))}
                    </div>
                  )}
                </button>
              ) : (
                <div
                  key={dayIdx}
                  onClick={() => setSelectedDay(day)}
                  className={cn(
                    dayIdx === 0 && colStartClasses[getDay(day)],
                    !isToday(day) &&
                      !isSameMonth(day, firstDayCurrentMonth) &&
                      "text-muted-foreground",
                    `relative flex flex-col border-b border-r ${
                      isDark ? "border-border" : "border-black"
                    } hover:bg-muted focus:z-10`,
                    "hover:bg-accent/75",
                    isToday(day) && "bg-foreground/10 dark:bg-background",
                    // Sunday styling - add diagonal lines pattern
                    getDay(day) === 0 && !isToday(day) && "sunday-pattern",
                    // Bottom left corner
                    dayIdx >= days.length - 7 &&
                      dayIdx === days.length - 7 &&
                      "rounded-bl-lg",
                    // Bottom right corner
                    dayIdx === days.length - 1 && "rounded-br-lg"
                  )}
                  style={
                    getDay(day) === 0 && !isToday(day)
                      ? {
                          position: "relative",
                        }
                      : {}
                  }
                >
                  {/* Sunday diagonal lines overlay */}
                  {getDay(day) === 0 && !isToday(day) && (
                    <div
                      className="absolute inset-0 pointer-events-none"
                      style={{
                        backgroundImage: `repeating-linear-gradient(
                            45deg,
                            transparent,
                            transparent 3px,
                            ${
                              isDark
                                ? "rgba(255, 255, 255, 0.1)"
                                : "rgba(0, 0, 0, 0.1)"
                            } 3px,
                            ${
                              isDark
                                ? "rgba(255, 255, 255, 0.1)"
                                : "rgba(0, 0, 0, 0.1)"
                            } 4px
                          )`,
                        zIndex: 1,
                      }}
                    />
                  )}
                  <header className="flex items-center justify-between p-2.5 relative z-10">
                    <button
                      type="button"
                      className={cn(
                        !isToday(day) && "text-foreground",
                        isToday(day) &&
                          isDark &&
                          "bg-white text-black font-semibold",
                        isToday(day) &&
                          !isDark &&
                          "bg-black text-white font-semibold",
                        "flex h-7 w-7 items-center justify-center rounded-full text-xs hover:border"
                      )}
                    >
                      <time dateTime={format(day, "yyyy-MM-dd")}>
                        {format(day, "d")}
                      </time>
                    </button>
                  </header>
                  <div className="flex-1 p-2.5 relative z-10">
                    {data
                      .filter((event) => isSameDay(event.day, day))
                      .map((dayData) => (
                        <div
                          key={dayData.day.toString()}
                          className="space-y-1.5"
                        >
                          {dayData.events.slice(0, 1).map((event) => {
                            const getStatusColor = (status) => {
                              switch (status) {
                                case "New":
                                  return "bg-red-100 border-red-300 dark:bg-red-900/20 dark:border-red-800";
                                case "In Progress":
                                  return "bg-yellow-50 border-yellow-400 dark:bg-yellow-900/30 dark:border-yellow-600";
                                case "Completed":
                                  return "bg-green-100 border-green-300 dark:bg-green-900/20 dark:border-green-800";
                                default:
                                  return `bg-muted/50 ${
                                    isDark ? "border-border" : "border-black"
                                  }`;
                              }
                            };

                            return (
                              <div
                                key={event.id}
                                className={`flex flex-col items-start gap-1 rounded-lg border p-2 text-xs leading-tight ${getStatusColor(
                                  event.status
                                )}`}
                              >
                                <p
                                  className={`font-medium leading-none truncate w-full ${
                                    isDark ? "text-white" : "text-black"
                                  }`}
                                >
                                  {event.name}
                                </p>
                                <p
                                  className={`leading-none truncate w-full ${
                                    isDark ? "text-gray-300" : "text-gray-600"
                                  }`}
                                >
                                  {event.client}
                                </p>
                              </div>
                            );
                          })}
                          {dayData.events.length > 1 && (
                            <Popover
                              open={popoverOpen && isSameDay(popoverDate, day)}
                              onOpenChange={(open) => {
                                if (!open) setPopoverOpen(false);
                              }}
                            >
                              <PopoverTrigger asChild>
                                <button
                                  className="text-xs text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleShowMoreEvents(day, dayData.events);
                                  }}
                                >
                                  + {dayData.events.length - 1} more
                                </button>
                              </PopoverTrigger>
                              <PopoverContent
                                className={`w-80 p-0 bg-popover ${
                                  isDark ? "border-border" : "border-black"
                                }`}
                                align="start"
                                side="bottom"
                                sideOffset={4}
                              >
                                <div className="p-4">
                                  <div className="flex items-center justify-between mb-3">
                                    <h3 className="font-semibold text-sm text-foreground">
                                      Events for {format(day, "MMM d, yyyy")}
                                    </h3>
                                    <span className="text-xs text-muted-foreground">
                                      {dayData.events.length} events
                                    </span>
                                  </div>
                                  <div className="space-y-2 max-h-64 overflow-y-auto">
                                    {dayData.events.map((event) => {
                                      const getStatusColor = (status) => {
                                        switch (status) {
                                          case "New":
                                            return "bg-red-100 border-red-300 dark:bg-red-900/20 dark:border-red-800";
                                          case "In Progress":
                                            return "bg-yellow-50 border-yellow-400 dark:bg-yellow-900/30 dark:border-yellow-600";
                                          case "Completed":
                                            return "bg-green-100 border-green-300 dark:bg-green-900/20 dark:border-green-800";
                                          default:
                                            return `bg-muted/50 ${
                                              isDark
                                                ? "border-border"
                                                : "border-black"
                                            }`;
                                        }
                                      };

                                      return (
                                        <div
                                          key={event.id}
                                          className={`flex flex-col gap-2 rounded-lg border p-3 text-sm ${getStatusColor(
                                            event.status
                                          )}`}
                                        >
                                          <div className="flex items-start justify-between">
                                            <p
                                              className={`font-medium leading-tight ${
                                                isDark
                                                  ? "text-white"
                                                  : "text-black"
                                              }`}
                                            >
                                              {event.name}
                                            </p>
                                            <span
                                              className={`text-xs ml-2 shrink-0 ${
                                                isDark
                                                  ? "text-gray-300"
                                                  : "text-gray-600"
                                              }`}
                                            >
                                              {event.status}
                                            </span>
                                          </div>
                                          <p
                                            className={`text-sm leading-tight ${
                                              isDark
                                                ? "text-gray-300"
                                                : "text-gray-600"
                                            }`}
                                          >
                                            {event.client}
                                          </p>
                                          {event.description && (
                                            <p
                                              className={`text-xs leading-tight ${
                                                isDark
                                                  ? "text-gray-300"
                                                  : "text-gray-600"
                                              }`}
                                            >
                                              {event.description}
                                            </p>
                                          )}
                                          {(event.priority ||
                                            event.category ||
                                            event.assignee) && (
                                            <div className="flex flex-wrap gap-1 mt-1">
                                              {event.priority && (
                                                <span
                                                  className={`text-xs px-1.5 py-0.5 rounded bg-background/50 ${
                                                    isDark
                                                      ? "text-gray-300"
                                                      : "text-gray-600"
                                                  }`}
                                                >
                                                  {event.priority}
                                                </span>
                                              )}
                                              {event.category && (
                                                <span
                                                  className={`text-xs px-1.5 py-0.5 rounded bg-background/50 ${
                                                    isDark
                                                      ? "text-gray-300"
                                                      : "text-gray-600"
                                                  }`}
                                                >
                                                  {event.category}
                                                </span>
                                              )}
                                              {event.assignee && (
                                                <span
                                                  className={`text-xs px-1.5 py-0.5 rounded bg-background/50 ${
                                                    isDark
                                                      ? "text-gray-300"
                                                      : "text-gray-600"
                                                  }`}
                                                >
                                                  {event.assignee}
                                                </span>
                                              )}
                                            </div>
                                          )}
                                        </div>
                                      );
                                    })}
                                  </div>
                                </div>
                              </PopoverContent>
                            </Popover>
                          )}
                        </div>
                      ))}
                  </div>
                </div>
              )
            )}
          </div>

          <div
            className={`isolate grid w-full grid-cols-7 grid-rows-5 border-x ${
              isDark ? "border-border" : "border-black"
            } lg:hidden bg-background rounded-b-lg`}
          >
            {days.map((day, dayIdx) => (
              <button
                onClick={() => setSelectedDay(day)}
                key={dayIdx}
                type="button"
                className={cn(
                  !isToday(day) && "text-foreground",
                  isToday(day) && "font-semibold",
                  `relative flex h-14 flex-col border-b border-r ${
                    isDark ? "border-border" : "border-black"
                  } px-3 py-2 hover:bg-muted focus:z-10`,
                  isToday(day) && "bg-foreground/10 dark:bg-background",
                  // Bottom left corner
                  dayIdx >= days.length - 7 &&
                    dayIdx === days.length - 7 &&
                    "rounded-bl-lg",
                  // Bottom right corner
                  dayIdx === days.length - 1 && "rounded-br-lg"
                )}
                style={
                  getDay(day) === 0 && !isToday(day)
                    ? {
                        position: "relative",
                      }
                    : {}
                }
              >
                {/* Sunday diagonal lines overlay for mobile */}
                {getDay(day) === 0 && !isToday(day) && (
                  <div
                    className="absolute inset-0 pointer-events-none"
                    style={{
                      backgroundImage: `repeating-linear-gradient(
                          45deg,
                          transparent,
                          transparent 3px,
                          ${
                            isDark
                              ? "rgba(255, 255, 255, 0.1)"
                              : "rgba(0, 0, 0, 0.1)"
                          } 3px,
                          ${
                            isDark
                              ? "rgba(255, 255, 255, 0.1)"
                              : "rgba(0, 0, 0, 0.1)"
                          } 4px
                        )`,
                      zIndex: 1,
                    }}
                  />
                )}
                <time
                  dateTime={format(day, "yyyy-MM-dd")}
                  className={cn(
                    "ml-auto flex size-6 items-center justify-center rounded-full relative z-10",
                    !isToday(day) && "text-foreground",
                    isToday(day) &&
                      isDark &&
                      "bg-white text-black font-semibold",
                    isToday(day) &&
                      !isDark &&
                      "bg-black text-white font-semibold"
                  )}
                >
                  {format(day, "d")}
                </time>
                {data.filter((date) => isSameDay(date.day, day)).length > 0 && (
                  <div className="relative z-10">
                    {data
                      .filter((date) => isSameDay(date.day, day))
                      .map((date) => (
                        <div
                          key={date.day.toString()}
                          className="-mx-0.5 mt-auto flex flex-wrap-reverse"
                        >
                          {date.events.map((event) => {
                            const getStatusDotColor = (status) => {
                              switch (status) {
                                case "New":
                                  return "bg-red-500";
                                case "In Progress":
                                  return "bg-yellow-400";
                                case "Completed":
                                  return "bg-green-500";
                                default:
                                  return "bg-muted-foreground";
                              }
                            };

                            return (
                              <span
                                key={event.id}
                                className={`mx-0.5 mt-1 h-1.5 w-1.5 rounded-full ${getStatusDotColor(
                                  event.status
                                )}`}
                              />
                            );
                          })}
                        </div>
                      ))}
                  </div>
                )}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
