import { Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import TaskForm from './pages/TaskForm';
import Tasks from './pages/Tasks';
import Performance from './pages/Performance';
import Rewards from './pages/Rewards';
import Settings from './pages/Settings';
import AuthLayout from './layouts/AuthLayout';
import AppLayout from './layouts/AppLayout';
import LoadingScreen from './components/LoadingScreen';
import { TasksProvider } from './context/TasksContext';
import Pomodoro from './pages/Pomodoro';
import Wellness from './pages/WellnessAffirmation';
import EfficiencyRecognition from './pages/EfficiencyRecognition';

function App() {
  return (
    <TasksProvider>
      <Router>
        <Suspense fallback={<LoadingScreen />}>
          <Routes>
            <Route element={<AuthLayout />}>
              <Route path="/login" element={<Login />} />
              <Route path="/" element={<Register />} />
            </Route>
            <Route element={<AppLayout />}>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/tasks" element={<Tasks />} />
              <Route path="/tasks/new" element={<TaskForm />} />
              <Route path="/tasks/:id/edit" element={<TaskForm />} />
              <Route path="/performance" element={<Performance />} />
              <Route path="/rewards" element={<Rewards />} />
              <Route path="/pomodoro" element={<Pomodoro />} />
              <Route path="/wellness" element={<Wellness />} />
              <Route path="/efficiency" element={<EfficiencyRecognition />} />
              <Route path="/settings" element={<Settings />} />
            </Route>
          </Routes>
        </Suspense>
      </Router>
    </TasksProvider>
  );
}

export default App;