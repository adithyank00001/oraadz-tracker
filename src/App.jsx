import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Layout } from "./components/Layout";
import { LoginDialog } from "./components/LoginDialog";
import { TaskForm } from "./components/TaskForm";
import { DashboardPage } from "./pages/DashboardPage";
import { CompletedPage } from "./pages/CompletedPage";
import { ThemeProvider } from "./contexts/ThemeContext";
import { supabase } from "./lib/supabase";

function App() {
  const [userName, setUserName] = useState(null);
  const [showLoginDialog, setShowLoginDialog] = useState(false);
  const [showTaskForm, setShowTaskForm] = useState(false);
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  useEffect(() => {
    // Check if user is already logged in
    const savedUserName = localStorage.getItem("userName");
    if (savedUserName) {
      setUserName(savedUserName);
    } else {
      setShowLoginDialog(true);
    }
  }, []);

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
        alert(
          `Error creating task: ${error.message}\nDetails: ${
            error.details || "No additional details"
          }`
        );
        return;
      }

      console.log("Task created successfully:", data);
      alert("Task created successfully!");

      // Trigger refresh of dashboard
      setRefreshTrigger((prev) => prev + 1);
    } catch (error) {
      console.error("Error:", error);
      alert(`Error creating task: ${error.message}`);
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
            <Route path="/completed" element={<CompletedPage />} />
          </Routes>
        </Layout>

        <TaskForm
          isOpen={showTaskForm}
          onClose={() => setShowTaskForm(false)}
          onSubmit={handleTaskSubmit}
        />
      </Router>
    </ThemeProvider>
  );
}

export default App;
