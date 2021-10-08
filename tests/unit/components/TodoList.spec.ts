import { mount } from "@vue/test-utils";
import TodoList from "@/components/TodoList.vue";
import TodoItem from "@/components/TodoItem.vue";
import { ITodoItem } from "@/models/ITodoItem";

describe("TodoList component", () => {
  it("does not render ul if list is empty", () => {
    const wrapper = mount(TodoList, {
      propsData: {
        list: [],
      },
      stubs: {
        TodoItem: true,
      },
    });

    expect(wrapper.find("ul").exists()).toBe(false);
  });

  test("propagate child emit saveItem event", async () => {
    const list: ITodoItem[] = [
      { id: "0", task: "task #1", isCompleted: false },
    ];
    const wrapper = mount(TodoList, {
      propsData: {
        list,
      },
      stubs: {
        TodoItem: true,
      },
    });

    await wrapper.vm.$nextTick();

    wrapper
      .findComponent(TodoItem)
      .vm.$emit("saveItem", { id: "0", value: "task #2" });

    expect(wrapper.emitted("saveItem")).toBeTruthy();
  });
});
