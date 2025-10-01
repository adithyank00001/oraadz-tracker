import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Layout } from "./components/Layout";
import { LoginDialog } from "./components/LoginDialog";
import { TaskForm } from "./components/TaskForm";
import { DashboardPage } from "./pages/DashboardPage";
import { CompletedPage } from "./pages/CompletedPage";
import { CalendarPage } from "./pages/CalendarPage";
import { ThemeProvider } from "./contexts/ThemeContext";
import { supabase } from "./lib/supabase";
import { slideInLeft, smoothTransition } from "./lib/animations";

function App() {
  const [userName, setUserName] = useState(null);
  const [showLoginDialog, setShowLoginDialog] = useState(false);
  const [showTaskForm, setShowTaskForm] = useState(false);
  const [refreshTrigger, setRefreshTrigger] = useState(0);
  const [toast, setToast] = useState(null);

  useEffect(() => {
    // Check if user is already logged in
    const savedUserName = localStorage.getItem("userName");
    if (savedUserName) {
      setUserName(savedUserName);
    } else {
      setShowLoginDialog(true);
    }
  }, []);

  useEffect(() => {
    if (!toast) return;
    const timeoutId = setTimeout(() => setToast(null), 3000);
    return () => clearTimeout(timeoutId);
  }, [toast]);

  const handleLogin = (name) => {
    setUserName(name);
    setShowLoginDialog(false);
  };

  const handleAddWork = () => {
    setShowTaskForm(true);
  };

  const handleTaskSubmit = async (taskData) => {
    try {
      // Format the date properly for Supabase
      const formattedData = {
        ...taskData,
        created_by: userName,
        due_date: taskData.due_date
          ? new Date(taskData.due_date).toISOString().split("T")[0]
          : null,
      };

      console.log("Submitting task data:", formattedData);

      const { data, error } = await supabase
        .from("tasks")
        .insert([formattedData])
        .select();

      if (error) {
        console.error("Error creating task:", error);
        console.error("Error details:", error.details);
        console.error("Error hint:", error.hint);
        setToast({
          type: "error",
          message: `Error creating task: ${error.message}`,
        });
        return;
      }

      console.log("Task created successfully:", data);
      setToast({ type: "success", message: "Task created successfully" });

      // Trigger refresh of dashboard
      setRefreshTrigger((prev) => prev + 1);
    } catch (error) {
      console.error("Error:", error);
      setToast({
        type: "error",
        message: `Error creating task: ${error.message}`,
      });
    }
  };

  if (!userName) {
    return <LoginDialog isOpen={showLoginDialog} onLogin={handleLogin} />;
  }

  return (
    <ThemeProvider>
      <Router>
        <Layout onAddWork={handleAddWork}>
          <Routes>
            <Route path="/" element={<DashboardPage key={refreshTrigger} />} />
            <Route
              path="/completed"
              element={<CompletedPage key={refreshTrigger} />}
            />
            <Route
              path="/calendar"
              element={<CalendarPage key={refreshTrigger} />}
            />
          </Routes>
        </Layout>

        <TaskForm
          isOpen={showTaskForm}
          onClose={() => setShowTaskForm(false)}
          onSubmit={handleTaskSubmit}
        />
        <Toast toast={toast} />
      </Router>
    </ThemeProvider>
  );
}

export default App;

// Toast UI
// Render a lightweight message at the bottom center when `toast` is set
function Toast({ toast }) {
  return (
    <AnimatePresence>
      {toast && (
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.95 }}
          transition={smoothTransition}
          className={`fixed bottom-4 left-1/2 -translate-x-1/2 z-50 rounded-md px-4 py-2 text-sm shadow-lg ${
            toast.type === "error"
              ? "bg-red-600 text-white"
              : "bg-emerald-600 text-white"
          }`}
        >
          {toast.message}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
