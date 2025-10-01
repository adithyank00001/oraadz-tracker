import { motion } from "framer-motion";
import { useState } from "react";
import {
  MoreHorizontal,
  Calendar,
  User,
  Tag,
  Clock,
  Trash2,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { ConfirmationDialog } from "./ui/confirmation-dialog";
import { smoothTransition, cardHover } from "../lib/animations";

export function TaskCard({ task, onStatusUpdate, onDelete }) {
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const getPriorityColor = (priority) => {
    switch (priority) {
      case "URGENT":
        return "destructive";
      case "High":
        return "default";
      case "Medium":
        return "secondary";
      case "Low":
        return "outline";
      default:
        return "secondary";
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Completed":
        return "default";
      case "In Progress":
        return "secondary";
      case "New":
        return "outline";
      default:
        return "outline";
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const isOverdue = (dueDate) => {
    return new Date(dueDate) < new Date() && task.status !== "Completed";
  };

  const handleStatusChange = (newStatus) => {
    onStatusUpdate(task.id, newStatus);
  };

  const handleDelete = () => {
    setShowDeleteDialog(true);
  };

  const confirmDelete = () => {
    onDelete(task.id);
  };

  return (
    <motion.div
      whileHover="hover"
      whileTap="tap"
      variants={cardHover}
      transition={smoothTransition}
    >
      <Card
        className={`group transition-all duration-200 hover:shadow-md border-border bg-card ${
          isOverdue(task.due_date)
            ? "border-destructive/50 bg-destructive/5"
            : ""
        }`}
      >
        <CardHeader className="pb-3">
          <div className="flex justify-between items-start">
            <div className="space-y-2 flex-1">
              <CardTitle className="text-lg font-semibold text-card-foreground leading-tight">
                {task.work_title}
              </CardTitle>
              <CardDescription className="flex items-center space-x-2 text-muted-foreground">
                <span className="font-medium text-foreground">
                  {task.client_name}
                </span>
                {task.assignee && (
                  <>
                    <span className="text-muted-foreground">•</span>
                    <span className="flex items-center space-x-1 text-sm">
                      <User className="h-3 w-3" />
                      <span>{task.assignee}</span>
                    </span>
                  </>
                )}
              </CardDescription>
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  transition={smoothTransition}
                >
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity"
                  >
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </motion.div>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                <DropdownMenuItem onClick={() => handleStatusChange("New")}>
                  <Clock className="h-4 w-4 mr-2" />
                  Mark as New
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => handleStatusChange("In Progress")}
                >
                  <Clock className="h-4 w-4 mr-2" />
                  Mark as In Progress
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => handleStatusChange("Completed")}
                >
                  <Calendar className="h-4 w-4 mr-2" />
                  Mark as Completed
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={handleDelete}
                  className="text-destructive focus:text-destructive"
                >
                  <Trash2 className="h-4 w-4 mr-2" />
                  Delete Task
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </CardHeader>
        <CardContent className="space-y-4 pt-0">
          {task.description && (
            <p className="text-sm text-muted-foreground leading-relaxed">
              {task.description}
            </p>
          )}

          <div className="flex flex-wrap gap-2">
            <motion.div
              whileHover={{ scale: 1.05 }}
              transition={smoothTransition}
            >
              <Badge
                variant={getPriorityColor(task.priority)}
                className="text-xs font-medium"
              >
                {task.priority}
              </Badge>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.05 }}
              transition={smoothTransition}
            >
              <Badge
                variant={getStatusColor(task.status)}
                className={`text-xs font-medium ${
                  task.status === "New"
                    ? "text-destructive"
                    : task.status === "In Progress"
                    ? "text-green-600 dark:text-green-400"
                    : task.status === "Completed"
                    ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200 border-green-200 dark:border-green-800"
                    : ""
                }`}
              >
                {task.status}
              </Badge>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.05 }}
              transition={smoothTransition}
            >
              <Badge
                variant="outline"
                className="flex items-center space-x-1 text-xs"
              >
                <Tag className="h-3 w-3" />
                <span>{task.category}</span>
              </Badge>
            </motion.div>
          </div>

          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center space-x-2 text-muted-foreground">
              <Calendar className="h-3 w-3" />
              <span>Due {formatDate(task.due_date)}</span>
              {isOverdue(task.due_date) && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ ...smoothTransition, delay: 0.5 }}
                >
                  <Badge variant="destructive" className="text-xs px-2 py-0.5">
                    Overdue
                  </Badge>
                </motion.div>
              )}
            </div>
            <span className="text-xs text-muted-foreground">
              by {task.created_by}
            </span>
          </div>
        </CardContent>
      </Card>

      <ConfirmationDialog
        open={showDeleteDialog}
        onOpenChange={setShowDeleteDialog}
        title="Delete Task"
        description={`Are you sure you want to delete "${task.work_title}"? This action cannot be undone.`}
        confirmText="Delete"
        cancelText="Cancel"
        onConfirm={confirmDelete}
        variant="destructive"
        icon={Trash2}
      />
    </motion.div>
  );
}
