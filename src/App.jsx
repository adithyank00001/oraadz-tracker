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
      const { error } = await supabase.from("tasks").insert([
        {
          ...taskData,
          created_by: userName,
        },
      ]);

      if (error) {
        console.error("Error creating task:", error);
        alert("Error creating task. Please try again.");
        return;
      }

      // Refresh the page to show the new task
      window.location.reload();
    } catch (error) {
      console.error("Error:", error);
      alert("Error creating task. Please try again.");
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
            <Route path="/" element={<DashboardPage />} />
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
