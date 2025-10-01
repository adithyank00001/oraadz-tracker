import { useState, useEffect } from "react";
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
  Clock,
  Calendar,
  AlertTriangle,
  CheckCircle2,
  TrendingUp,
  Users,
  Activity,
} from "lucide-react";

export function DashboardPage() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [metrics, setMetrics] = useState({
    totalActive: 0,
    dueToday: 0,
    overdue: 0,
  });

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

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="flex items-center space-x-3 text-muted-foreground">
          <Clock className="h-5 w-5 animate-spin" />
          <span className="text-sm font-medium">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="space-y-3">
        <div className="flex items-center space-x-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
            <Activity className="h-5 w-5 text-primary" />
          </div>
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-foreground">
              Dashboard
            </h1>
            <p className="text-muted-foreground">
              Overview of your active work tasks and progress
            </p>
          </div>
        </div>
      </div>

      {/* Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="border-border bg-card hover:shadow-sm transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
            <CardTitle className="text-sm font-medium text-card-foreground">
              Total Active Works
            </CardTitle>
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10">
              <TrendingUp className="h-4 w-4 text-primary" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-card-foreground">
              {metrics.totalActive}
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              Currently in progress
            </p>
          </CardContent>
        </Card>

        <Card className="border-border bg-card hover:shadow-sm transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
            <CardTitle className="text-sm font-medium text-card-foreground">
              Works Due Today
            </CardTitle>
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10">
              <Calendar className="h-4 w-4 text-primary" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">
              {metrics.dueToday}
            </div>
            <p className="text-xs text-muted-foreground mt-1">Due today</p>
          </CardContent>
        </Card>

        <Card className="border-border bg-card hover:shadow-sm transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
            <CardTitle className="text-sm font-medium text-card-foreground">
              Overdue Works
            </CardTitle>
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-destructive/10">
              <AlertTriangle className="h-4 w-4 text-destructive" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-destructive">
              {metrics.overdue}
            </div>
            <p className="text-xs text-muted-foreground mt-1">Need attention</p>
          </CardContent>
        </Card>
      </div>

      {/* Tasks */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <h2 className="text-2xl font-semibold tracking-tight text-foreground">
              Active Tasks
            </h2>
            <p className="text-muted-foreground">
              Manage your ongoing work assignments
            </p>
          </div>
          <Badge
            variant="secondary"
            className="flex items-center space-x-2 px-3 py-1 bg-secondary text-secondary-foreground"
          >
            <CheckCircle2 className="h-3 w-3" />
            <span className="text-sm font-medium">{tasks.length} tasks</span>
          </Badge>
        </div>

        {tasks.length === 0 ? (
          <Card className="border-border bg-card">
            <CardContent className="py-16 text-center">
              <div className="space-y-4">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-muted">
                  <CheckCircle2 className="h-8 w-8 text-muted-foreground" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-lg font-semibold text-card-foreground">
                    No active tasks
                  </h3>
                  <p className="text-muted-foreground max-w-sm mx-auto">
                    You're all caught up! Add a new task to get started with
                    your work tracking.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {tasks.map((task) => (
              <TaskCard
                key={task.id}
                task={task}
                onStatusUpdate={handleStatusUpdate}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
