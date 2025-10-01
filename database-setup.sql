-- Create the tasks table for the Work Tracker application
-- Run this SQL in your Supabase SQL editor

CREATE TABLE IF NOT EXISTS tasks (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  client_name TEXT NOT NULL,
  work_title TEXT NOT NULL,
  due_date DATE NOT NULL,
  assignee TEXT,
  priority TEXT CHECK (priority IN ('Low', 'Medium', 'High', 'URGENT')),
  description TEXT,
  created_by TEXT NOT NULL,
  status TEXT DEFAULT 'New' CHECK (status IN ('New', 'In Progress', 'Completed')),
  category TEXT CHECK (category IN ('Design Work', 'General Work')),
  completed_at TIMESTAMP WITH TIME ZONE
);

-- Enable Row Level Security (RLS)
ALTER TABLE tasks ENABLE ROW LEVEL SECURITY;

-- Create a policy that allows all operations for now (you can restrict this later)
CREATE POLICY "Allow all operations on tasks" ON tasks
  FOR ALL USING (true) WITH CHECK (true);

-- Insert some sample data (optional)
INSERT INTO tasks (client_name, work_title, due_date, assignee, priority, description, created_by, status, category) VALUES
('Acme Corp', 'Website Redesign', '2024-01-15', 'John Doe', 'High', 'Complete redesign of the company website', 'Admin', 'New', 'Design Work'),
('TechStart Inc', 'Mobile App Development', '2024-01-20', 'Jane Smith', 'URGENT', 'Develop iOS and Android apps', 'Admin', 'In Progress', 'General Work'),
('Design Studio', 'Logo Creation', '2024-01-10', 'Mike Johnson', 'Medium', 'Create new logo for rebranding', 'Admin', 'Completed', 'Design Work');
