import { motion } from "framer-motion";
import { Card, CardContent } from "./ui/card";
import { Trophy, Calendar, Search } from "lucide-react";
import {
  staggerContainer,
  staggerItem,
  smoothTransition,
} from "../lib/animations";

export function CompletedMetricsSummary({ tasks, filteredTasks }) {
  // Calculate this week's completed tasks
  const thisWeekCount = tasks.filter((task) => {
    const completedDate = new Date(task.completed_at);
    const weekAgo = new Date();
    weekAgo.setDate(weekAgo.getDate() - 7);
    return completedDate >= weekAgo;
  }).length;

  return (
    <motion.div whileHover={{ y: -2 }} transition={smoothTransition}>
      <Card className="border-border bg-card hover:shadow-sm transition-shadow">
        <CardContent>
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-3 items-center divide-y sm:divide-y-0 sm:divide-x divide-border"
            variants={staggerContainer}
            initial="initial"
            animate="animate"
          >
            <motion.div
              className="flex items-center gap-3 py-4 sm:py-4 sm:px-6"
              variants={staggerItem}
              whileHover={{ x: 4 }}
              transition={smoothTransition}
            >
              <motion.div
                className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10"
                whileHover={{ scale: 1.1, rotate: 5 }}
                transition={smoothTransition}
              >
                <Trophy className="h-4 w-4 text-primary" />
              </motion.div>
              <div className="space-y-0.5">
                <div className="text-xs text-muted-foreground">
                  Total Completed
                </div>
                <motion.div
                  className="text-2xl font-bold text-card-foreground"
                  initial={{ scale: 0.8 }}
                  animate={{ scale: 1 }}
                  transition={{ ...smoothTransition, delay: 0.2 }}
                >
                  {tasks.length}
                </motion.div>
              </div>
            </motion.div>

            <motion.div
              className="flex items-center gap-3 py-4 sm:py-4 sm:px-6"
              variants={staggerItem}
              whileHover={{ x: 4 }}
              transition={smoothTransition}
            >
              <motion.div
                className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10"
                whileHover={{ scale: 1.1, rotate: 5 }}
                transition={smoothTransition}
              >
                <Calendar className="h-4 w-4 text-primary" />
              </motion.div>
              <div className="space-y-0.5">
                <div className="text-xs text-muted-foreground">This Week</div>
                <motion.div
                  className="text-2xl font-bold text-primary"
                  initial={{ scale: 0.8 }}
                  animate={{ scale: 1 }}
                  transition={{ ...smoothTransition, delay: 0.3 }}
                >
                  {thisWeekCount}
                </motion.div>
              </div>
            </motion.div>

            <motion.div
              className="flex items-center gap-3 py-4 sm:py-4 sm:px-6"
              variants={staggerItem}
              whileHover={{ x: 4 }}
              transition={smoothTransition}
            >
              <motion.div
                className="flex h-8 w-8 items-center justify-center rounded-lg bg-muted"
                whileHover={{ scale: 1.1, rotate: 5 }}
                transition={smoothTransition}
              >
                <Search className="h-4 w-4 text-muted-foreground" />
              </motion.div>
              <div className="space-y-0.5">
                <div className="text-xs text-muted-foreground">Showing</div>
                <motion.div
                  className="text-2xl font-bold text-card-foreground"
                  initial={{ scale: 0.8 }}
                  animate={{ scale: 1 }}
                  transition={{ ...smoothTransition, delay: 0.4 }}
                >
                  {filteredTasks.length}
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
