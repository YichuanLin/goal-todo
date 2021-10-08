<template>
  <div class="todoapp">
    <h1>todos</h1>
    <input
      type="text"
      class="new-todo"
      placeholder="What needs to be done? "
      ref="newTodo"
      autofocus
      v-model.trim="newTask"
      @keyup.enter="addTask"
    />
    <div class="main" v-if="!isEditListEmpty">
      <input
        class="toggle-all"
        type="checkbox"
        v-model="checkedAllTasks"
        @change="toggleAllTasks"
      />
      <label />
    </div>
    <TodoList
      :list="filterList"
      v-if="!isEditListEmpty"
      @toggleTask="updateToggleAllTasks"
      @removeItem="removeTask"
      @saveItem="saveItem"
    >
    </TodoList>
    <TodoFooter
      v-if="!isEditListEmpty"
      :count="uncompleteTasks"
      @clearCompleted="removeCompletedTasks"
      :hideClearButton="!hasSomeTaskCompleted"
    />
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import TodoList from "@/components/TodoList.vue";
import TodoItem from "@/components/TodoItem.vue";
import TodoFooter from "@/components/TodoFooter.vue";
import { ITodoItem } from "@/models/ITodoItem";
import { IAddItem, ICheckedStatus } from "@/models/ITodoEdit";

@Component({
  components: {
    TodoList,
    TodoItem,
    TodoFooter,
  },
})
export default class TodoApp extends Vue {
  @Prop({
    type: String,
  })
  readonly status!: string;

  checkedAllTasks = false;

  newTask = "";

  get filterList(): ITodoItem[] {
    return this.$store.getters.filterTodoList(this.status);
  }

  get isEditListEmpty(): boolean {
    return this.$store.getters.isTodoListEmpty;
  }

  get uncompleteTasks(): number {
    return this.$store.getters.uncompleteTasks;
  }

  get hasSomeTaskCompleted(): boolean {
    return this.filterList.some((item: ITodoItem) => item.isCompleted);
  }

  toggleAllTasks(): void {
    this.$store.commit("toggleAllTodoState", this.checkedAllTasks);
  }

  removeCompletedTasks(): void {
    this.$store.commit("clearCompleted");
    this.checkedAllTasks = false;
  }

  updateToggleAllTasks(item: ITodoItem): void {
    this._updateTask(item);
    this.checkedAllTasks = this.$store.getters.areAllTaskChecked;
  }

  private _updateTask(newItem: ITodoItem): void {
    const payload: ICheckedStatus = {
      id: newItem.id,
      checked: newItem.isCompleted,
    };
    this.$store.commit("updateTodoToggle", payload);
  }

  saveItem(item: ITodoItem): void {
    const payload: IAddItem = {
      id: item.id,
      value: item.task,
    };
    this.$store.commit("updateTodoValue", payload);
  }

  addTask(): void {
    if (this.newTask.length) {
      const item: ITodoItem = {
        id: "",
        task: this.newTask,
        isCompleted: false,
      };
      this.$store.commit("addTodo", item);
      this.newTask = "";
    }
  }

  removeTask(removeItem: ITodoItem): void {
    this.$store.commit("removeTodo", removeItem);
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
