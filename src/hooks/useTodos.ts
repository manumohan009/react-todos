import { useState, useEffect, useCallback } from 'react';
import type {
  Todo,
  CreateTodoRequest,
  UpdateTodoRequest,
  TodoFilters,
} from '../types/todo';
import { todoService } from '../services/todoService';

interface UseTodosReturn {
  todos: Todo[];
  loading: boolean;
  error: string | null;
  addTodo: (todo: CreateTodoRequest) => Promise<void>;
  updateTodo: (id: number, updates: UpdateTodoRequest) => Promise<void>;
  deleteTodo: (id: number) => Promise<void>;
  toggleTodo: (id: number) => Promise<void>;
  filterTodos: (filters: TodoFilters) => Promise<void>;
  refreshTodos: () => Promise<void>;
}

export const useTodos = (): UseTodosReturn => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchTodos = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await todoService.getAllTodos();
      setTodos(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch todos');
    } finally {
      setLoading(false);
    }
  }, []);

  const addTodo = useCallback(async (todo: CreateTodoRequest) => {
    try {
      setLoading(true);
      setError(null);
      const newTodo = await todoService.createTodo(todo);
      setTodos(prev => [...prev, newTodo]);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to add todo');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const updateTodo = useCallback(
    async (id: number, updates: UpdateTodoRequest) => {
      try {
        setLoading(true);
        setError(null);
        const updatedTodo = await todoService.patchTodo(id, updates);
        setTodos(prev =>
          prev.map(todo => (todo.id === id ? updatedTodo : todo))
        );
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to update todo');
        throw err;
      } finally {
        setLoading(false);
      }
    },
    []
  );

  const deleteTodo = useCallback(async (id: number) => {
    try {
      setLoading(true);
      setError(null);
      await todoService.deleteTodo(id);
      setTodos(prev => prev.filter(todo => todo.id !== id));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete todo');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const toggleTodo = useCallback(
    async (id: number) => {
      const todo = todos.find(t => t.id === id);
      if (todo) {
        await updateTodo(id, { completed: !todo.completed });
      }
    },
    [todos, updateTodo]
  );

  const filterTodos = useCallback(async (filters: TodoFilters) => {
    try {
      setLoading(true);
      setError(null);
      const filteredTodos = await todoService.getFilteredTodos(filters);
      setTodos(filteredTodos);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to filter todos');
    } finally {
      setLoading(false);
    }
  }, []);

  const refreshTodos = useCallback(async () => {
    await fetchTodos();
  }, [fetchTodos]);

  useEffect(() => {
    fetchTodos();
  }, [fetchTodos]);

  return {
    todos,
    loading,
    error,
    addTodo,
    updateTodo,
    deleteTodo,
    toggleTodo,
    filterTodos,
    refreshTodos,
  };
};
 