// filepath: /c:/Users/baran/severance/project/src/context/TasksContext.tsx
import React, { createContext, useContext, useState, useEffect } from 'react';

export interface Task {
  progress: number;
  department: React.ReactNode;
  dueDate: number;
  priority: string;
  id: number;
  title: string;
  description: string;
  status: 'Pending' | 'In Progress' | 'Completed' | 'Overdue';
  category: 'Work' | 'Personal';
  completionTime?: number;
  revisions?: number;
  deadline: string;
}

interface TasksContextType {
  tasks: Task[];
  points: number;
  addTask: (task: Omit<Task, 'id' | 'status' | 'progress'>) => void;
  updateTaskStatus: (id: number, status: Task['status']) => void;
  updateTask: (id: number, updatedTask: Partial<Task>) => void;
  setPoints: (points: number) => void; // Add setPoints to update points manually
}

const TasksContext = createContext<TasksContextType | undefined>(undefined);

export const TasksProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [points, setPoints] = useState(0);

  // Calculate points based on tasks
  const calculatePoints = (taskList: Task[]) => {
    return taskList.reduce((acc, task) => {
      let taskPoints = 0;
      if (task.status === 'Completed') taskPoints += 100;
      if (task.priority === 'High' && task.status === 'Completed') taskPoints += 50;
      if (task.priority === 'Critical' && task.status === 'Completed') taskPoints += 150;
      if (task.status === 'Overdue') taskPoints -= 50;
      return acc + taskPoints;
    }, 0);
  };

  // Update points when tasks change
  useEffect(() => {
    const newPoints = calculatePoints(tasks);
    setPoints(newPoints); // Initialize or update points when tasks change
  }, [tasks]);

  const addTask = (task: Omit<Task, 'id' | 'status' | 'progress'>) => {
    const newTask: Task = { id: tasks.length + 1, status: 'Pending', progress: 0, ...task };
    setTasks([...tasks, newTask]);
  };

  const updateTask = (id: number, updatedTask: Partial<Task>) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id
          ? { ...task, ...updatedTask, revisions: (task.revisions || 0) + 1 }
          : task
      )
    );
  };

  const updateTaskStatus = (id: number, status: Task['status']) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id
          ? { ...task, status, progress: status === 'Pending' ? 0 : status === 'In Progress' ? 50 : 100 }
          : task
      )
    );
  };

  return (
    <TasksContext.Provider value={{ tasks, points, addTask, updateTaskStatus, updateTask, setPoints }}>
      {children}
    </TasksContext.Provider>
  );
};

export const useTasks = () => {
  const context = useContext(TasksContext);
  if (!context) {
    throw new Error('useTasks must be used within a TasksProvider');
  }
  return context;
};