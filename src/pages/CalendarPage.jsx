import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FullScreenCalendar } from "@/components/ui/fullscreen-calendar";
import { supabase } from "../lib/supabase";
import { Clock } from "lucide-react";
import { AnimatedPage } from "../components/AnimatedPage";
import { smoothTransition } from "../lib/animations";

export function CalendarPage() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from("tasks")
        .select("*")
        .order("due_date", { ascending: true });

      if (error) {
        console.error("Error fetching tasks:", error);
        return;
      }

      // Transform tasks into calendar events format
      const tasksByDate = {};

      data?.forEach((task) => {
        if (task.due_date) {
          const dateKey = task.due_date;
          if (!tasksByDate[dateKey]) {
            tasksByDate[dateKey] = [];
          }
          tasksByDate[dateKey].push({
            id: task.id,
            name: task.work_title,
            client: task.client_name,
            status: task.status,
            priority: task.priority,
            category: task.category,
            assignee: task.assignee,
            description: task.description,
          });
        }
      });

      // Convert to calendar data format
      const calendarData = Object.entries(tasksByDate).map(([date, tasks]) => ({
        day: new Date(date + "T00:00:00"),
        events: tasks,
      }));

      setTasks(calendarData);
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <AnimatedPage>
        <div className="flex items-center justify-center h-64">
          <motion.div
            className="flex items-center space-x-3 text-muted-foreground"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={smoothTransition}
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            >
              <Clock className="h-5 w-5" />
            </motion.div>
            <span className="text-sm font-medium">Loading tasks...</span>
          </motion.div>
        </div>
      </AnimatedPage>
    );
  }

  return (
    <AnimatedPage>
      <motion.div
        className="calendar-darker-borders flex flex-col bg-background pt-2 px-6 pb-6 w-full max-w-none min-h-[700px]"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={smoothTransition}
      >
        <FullScreenCalendar data={tasks} />
      </motion.div>
    </AnimatedPage>
  );
}
