import type {
  Todo,
  CreateTodoRequest,
  UpdateTodoRequest,
  TodoFilters,
} from '../types/todo';

const API_BASE_URL = 'https://jsonplaceholder.typicode.com';

class TodoService {
  private async request<T>(
    endpoint: string,
    options?: RequestInit
  ): Promise<T> {
    const url = `${API_BASE_URL}${endpoint}`;
    const response = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
      },
      ...options,
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return response.json();
  }

  // Get all todos
  async getAllTodos(): Promise<Todo[]> {
    return this.request<Todo[]>('/todos');
  }

  // Get todos by user ID
  async getTodosByUserId(userId: number): Promise<Todo[]> {
    return this.request<Todo[]>(`/todos?userId=${userId}`);
  }

  // Get a single todo by ID
  async getTodoById(id: number): Promise<Todo> {
    return this.request<Todo>(`/todos/${id}`);
  }

  // Create a new todo
  async createTodo(todo: CreateTodoRequest): Promise<Todo> {
    return this.request<Todo>('/todos', {
      method: 'POST',
      body: JSON.stringify(todo),
    });
  }

  // Update a todo
  async updateTodo(id: number, updates: UpdateTodoRequest): Promise<Todo> {
    return this.request<Todo>(`/todos/${id}`, {
      method: 'PUT',
      body: JSON.stringify({
        id,
        userId: 1, // Default user ID for JSONPlaceholder
        ...updates,
      }),
    });
  }

  // Patch a todo (partial update)
  async patchTodo(id: number, updates: UpdateTodoRequest): Promise<Todo> {
    return this.request<Todo>(`/todos/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(updates),
    });
  }

  // Delete a todo
  async deleteTodo(id: number): Promise<void> {
    await this.request(`/todos/${id}`, {
      method: 'DELETE',
    });
  }

  // Filter todos locally (since JSONPlaceholder doesn't support complex filtering)
  async getFilteredTodos(filters: TodoFilters): Promise<Todo[]> {
    const allTodos = await this.getAllTodos();

    return allTodos.filter(todo => {
      if (filters.userId !== undefined && todo.userId !== filters.userId) {
        return false;
      }
      if (
        filters.completed !== undefined &&
        todo.completed !== filters.completed
      ) {
        return false;
      }
      if (
        filters.search &&
        !todo.title.toLowerCase().includes(filters.search.toLowerCase())
      ) {
        return false;
      }
      return true;
    });
  }
}

export const todoService = new TodoService();
