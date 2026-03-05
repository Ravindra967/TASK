import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import TaskList from '../components/TaskList';
import { Task } from '../lib/supabase';

const mockTasks: Task[] = [
  {
    id: '1',
    user_id: 'user-1',
    title: 'Test Task 1',
    description: 'Description 1',
    status: 'pending',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: '2',
    user_id: 'user-1',
    title: 'Test Task 2',
    description: 'Description 2',
    status: 'completed',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
];

describe('TaskList Component', () => {
  it('shows loading state', () => {
    const { container } = render(
      <TaskList
        tasks={[]}
        loading={true}
        onEdit={vi.fn()}
        onDelete={vi.fn()}
        onToggleStatus={vi.fn()}
        isAdmin={false}
      />
    );

    expect(container.querySelector('.animate-spin')).toBeInTheDocument();
  });

  it('shows empty state when no tasks', () => {
    render(
      <TaskList
        tasks={[]}
        loading={false}
        onEdit={vi.fn()}
        onDelete={vi.fn()}
        onToggleStatus={vi.fn()}
        isAdmin={false}
      />
    );

    expect(screen.getByText(/no tasks yet/i)).toBeInTheDocument();
  });

  it('renders tasks correctly', () => {
    render(
      <TaskList
        tasks={mockTasks}
        loading={false}
        onEdit={vi.fn()}
        onDelete={vi.fn()}
        onToggleStatus={vi.fn()}
        isAdmin={false}
      />
    );

    expect(screen.getByText('Test Task 1')).toBeInTheDocument();
    expect(screen.getByText('Test Task 2')).toBeInTheDocument();
    expect(screen.getByText('Description 1')).toBeInTheDocument();
  });

  it('calls onEdit when edit button is clicked', () => {
    const onEdit = vi.fn();
    render(
      <TaskList
        tasks={mockTasks}
        loading={false}
        onEdit={onEdit}
        onDelete={vi.fn()}
        onToggleStatus={vi.fn()}
        isAdmin={false}
      />
    );

    const editButtons = screen.getAllByTitle(/edit task/i);
    fireEvent.click(editButtons[0]);

    expect(onEdit).toHaveBeenCalledWith(mockTasks[0]);
  });

  it('calls onDelete when delete button is clicked', () => {
    const onDelete = vi.fn();
    render(
      <TaskList
        tasks={mockTasks}
        loading={false}
        onEdit={vi.fn()}
        onDelete={onDelete}
        onToggleStatus={vi.fn()}
        isAdmin={false}
      />
    );

    const deleteButtons = screen.getAllByTitle(/delete task/i);
    fireEvent.click(deleteButtons[0]);

    expect(onDelete).toHaveBeenCalledWith(mockTasks[0].id);
  });
});
