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

// Design tokens for consistency
const tokens = {
  spacing: {
    xs: '0.25rem',
    sm: '0.5rem',
    md: '1rem',
    lg: '1.5rem',
    xl: '2rem',
  },
  fontSize: {
    xs: '0.75rem',
    sm: '0.875rem',
    base: '1rem',
    lg: '1.125rem',
  },
  borderRadius: {
    sm: '0.375rem',
    md: '0.5rem',
    lg: '0.75rem',
  },
  shadows: {
    sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
    md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
  },
};

const breakpoints = {
  mobile: '480px',
  tablet: '768px',
};

const TodoItemContainer = styled.div`
  display: flex;
  align-items: center;
  padding: ${tokens.spacing.lg};
  border: 1px solid #e2e8f0;
  border-radius: ${tokens.borderRadius.lg};
  background-color: white;
  transition: all 0.2s ease-in-out;
  gap: ${tokens.spacing.md};

  &:hover {
    box-shadow: ${tokens.shadows.md};
    border-color: #cbd5e1;
  }

  @media (max-width: ${breakpoints.mobile}) {
    flex-direction: column;
    align-items: stretch;
    gap: ${tokens.spacing.sm};
  }
`;

const Checkbox = styled.input`
  width: 1.25rem;
  height: 1.25rem;
  cursor: pointer;
  accent-color: #3b82f6;
  flex-shrink: 0;

  &:disabled {
    cursor: not-allowed;
    opacity: 0.6;
  }

  @media (max-width: ${breakpoints.mobile}) {
    align-self: flex-start;
  }
`;

const TodoContent = styled.div`
  flex: 1;
  min-width: 0; // Allow text to wrap properly
`;

const TodoTitle = styled.span<{ completed: boolean }>`
  font-size: ${tokens.fontSize.base};
  font-weight: 500;
  color: #1e293b;
  text-decoration: ${props => (props.completed ? 'line-through' : 'none')};
  opacity: ${props => (props.completed ? 0.6 : 1)};
  word-break: break-word;
  line-height: 1.5;
  display: block;
  margin-bottom: ${tokens.spacing.xs};
`;

const TodoMeta = styled.div`
  font-size: ${tokens.fontSize.sm};
  color: #64748b;
  display: flex;
  flex-wrap: wrap;
  gap: ${tokens.spacing.sm};
  align-items: center;

  @media (max-width: ${breakpoints.mobile}) {
    flex-direction: column;
    align-items: flex-start;
    gap: ${tokens.spacing.xs};
  }
`;

const MetaItem = styled.span`
  display: flex;
  align-items: center;
  gap: ${tokens.spacing.xs};
`;

const StatusBadge = styled.span<{ completed: boolean }>`
  padding: ${tokens.spacing.xs} ${tokens.spacing.sm};
  border-radius: ${tokens.borderRadius.sm};
  font-size: ${tokens.fontSize.xs};
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  background-color: ${props => (props.completed ? '#dcfce7' : '#fef3c7')};
  color: ${props => (props.completed ? '#166534' : '#92400e')};
`;

const ActionButtons = styled.div`
  display: flex;
  gap: ${tokens.spacing.sm};
  align-items: center;
  flex-shrink: 0;

  @media (max-width: ${breakpoints.mobile}) {
    justify-content: stretch;

    > * {
      flex: 1;
    }
  }
`;

const EditForm = styled.form`
  flex: 1;
  display: flex;
  gap: ${tokens.spacing.sm};
  align-items: center;

  @media (max-width: ${breakpoints.mobile}) {
    flex-direction: column;
    align-items: stretch;
  }
`;

const EditInput = styled.div`
  flex: 1;
  min-width: 0;
`;

const EditButtons = styled.div`
  display: flex;
  gap: ${tokens.spacing.sm};
  flex-shrink: 0;

  @media (max-width: ${breakpoints.mobile}) {
    justify-content: stretch;

    > * {
      flex: 1;
    }
  }
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
          <EditInput>
            <Input
              value={editTitle}
              onChange={setEditTitle}
              placeholder="Enter todo title"
              disabled={isLoading}
            />
          </EditInput>
          <EditButtons>
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
          </EditButtons>
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
          <MetaItem>ID: {todo.id}</MetaItem>
          <MetaItem>•</MetaItem>
          <MetaItem>User: {todo.userId}</MetaItem>
          <MetaItem>•</MetaItem>
          <StatusBadge completed={todo.completed}>
            {todo.completed ? 'Completed' : 'Pending'}
          </StatusBadge>
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
