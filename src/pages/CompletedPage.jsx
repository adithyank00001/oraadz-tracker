import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Input } from "../components/ui/input";
import { Card, CardContent } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { TaskCard } from "../components/TaskCard";
import { CompletedMetricsSummary } from "../components/CompletedMetricsSummary";
import { supabase } from "../lib/supabase";
import { Search, CheckCircle2, Clock, Trophy, Calendar } from "lucide-react";
import { AnimatedPage } from "../components/AnimatedPage";
import { smoothTransition } from "../lib/animations";

export function CompletedPage() {
  const [tasks, setTasks] = useState([]);
  const [filteredTasks, setFilteredTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchCompletedTasks();
  }, []);

  useEffect(() => {
    filterTasks();
  }, [tasks, searchTerm]);

  const fetchCompletedTasks = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from("tasks")
        .select("*")
        .eq("status", "Completed")
        .order("completed_at", { ascending: false });

      if (error) {
        console.error("Error fetching completed tasks:", error);
        return;
      }

      setTasks(data || []);
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  const filterTasks = () => {
    if (!searchTerm.trim()) {
      setFilteredTasks(tasks);
      return;
    }

    const filtered = tasks.filter(
      (task) =>
        task.work_title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        task.client_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        task.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        task.assignee?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    setFilteredTasks(filtered);
  };

  const handleStatusUpdate = async (taskId, newStatus) => {
    try {
      const updateData = { status: newStatus };

      if (newStatus !== "Completed") {
        updateData.completed_at = null;
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
      fetchCompletedTasks();
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
      fetchCompletedTasks();
    } catch (error) {
      console.error("Error:", error);
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
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        {/* Header */}
        <motion.div
          className="space-y-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
        >
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
              <Trophy className="h-5 w-5 text-primary" />
            </motion.div>
            <div>
              <h1 className="text-3xl font-bold tracking-tight text-foreground">
                Completed Works
              </h1>
            </div>
          </motion.div>

          {/* Search */}
          <motion.div
            className="relative max-w-md"
            whileHover={{ scale: 1.02 }}
            transition={smoothTransition}
          >
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search completed tasks..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 border-input bg-background"
            />
          </motion.div>
        </motion.div>

        {/* Summary Stats */}
        {tasks.length > 0 && (
          <motion.div
            className="space-y-3"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
          >
            <h2 className="text-lg font-medium text-card-foreground">
              Overview
            </h2>
            <CompletedMetricsSummary
              tasks={tasks}
              filteredTasks={filteredTasks}
            />
          </motion.div>
        )}

        {/* Tasks */}
        <motion.div
          className="space-y-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.3 }}
        >
          <motion.div
            className="flex items-center justify-between"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3, delay: 0.4 }}
          >
            <div className="space-y-1">
              <h2 className="text-2xl font-semibold tracking-tight text-foreground">
                Completed Tasks
              </h2>
            </div>
            {tasks.length > 0 && (
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
                    {filteredTasks.length} of {tasks.length}
                  </span>
                </Badge>
              </motion.div>
            )}
          </motion.div>

          {filteredTasks.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={smoothTransition}
              whileHover={{ y: -4 }}
            >
              <Card className="border-border bg-card">
                <CardContent className="py-16 text-center">
                  <div className="space-y-4">
                    {searchTerm ? (
                      <>
                        <motion.div
                          className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-muted"
                          whileHover={{ scale: 1.1, rotate: 10 }}
                          transition={smoothTransition}
                        >
                          <Search className="h-8 w-8 text-muted-foreground" />
                        </motion.div>
                        <div className="space-y-2">
                          <h3 className="text-lg font-semibold text-card-foreground">
                            No matches found
                          </h3>
                          <p className="text-muted-foreground max-w-sm mx-auto">
                            Try adjusting your search terms to find completed
                            tasks.
                          </p>
                        </div>
                      </>
                    ) : (
                      <>
                        <motion.div
                          className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-muted"
                          whileHover={{ scale: 1.1, rotate: 10 }}
                          transition={smoothTransition}
                        >
                          <Trophy className="h-8 w-8 text-muted-foreground" />
                        </motion.div>
                        <div className="space-y-2">
                          <h3 className="text-lg font-semibold text-card-foreground">
                            No completed tasks
                          </h3>
                          <p className="text-muted-foreground max-w-sm mx-auto">
                            Complete some tasks to see them here and track your
                            achievements.
                          </p>
                        </div>
                      </>
                    )}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ) : (
            <motion.div
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3, staggerChildren: 0.1 }}
            >
              {filteredTasks.map((task, index) => (
                <motion.div
                  key={task.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.3,
                    delay: index * 0.1,
                    ease: [0.4, 0, 0.2, 1],
                  }}
                  whileHover={{ y: -4 }}
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
