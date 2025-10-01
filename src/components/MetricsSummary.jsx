import { motion } from "framer-motion";
import { Card, CardContent } from "./ui/card";
import { TrendingUp, Calendar, AlertTriangle } from "lucide-react";
import {
  staggerContainer,
  staggerItem,
  smoothTransition,
} from "../lib/animations";

export function MetricsSummary({ metrics }) {
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
                <TrendingUp className="h-4 w-4 text-primary" />
              </motion.div>
              <div className="space-y-0.5">
                <div className="text-xs text-muted-foreground">
                  Total Active Works
                </div>
                <motion.div
                  className="text-2xl font-bold text-card-foreground"
                  initial={{ scale: 0.8 }}
                  animate={{ scale: 1 }}
                  transition={{ ...smoothTransition, delay: 0.2 }}
                >
                  {metrics.totalActive}
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
                <div className="text-xs text-muted-foreground">
                  Works Due Today
                </div>
                <motion.div
                  className="text-2xl font-bold text-primary"
                  initial={{ scale: 0.8 }}
                  animate={{ scale: 1 }}
                  transition={{ ...smoothTransition, delay: 0.3 }}
                >
                  {metrics.dueToday}
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
                className="flex h-8 w-8 items-center justify-center rounded-lg bg-destructive/10"
                whileHover={{ scale: 1.1, rotate: 5 }}
                transition={smoothTransition}
              >
                <AlertTriangle className="h-4 w-4 text-destructive" />
              </motion.div>
              <div className="space-y-0.5">
                <div className="text-xs text-muted-foreground">
                  Overdue Works
                </div>
                <motion.div
                  className="text-2xl font-bold text-destructive"
                  initial={{ scale: 0.8 }}
                  animate={{ scale: 1 }}
                  transition={{ ...smoothTransition, delay: 0.4 }}
                >
                  {metrics.overdue}
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
