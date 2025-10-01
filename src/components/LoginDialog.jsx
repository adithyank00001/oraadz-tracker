import { useState } from "react";
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
        <DialogHeader className="space-y-3 text-center">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-primary">
            <User className="h-6 w-6 text-primary-foreground" />
          </div>
          <DialogTitle className="text-xl font-semibold text-card-foreground">
            Welcome to Work Tracker
          </DialogTitle>
          <DialogDescription className="text-muted-foreground">
            Please enter your name to get started with tracking your work.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
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
          </div>
          <Button
            type="submit"
            className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
          >
            Get Started
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
