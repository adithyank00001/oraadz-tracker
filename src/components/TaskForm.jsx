import { useState } from "react";
import { motion } from "framer-motion";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import { Input } from "./ui/input";
import { DatePicker } from "./ui/date-picker.jsx";
import { Textarea } from "./ui/textarea";
import { Label } from "./ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Button } from "./ui/button";
import {
  staggerContainer,
  staggerItem,
  smoothTransition,
} from "../lib/animations";

export function TaskForm({ isOpen, onClose, onSubmit, initialData = null }) {
  const [formData, setFormData] = useState({
    client_name: initialData?.client_name || "",
    work_title: initialData?.work_title || "",
    due_date: initialData?.due_date || "",
    assignee: initialData?.assignee || "",
    priority: initialData?.priority || "Medium",
    description: initialData?.description || "",
    category: initialData?.category || "General Work",
    status: initialData?.status || "New",
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate required fields
    if (!formData.client_name.trim()) {
      alert("Client name is required");
      return;
    }
    if (!formData.work_title.trim()) {
      alert("Work title is required");
      return;
    }
    if (!formData.due_date) {
      alert("Due date is required");
      return;
    }

    onSubmit(formData);
    setFormData({
      client_name: "",
      work_title: "",
      due_date: "",
      assignee: "",
      priority: "Medium",
      description: "",
      category: "General Work",
      status: "New",
    });
    onClose();
  };

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px] bg-card border-border">
        <DialogHeader className="space-y-3">
          <DialogTitle className="text-xl font-semibold text-card-foreground">
            {initialData ? "Edit Task" : "Add New Work"}
          </DialogTitle>
          <DialogDescription className="text-muted-foreground">
            {initialData
              ? "Update the task details below."
              : "Fill in the details for the new work item."}
          </DialogDescription>
        </DialogHeader>

        <motion.form
          onSubmit={handleSubmit}
          className="space-y-6"
          variants={staggerContainer}
          initial="initial"
          animate="animate"
        >
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 gap-4"
            variants={staggerItem}
          >
            <motion.div
              className="space-y-2"
              whileHover={{ y: -2 }}
              transition={smoothTransition}
            >
              <Label
                htmlFor="client_name"
                className="text-sm font-medium text-foreground"
              >
                Client Name *
              </Label>
              <Input
                id="client_name"
                type="text"
                placeholder="Enter client name"
                value={formData.client_name}
                onChange={(e) => handleChange("client_name", e.target.value)}
                required
                className="border-input bg-background text-foreground"
              />
            </motion.div>

            <motion.div
              className="space-y-2"
              whileHover={{ y: -2 }}
              transition={smoothTransition}
            >
              <Label
                htmlFor="work_title"
                className="text-sm font-medium text-foreground"
              >
                Work Title *
              </Label>
              <Input
                id="work_title"
                type="text"
                placeholder="Enter work title"
                value={formData.work_title}
                onChange={(e) => handleChange("work_title", e.target.value)}
                required
                className="border-input bg-background text-foreground"
              />
            </motion.div>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 gap-4"
            variants={staggerItem}
          >
            <motion.div
              className="space-y-2"
              whileHover={{ y: -2 }}
              transition={smoothTransition}
            >
              <Label
                htmlFor="due_date"
                className="text-sm font-medium text-foreground"
              >
                Due Date *
              </Label>
              <DatePicker
                value={formData.due_date}
                onChange={(val) => handleChange("due_date", val)}
              />
            </motion.div>

            <motion.div
              className="space-y-2"
              whileHover={{ y: -2 }}
              transition={smoothTransition}
            >
              <Label
                htmlFor="assignee"
                className="text-sm font-medium text-foreground"
              >
                Assignee
              </Label>
              <Input
                id="assignee"
                type="text"
                placeholder="Enter assignee name"
                value={formData.assignee}
                onChange={(e) => handleChange("assignee", e.target.value)}
                className="border-input bg-background text-foreground"
              />
            </motion.div>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 gap-4"
            variants={staggerItem}
          >
            <motion.div
              className="space-y-2"
              whileHover={{ y: -2 }}
              transition={smoothTransition}
            >
              <Label
                htmlFor="priority"
                className="text-sm font-medium text-foreground"
              >
                Priority
              </Label>
              <Select
                value={formData.priority}
                onValueChange={(value) => handleChange("priority", value)}
              >
                <SelectTrigger className="border-input bg-background text-foreground">
                  <SelectValue placeholder="Select priority" />
                </SelectTrigger>
                <SelectContent className="bg-popover border-border">
                  <SelectItem value="Low">Low</SelectItem>
                  <SelectItem value="Medium">Medium</SelectItem>
                  <SelectItem value="High">High</SelectItem>
                  <SelectItem value="URGENT">URGENT</SelectItem>
                </SelectContent>
              </Select>
            </motion.div>

            <motion.div
              className="space-y-2"
              whileHover={{ y: -2 }}
              transition={smoothTransition}
            >
              <Label
                htmlFor="category"
                className="text-sm font-medium text-foreground"
              >
                Category
              </Label>
              <Select
                value={formData.category}
                onValueChange={(value) => handleChange("category", value)}
              >
                <SelectTrigger className="border-input bg-background text-foreground">
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent className="bg-popover border-border">
                  <SelectItem value="Design Work">Design Work</SelectItem>
                  <SelectItem value="General Work">General Work</SelectItem>
                </SelectContent>
              </Select>
            </motion.div>
          </motion.div>

          <motion.div className="space-y-2" variants={staggerItem}>
            <Label
              htmlFor="description"
              className="text-sm font-medium text-foreground"
            >
              Description
            </Label>
            <motion.div whileHover={{ y: -2 }} transition={smoothTransition}>
              <Textarea
                id="description"
                placeholder="Enter work description"
                value={formData.description}
                onChange={(e) => handleChange("description", e.target.value)}
                rows={3}
                className="border-input bg-background resize-none"
              />
            </motion.div>
          </motion.div>

          {initialData && (
            <motion.div className="space-y-2" variants={staggerItem}>
              <Label
                htmlFor="status"
                className="text-sm font-medium text-foreground"
              >
                Status
              </Label>
              <motion.div whileHover={{ y: -2 }} transition={smoothTransition}>
                <Select
                  value={formData.status}
                  onValueChange={(value) => handleChange("status", value)}
                >
                  <SelectTrigger className="border-input bg-background text-foreground">
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent className="bg-popover border-border">
                    <SelectItem value="New">New</SelectItem>
                    <SelectItem value="In Progress">In Progress</SelectItem>
                    <SelectItem value="Completed">Completed</SelectItem>
                  </SelectContent>
                </Select>
              </motion.div>
            </motion.div>
          )}
        </motion.form>

        <DialogFooter className="flex gap-3 pt-4">
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={smoothTransition}
          >
            <Button
              variant="secondary"
              onClick={onClose}
              className="bg-secondary text-secondary-foreground hover:bg-secondary/80"
            >
              Cancel
            </Button>
          </motion.div>
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={smoothTransition}
          >
            <Button
              onClick={handleSubmit}
              className="bg-primary hover:bg-primary/90 text-primary-foreground"
            >
              {initialData ? "Update Task" : "Create Task"}
            </Button>
          </motion.div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
