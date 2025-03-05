import { useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import { 
  AlertTriangle, ArrowUpDown, Clock, Filter, Loader2, Plus, 
  CheckCircle2, Circle, AlertCircle, Timer
} from 'lucide-react';
import { cn } from '../lib/utils';
import { useTasks } from '../context/TasksContext';
import type { Task } from '../context/TasksContext';
import CompletionAcknowledgment from '../components/CompletionAcknowledgment';

// (Removed local Task interface; using Task type from TasksContext)



const Tasks = () => {
  const { tasks, updateTaskStatus } = useTasks();
  const [sortBy, setSortBy] = useState<'priority' | 'dueDate' | 'title'>('dueDate');
  const [loading, setLoading] = useState(true);
  const tasksCompleted = tasks.filter(task => task.status === 'Completed').length;
  const efficiencyRating = tasks.length > 0 ? Math.round((tasksCompleted / tasks.length) * 100) : 0;
  const activeDirectives = tasks.filter(task => task.status === 'Pending' || task.status === 'In Progress');
  const priorityOrder: Record<string, number> = { Critical: 1, High: 2, Medium: 3, Low: 4 };
  const [showCompletion, setShowCompletion] = useState(false);

  const checkOverdueTasks = () => {
    const now = new Date(); // Current date/time
    const todayStart = new Date(now.setHours(0, 0, 0, 0)).getTime(); // Midnight of today
  
    tasks.forEach(task => {
      if (!task.dueDate || isNaN(task.dueDate)) return; // Skip invalid due dates
  
      const taskDueDateRaw = typeof task.dueDate === 'string' ? new Date(task.dueDate) : new Date(task.dueDate);
      const taskDueDateStart = new Date(taskDueDateRaw.setHours(0, 0, 0, 0)).getTime(); // Midnight of due date
  
      // Check if the task's due date day is before today and status is Pending/In Progress
      if (taskDueDateStart < todayStart && (task.status === 'Pending' || task.status === 'In Progress')) {
        updateTaskStatus(task.id, 'Overdue');
      }
    });
  };
  
  useEffect(() => {
    setLoading(false);
  
    const timeout = setTimeout(() => {
      checkOverdueTasks();
    }, 10000); // 5 seconds delay
  
    const interval = setInterval(checkOverdueTasks, 60000); // Check every 1 min
  
    return () => {
      clearTimeout(timeout);
      clearInterval(interval);
    };
  }, [tasks, updateTaskStatus]); // No warning now, since checkOverdueTasks is outside
  

  const sortedTasks = [...activeDirectives].sort((a, b) => {
    if (sortBy === 'priority') {
      return (priorityOrder[a.priority ?? 'Low'] - priorityOrder[b.priority ?? 'Low']);
    }
    if (sortBy === 'dueDate') {
      return (new Date(a.dueDate || 0).getTime() - new Date(b.dueDate || 0).getTime());
    }
    return a.title.localeCompare(b.title);
  });


  const [terminalId] = useState(() => {
    const savedId = sessionStorage.getItem("terminalId");
    if (savedId) return savedId;
    const newId = Math.random().toString(36).substr(2, 9).toUpperCase();
    sessionStorage.setItem("terminalId", newId);
    return newId;
  });
  
  const getStatusIcon = (status: Task['status'] | 'Overdue') => {
      switch (status) {
        case 'Completed':
          return <CheckCircle2 className="h-4 w-4 text-lumon-neon animate-flicker" />;
        case 'In Progress':
          return <Timer className="h-4 w-4 text-lumon-blue animate-pulse" />;
        case 'Overdue':
          return <AlertCircle className="h-4 w-4 text-red-400" />;
        default:
          return <Circle className="h-4 w-4 text-lumon-neon/40" />;
      }
  };

  const getPriorityColor = (priority: Task['priority']) => {
    switch (priority) {
      case 'Critical':
        return 'text-red-400 bg-red-400/10 border-red-400/20';
      case 'High':
        return 'text-orange-400 bg-orange-400/10 border-orange-400/20';
      case 'Medium':
        return 'text-lumon-blue bg-lumon-blue/10 border-lumon-blue/20';
      default:
        return 'text-lumon-neon/60 bg-lumon-neon/5 border-lumon-neon/20';
    }
  };

  const formatDueDate = (date: string | number): string => {
    const parsedDate = new Date(date);
    if (isNaN(parsedDate.getTime())) return String(date);
    return parsedDate.toISOString().split('T')[0];
  };

  const cycleStatus = (task: Task) => {
    const statusOrder: Array<"Pending" | "In Progress" | "Completed"> = ['Pending', 'In Progress', 'Completed'];
    const currentStatus = task.status as "Pending" | "In Progress" | "Completed";
    const currentIndex = statusOrder.indexOf(currentStatus);
    const nextStatus = currentIndex === -1 ? 'Pending' : statusOrder[(currentIndex + 1) % statusOrder.length];

    updateTaskStatus(Number(task.id), nextStatus);
    if (nextStatus === 'Completed') {
      setShowCompletion(true);
      setTimeout(() => setShowCompletion(false), 2000);
    }

    document.getElementById(`status-${task.id}`)?.classList.add("animate-pulse");
    setTimeout(() => {
      document.getElementById(`status-${task.id}`)?.classList.remove("animate-pulse");
    }, 1000);
  };



  return (
    <div className="min-h-screen bg-lumon-dark text-white">
      {showCompletion && <CompletionAcknowledgment onDismiss={() => setShowCompletion(false)} />}
      {/* Top Banner */}
      <div className="bg-lumon-dark border-b border-lumon-neon/10 p-2">
        <div className="container mx-auto flex justify-between items-center">
          <span className="text-[10px] font-mono tracking-[0.3em] text-lumon-neon/60">
            TASK TERMINAL {terminalId}
          </span>
          <span className="text-[10px] font-mono tracking-[0.3em] text-lumon-neon/60 animate-pulse">
            PERFORMANCE MONITORING ACTIVE
          </span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-mono tracking-wider text-lumon-neon">ACTIVE DIRECTIVES</h1>
            <p className="text-[10px] font-mono tracking-[0.3em] text-lumon-blue mt-1">
              CURRENT EFFICIENCY RATING: {efficiencyRating}%
            </p>
          </div>
          <Link
            to="/tasks/new"
            className={cn(
              // Base styles (mobile)
              "inline-flex items-center px-3 py-1.5 border border-lumon-neon/20 rounded-sm",
              "text-xs font-mono tracking-wider text-lumon-neon bg-lumon-neon/5",
              "hover:bg-lumon-neon/10 hover:border-lumon-neon/30",
              "transition-colors duration-150 ease-in-out",
              // Small screens (sm: ≥ 640px)
              "sm:px-4 sm:py-2 sm:text-sm",
              // Medium screens (md: ≥ 768px)
              "md:px-5 md:py-2.5 md:text-base"
            )}
          >
            <Plus className="h-4 w-4" />
            <span>NEW DIRECTIVE</span>
          </Link>
        </div>

        {/* Filters */}
        <div className="bg-lumon-dark/50 backdrop-blur-sm border border-lumon-neon/10 p-4 mb-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button className="flex items-center space-x-2 text-[10px] font-mono tracking-[0.2em] text-lumon-blue hover:text-lumon-neon">
                <Filter className="h-4 w-4" />
                <span>FILTER</span>
              </button>
              <button className="flex items-center space-x-2 text-[10px] font-mono tracking-[0.2em] text-lumon-blue hover:text-lumon-neon" onClick={() => setSortBy(sortBy === 'priority' ? 'dueDate' : 'priority')}>
                <ArrowUpDown className="h-4 w-4" />
                <span>SORT ({sortBy.toUpperCase()})</span>
              </button>
            </div>
            <div className="text-[10px] font-mono tracking-[0.2em] text-lumon-neon/40">
              {tasks.length} ACTIVE DIRECTIVES
            </div>
          </div>
        </div>
        {/* Task List */}
        <div className="space-y-4">
          {loading ? (
            <div className="flex items-center justify-center py-12">
              <Loader2 className="h-8 w-8 animate-spin text-lumon-neon" />
            </div>
          ) : activeDirectives.length === 0 ? (
            <div className="text-center py-12">
              <AlertTriangle className="h-8 w-8 text-lumon-neon/40 mx-auto mb-4" />
              <p className="text-sm font-mono text-lumon-neon/60">NO ACTIVE DIRECTIVES FOUND</p>
            </div>
          ) : (
            sortedTasks.map((task) => (
              <div
                key={task.id}
                className="bg-lumon-dark/50 backdrop-blur-sm border border-lumon-neon/10 hover:border-lumon-neon/20 
                transition-all duration-300"
              >
                <div className="p-1">
                  <div className="bg-lumon-dark/80 p-6">
                    <div className="flex items-start justify-between">
                      <div onClick={() => cycleStatus(task)} className="flex items-start space-x-4 cursor-pointer transition-all hover:opacity-80">
                    {getStatusIcon(task.status)}
                    <span className="text-[10px] font-mono tracking-[0.2em] text-lumon-neon/80">
                      {task.status.toUpperCase()}
                    </span>
                        <div>
                          <h3 className="text-sm font-mono tracking-wider text-white">
                            {task.title}
                          </h3>
                          <p className="mt-1 text-xs text-lumon-blue/80">
                            {task.description}
                          </p>
                          <div className="mt-4 flex items-center space-x-4">
                          <span className={`text-[10px] font-mono tracking-[0.2em] px-2 py-1 rounded-sm border ${getPriorityColor((task.priority ?? 'Low') as "Low" | "Medium" | "High" | "Critical")}`}>
                            {task.priority?.toUpperCase()} PRIORITY
                          </span>
                            <span className="text-[10px] font-mono tracking-[0.2em] text-lumon-neon/40">
                              {task.department}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="flex flex-col items-end space-y-2">
                        <div className="flex items-center space-x-2 text-[10px] font-mono">
                          <Clock className="h-3 w-3 text-lumon-neon/40" />
                          <span className="text-[10px] font-mono tracking-[0.2em] text-lumon-neon/40">{task.dueDate ? formatDueDate(task.dueDate) : 'No Due Date'}</span>
                        </div>
                        <Link
                          to={`/tasks/${task.id}/edit`}
                          className="text-[10px] font-mono tracking-[0.2em] text-lumon-blue hover:text-lumon-neon"
                        >
                          MODIFY
                        </Link>
                      </div>
                    </div>
                    {/* Progress Bar */}
                    <div className="mt-4 h-1 bg-lumon-neon/10 rounded-full">
                      <div
                        className="h-full bg-lumon-neon/40 transition-all duration-500"
                        style={{ width: `${task.progress}%` }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        <div className="mt-8 text-center">
          <p className="text-[10px] font-mono tracking-[0.3em] text-lumon-neon/40">
            REMEMBER: YOUR WORK IS IMPORTANT • YOUR COMPLIANCE DEFINES YOUR VALUE
          </p>
        </div>
      </div>
    </div>
  );
};

export default Tasks;