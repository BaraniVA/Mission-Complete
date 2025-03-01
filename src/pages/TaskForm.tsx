import React, { useState, useEffect } from 'react';
import { useTasks } from '../context/TasksContext';
import { useNavigate, useParams } from 'react-router-dom';
import { AlertTriangle, ArrowLeft, Clock, FileWarning, Loader2 } from 'lucide-react';
import { cn } from '../lib/utils';
import '../index.css';

interface TaskFormData {
  title: string;
  description: string;
  category: 'Work' | 'Personal';
  priority: 'Low' | 'Medium' | 'High' | 'Critical';
  dueDate: string;
  department: string;
}

const TaskForm = () => {
  const { addTask, updateTask, tasks, } = useTasks();
  const { id } = useParams();
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const terminalId = Math.random().toString(36).substr(2, 9).toUpperCase();
  
  const [formData, setFormData] = useState<TaskFormData>({
    title: '',
    description: '',
    category: 'Work',
    priority: 'Medium',
    dueDate: new Date().toISOString().split('T')[0],
    department: 'MDR',
  });

  useEffect(() => {
    if (id) {
      const existingTask = tasks.find(task => task.id === Number(id));
      if (existingTask) {
        setFormData({
          title: existingTask.title,
          description: existingTask.description,
          category: existingTask.category,
          priority: existingTask.priority as "Low" | "Medium" | "High" | "Critical",
          dueDate: new Date(existingTask.dueDate).toISOString().split('T')[0],
          department: typeof existingTask.department === 'string' ? existingTask.department : '',
        });
      }
    }
  }, [id, tasks]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const dueDateTimestamp = new Date(formData.dueDate).getTime();

      if (id) {
        // Updating task
        updateTask(Number(id), { ...formData, dueDate: dueDateTimestamp});
      } else {
        // Creating new task
        addTask({ ...formData, dueDate: dueDateTimestamp, progress: 0, deadline: formData.dueDate});
      }
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      setSuccess(true);
      setTimeout(() => {
        navigate('/tasks');
      }, 2000);
    } catch {
      setError('DIRECTIVE CREATION FAILED. INSUFFICIENT CLEARANCE LEVEL.');
    } finally {
      setLoading(false);
    }
  };

  // Custom styles for select elements with sharp corners
  const selectStyle = "w-full px-3 py-2 font-mono text-sm focus:outline-none bg-lumon-dark text-white border border-lumon-neon/10 appearance-none rounded-none";
  const inputStyle = "w-full px-3 py-2 font-mono text-sm focus:outline-none bg-lumon-dark border border-lumon-neon/10 text-white rounded-none";

  return (
    <div className="min-h-screen bg-lumon-dark text-white">
      {/* Top Banner */}
      <div className="bg-lumon-dark border-b border-lumon-neon/10 p-2">
        <div className="container mx-auto flex justify-between items-center">
          <span className="text-[10px] font-mono tracking-[0.3em] text-lumon-neon/60">
            DIRECTIVE TERMINAL {terminalId}
          </span>
          <span className="text-[10px] font-mono tracking-[0.3em] text-lumon-neon/60 animate-pulse">
            SUPERVISOR MONITORING ACTIVE
          </span>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8 border-b border-lumon-neon/10 pb-4">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => navigate(-1)}
              className="text-lumon-neon/60 hover:text-lumon-neon transition-colors"
            >
              <ArrowLeft className="h-5 w-5" />
            </button>
            <div>
              <h1 className="text-2xl font-mono tracking-wider text-lumon-neon">
                {id ? 'MODIFY DIRECTIVE' : 'NEW DIRECTIVE'}
              </h1>
              <p className="text-[10px] font-mono tracking-[0.3em] text-lumon-blue mt-1">
                FORM ID: {Math.random().toString(36).substr(2, 6).toUpperCase()}
              </p>
            </div>
          </div>
          <Clock className="h-5 w-5 text-lumon-neon/40" />
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="bg-lumon-dark/50 backdrop-blur-sm border border-lumon-neon/10 animate-border-pulse shadow-inner-neon">
            <div className="p-1">
              <div className="bg-lumon-dark/80 p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4 md:col-span-2">
                    <label className="block text-xs font-mono tracking-[0.2em] text-lumon-neon">
                      DIRECTIVE IDENTIFIER
                    </label>
                      <input
                        type="text"
                        id="title"
                        required
                        value={formData.title}
                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                        className={inputStyle}
                        placeholder="DIRECTIVE #[ID]: [DESCRIPTION]"
                      />
                    </div>
                  <div className="space-y-4 md:col-span-2">
                    <label className="block text-xs font-mono tracking-[0.2em] text-lumon-neon">
                      DIRECTIVE PARAMETERS
                    </label>
                    <textarea
                      id="description"
                      required
                      rows={4}
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      className={`${inputStyle} resize-none`}
                      placeholder="ENTER DETAILED DIRECTIVE SPECIFICATIONS"
                    />
                  </div>
                  <div className="space-y-4">
                    <label className="block text-xs font-mono tracking-[0.2em] text-lumon-neon">
                      CLASSIFICATION
                    </label>
                    <div className="relative">
                      <select
                        id="category"
                        required
                        value={formData.category}
                        onChange={(e) => setFormData({ ...formData, category: e.target.value as 'Work' | 'Personal' })}
                        className={selectStyle}
                      >
                        <option value="Work">WORK PROTOCOL</option>
                        <option value="Personal">PERSONAL PROTOCOL</option> 
                      </select>
                      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-lumon-neon">
                        <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                          <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/>
                        </svg>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <label className="block text-xs font-mono tracking-[0.2em] text-lumon-neon">
                      PRIORITY LEVEL
                    </label>
                    <div className="relative">
                      <select
                        id="priority"
                        required
                        value={formData.priority}
                        onChange={(e) => setFormData({ ...formData, priority: e.target.value as "Low" | "Medium" | "High" | "Critical" })}
                        className={selectStyle}
                      >
                        <option value="Low">LOW PRIORITY</option>
                        <option value="Medium">MEDIUM PRIORITY</option>
                        <option value="High">HIGH PRIORITY</option>
                        <option value="Critical">CRITICAL PRIORITY</option>
                      </select>
                      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-lumon-neon">
                        <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                          <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/>
                        </svg>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <label className="block text-xs font-mono tracking-[0.2em] text-lumon-neon">
                      DEPARTMENT ASSIGNMENT
                    </label>
                    <div className="relative">
                      <select
                        id="department"
                        required
                        value={formData.department}
                        onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                        className={selectStyle}
                      >
                        <option value="MDR">MACRODATA REFINEMENT</option>
                        <option value="O&D">OPTICS & DESIGN</option>
                        <option value="R&D">RESEARCH & DEVELOPMENT</option>
                      </select>
                      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-lumon-neon">
                        <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                          <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/>
                        </svg>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <label className="block text-xs font-mono tracking-[0.2em] text-lumon-neon">
                      COMPLETION DEADLINE
                    </label>
                    <input
                      type="date"
                      id="dueDate"
                      required
                      value={formData.dueDate}
                      onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
                      className={inputStyle}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {error && (
            <div className="flex items-center text-xs font-mono tracking-wider text-lumon-neon bg-lumon-neon/5 p-4 border border-lumon-neon/20">
              <FileWarning className="h-4 w-4 mr-3 flex-shrink-0" />
              {error}
            </div>
          )}

          {success && (
            <div className="flex items-center text-xs font-mono tracking-wider text-lumon-neon bg-lumon-neon/5 p-4 border border-lumon-neon/20">
              <AlertTriangle className="h-4 w-4 mr-3 flex-shrink-0" />
              DIRECTIVE LOGGED SUCCESSFULLY. YOUR COMPLIANCE IS APPRECIATED.
            </div>
          )}

          <div className="flex justify-end space-x-4 pt-6 border-t border-lumon-neon/10">
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="px-6 py-2 text-[10px] font-mono tracking-[0.2em] text-lumon-blue hover:text-lumon-neon 
              border border-lumon-neon/20 hover:border-lumon-neon/40 transition-colors rounded-none"
            >
              CANCEL DIRECTIVE
            </button>
            <button
              type="submit"
              disabled={loading}
              className={cn(
                "px-6 py-2 text-[10px] font-mono tracking-[0.2em] text-lumon-neon",
                "bg-lumon-neon/10 hover:bg-lumon-neon/20 border border-lumon-neon/30",
                "transition-all duration-300 relative group rounded-none",
                loading && "opacity-50 cursor-not-allowed"
              )}
            >
              {loading ? (
                <span className="flex items-center">
                  <Loader2 className="animate-spin h-4 w-4 mr-2" />
                  PROCESSING...
                </span>
              ) : (
                <span>
                  {loading ? 'PROCESSING...' : id ? 'UPDATE DIRECTIVE' : 'SUBMIT DIRECTIVE'}
                </span>
              )}
            </button>
          </div>
        </form>

        <div className="mt-8 text-center">
          <p className="text-[10px] font-mono tracking-[0.3em] text-lumon-neon/40">
            YOUR WORK SERVES THE GREATER GOOD • EFFICIENCY THROUGH COMPLIANCE
          </p>
        </div>
      </div>
    </div>
  );
};

export default TaskForm;