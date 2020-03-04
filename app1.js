const vm = new Vue({
  el: '#app',
  data: {
    items: [],
    newItemTitle: '',
  },
  methods: {
    addTodo() {
      this.items.unshift({
        title: this.newItemTitle,
        isChecked: false,
      });
      this.newItemTitle = '';
      this.saveTodo();
    },
    deleteTodo() {
      this.items = this.items.filter(function (item) {
        return item.isChecked === false;
      });
      this.saveTodo();
    },
    saveTodo() {
      localStorage.setItem('items', JSON.stringify(this.items));
    },
    loadTodo() {
      this.items = JSON.parse(localStorage.getItem('items'));
      if (!this.items) {
        this.items = [];
      }
    },
  },
  mounted() {
    this.loadTodo();
  },
})