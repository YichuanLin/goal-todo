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
