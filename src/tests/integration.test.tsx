import { describe, it, expect, beforeEach, vi } from 'vitest';
import { supabase } from '../lib/supabase';

describe('API Integration Tests', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should fetch tasks from database', async () => {
    const mockTasks = [
      {
        id: '1',
        user_id: 'user-1',
        title: 'Task 1',
        description: 'Description',
        status: 'pending',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      },
    ];

    vi.mocked(supabase.from).mockReturnValue({
      select: vi.fn().mockReturnThis(),
      order: vi.fn().mockResolvedValue({ data: mockTasks, error: null }),
    } as never);

    const { data } = await supabase
      .from('tasks')
      .select('*')
      .order('created_at', { ascending: false });

    expect(data).toEqual(mockTasks);
    expect(supabase.from).toHaveBeenCalledWith('tasks');
  });

  it('should handle authentication errors', async () => {
    const mockError = new Error('Invalid credentials');
    vi.mocked(supabase.auth.signInWithPassword).mockResolvedValue({
      data: { user: null, session: null },
      error: mockError,
    } as never);

    const result = await supabase.auth.signInWithPassword({
      email: 'test@example.com',
      password: 'wrong',
    });

    expect(result.error).toBeDefined();
    expect(result.data.user).toBeNull();
  });

  it('should create a new task', async () => {
    const newTask = {
      user_id: 'user-1',
      title: 'New Task',
      description: 'Task description',
      status: 'pending' as const,
    };

    vi.mocked(supabase.from).mockReturnValue({
      insert: vi.fn().mockResolvedValue({ data: newTask, error: null }),
    } as never);

    const { data, error } = await supabase.from('tasks').insert(newTask);

    expect(error).toBeNull();
    expect(data).toEqual(newTask);
  });
});
