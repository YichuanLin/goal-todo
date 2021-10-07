<template>
  <ul class="todo-list" v-if="!isEditListEmpty">
    <li
      v-for="item in editList"
      :key="item.id"
      :class="_getListItemClasses(item)"
    >
      <TodoItem
        :id="item.id"
        :checked="item.isChecked"
        :value="item.value"
        @saveItem="saveItem"
        @removeItem="removeItem"
        @toggleChecked="toggleTask"
      />
    </li>
  </ul>
</template>

<script lang="ts">
import { Component, Prop, Emit, Watch, Vue } from "vue-property-decorator";
import { ITodoItem } from "@/models/ITodoItem";
import { ITodoEditItem } from "@/models/ITodoEditItem";
import TodoItem from "@/components/TodoItem.vue";
import { IAddItem, ICheckedStatus } from "@/models/ITodoEdit";

@Component({
  components: {
    TodoItem,
  },
})
export default class TodoList extends Vue {
  @Prop({
    type: Array,
  })
  readonly list!: ITodoItem[];

  editList: ITodoEditItem[] = [];

  mounted(): void {
    this._initEditList();
  }

  get isEditListEmpty(): boolean {
    if (!this.list) {
      return true;
    }
    return this.editList.length === 0;
  }

  @Emit("toggleTask")
  toggleTask({ id, checked }: ICheckedStatus): ITodoItem {
    const toggleItem = this._findItemById(id);

    return {
      ...toggleItem,
      isCompleted: checked,
    };
  }

  @Emit("removeItem")
  removeItem(id: string): ITodoItem {
    return this._findItemById(id);
  }

  @Emit("saveItem")
  saveItem({ id, value }: IAddItem): ITodoItem {
    const saveItem = this._findItemById(id);

    return {
      ...saveItem,
      task: value,
    };
  }

  @Watch("list")
  onListChange(): void {
    this._initEditList();
  }

  _findItemById(id: string): ITodoItem {
    const foundItem = this.list.find((item: ITodoItem) => item.id === id);

    if (!foundItem) {
      throw new Error(`Item not found with id: ${id}`);
    }

    return foundItem;
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  _getListItemClasses(item: ITodoEditItem): any {
    return {
      completed: item.isChecked,
      editing: item.editMode,
    };
  }

  private _initEditList(): void {
    this.editList = this.list.map((item: ITodoItem): ITodoEditItem => {
      const { id, task, isCompleted } = item;
      return {
        id,
        value: task,
        isChecked: isCompleted,
        editMode: false,
      };
    });
  }
}
</script>

<style scoped>
.todo-list {
  margin: 0;
  padding: 0;
  list-style: none;
}

.todo-list li {
  position: relative;
  font-size: 24px;
  border-bottom: 1px solid #ededed;
}

.todo-list li:last-child {
  border-bottom: none;
}

.todo-list li.editing {
  border-bottom: none;
  padding: 0;
}

.todo-list li.editing:last-child {
  margin-bottom: -1px;
}
</style>
