// Todo types based on JSONPlaceholder API structure
export interface Todo {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}

export interface CreateTodoRequest {
  title: string;
  completed?: boolean;
  userId?: number;
}

export interface UpdateTodoRequest {
  title?: string;
  completed?: boolean;
}

export interface TodoFilters {
  userId?: number;
  completed?: boolean;
  search?: string;
}
