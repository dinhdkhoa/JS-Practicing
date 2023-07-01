import { getFromLS, saveToLS } from "./utils/storage.js";

const initData = {
  todos: getFromLS(),
  editIndex: null,
  filter: "all",
  filters: {
    all: () => true,
    active: (todo) => todo.completed === false,
    completed: (todo) => todo.completed === true
  }
};

const actions = {
  // add: (state, [title]) => {
  //   return {
  //     ...state,
  //     todos: [
  //       ...state.todos,
  //       {
  //         title,
  //         completed: false
  //       }
  //     ]
  //   };
  // }
  add: ({ todos }, title) => {
    todos.push({ title, completed: false });
    saveToLS(todos);
  },
  toggle: ({ todos }, index) => {
    const todo = todos[index];
    todo.completed = !todo.completed;
    saveToLS(todos);
  },
  toggleAll: ({ todos }, checked) => {
    todos.forEach((todo) => (todo.completed = checked));
    saveToLS(todos);
  },
  delete: ({ todos }, index) => {
    todos.splice(index, 1);
    saveToLS(todos);
  },
  deleteAllCompleted: (state) => {
    state.todos = state.todos.filter(state.filters.active);
    saveToLS(state.todos);
  },
  switchFilter: (state, key) => {
    state.filter = key;
  },
  setEditIndex: (state, index) => {
    state.editIndex = index;
  },
  edit: (state, editTitle) => {
    if (state.editIndex !== null) {
      if (editTitle) {
        state.todos[state.editIndex].title = editTitle;
      } else {
        state.todos.splice(state.editIndex, 1);
      }
      state.editIndex = null;
      saveToLS(state.todos);
    }
  },
  stopEdit: (state) => {
    state.editIndex = null;
  }
};

export function reducer(state = initData, action, args) {
  actions[action] && actions[action](state, ...args);
  return state;
}
