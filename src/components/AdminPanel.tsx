import { useState, useEffect } from 'react';
import { supabase, Profile, Task } from '../lib/supabase';
import { Users, ListChecks, Loader2, Shield, User } from 'lucide-react';

export default function AdminPanel() {
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'users' | 'tasks'>('users');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [profilesRes, tasksRes] = await Promise.all([
        supabase.from('profiles').select('*').order('created_at', { ascending: false }),
        supabase.from('tasks').select('*').order('created_at', { ascending: false }),
      ]);

      if (profilesRes.error) throw profilesRes.error;
      if (tasksRes.error) throw tasksRes.error;

      setProfiles(profilesRes.data || []);
      setTasks(tasksRes.data || []);
    } catch (error) {
      console.error('Error fetching admin data:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
        <div className="flex items-center justify-center">
          <Loader2 className="w-8 h-8 text-blue-600 animate-spin" />
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
      <div className="bg-gradient-to-r from-slate-700 to-slate-800 p-6">
        <div className="flex items-center space-x-3 mb-4">
          <Shield className="w-8 h-8 text-white" />
          <h2 className="text-2xl font-bold text-white">Admin Panel</h2>
        </div>
        <div className="flex space-x-2">
          <button
            onClick={() => setActiveTab('users')}
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-colors ${
              activeTab === 'users'
                ? 'bg-white text-slate-800'
                : 'bg-slate-600 text-white hover:bg-slate-500'
            }`}
          >
            <Users className="w-5 h-5" />
            <span>Users ({profiles.length})</span>
          </button>
          <button
            onClick={() => setActiveTab('tasks')}
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-colors ${
              activeTab === 'tasks'
                ? 'bg-white text-slate-800'
                : 'bg-slate-600 text-white hover:bg-slate-500'
            }`}
          >
            <ListChecks className="w-5 h-5" />
            <span>All Tasks ({tasks.length})</span>
          </button>
        </div>
      </div>

      <div className="p-6">
        {activeTab === 'users' ? (
          <div className="space-y-3">
            {profiles.length === 0 ? (
              <p className="text-center text-gray-500 py-8">No users found</p>
            ) : (
              profiles.map((profile) => (
                <div
                  key={profile.id}
                  className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow"
                >
                  <div className="flex items-center space-x-4">
                    <div className={`p-3 rounded-full ${
                      profile.role === 'admin' ? 'bg-purple-100' : 'bg-blue-100'
                    }`}>
                      {profile.role === 'admin' ? (
                        <Shield className="w-6 h-6 text-purple-600" />
                      ) : (
                        <User className="w-6 h-6 text-blue-600" />
                      )}
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-800">{profile.full_name}</h4>
                      <p className="text-sm text-gray-500">{profile.email}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-medium ${
                        profile.role === 'admin'
                          ? 'bg-purple-100 text-purple-700'
                          : 'bg-blue-100 text-blue-700'
                      }`}
                    >
                      {profile.role}
                    </span>
                    <span className="text-sm text-gray-500">
                      {tasks.filter((t) => t.user_id === profile.id).length} tasks
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>
        ) : (
          <div className="space-y-3">
            {tasks.length === 0 ? (
              <p className="text-center text-gray-500 py-8">No tasks found</p>
            ) : (
              tasks.map((task) => {
                const taskOwner = profiles.find((p) => p.id === task.user_id);
                return (
                  <div
                    key={task.id}
                    className={`p-4 border rounded-lg ${
                      task.status === 'completed'
                        ? 'bg-green-50 border-green-200'
                        : 'bg-white border-gray-200'
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h4
                          className={`font-semibold ${
                            task.status === 'completed'
                              ? 'text-gray-500 line-through'
                              : 'text-gray-800'
                          }`}
                        >
                          {task.title}
                        </h4>
                        {task.description && (
                          <p className="text-sm text-gray-600 mt-1">{task.description}</p>
                        )}
                        <div className="flex items-center gap-3 mt-2">
                          <span className="text-xs text-gray-500">
                            Owner: {taskOwner?.full_name || 'Unknown'}
                          </span>
                          <span
                            className={`px-2 py-1 rounded-full text-xs font-medium ${
                              task.status === 'completed'
                                ? 'bg-green-100 text-green-700'
                                : 'bg-yellow-100 text-yellow-700'
                            }`}
                          >
                            {task.status}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        )}
      </div>
    </div>
  );
}
