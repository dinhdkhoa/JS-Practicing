export default function html([first, ...strings], ...values) {
  return values
    .reduce((acc, curr) => acc.concat(curr, strings.shift()), [first])
    .filter((htmlItem) => (htmlItem && htmlItem !== true) || htmlItem === 0)
    .join("");
}

export function creatStore(reducer) {
  let state = reducer();
  let roots = new Map();

  function render() {
    for (const [root, component] of roots) {
      const output = component();
      root.innerHTML = output;
    }
  }

  return {
    attach(component, root) {
      roots.set(root, component);
      render();
    },
    dispatch(action, ...args) {
      state = reducer(state, action, args);
      render();
    },
    connect(selector = (state) => state) {
      return (component) =>
        (props, ...args) =>
          component(Object.assign({}, props, selector(state), ...args));
    }
  };
}
