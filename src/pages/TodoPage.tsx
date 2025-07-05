import React, { useState } from 'react';
import styled from 'styled-components';
import { useTodos } from '../hooks/useTodos';
import { TodoItem } from '../components/TodoItem';
import { Button } from '../components/Button';
import { Input } from '../components/Input';
import type { TodoFilters } from '../types/todo';

// Responsive breakpoints
const breakpoints = {
  mobile: '480px',
  tablet: '768px',
  desktop: '1024px',
  wide: '1200px',
};

// Design tokens for consistent spacing and sizing
const tokens = {
  spacing: {
    xs: '0.25rem',
    sm: '0.5rem',
    md: '1rem',
    lg: '1.5rem',
    xl: '2rem',
    xxl: '3rem',
  },
  fontSize: {
    xs: '0.75rem',
    sm: '0.875rem',
    base: '1rem',
    lg: '1.125rem',
    xl: '1.25rem',
    '2xl': '1.5rem',
    '3xl': '1.875rem',
    '4xl': '2.25rem',
  },
  borderRadius: {
    sm: '0.375rem',
    md: '0.5rem',
    lg: '0.75rem',
    xl: '1rem',
  },
  shadows: {
    sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
    md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
    lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
    xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
  },
};

const PageContainer = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: ${tokens.spacing.md};

  @media (min-width: ${breakpoints.tablet}) {
    padding: ${tokens.spacing.xl};
  }

  @media (min-width: ${breakpoints.desktop}) {
    padding: ${tokens.spacing.xxl};
  }
`;

const MainContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  gap: ${tokens.spacing.xl};

  @media (min-width: ${breakpoints.desktop}) {
    grid-template-columns: 1fr 2fr;
    gap: ${tokens.spacing.xxl};
  }
`;

const Sidebar = styled.aside`
  @media (min-width: ${breakpoints.desktop}) {
    order: 1;
  }
`;

const MainArea = styled.main`
  @media (min-width: ${breakpoints.desktop}) {
    order: 2;
  }
`;

const Header = styled.header`
  text-align: center;
  margin-bottom: ${tokens.spacing.xxl};
  color: white;

  @media (min-width: ${breakpoints.desktop}) {
    grid-column: 1 / -1;
    margin-bottom: ${tokens.spacing.xxl};
  }
`;

const Title = styled.h1`
  font-size: ${tokens.fontSize['4xl']};
  font-weight: 700;
  margin-bottom: ${tokens.spacing.sm};
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

  @media (min-width: ${breakpoints.tablet}) {
    font-size: 3rem;
  }

  @media (min-width: ${breakpoints.desktop}) {
    font-size: 3.5rem;
  }
`;

const Subtitle = styled.p`
  font-size: ${tokens.fontSize.lg};
  opacity: 0.9;
  font-weight: 300;

  @media (min-width: ${breakpoints.tablet}) {
    font-size: ${tokens.fontSize.xl};
  }
`;

const Card = styled.div`
  background: white;
  border-radius: ${tokens.borderRadius.lg};
  box-shadow: ${tokens.shadows.lg};
  padding: ${tokens.spacing.xl};
  margin-bottom: ${tokens.spacing.xl};

  @media (min-width: ${breakpoints.tablet}) {
    padding: ${tokens.spacing.xxl};
  }
`;

const CardHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: ${tokens.spacing.lg};
  padding-bottom: ${tokens.spacing.md};
  border-bottom: 2px solid #f1f5f9;
`;

const CardTitle = styled.h2`
  font-size: ${tokens.fontSize['2xl']};
  font-weight: 600;
  color: #1e293b;
  margin: 0;

  @media (min-width: ${breakpoints.tablet}) {
    font-size: ${tokens.fontSize['3xl']};
  }
`;

const AddTodoForm = styled.form`
  display: grid;
  gap: ${tokens.spacing.md};

  @media (min-width: ${breakpoints.tablet}) {
    grid-template-columns: 1fr auto;
    align-items: end;
  }
`;

const FiltersForm = styled.div`
  display: grid;
  gap: ${tokens.spacing.md};

  @media (min-width: ${breakpoints.tablet}) {
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    align-items: end;
  }

  @media (min-width: ${breakpoints.desktop}) {
    grid-template-columns: repeat(3, 1fr) auto;
  }
`;

const FilterGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${tokens.spacing.sm};
`;

const FilterLabel = styled.label`
  font-size: ${tokens.fontSize.sm};
  font-weight: 500;
  color: #64748b;
  text-transform: uppercase;
  letter-spacing: 0.05em;
`;

