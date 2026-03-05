import { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { supabase, Task } from '../lib/supabase';
import TaskList from './TaskList';
import TaskForm from './TaskForm';
import AdminPanel from './AdminPanel';
import { LogOut, Plus, LayoutDashboard, Shield } from 'lucide-react';

export default function Dashboard() {
  const { user, profile, signOut } = useAuth();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [showTaskForm, setShowTaskForm] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [showAdminPanel, setShowAdminPanel] = useState(false);

  useEffect(() => {
    if (user) {
      fetchTasks();
    }
  }, [user, profile?.role]);

  const fetchTasks = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('tasks')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setTasks(data || []);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleTaskCreated = () => {
    setShowTaskForm(false);
    setEditingTask(null);
    fetchTasks();
  };

  const handleEditTask = (task: Task) => {
    setEditingTask(task);
    setShowTaskForm(true);
  };

  const handleDeleteTask = async (taskId: string) => {
    if (!confirm('Are you sure you want to delete this task?')) return;

    try {
      const { error } = await supabase.from('tasks').delete().eq('id', taskId);
      if (error) throw error;
      fetchTasks();
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  const handleToggleStatus = async (task: Task) => {
    try {
      const newStatus = task.status === 'pending' ? 'completed' : 'pending';
      const { error } = await supabase
        .from('tasks')
        .update({ status: newStatus })
        .eq('id', task.id);

      if (error) throw error;
      fetchTasks();
    } catch (error) {
      console.error('Error updating task:', error);
    }
  };

  const handleSignOut = async () => {
    try {
      await signOut();
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const isAdmin = profile?.role === 'admin';
  const userTasks = isAdmin ? tasks : tasks.filter(t => t.user_id === user?.id);

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <div className="bg-blue-600 p-2 rounded-lg">
                <LayoutDashboard className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-800">Task Manager</h1>
                {isAdmin && (
                  <span className="inline-flex items-center text-xs text-blue-600 font-medium">
                    <Shield className="w-3 h-3 mr-1" />
                    Admin
                  </span>
                )}
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <div className="text-right hidden sm:block">
                <p className="text-sm font-medium text-gray-800">{profile?.full_name}</p>
                <p className="text-xs text-gray-500">{profile?.email}</p>
              </div>
              <button
                onClick={handleSignOut}
                className="flex items-center space-x-2 px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <LogOut className="w-5 h-5" />
                <span className="hidden sm:inline">Logout</span>
              </button>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl p-8 text-white shadow-lg">
            <h2 className="text-3xl font-bold mb-2">
              Welcome back, {profile?.full_name?.split(' ')[0]}!
            </h2>
            <p className="text-blue-100">
              {isAdmin ? "You have full access to all users and tasks" : "Manage your tasks efficiently"}
            </p>
            <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                <p className="text-blue-100 text-sm">Total Tasks</p>
                <p className="text-3xl font-bold mt-1">{userTasks.length}</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                <p className="text-blue-100 text-sm">Pending</p>
                <p className="text-3xl font-bold mt-1">
                  {userTasks.filter(t => t.status === 'pending').length}
                </p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                <p className="text-blue-100 text-sm">Completed</p>
                <p className="text-3xl font-bold mt-1">
                  {userTasks.filter(t => t.status === 'completed').length}
                </p>
              </div>
            </div>
          </div>
        </div>

        {isAdmin && (
          <div className="mb-6">
            <button
              onClick={() => setShowAdminPanel(!showAdminPanel)}
              className="flex items-center space-x-2 px-6 py-3 bg-slate-700 hover:bg-slate-800 text-white rounded-lg transition-colors font-medium"
            >
              <Shield className="w-5 h-5" />
              <span>{showAdminPanel ? 'Hide' : 'Show'} Admin Panel</span>
            </button>
          </div>
        )}

        {showAdminPanel && isAdmin && (
          <div className="mb-8">
            <AdminPanel />
          </div>
        )}

        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-2xl font-bold text-gray-800">
              {isAdmin ? 'All Tasks' : 'My Tasks'}
            </h3>
            <button
              onClick={() => {
                setEditingTask(null);
                setShowTaskForm(true);
              }}
              className="flex items-center space-x-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors font-medium"
            >
              <Plus className="w-5 h-5" />
              <span>New Task</span>
            </button>
          </div>

          {showTaskForm && (
            <div className="mb-6">
              <TaskForm
                task={editingTask}
                onSuccess={handleTaskCreated}
                onCancel={() => {
                  setShowTaskForm(false);
                  setEditingTask(null);
                }}
              />
            </div>
          )}

          <TaskList
            tasks={userTasks}
            loading={loading}
            onEdit={handleEditTask}
            onDelete={handleDeleteTask}
            onToggleStatus={handleToggleStatus}
            isAdmin={isAdmin}
          />
        </div>
      </div>
    </div>
  );
}
