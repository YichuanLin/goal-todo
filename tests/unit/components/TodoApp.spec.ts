import { mount, createLocalVue } from "@vue/test-utils";
import TodoApp from "@/components/TodoApp.vue";
import Vuex, { Store } from "vuex";

const localVue = createLocalVue();

localVue.use(Vuex);

interface ILooseObject {
  [key: string]: any;
}

describe("TodoApp component", () => {
  let getters: ILooseObject;
  let mutations: ILooseObject;
  let store: Store<any>;

  beforeEach(() => {
    getters = {
      filterTodoList: jest.fn(),
    };

    mutations = {
      addTodo: jest.fn(),
      toggleAllTodoState: jest.fn(),
    };

    store = new Vuex.Store({
      getters,
      mutations,
      state: {},
    });
  });

  it("hides todo list and footer when todo list is empty", () => {
    getters.filterTodoList.mockReturnValue(() => () => []);
    const wrapper = mount(TodoApp, {
      stubs: {
        TodoList: true,
        TodoFooter: true,
      },
      computed: {
        filterList() {
          return [];
        },
      },
      store,
      localVue,
    });

    expect(wrapper.find(".todo-list").exists()).toBe(false);
    expect(wrapper.find("footer").exists()).toBe(false);
  });

  it("emits addTodo commit when add new task", async () => {
    const spy = jest.spyOn(mutations, "addTodo");
    getters.filterTodoList.mockReturnValue(() => () => []);
    const wrapper = mount(TodoApp, {
      stubs: {
        TodoList: true,
        TodoFooter: true,
      },
      computed: {
        filterList() {
          return [];
        },
      },
      store,
      localVue,
    });

    const expectedPayload = expect.objectContaining({
      id: expect.any(String),
      task: expect.any(String),
      isCompleted: expect.any(Boolean),
    });

    const expectedArguments = [expect.any(Object), expectedPayload];

    wrapper.setData({ newTask: "task #999" });

    await wrapper.vm.$nextTick();

    await wrapper.find(".new-todo").trigger("keyup.enter");

    expect(spy).toHaveBeenCalledWith(...expectedArguments);
  });

  it("emits toggleAllTodoState commit when toggle all tasks state", async () => {
    const spy = jest.spyOn(mutations, "toggleAllTodoState");
    getters.filterTodoList.mockReturnValue(() => () => []);
    const wrapper = mount(TodoApp, {
      stubs: {
        TodoList: true,
        TodoFooter: true,
      },
      computed: {
        filterList() {
          return [];
        },
      },
      store,
      localVue,
    });

    const expectedPayload = true;

    const expectedArguments = [expect.any(Object), expectedPayload];

    await wrapper.find(".toggle-all").trigger("click");

    expect(spy).toHaveBeenCalledWith(...expectedArguments);
  });
});
