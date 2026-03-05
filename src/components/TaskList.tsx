import { Task } from '../lib/supabase';
import { CheckCircle2, Circle, CreditCard as Edit2, Trash2, Loader2, Clock } from 'lucide-react';

interface TaskListProps {
  tasks: Task[];
  loading: boolean;
  onEdit: (task: Task) => void;
  onDelete: (taskId: string) => void;
  onToggleStatus: (task: Task) => void;
  isAdmin: boolean;
}

export default function TaskList({ tasks, loading, onEdit, onDelete, onToggleStatus, isAdmin }: TaskListProps) {
  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="w-8 h-8 text-blue-600 animate-spin" />
      </div>
    );
  }

  if (tasks.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-100 rounded-full mb-4">
          <Clock className="w-8 h-8 text-gray-400" />
        </div>
        <h3 className="text-lg font-medium text-gray-900 mb-2">No tasks yet</h3>
        <p className="text-gray-500">Create your first task to get started</p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {tasks.map((task) => (
        <div
          key={task.id}
          className={`border rounded-lg p-4 transition-all hover:shadow-md ${
            task.status === 'completed'
              ? 'bg-green-50 border-green-200'
              : 'bg-white border-gray-200'
          }`}
        >
          <div className="flex items-start gap-4">
            <button
              onClick={() => onToggleStatus(task)}
              className="mt-1 flex-shrink-0 transition-transform hover:scale-110"
            >
              {task.status === 'completed' ? (
                <CheckCircle2 className="w-6 h-6 text-green-600" />
              ) : (
                <Circle className="w-6 h-6 text-gray-400" />
              )}
            </button>

            <div className="flex-1 min-w-0">
              <h4
                className={`text-lg font-semibold ${
                  task.status === 'completed'
                    ? 'text-gray-500 line-through'
                    : 'text-gray-900'
                }`}
              >
                {task.title}
              </h4>
              {task.description && (
                <p
                  className={`mt-1 text-sm ${
                    task.status === 'completed' ? 'text-gray-400' : 'text-gray-600'
                  }`}
                >
                  {task.description}
                </p>
              )}
              <div className="mt-2 flex items-center gap-4 text-xs text-gray-500">
                <span className={`px-2 py-1 rounded-full font-medium ${
                  task.status === 'completed'
                    ? 'bg-green-100 text-green-700'
                    : 'bg-yellow-100 text-yellow-700'
                }`}>
                  {task.status}
                </span>
                <span>{new Date(task.created_at).toLocaleDateString()}</span>
              </div>
            </div>

            <div className="flex items-center gap-2 flex-shrink-0">
              <button
                onClick={() => onEdit(task)}
                className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                title="Edit task"
              >
                <Edit2 className="w-5 h-5" />
              </button>
              <button
                onClick={() => onDelete(task.id)}
                className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                title="Delete task"
              >
                <Trash2 className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
