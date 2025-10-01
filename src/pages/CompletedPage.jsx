import { useState, useEffect } from "react";
import { Input } from "../components/ui/input";
import { Card, CardContent } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { TaskCard } from "../components/TaskCard";
import { supabase } from "../lib/supabase";
import { Search, CheckCircle2, Clock, Trophy, Calendar } from "lucide-react";

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
      <div className="space-y-6">
        <div className="flex items-center space-x-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
            <Trophy className="h-5 w-5 text-primary" />
          </div>
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-foreground">
              Completed Works
            </h1>
            <p className="text-muted-foreground">
              Review your completed tasks and achievements
            </p>
          </div>
        </div>

        {/* Search */}
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search completed tasks..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 border-input bg-background"
          />
        </div>
      </div>

      {/* Summary Stats */}
      {tasks.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="border-border bg-card hover:shadow-sm transition-shadow">
            <CardContent className="py-6">
              <div className="flex items-center space-x-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                  <Trophy className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-medium text-card-foreground">
                    Total Completed
                  </p>
                  <p className="text-2xl font-bold text-card-foreground">
                    {tasks.length}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-border bg-card hover:shadow-sm transition-shadow">
            <CardContent className="py-6">
              <div className="flex items-center space-x-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                  <Calendar className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-medium text-card-foreground">
                    This Week
                  </p>
                  <p className="text-2xl font-bold text-primary">
                    {
                      tasks.filter((task) => {
                        const completedDate = new Date(task.completed_at);
                        const weekAgo = new Date();
                        weekAgo.setDate(weekAgo.getDate() - 7);
                        return completedDate >= weekAgo;
                      }).length
                    }
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-border bg-card hover:shadow-sm transition-shadow">
            <CardContent className="py-6">
              <div className="flex items-center space-x-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted">
                  <Search className="h-5 w-5 text-muted-foreground" />
                </div>
                <div>
                  <p className="text-sm font-medium text-card-foreground">
                    Showing
                  </p>
                  <p className="text-2xl font-bold text-card-foreground">
                    {filteredTasks.length}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Tasks */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <h2 className="text-2xl font-semibold tracking-tight text-foreground">
              Completed Tasks
            </h2>
            <p className="text-muted-foreground">
              Your finished work assignments
            </p>
          </div>
          {tasks.length > 0 && (
            <Badge
              variant="secondary"
              className="flex items-center space-x-2 px-3 py-1 bg-secondary text-secondary-foreground"
            >
              <CheckCircle2 className="h-3 w-3" />
              <span className="text-sm font-medium">
                {filteredTasks.length} of {tasks.length}
              </span>
            </Badge>
          )}
        </div>

        {filteredTasks.length === 0 ? (
          <Card className="border-border bg-card">
            <CardContent className="py-16 text-center">
              <div className="space-y-4">
                {searchTerm ? (
                  <>
                    <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-muted">
                      <Search className="h-8 w-8 text-muted-foreground" />
                    </div>
                    <div className="space-y-2">
                      <h3 className="text-lg font-semibold text-card-foreground">
                        No matches found
                      </h3>
                      <p className="text-muted-foreground max-w-sm mx-auto">
                        Try adjusting your search terms to find completed tasks.
                      </p>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-muted">
                      <Trophy className="h-8 w-8 text-muted-foreground" />
                    </div>
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
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTasks.map((task) => (
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
