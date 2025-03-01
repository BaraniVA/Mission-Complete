
import { Briefcase, User, CheckCircle2, Clock, Plus } from 'lucide-react';
import { Link } from 'react-router-dom';
import { cn } from '../lib/utils';
import { useTasks } from '../context/TasksContext';


const Dashboard = () => {
  const {tasks} = useTasks();

  const tasksCompleted = tasks.filter(task => task.status === 'Completed').length;
  const activeDirectives = tasks.filter(task => task.status !== 'Completed').length;
  const efficiencyRating = tasks.length > 0 ? Math.round((tasksCompleted / tasks.length) * 100) : 0;
  const personalTimeEarned =  `${tasksCompleted * 5}m`;



  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="border-b border-lumon-neon/10 pb-5">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-mono tracking-wider text-lumon-neon">Mission Dashboard</h1>
            <p className="mt-2 text-sm font-mono text-lumon-blue tracking-wide">
              WELCOME BACK. CURRENT EFFICIENCY RATING: {efficiencyRating}%
            </p>
          </div>
          <Link
            to="/tasks/new"
            className={cn(
              "inline-flex items-center px-4 py-2 border border-lumon-neon/20 rounded-sm",
              "text-sm font-mono tracking-wider text-lumon-neon bg-lumon-neon/5",
              "hover:bg-lumon-neon/10 hover:border-lumon-neon/30",
              "transition-colors duration-150 ease-in-out"
            )}
          >
            <Plus className="h-4 w-4 mr-2" />
            NEW DIRECTIVE
          </Link>
        </div>
      </div>

      {/* Performance Cards */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        <div className="bg-lumon-dark/50 backdrop-blur-sm border border-lumon-neon/10 rounded-sm">
          <div className="p-1">
            <div className="bg-lumon-dark/80 p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <CheckCircle2 className="h-6 w-6 text-lumon-neon" />
                </div>
                <div className="ml-5">
                  <p className="text-sm font-mono tracking-wider text-lumon-blue">TASKS COMPLETED</p>
                  <p className="text-2xl font-light tracking-wider text-lumon-neon">{tasksCompleted}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-lumon-dark/50 backdrop-blur-sm border border-lumon-neon/10 rounded-sm">
          <div className="p-1">
            <div className="bg-lumon-dark/80 p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <Clock className="h-6 w-6 text-lumon-neon" />
                </div>
                <div className="ml-5">
                  <p className="text-sm font-mono tracking-wider text-lumon-blue">PERSONAL TIME EARNED</p>
                  <p className="text-2xl font-light tracking-wider text-lumon-neon">{personalTimeEarned}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Task List */}
      <div className="bg-lumon-dark/50 backdrop-blur-sm border border-lumon-neon/10 rounded-sm">
        <div className="p-1">
          <div className="bg-lumon-dark/80">
            <div className="px-4 py-5 sm:px-6 border-b border-lumon-neon/10">
              <h3 className="text-sm font-mono tracking-wider text-lumon-neon">ACTIVE DIRECTIVES</h3>
            </div>
            <ul className="divide-y divide-lumon-neon/10">
              {activeDirectives > 0 ? (
                tasks.filter(task => task.status !== 'Completed').map(task =>(
                <li key={task.id} className="px-4 py-4 sm:px-6 hover:bg-lumon-neon/5 transition-colors">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      {task.category === 'Work' ? (
                        <Briefcase className="h-5 w-5 text-lumon-neon" />
                      ) : (
                        <User className="h-5 w-5 text-lumon-neon" />
                      )}
                      <div className="ml-3">
                        <p className="text-sm font-mono tracking-wider text-white">{task.title}</p>
                        <p className="text-xs font-mono text-lumon-blue mt-1">{task.description}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      <span
                        className={cn(
                          "inline-flex items-center px-2.5 py-0.5 rounded-sm text-xs font-mono tracking-wider",
                          task.status === 'Completed'
                            ? 'bg-lumon-neon/10 text-lumon-neon'
                            : 'bg-lumon-blue/10 text-lumon-blue'
                        )}
                      >
                        {task.status.toUpperCase()}
                      </span>
                      <Link
                        to={`/tasks/${task.id}/edit`}
                        className="text-lumon-blue hover:text-lumon-neon text-xs font-mono tracking-wider transition-colors"
                      >
                        EDIT
                      </Link>
                    </div>
                  </div>
                </li>
              ))): (
                <li className="px-4 py-4 sm:px-6">
                  <p className="text-sm font-mono tracking-wider text-lumon-neon text-center">No active directives</p>
                </li>
              )}
            </ul>
          </div>
        </div>
      </div>
      <div className = "text-center">
        <p className='text-xs font-mono text-lumon-neon/40 tracking-wider'>
        YOUR WORK SERVES GREATER GOOD • EFFICIENCY THROUGH COMPLIANCE
        </p>
      </div>
      </div>
  );
}

export default Dashboard;


