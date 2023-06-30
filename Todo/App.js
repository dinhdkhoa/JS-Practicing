import Footer from "./components/Footer.js";
import Header from "./components/Header.js";
import TodoList from "./components/TodoList.js";
import html from "./core.js";
import { connect } from "./store.js";

const connector = connect();

function App() {
  return html` <section class="todoapp">
    ${Header} ${TodoList}${Footer}
  </section>`;
}

export default connector(App);
