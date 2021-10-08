import { mount } from "@vue/test-utils";
import TodoItem from "@/components/TodoItem.vue";

describe("TodoItem component", () => {
  describe("Init props", () => {
    test("renders properly value property", () => {
      const wrapper = mount(TodoItem, {
        propsData: {
          value: "task #1",
          checked: true,
          id: "1",
        },
      });

      expect(wrapper.text()).toContain("task #1");
    });

    test("init checked true", () => {
      const wrapper = mount(TodoItem, {
        propsData: {
          value: "task #1",
          checked: true,
          id: "1",
        },
      });

      const container = wrapper.find(".todo-item");

      expect(container.classes("completed")).toBeTruthy();
    });

    test("init checked false", () => {
      const wrapper = mount(TodoItem, {
        propsData: {
          value: "task #1",
          checked: false,
          id: "1",
        },
      });

      const container = wrapper.find(".todo-item");

      expect(container.classes("completed")).toBeFalsy();
    });
  });

  describe("Edit mode", () => {
    it("adds editing class when edit mode is enabled", async () => {
      const wrapper = mount(TodoItem, {
        propsData: {
          value: "task #1",
          checked: true,
          id: "1",
        },
      });

      await wrapper.find(".view").trigger("dblclick");

      const container = wrapper.find(".todo-item");

      expect(container.classes("editing")).toBeTruthy();
    });

    test("text input replaces label when edit mode is enabled", async () => {
      const wrapper = mount(TodoItem, {
        propsData: {
          value: "task #1",
          checked: true,
          id: "1",
        },
      });

      await wrapper.find(".view").trigger("dblclick");

      expect(wrapper.find(".view").exists()).toBe(false);

      expect(wrapper.find(".edit").isVisible()).toBe(true);
    });

    it("emits changeEditMode event when edit mode is enabled", async () => {
      const wrapper = mount(TodoItem, {
        propsData: {
          value: "task #1",
          checked: true,
          id: "1",
        },
      });

      expect(wrapper.emitted("changeEditMode")).toBeFalsy();

      await wrapper.find(".view").trigger("dblclick");

      expect(wrapper.emitted("changeEditMode")).toBeTruthy();
    });

    test("exit edit mode pressing the key enter", async () => {
      const wrapper = mount(TodoItem, {
        propsData: {
          value: "task #1",
          checked: true,
          id: "1",
        },
      });

      wrapper.setData({ editMode: true });

      await wrapper.vm.$nextTick();

      await wrapper.find(".edit").trigger("keyup.enter");

      expect(wrapper.find(".view").exists()).toBe(true);

      expect(wrapper.find(".edit").exists()).toBe(false);
    });

    test("exit edit mode pressing the key esc", async () => {
      const wrapper = mount(TodoItem, {
        propsData: {
          value: "task #1",
          checked: true,
          id: "1",
        },
      });

      wrapper.setData({ editMode: true });

      await wrapper.vm.$nextTick();

      await wrapper.find(".edit").trigger("keyup.esc");

      expect(wrapper.find(".view").exists()).toBe(true);

      expect(wrapper.find(".edit").exists()).toBe(false);
    });

    test("exit edit mode on blur input text", async () => {
      const wrapper = mount(TodoItem, {
        propsData: {
          value: "task #1",
          checked: true,
          id: "1",
        },
      });

      wrapper.setData({ editMode: true });

      await wrapper.vm.$nextTick();

      await wrapper.find(".edit").trigger("blur");

      expect(wrapper.find(".view").exists()).toBe(true);

      expect(wrapper.find(".edit").exists()).toBe(false);
    });
  });

  describe("Change task values", () => {
    it("does not change task value if press esc", async () => {
      const wrapper = mount(TodoItem, {
        propsData: {
          value: "task #1",
          checked: true,
          id: "1",
        },
      });

      // Simulate input text change on edit mode
      wrapper.setData({
        editMode: true,
        editValue: "task #2",
        temporalEditValue: "task #1",
      });

      await wrapper.vm.$nextTick();

      await wrapper.find(".edit").trigger("keyup.esc");

      expect(wrapper.find(".view").text()).toEqual("task #1");
    });

    it("changes task value if press enter", async () => {
      const wrapper = mount(TodoItem, {
        propsData: {
          value: "task #1",
          checked: true,
          id: "1",
        },
      });

      // Simulate input text change on edit mode
      wrapper.setData({
        editMode: true,
        editValue: "task #2",
        temporalEditValue: "task #1",
      });

      await wrapper.vm.$nextTick();

      await wrapper.find(".edit").trigger("keyup.enter");

      expect(wrapper.find(".view").text()).toEqual("task #2");
    });

    it("changes task value if focus out input", async () => {
      const wrapper = mount(TodoItem, {
        propsData: {
          value: "task #1",
          checked: true,
          id: "1",
        },
      });

      // Simulate input text change on edit mode
      wrapper.setData({
        editMode: true,
        editValue: "task #2",
        temporalEditValue: "task #1",
      });

      await wrapper.vm.$nextTick();

      await wrapper.find(".edit").trigger("blur");

      expect(wrapper.find(".view").text()).toEqual("task #2");
    });
  });

  test("dispatch remove task event on click remove element", async () => {
    const wrapper = mount(TodoItem, {
      propsData: {
        value: "task #1",
        checked: true,
        id: "1",
      },
    });

    expect(wrapper.emitted("removeItem")).toBeFalsy();

    await wrapper.find(".destroy").trigger("click");

    expect(wrapper.emitted("removeItem")).toBeTruthy();
  });

  test("dispatch toggle checked task event on click checkbox", async () => {
    const wrapper = mount(TodoItem, {
      propsData: {
        value: "task #1",
        checked: false,
        id: "1",
      },
    });

    expect(wrapper.emitted("toggleChecked")).toBeFalsy();

    await wrapper.find(".toggle").trigger("click");

    expect(wrapper.emitted("toggleChecked")).toBeTruthy();
  });
});
