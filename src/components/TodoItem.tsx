import React, { useState } from 'react';
import styled from 'styled-components';
import type { Todo } from '../types/todo';
import { Button } from './Button';
import { Input } from './Input';

interface TodoItemProps {
  todo: Todo;
  onToggle: (id: number) => Promise<void>;
  onUpdate: (id: number, title: string) => Promise<void>;
  onDelete: (id: number) => Promise<void>;
}

const TodoItemContainer = styled.div`
  display: flex;
  align-items: center;
  padding: 1rem;
  border: 1px solid rgba(0, 0, 0, 0.125);
  border-radius: 0.5rem;
  margin-bottom: 0.5rem;
  background-color: white;
  transition: all 0.2s ease-in-out;

  &:hover {
    box-shadow: 0 0.125rem 0.25rem rgba(0, 0, 0, 0.075);
  }
`;

const Checkbox = styled.input`
  margin-right: 1rem;
  width: 1.2rem;
  height: 1.2rem;
  cursor: pointer;
  accent-color: var(--primary-color);

  &:disabled {
    cursor: not-allowed;
    opacity: 0.6;
  }
`;

const TodoContent = styled.div`
  flex: 1;
  margin-right: 1rem;
`;

const TodoTitle = styled.span<{ completed: boolean }>`
  font-size: 1rem;
  color: var(--dark-color);
  text-decoration: ${props => (props.completed ? 'line-through' : 'none')};
  opacity: ${props => (props.completed ? 0.6 : 1)};
  word-break: break-word;
`;

const TodoMeta = styled.div`
  font-size: 0.875rem;
  color: var(--secondary-color);
  margin-top: 0.25rem;
`;

const ActionButtons = styled.div`
  display: flex;
  gap: 0.5rem;
  align-items: center;
`;

const EditForm = styled.form`
  flex: 1;
  margin-right: 1rem;
  display: flex;
  gap: 0.5rem;
`;

export const TodoItem: React.FC<TodoItemProps> = ({
  todo,
  onToggle,
  onUpdate,
  onDelete,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(todo.title);
  const [isLoading, setIsLoading] = useState(false);

  const handleToggle = async () => {
    if (isLoading) return;
    setIsLoading(true);
    try {
      await onToggle(todo.id);
    } finally {
      setIsLoading(false);
    }
  };

  const handleEdit = () => {
    setIsEditing(true);
    setEditTitle(todo.title);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isLoading || !editTitle.trim()) return;

    setIsLoading(true);
    try {
      await onUpdate(todo.id, editTitle.trim());
      setIsEditing(false);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditTitle(todo.title);
  };

  const handleDelete = async () => {
    if (isLoading) return;
    setIsLoading(true);
    try {
      await onDelete(todo.id);
    } finally {
      setIsLoading(false);
    }
  };

  if (isEditing) {
    return (
      <TodoItemContainer>
        <EditForm onSubmit={handleSave}>
          <Input
            value={editTitle}
            onChange={setEditTitle}
            placeholder="Enter todo title"
            disabled={isLoading}
          />
          <Button
            type="submit"
            variant="success"
            size="sm"
            disabled={isLoading || !editTitle.trim()}
          >
            Save
          </Button>
          <Button
            type="button"
            variant="secondary"
            size="sm"
            onClick={handleCancel}
            disabled={isLoading}
          >
            Cancel
          </Button>
        </EditForm>
      </TodoItemContainer>
    );
  }

  return (
    <TodoItemContainer>
      <Checkbox
        type="checkbox"
        checked={todo.completed}
        onChange={handleToggle}
        disabled={isLoading}
      />
      <TodoContent>
        <TodoTitle completed={todo.completed}>{todo.title}</TodoTitle>
        <TodoMeta>
          ID: {todo.id} • User: {todo.userId} •{' '}
          {todo.completed ? 'Completed' : 'Pending'}
        </TodoMeta>
      </TodoContent>
      <ActionButtons>
        <Button
          variant="info"
          size="sm"
          onClick={handleEdit}
          disabled={isLoading}
        >
          Edit
        </Button>
        <Button
          variant="danger"
          size="sm"
          onClick={handleDelete}
          disabled={isLoading}
        >
          Delete
        </Button>
      </ActionButtons>
    </TodoItemContainer>
  );
};
