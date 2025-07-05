import React, { useState } from 'react';
import styled from 'styled-components';
import { useTodos } from '../hooks/useTodos';
import { TodoItem } from '../components/TodoItem';
import { Button } from '../components/Button';
import { Input } from '../components/Input';
import type { TodoFilters } from '../types/todo';

const PageContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem 1rem;
`;

const Header = styled.header`
  text-align: center;
  margin-bottom: 2rem;
`;

const Title = styled.h1`
  color: var(--primary-color);
  margin-bottom: 0.5rem;
`;

const Subtitle = styled.p`
  color: var(--secondary-color);
  font-size: 1.1rem;
`;

const AddTodoSection = styled.section`
  background: white;
  padding: 1.5rem;
  border-radius: 0.5rem;
  box-shadow: 0 0.125rem 0.25rem rgba(0, 0, 0, 0.075);
  margin-bottom: 2rem;
`;

const AddTodoForm = styled.form`
  display: flex;
  gap: 1rem;
  align-items: flex-end;
`;

const FiltersSection = styled.section`
  background: white;
  padding: 1.5rem;
  border-radius: 0.5rem;
  box-shadow: 0 0.125rem 0.25rem rgba(0, 0, 0, 0.075);
  margin-bottom: 2rem;
`;

const FiltersForm = styled.div`
  display: flex;
  gap: 1rem;
  align-items: flex-end;
  flex-wrap: wrap;
`;

const FilterGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const Select = styled.select`
  padding: 0.5rem 0.75rem;
  font-size: 1rem;
  border: 1px solid #ced4da;
  border-radius: 0.375rem;
  background-color: white;
  cursor: pointer;

  &:focus {
    border-color: var(--primary-color);
    outline: 0;
    box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.25);
  }
`;

const TodoList = styled.section`
  background: white;
  padding: 1.5rem;
  border-radius: 0.5rem;
  box-shadow: 0 0.125rem 0.25rem rgba(0, 0, 0, 0.075);
`;

const TodoStats = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid #e9ecef;
`;

const StatsText = styled.p`
  color: var(--secondary-color);
  margin: 0;
`;

const LoadingMessage = styled.div`
  text-align: center;
  padding: 2rem;
  color: var(--secondary-color);
  font-size: 1.1rem;
`;

const ErrorMessage = styled.div`
  background-color: #f8d7da;
  color: #721c24;
  padding: 1rem;
  border-radius: 0.375rem;
  margin-bottom: 1rem;
  border: 1px solid #f5c6cb;
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 3rem 1rem;
  color: var(--secondary-color);
`;

export const TodoPage: React.FC = () => {
  const {
    todos,
    loading,
    error,
    addTodo,
    updateTodo,
    deleteTodo,
    toggleTodo,
    filterTodos,
    refreshTodos,
  } = useTodos();

  const [newTodoTitle, setNewTodoTitle] = useState('');
  const [filters, setFilters] = useState<TodoFilters>({
    completed: undefined,
    userId: undefined,
    search: '',
  });

  const handleAddTodo = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTodoTitle.trim()) return;

    try {
      await addTodo({
        title: newTodoTitle.trim(),
        completed: false,
        userId: 1, // Default user ID for JSONPlaceholder
      });
      setNewTodoTitle('');
    } catch (err) {
      console.error('Failed to add todo:', err);
    }
  };

  const handleUpdateTodo = async (id: number, title: string) => {
    await updateTodo(id, { title });
  };

  const handleFilterChange = async (newFilters: Partial<TodoFilters>) => {
    const updatedFilters = { ...filters, ...newFilters };
    setFilters(updatedFilters);
    await filterTodos(updatedFilters);
  };

  const handleClearFilters = async () => {
    setFilters({
      completed: undefined,
      userId: undefined,
      search: '',
    });
    await refreshTodos();
  };

  const completedCount = todos.filter(todo => todo.completed).length;
  const pendingCount = todos.filter(todo => !todo.completed).length;

  return (
    <PageContainer>
      <Header>
        <Title>React Todos App</Title>
        <Subtitle>Powered by JSONPlaceholder API</Subtitle>
      </Header>

      {error && <ErrorMessage>{error}</ErrorMessage>}

      <AddTodoSection>
        <h3>Add New Todo</h3>
        <AddTodoForm onSubmit={handleAddTodo}>
          <Input
            value={newTodoTitle}
            onChange={setNewTodoTitle}
            placeholder="Enter todo title..."
            label="Todo Title"
            required
            disabled={loading}
          />
          <Button
            type="submit"
            variant="primary"
            disabled={loading || !newTodoTitle.trim()}
          >
            Add Todo
          </Button>
        </AddTodoForm>
      </AddTodoSection>

      <FiltersSection>
        <h3>Filters</h3>
        <FiltersForm>
          <FilterGroup>
            <label>Status</label>
            <Select
              value={
                filters.completed === undefined
                  ? ''
                  : filters.completed.toString()
              }
              onChange={e => {
                const value = e.target.value;
                handleFilterChange({
                  completed: value === '' ? undefined : value === 'true',
                });
              }}
            >
              <option value="">All</option>
              <option value="false">Pending</option>
              <option value="true">Completed</option>
            </Select>
          </FilterGroup>

          <FilterGroup>
            <label>User ID</label>
            <Select
              value={filters.userId || ''}
              onChange={e => {
                const value = e.target.value;
                handleFilterChange({
                  userId: value === '' ? undefined : parseInt(value),
                });
              }}
            >
              <option value="">All Users</option>
              {Array.from(new Set(todos.map(todo => todo.userId)))
                .sort((a, b) => a - b)
                .map(userId => (
                  <option key={userId} value={userId}>
                    User {userId}
                  </option>
                ))}
            </Select>
          </FilterGroup>

          <FilterGroup>
            <label>Search</label>
            <Input
              value={filters.search || ''}
              onChange={value => handleFilterChange({ search: value })}
              placeholder="Search todos..."
            />
          </FilterGroup>

          <Button
            variant="secondary"
            onClick={handleClearFilters}
            disabled={loading}
          >
            Clear Filters
          </Button>
        </FiltersForm>
      </FiltersSection>

      <TodoList>
        <TodoStats>
          <StatsText>
            Showing {todos.length} todos ({completedCount} completed,{' '}
            {pendingCount} pending)
          </StatsText>
          <Button
            variant="info"
            size="sm"
            onClick={refreshTodos}
            disabled={loading}
          >
            Refresh
          </Button>
        </TodoStats>

        {loading && <LoadingMessage>Loading todos...</LoadingMessage>}

        {!loading && todos.length === 0 && (
          <EmptyState>
            <h3>No todos found</h3>
            <p>Try adjusting your filters or add a new todo!</p>
          </EmptyState>
        )}

        {!loading && todos.length > 0 && (
          <div>
            {todos.map(todo => (
              <TodoItem
                key={todo.id}
                todo={todo}
                onToggle={toggleTodo}
                onUpdate={handleUpdateTodo}
                onDelete={deleteTodo}
              />
            ))}
          </div>
        )}
      </TodoList>
    </PageContainer>
  );
};