const Select = styled.select`
  padding: ${tokens.spacing.md};
  font-size: ${tokens.fontSize.base};
  border: 2px solid #e2e8f0;
  border-radius: ${tokens.borderRadius.md};
  background-color: white;
  cursor: pointer;
  font-family: inherit;
  transition: all 0.2s ease;

  &:focus-visible {
    border-color: #3b82f6;
    outline: none;
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
  }

  &:hover {
    border-color: #cbd5e1;
  }

  &:disabled {
    background-color: #f8fafc;
    cursor: not-allowed;
    opacity: 0.6;
  }
`;

const TodoList = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${tokens.spacing.md};
`;

const TodoStats = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${tokens.spacing.md};
  align-items: flex-start;

  @media (min-width: ${breakpoints.tablet}) {
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }
`;

const StatsText = styled.p`
  color: #64748b;
  margin: 0;
  font-size: ${tokens.fontSize.base};
  font-weight: 500;
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: ${tokens.spacing.md};
  width: 100%;

  @media (min-width: ${breakpoints.tablet}) {
    width: auto;
    grid-template-columns: repeat(2, auto);
    gap: ${tokens.spacing.lg};
  }
`;

const StatItem = styled.div`
  text-align: center;
  padding: ${tokens.spacing.md};
  background: #f8fafc;
  border-radius: ${tokens.borderRadius.md};
  border: 1px solid #e2e8f0;

  @media (min-width: ${breakpoints.tablet}) {
    text-align: left;
    padding: ${tokens.spacing.lg};
    min-width: 120px;
  }
`;

const StatNumber = styled.div`
  font-size: ${tokens.fontSize['2xl']};
  font-weight: 700;
  color: #1e293b;
  line-height: 1;
`;

const StatLabel = styled.div`
  font-size: ${tokens.fontSize.sm};
  color: #64748b;
  margin-top: ${tokens.spacing.xs};
  text-transform: uppercase;
  letter-spacing: 0.05em;
`;

const LoadingMessage = styled.div`
  text-align: center;
  padding: ${tokens.spacing.xxl};
  color: #64748b;
  font-size: ${tokens.fontSize.lg};
`;

const ErrorMessage = styled.div`
  background: linear-gradient(135deg, #fef2f2 0%, #fecaca 100%);
  color: #991b1b;
  padding: ${tokens.spacing.lg};
  border-radius: ${tokens.borderRadius.md};
  margin-bottom: ${tokens.spacing.lg};
  border: 1px solid #fca5a5;
  font-weight: 500;
`;

const EmptyState = styled.div`
  text-align: center;
  padding: ${tokens.spacing.xxl};
  color: #64748b;

  h3 {
    font-size: ${tokens.fontSize['2xl']};
    margin-bottom: ${tokens.spacing.md};
    color: #475569;
  }

  p {
    font-size: ${tokens.fontSize.base};
    margin: 0;
  }
`;

const ActionButtons = styled.div`
  display: flex;
  gap: ${tokens.spacing.sm};
  flex-wrap: wrap;

  @media (min-width: ${breakpoints.tablet}) {
    flex-wrap: nowrap;
  }
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

      <MainContent>
        <Sidebar>
          <Card>
            <CardHeader>
              <CardTitle>Add New Todo</CardTitle>
            </CardHeader>
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
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Filters</CardTitle>
            </CardHeader>
            <FiltersForm>
              <FilterGroup>
                <FilterLabel>Status</FilterLabel>
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
                <FilterLabel>User ID</FilterLabel>
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
                <FilterLabel>Search</FilterLabel>
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
          </Card>
        </Sidebar>

        <MainArea>
          <Card>
            <CardHeader>
              <CardTitle>Todo List</CardTitle>
              <ActionButtons>
                <Button
                  variant="info"
                  size="sm"
                  onClick={refreshTodos}
                  disabled={loading}
                >
                  Refresh
                </Button>
              </ActionButtons>
            </CardHeader>

            <TodoStats>
              <StatsText>Showing {todos.length} todos</StatsText>
              <StatsGrid>
                <StatItem>
                  <StatNumber>{completedCount}</StatNumber>
                  <StatLabel>Completed</StatLabel>
                </StatItem>
                <StatItem>
                  <StatNumber>{pendingCount}</StatNumber>
                  <StatLabel>Pending</StatLabel>
                </StatItem>
              </StatsGrid>
            </TodoStats>

            {loading && <LoadingMessage>Loading todos...</LoadingMessage>}

            {!loading && todos.length === 0 && (
              <EmptyState>
                <h3>No todos found</h3>
                <p>Try adjusting your filters or add a new todo!</p>
              </EmptyState>
            )}

            {!loading && todos.length > 0 && (
              <TodoList>
                {todos.map(todo => (
                  <TodoItem
                    key={todo.id}
                    todo={todo}
                    onToggle={toggleTodo}
                    onUpdate={handleUpdateTodo}
                    onDelete={deleteTodo}
                  />
                ))}
              </TodoList>
            )}
          </Card>
        </MainArea>
      </MainContent>
    </PageContainer>
  );
};
