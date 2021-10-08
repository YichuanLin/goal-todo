<template>
  <div :data-id="id" class="todo-item" :class="_getItemClasses()">
    <input
      class="toggle"
      type="checkbox"
      :value="id"
      v-model="editChecked"
      @change="toggleChecked"
    />
    <label
      class="view"
      @dblclick.prevent="changeEditMode(true)"
      v-if="!editMode"
    >
      {{ editValue }}
    </label>
    <input
      type="text"
      v-focus
      v-else
      ref="editInput"
      class="edit"
      v-model.trim="editValue"
      @keyup.enter="$event.target.blur()"
      @blur="_updateValue"
      @keyup.esc="resetItem"
    />
    <span class="destroy" @click="removeItem" />
  </div>
</template>

<script lang="ts">
import { Component, Prop, Ref, Emit, Watch, Vue } from "vue-property-decorator";
import { IAddItem, ICheckedStatus, IEditMode } from "@/models/ITodoEdit";

@Component({
  directives: {
    focus: {
      inserted: function (el) {
        el.focus();
      },
    },
  },
})
export default class TodoItem extends Vue {
  @Prop({ type: String }) readonly id!: string;

  @Prop({ type: Boolean }) checked!: boolean;

  @Prop({ type: String }) value!: string;

  @Ref() readonly editInput!: HTMLInputElement;

  editMode = false;

  editValue = "";

  editChecked = false;

  temporalEditValue = "";

  constructor() {
    super();
    this.editValue = this.value;
    this.editChecked = this.checked;
  }

  @Emit("changeEditMode")
  changeEditMode(mode: boolean): IEditMode {
    if (mode) {
      this.temporalEditValue = this.editValue;
    }
    this.editMode = mode;
    return {
      id: this.id,
      mode,
    };
  }

  @Emit("resetItem")
  resetItem(): void {
    this.editValue = this.temporalEditValue;
    this.changeEditMode(false);
  }

  @Emit("removeItem")
  removeItem(): string {
    return this.id;
  }

  @Emit("saveItem")
  saveItem(): IAddItem {
    this.changeEditMode(false);
    return {
      id: this.id,
      value: this.editValue,
    };
  }

  @Emit("toggleChecked")
  toggleChecked(): ICheckedStatus {
    return {
      id: this.id,
      checked: this.editChecked,
    };
  }

  @Watch("value")
  onValueChange(): void {
    this.editValue = this.value;
  }

  @Watch("checked")
  onCheckedChange(): void {
    this.editChecked = this.checked;
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  _getItemClasses(): any {
    return {
      completed: this.editChecked,
      editing: this.editMode,
    };
  }

  _updateValue(): void {
    if (this.editValue.length) {
      this.saveItem();
    } else {
      this.removeItem();
    }
  }
}
</script>

<style scoped>
/*.todo-list li .toggle {*/
.toggle {
  text-align: center;
  width: 40px;
  /* auto, since non-WebKit browsers doesn't support input styling */
  height: auto;
  position: absolute;
  top: 0;
  bottom: 0;
  margin: auto 0;
  border: none; /* Mobile Safari */
  -webkit-appearance: none;
  appearance: none;
}

/*.todo-list li .toggle {*/
.toggle {
  opacity: 0;
}

/*.todo-list li .toggle + label {*/
.toggle + label {
  /*
    Firefox requires `#` to be escaped - https://bugzilla.mozilla.org/show_bug.cgi?id=922433
    IE and Edge requires *everything* to be escaped to render, so we do that instead of just the `#` - https://developer.microsoft.com/en-us/microsoft-edge/platform/issues/7157459/
  */
  background-image: url("data:image/svg+xml;utf8,%3Csvg%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%20width%3D%2240%22%20height%3D%2240%22%20viewBox%3D%22-10%20-18%20100%20135%22%3E%3Ccircle%20cx%3D%2250%22%20cy%3D%2250%22%20r%3D%2250%22%20fill%3D%22none%22%20stroke%3D%22%23ededed%22%20stroke-width%3D%223%22/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: center left;
}

/*.todo-list li .toggle:checked + label {*/
.toggle:checked + label {
  background-image: url("data:image/svg+xml;utf8,%3Csvg%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%20width%3D%2240%22%20height%3D%2240%22%20viewBox%3D%22-10%20-18%20100%20135%22%3E%3Ccircle%20cx%3D%2250%22%20cy%3D%2250%22%20r%3D%2250%22%20fill%3D%22none%22%20stroke%3D%22%23bddad5%22%20stroke-width%3D%223%22/%3E%3Cpath%20fill%3D%22%235dc2af%22%20d%3D%22M72%2025L42%2071%2027%2056l-4%204%2020%2020%2034-52z%22/%3E%3C/svg%3E");
}

/*.todo-list li label {*/
label {
  word-break: break-all;
  padding: 15px 15px 15px 60px;
  display: block;
  line-height: 1.2;
  transition: color 0.4s;
}

/*.todo-list li .destroy {*/
.destroy {
  display: none;
  position: absolute;
  top: 0;
  right: 10px;
  bottom: 0;
  width: 40px;
  height: 40px;
  margin: auto 0;
  font-size: 30px;
  color: #cc9a9a;
  margin-bottom: 11px;
  transition: color 0.2s ease-out;

  /* added later */
  text-align: center;
  line-height: 40px;
}

/*.todo-list li .destroy:hover {*/
.destroy:hover {
  color: #af5b5e;
}

/*.todo-list li .destroy:after {*/
.destroy:after {
  content: "×";
}

/* changed later */
/* .todo-list li:hover .destroy { */
/*.todo-list li:hover label + .destroy {*/
.todo-item:not(.editing):hover .destroy {
  display: block;
}

/*.todo-list li .edit {*/
.edit {
  display: none;
}

/*.todo-list li.completed label {*/
.todo-item.completed label {
  color: #d9d9d9;
  text-decoration: line-through;
}

/*.todo-list li.editing .edit {*/
.todo-item.editing .edit {
  display: block;
  width: 506px;
  padding: 12px 16px;
  margin: 0 0 0 43px;

  /* added later */
  box-sizing: border-box;
}

/*.todo-list li.editing .view {*/
.todo-item.editing .view {
  display: none;
}

@media screen and (-webkit-min-device-pixel-ratio: 0) {
  .todo-list li .toggle {
    background: none;
  }

  .todo-list li .toggle {
    height: 40px;
  }
}
</style>
