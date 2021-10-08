import Vuex, { Store } from "vuex";
import { createLocalVue } from "@vue/test-utils";

import TodoStoreModule from "@/store/todo";
import { ITodoItem } from "@/models/ITodoItem";

const localVue = createLocalVue();
localVue.use(Vuex);

const storeOptions = {
  modules: {
    todoStore: TodoStoreModule,
  },
  store: {
    todoList: [
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
    ],
  },
};

const createStore = (storeOptions: any = {}) =>
  new Vuex.Store({ ...storeOptions });

describe("TodoStoreModule", () => {
  let store: Store<any>;

  beforeEach(() => {
    store = createStore(storeOptions);
  });

  describe("mutations", () => {
    it("addTodo", () => {
      expect(store.state.todoList).toHaveLength(5);
      const payload: ITodoItem = {
        id: "0",
        task: "task #0",
        isCompleted: false,
      };
      store.commit("addTodo", payload);
      expect(store.state.todoList).toHaveLength(6);
    });

    it("removeTodo", () => {
      expect(store.state.todoList).toHaveLength(5);
      const payload: ITodoItem = {
        id: "3",
        task: "task 3",
        isCompleted: false,
      };
      store.commit("addTodo", payload);
      expect(store.state.todoList).toHaveLength(4);
    });

    describe("toggleAllTodoState", () => {
      it("checked all task", () => {
        const getCompletedTasks = () =>
          store.state.todoList.filter((item: ITodoItem) => item.isCompleted);
        expect(getCompletedTasks()).toHaveLength(2);
        store.commit("toggleAllTodoState");
        expect(getCompletedTasks()).toHaveLength(5);
      });

      it("unchecked all task", () => {
        const getUncompletedTasks = () =>
          store.state.todoList.filter((item: ITodoItem) => item.isCompleted);
        expect(getUncompletedTasks()).toHaveLength(3);
        store.commit("toggleAllTodoState");
        expect(getUncompletedTasks()).toHaveLength(5);
      });
    });

    test("clearCompleted", () => {
      expect(store.state.todoList).toHaveLength(5);
      const completedTasks = store.state.todoList.filter(
        (item: ITodoItem) => item.isCompleted
      );
      expect(completedTasks).toHaveLength(2);
      store.commit("clearCompleted");
      expect(store.state.todoList).toHaveLength(3);
    });

    test("updateTodoToggle", () => {
      const payload = { id: 2, checked: true };

      expect(store.state.todoList[2].isCompleted).toBe(false);
      store.commit("updateTodoToggle", payload);
      expect(store.state.todoList[2].isCompleted).toBe(true);
    });

    test("updateTodoValue", () => {
      const payload = { id: 2, value: "task #change" };

      expect(store.state.todoList[2].task).toEqual("task 2");
      store.commit("updateTodoValue", payload);
      expect(store.state.todoList[2].task).toEqual("task #change");
    });
  });

  describe("getters", () => {
    it("isTodoListEmpty", () => {
      expect(store.getters["isTodoListEmpty"]).toBe(false);

      store.state.todoList = [];
      expect(store.getters["isTodoListEmpty"]).toBe(true);
    });

    it("uncompleteTasks", () => {
      expect(store.getters["uncompleteTasks"]).toBe(3);

      store.state.todoList[4].isCompleted = false;
      expect(store.getters["uncompleteTasks"]).toBe(4);
    });

    describe("filterTodoList", () => {
      it("returns a function", () => {
        expect(typeof store.getters["filterTodoList"]).toBe("function");
      });

      test("function returns all tasks", () => {
        const filterTodoList = store.getters["filterTodoList"];
        expect(filterTodoList("all")).toHaveLength(5);
      });

      test("function returns completed tasks", () => {
        const filterTodoList = store.getters["filterTodoList"];
        expect(filterTodoList("completed")).toHaveLength(2);
      });

      test("function returns active tasks", () => {
        const filterTodoList = store.getters["filterTodoList"];
        expect(filterTodoList("completed")).toHaveLength(3);
      });
    });

    it("areAllTaskChecked", () => {
      expect(store.getters["areAllTaskChecked"]).toBe(false);

      store.state.todoList = store.state.todoList.map(
        ({ id, task }: ITodoItem) => ({
          id,
          task,
          isCompleted: true,
        })
      );
      expect(store.getters["areAllTaskChecked"]).toBe(true);
    });
  });
});
