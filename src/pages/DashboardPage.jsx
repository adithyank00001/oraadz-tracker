import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { TaskCard } from "../components/TaskCard";
import { supabase } from "../lib/supabase";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";
import {
  Clock,
  Calendar,
  AlertTriangle,
  CheckCircle2,
  Activity,
} from "lucide-react";
import { MetricsSummary } from "../components/MetricsSummary";
import { AnimatedPage } from "../components/AnimatedPage";
import {
  staggerContainer,
  staggerItem,
  fadeInUp,
  smoothTransition,
} from "../lib/animations";

export function DashboardPage() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [metrics, setMetrics] = useState({
    totalActive: 0,
    dueToday: 0,
    overdue: 0,
  });
  const [statusFilter, setStatusFilter] = useState("All");
  const [typeFilter, setTypeFilter] = useState("All");

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from("tasks")
        .select("*")
        .in("status", ["New", "In Progress"])
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Error fetching tasks:", error);
        return;
      }

      setTasks(data || []);
      calculateMetrics(data || []);
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  const calculateMetrics = (tasksData) => {
    const today = new Date().toDateString();
    const totalActive = tasksData.length;
    const dueToday = tasksData.filter(
      (task) => new Date(task.due_date).toDateString() === today
    ).length;
    const overdue = tasksData.filter(
      (task) =>
        new Date(task.due_date) < new Date() && task.status !== "Completed"
    ).length;

    setMetrics({ totalActive, dueToday, overdue });
  };

  const handleStatusUpdate = async (taskId, newStatus) => {
    try {
      const updateData = { status: newStatus };

      if (newStatus === "Completed") {
        updateData.completed_at = new Date().toISOString();
      }

      const { error } = await supabase
        .from("tasks")
        .update(updateData)
        .eq("id", taskId);

      if (error) {
        console.error("Error updating task:", error);
        return;
      }

      // Refresh tasks
      fetchTasks();
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleDeleteTask = async (taskId) => {
    try {
      const { error } = await supabase.from("tasks").delete().eq("id", taskId);

      if (error) {
        console.error("Error deleting task:", error);
        return;
      }

      // Refresh tasks
      fetchTasks();
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const filteredTasks = tasks.filter((task) => {
    const statusOk =
      statusFilter === "All" ? true : task.status === statusFilter;
    const typeOk =
      typeFilter === "All"
        ? true
        : (typeFilter === "General" && task.category === "General Work") ||
          (typeFilter === "Design" && task.category === "Design Work");
    return statusOk && typeOk;
  });

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
            <span className="text-sm font-medium">Loading...</span>
          </motion.div>
        </div>
      </AnimatedPage>
    );
  }

  return (
    <AnimatedPage>
      <motion.div
        className="space-y-8"
        variants={staggerContainer}
        initial="initial"
        animate="animate"
      >
        {/* Header */}
        <motion.div className="space-y-3" variants={staggerItem}>
          <motion.div
            className="flex items-center space-x-3"
            whileHover={{ x: 4 }}
            transition={smoothTransition}
          >
            <motion.div
              className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10"
              whileHover={{ scale: 1.1, rotate: 5 }}
              transition={smoothTransition}
            >
              <Activity className="h-5 w-5 text-primary" />
            </motion.div>
            <div>
              <h1 className="text-3xl font-bold tracking-tight text-foreground">
                Dashboard
              </h1>
            </div>
          </motion.div>
        </motion.div>

        {/* Metrics - single component */}
        <motion.div className="space-y-3" variants={staggerItem}>
          <h2 className="text-lg font-medium text-card-foreground">Overview</h2>
          <MetricsSummary metrics={metrics} />
        </motion.div>

        {/* Tasks */}
        <motion.div className="space-y-6" variants={staggerItem}>
          <motion.div
            className="flex items-center justify-between"
            variants={fadeInUp}
          >
            <div className="space-y-1">
              <h2 className="text-2xl font-semibold tracking-tight text-foreground">
                Active Tasks
              </h2>
            </div>
            <motion.div
              whileHover={{ scale: 1.05 }}
              transition={smoothTransition}
            >
              <Badge
                variant="secondary"
                className="flex items-center space-x-2 px-3 py-1 bg-secondary text-secondary-foreground"
              >
                <CheckCircle2 className="h-3 w-3" />
                <span className="text-sm font-medium">
                  {filteredTasks.length} tasks
                </span>
              </Badge>
            </motion.div>
          </motion.div>

          {/* Filters */}
          <motion.div
            className="flex flex-wrap items-center gap-2"
            variants={fadeInUp}
          >
            <motion.div
              className="space-y-1"
              whileHover={{ y: -2 }}
              transition={smoothTransition}
            >
              <span className="text-sm font-medium text-foreground">
                Status
              </span>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="border-input bg-background text-foreground">
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent className="bg-popover border-border">
                  <SelectItem value="All">All</SelectItem>
                  <SelectItem value="New">New</SelectItem>
                  <SelectItem value="In Progress">In Progress</SelectItem>
                </SelectContent>
              </Select>
            </motion.div>
            <motion.div
              className="space-y-1"
              whileHover={{ y: -2 }}
              transition={smoothTransition}
            >
              <span className="text-sm font-medium text-foreground">
                Work Type
              </span>
              <Select value={typeFilter} onValueChange={setTypeFilter}>
                <SelectTrigger className="border-input bg-background text-foreground">
                  <SelectValue placeholder="Filter by type" />
                </SelectTrigger>
                <SelectContent className="bg-popover border-border">
                  <SelectItem value="All">All</SelectItem>
                  <SelectItem value="General">General</SelectItem>
                  <SelectItem value="Design">Design</SelectItem>
                </SelectContent>
              </Select>
            </motion.div>
          </motion.div>

          {filteredTasks.length === 0 ? (
            <motion.div
              variants={fadeInUp}
              whileHover={{ y: -4 }}
              transition={smoothTransition}
            >
              <Card className="border-border bg-card">
                <CardContent className="py-16 text-center">
                  <div className="space-y-4">
                    <motion.div
                      className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-muted"
                      whileHover={{ scale: 1.1, rotate: 10 }}
                      transition={smoothTransition}
                    >
                      <CheckCircle2 className="h-8 w-8 text-muted-foreground" />
                    </motion.div>
                    <div className="space-y-2">
                      <h3 className="text-lg font-semibold text-card-foreground">
                        No matching tasks
                      </h3>
                      <p className="text-muted-foreground max-w-sm mx-auto">
                        Try adjusting the filters or add a new task to get
                        started.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ) : (
            <motion.div
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
              variants={staggerContainer}
              initial="initial"
              animate="animate"
            >
              {filteredTasks.map((task, index) => (
                <motion.div
                  key={task.id}
                  variants={staggerItem}
                  whileHover={{ y: -4 }}
                  transition={smoothTransition}
                >
                  <TaskCard
                    task={task}
                    onStatusUpdate={handleStatusUpdate}
                    onDelete={handleDeleteTask}
                  />
                </motion.div>
              ))}
            </motion.div>
          )}
        </motion.div>
      </motion.div>
    </AnimatedPage>
  );
}
