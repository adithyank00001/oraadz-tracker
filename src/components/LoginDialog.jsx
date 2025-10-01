import { useState } from "react";
import { motion } from "framer-motion";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "./ui/dialog";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { User } from "lucide-react";
import {
  staggerContainer,
  staggerItem,
  smoothTransition,
} from "../lib/animations";

export function LoginDialog({ isOpen, onLogin }) {
  const [userName, setUserName] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (userName.trim()) {
      localStorage.setItem("userName", userName.trim());
      onLogin(userName.trim());
      setUserName("");
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={() => {}}>
      <DialogContent
        showCloseButton={false}
        className="sm:max-w-md bg-card border-border"
      >
        <motion.div
          variants={staggerContainer}
          initial="initial"
          animate="animate"
        >
          <DialogHeader className="space-y-3 text-center">
            <motion.div
              className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-primary"
              variants={staggerItem}
              whileHover={{ scale: 1.1, rotate: 5 }}
              transition={smoothTransition}
            >
              <User className="h-6 w-6 text-primary-foreground" />
            </motion.div>
            <motion.div variants={staggerItem}>
              <DialogTitle className="text-xl font-semibold text-card-foreground">
                Welcome to Work Tracker
              </DialogTitle>
            </motion.div>
            <motion.div variants={staggerItem}>
              <DialogDescription className="text-muted-foreground">
                Please enter your name to get started with tracking your work.
              </DialogDescription>
            </motion.div>
          </DialogHeader>
          <motion.form
            onSubmit={handleSubmit}
            className="space-y-6"
            variants={staggerItem}
          >
            <motion.div
              className="space-y-2"
              whileHover={{ y: -2 }}
              transition={smoothTransition}
            >
              <label
                htmlFor="userName"
                className="text-sm font-medium text-foreground"
              >
                Your Name
              </label>
              <Input
                id="userName"
                type="text"
                placeholder="Enter your name"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                required
                autoFocus
                className="border-input bg-background"
              />
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              transition={smoothTransition}
            >
              <Button
                type="submit"
                className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
              >
                Get Started
              </Button>
            </motion.div>
          </motion.form>
        </motion.div>
      </DialogContent>
    </Dialog>
  );
}
