import { ITodoItem } from "@/models/ITodoItem";
import { Module, VuexModule, Mutation, Action } from "vuex-module-decorators";
import { IAddItem, ICheckedStatus } from "@/models/ITodoEdit";

const TASK_STATUS_FILTER = {
  COMPLETED: "completed",
  ACTIVE: "active",
  ALL: "all",
};

@Module
export default class TodoStoreModule extends VuexModule {
  todoList: ITodoItem[] = [
    {
      id: "0",
      task: "task 0",
      isCompleted: false,
    },
    {
      id: "1",
      task: "task 1",
      isCompleted: true,
    },
    {
      id: "2",
      task: "task 2",
      isCompleted: false,
    },
    {
      id: "3",
      task: "task 3",
      isCompleted: false,
    },
    {
      id: "4",
      task: "task 4",
      isCompleted: true,
    },
  ];

  @Mutation
  addTodo(todo: ITodoItem): void {
    this.todoList.push(todo);
  }

  @Mutation
  removeTodo(todo: ITodoItem): void {
    const index = this.todoList.indexOf(todo);
    this.todoList.splice(index, 1);
  }

  @Mutation
  toggleAllTodoState(state: boolean): void {
    this.todoList = this.todoList.map((todoItem: ITodoItem) => ({
      ...todoItem,
      isCompleted: state,
    }));
  }

  @Mutation
  clearCompleted(): void {
    this.todoList = this.todoList.filter(
      (todoItem: ITodoItem) => !todoItem.isCompleted
    );
  }

  @Mutation
  updateTodoToggle({ id, checked }: ICheckedStatus): void {
    const index = this.todoList.findIndex(
      (todoItem: ITodoItem) => todoItem.id === id
    );
    this.todoList[index].isCompleted = checked;
  }

  @Mutation
  updateTodoValue({ id, value }: IAddItem): void {
    const index = this.todoList.findIndex(
      (todoItem: ITodoItem) => todoItem.id === id
    );
    this.todoList[index].task = value;
  }

  get isTodoListEmpty(): boolean {
    return this.todoList.length === 0;
  }

  get uncompleteTasks(): number {
    return this.todoList.filter((item: ITodoItem) => !item.isCompleted).length;
  }

  get hasSomeTaskCompleted(): boolean {
    return this.todoList.some((item: ITodoItem) => item.isCompleted);
  }

  get filterTodoList() {
    return (filter: string): ITodoItem[] => {
      if (!filter || filter === TASK_STATUS_FILTER.ALL) {
        return this.todoList;
      }
      let status: boolean;
      if (filter === TASK_STATUS_FILTER.COMPLETED) {
        status = true;
      } else if (filter === TASK_STATUS_FILTER.ACTIVE) {
        status = false;
      }
      return this.todoList.filter(
        (item: ITodoItem) => item.isCompleted === status
      );
    };
  }

  get areAllTaskChecked(): boolean {
    return !this.todoList.some((item: ITodoItem) => !item.isCompleted);
  }
}
