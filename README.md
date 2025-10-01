# Work Tracker Application

A simple, mobile-first work tracking application built with React, Supabase, and shadcn/ui components.

## Features

- **Login-less Authentication**: Simple name-based identification using localStorage
- **Dashboard**: View active tasks with key metrics (Total Active Works, Works Due Today, Overdue Works)
- **Task Management**: Create, update, and track work items
- **Completed Works**: View and filter completed tasks
- **Mobile-First Design**: Responsive design optimized for mobile devices
- **Real-time Updates**: Built with Supabase for real-time data synchronization

## Tech Stack

- **Frontend**: React 18 with Vite
- **Styling**: Tailwind CSS with shadcn/ui components
- **Database**: Supabase (PostgreSQL)
- **Routing**: React Router DOM
- **Icons**: Lucide React

## Setup Instructions

### 1. Database Setup

1. Go to your Supabase project dashboard
2. Navigate to the SQL Editor
3. Run the SQL script from `database-setup.sql` to create the tasks table

### 2. Environment Variables

The application uses the following environment variables (already configured in `.env`):

```
VITE_SUPABASE_URL=https://ixtjokxhrlaxqfqsxigc.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Iml4dGpva3hocmxheHFmcXN4aWdjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTkyOTkxNTUsImV4cCI6MjA3NDg3NTE1NX0.4BEhI1nCOgtcWY5p8zvKR4xzCk9Yp0CWIMQUMLO_ERg
```

### 3. Install Dependencies

```bash
npm install
```

### 4. Start Development Server

```bash
npm run dev
```

The application will be available at `http://localhost:5173`

## Database Schema

### Tasks Table

| Column       | Type      | Description                                        |
| ------------ | --------- | -------------------------------------------------- |
| id           | UUID      | Primary key (auto-generated)                       |
| created_at   | TIMESTAMP | Creation timestamp                                 |
| client_name  | TEXT      | Client name (required)                             |
| work_title   | TEXT      | Work title (required)                              |
| due_date     | DATE      | Due date (required)                                |
| assignee     | TEXT      | Assignee name (optional)                           |
| priority     | TEXT      | Priority level (Low, Medium, High, URGENT)         |
| description  | TEXT      | Work description (optional)                        |
| created_by   | TEXT      | Creator name (required)                            |
| status       | TEXT      | Status (New, In Progress, Completed)               |
| category     | TEXT      | Category (Design Work, General Work)               |
| completed_at | TIMESTAMP | Completion timestamp (set when status = Completed) |

## Usage

1. **First Visit**: Enter your name to get started
2. **Dashboard**: View active tasks and key metrics
3. **Add Work**: Click "Add Work" to create new tasks
4. **Update Status**: Use the dropdown menu on task cards to update status
5. **View Completed**: Navigate to "Completed" page to see finished work
6. **Search**: Use the search bar on the completed page to filter tasks

## Features Overview

### Dashboard Page

- Displays key metrics at the top
- Shows all active tasks (New and In Progress)
- Task cards show priority, status, and due date
- Overdue tasks are highlighted in red

### Completed Page

- Lists all completed tasks sorted by completion date
- Includes search functionality to filter tasks
- Shows completion summary

### Task Management

- Create new tasks with all required fields
- Update task status through dropdown menus
- Automatic completion timestamp when marked as completed
- Priority and category badges for easy identification

## Mobile Optimization

The application is designed mobile-first with:

- Responsive grid layouts
- Touch-friendly buttons and inputs
- Optimized card layouts for small screens
- Accessible navigation

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is open source and available under the MIT License.
