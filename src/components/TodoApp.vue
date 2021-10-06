<template>
  <div class="todoapp">
    <h1>todos</h1>
    <input
      class="new-todo"
      placeholder="What needs to be done? "
      ref="newTodo"
      autofocus
      v-model.trim="newTask"
      @keyup.enter="addTask"
    />
    <div class="main" v-if="!isListEmpty">
      <input
        class="toggle-all"
        type="checkbox"
        v-model="checkedAllTasks"
        @change="toggleAllTasks"
      />
      <label />
    </div>
    <TodoList
      :list="list"
      v-if="!isListEmpty"
      @toggleTask="updateToggleAllTasks"
      @removeItem="removeTask"
    >
      <template #default="slotProps">
        <TodoItem :inputItem="slotProps.item" />
      </template>
    </TodoList>
    <TodoFooter
      v-if="!isListEmpty"
      :count="uncompleteTasks"
      @clearCompleted="removeCompletedTasks"
      :hideClearButton="!hasSomeTaskCompleted"
    />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import TodoList from "@/components/TodoList.vue";
import TodoItem from "@/components/TodoItem.vue";
import TodoFooter from "@/components/TodoFooter.vue";
import { ITodoItem } from "@/models/ITodoItem";

const inputList = [
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
];

@Component({
  components: {
    TodoList,
    TodoItem,
    TodoFooter,
  },
})
export default class TodoApp extends Vue {
  list: ITodoItem[] = inputList;

  checkedAllTasks = false;

  newTask = "";

  get isListEmpty(): boolean {
    return this.list.length === 0;
  }

  get uncompleteTasks(): number {
    return this.list.filter((item: ITodoItem) => !item.isCompleted).length;
  }

  get hasSomeTaskCompleted(): boolean {
    return this.list.some((item: ITodoItem) => item.isCompleted);
  }

  toggleAllTasks(): void {
    this.list = this.list.map((item: ITodoItem) => ({
      ...item,
      isCompleted: this.checkedAllTasks,
    }));
  }

  removeCompletedTasks(): void {
    this.list = this.list.filter((item: ITodoItem) => !item.isCompleted);
    this.checkedAllTasks = false;
  }

  updateToggleAllTasks(item: ITodoItem): void {
    this._updateTask(item);
    this.checkedAllTasks = !this.list.some(
      (item: ITodoItem) => !item.isCompleted
    );
  }

  private _updateTask(newItem: ITodoItem): void {
    const index = this.list.findIndex(
      (item: ITodoItem) => item.id === newItem.id
    );
    this.list[index] = newItem;
    this.list = [...this.list];
  }

  addTask(): void {
    if (this.newTask.length) {
      const item: ITodoItem = {
        id: `${this.list.length + 1}`,
        task: this.newTask,
        isCompleted: false,
      };
      this.list = [...this.list, item];
      this.newTask = "";
    }
  }

  removeTask(removeItem: ITodoItem): void {
    const index = this.list.findIndex(
      (item: ITodoItem) => item.id === removeItem.id
    );
    this.list.splice(index, 1);
    this.list = [...this.list];
  }
}
</script>

<style scoped>
.todoapp {
  background: #fff;
  margin: 130px 0 40px 0;
  position: relative;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.2), 0 25px 50px 0 rgba(0, 0, 0, 0.1);
}

.todoapp input::-webkit-input-placeholder {
  font-style: italic;
  font-weight: 300;
  color: #e6e6e6;
}

.todoapp input::-moz-placeholder {
  font-style: italic;
  font-weight: 300;
  color: #e6e6e6;
}

.todoapp input::input-placeholder {
  font-style: italic;
  font-weight: 300;
  color: #e6e6e6;
}

.todoapp h1 {
  position: absolute;
  top: -155px;
  width: 100%;
  font-size: 100px;
  font-weight: 100;
  text-align: center;
  color: rgba(175, 47, 47, 0.15);
  -webkit-text-rendering: optimizeLegibility;
  -moz-text-rendering: optimizeLegibility;
  text-rendering: optimizeLegibility;
}

.new-todo,
.edit {
  position: relative;
  margin: 0;
  width: 100%;
  font-size: 24px;
  font-family: inherit;
  font-weight: inherit;
  line-height: 1.4em;
  border: 0;
  color: inherit;
  padding: 6px;
  border: 1px solid #999;
  box-shadow: inset 0 -1px 5px 0 rgba(0, 0, 0, 0.2);
  box-sizing: border-box;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.new-todo {
  padding: 16px 16px 16px 60px;
  border: none;
  background: rgba(0, 0, 0, 0.003);
  box-shadow: inset 0 -2px 1px rgba(0, 0, 0, 0.03);
}

.main {
  position: relative;
  z-index: 2;
  border-top: 1px solid #e6e6e6;
}

.toggle-all {
  text-align: center;
  border: none; /* Mobile Safari */
  opacity: 0;
  position: absolute;

  /* added later */
  width: 60px;
  height: 34px;
  top: -52px;
  left: -13px;
  z-index: 1;
}

.toggle-all + label {
  width: 60px;
  height: 34px;
  font-size: 0;
  position: absolute;
  top: -52px;
  left: -13px;
  -webkit-transform: rotate(90deg);
  transform: rotate(90deg);
}

.toggle-all + label:before {
  content: "❯";
  font-size: 22px;
  color: #e6e6e6;
  padding: 10px 27px 10px 27px;
}

.toggle-all:checked + label:before {
  color: #737373;
}

@media screen and (-webkit-min-device-pixel-ratio: 0) {
  .toggle-all {
    background: none;
  }
}
</style>
