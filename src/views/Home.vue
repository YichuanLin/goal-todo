<template>
  <div class="home">
    <TodoApp :list="list" :status="status" />
  </div>
</template>

<script>
// @ is an alias to /src
import TodoApp from "@/components/TodoApp.vue";

export default {
  name: "Home",
  components: {
    TodoApp,
  },
  data() {
    return {
      status: null,
      list: [
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
    };
  },
  watch: {
    $route(to, from) {
      this.status = to.params.status;
    },
  },
  mounted() {
    this.status = this.$route.params.status;
  },
};
</script>
