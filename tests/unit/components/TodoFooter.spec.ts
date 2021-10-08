import { mount, RouterLinkStub } from "@vue/test-utils";
import TodoFooter from "@/components/TodoFooter.vue";

describe("TodoFooter component", () => {
  test("clear completed button is rendered", () => {
    const wrapper = mount(TodoFooter, {
      propsData: {
        count: 0,
        hideClearButton: false,
      },
      stubs: {
        RouterLink: RouterLinkStub,
      },
    });

    expect(wrapper.find(".clear-completed").isVisible()).toBe(true);
  });

  test("clear completed button is not rendered", () => {
    const wrapper = mount(TodoFooter, {
      propsData: {
        count: 0,
        hideClearButton: true,
      },
      stubs: {
        RouterLink: RouterLinkStub,
      },
    });

    expect(wrapper.find(".clear-completed").isVisible()).toBe(false);
  });

  it("emit an event when click on clear completed button", () => {
    const wrapper = mount(TodoFooter, {
      propsData: {
        count: 0,
        hideClearButton: false,
      },
      stubs: {
        RouterLink: RouterLinkStub,
      },
    });

    wrapper.find(".clear-completed").trigger("click");

    expect(wrapper.emitted("clearCompleted")).toBeTruthy();
  });
});
