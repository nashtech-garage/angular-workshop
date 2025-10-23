import { Injectable, computed, signal } from '@angular/core';

interface Todo {
  id: number;
  title: string;
  completed: boolean;
}

@Injectable({ providedIn: 'root' })
export class SignalStoreService {
  private readonly todos = signal<Todo[]>([]);

  readonly total = computed(() => this.todos().length);
  readonly completed = computed(() => this.todos().filter((todo) => todo.completed).length);

  add(todo: Todo): void {
    this.todos.update((current) => [...current, todo]);
  }

  toggle(id: number): void {
    this.todos.update((current) =>
      current.map((todo) => (todo.id === id ? { ...todo, completed: !todo.completed } : todo)),
    );
  }

  all(): Todo[] {
    return this.todos();
  }
}
