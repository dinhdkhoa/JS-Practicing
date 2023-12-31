import html from "./core.js";
import { connect } from "./store.js";

const connector = connect();

function App(props) {
  console.log(props);
  return html`
    <ul>
      ${props.cars.map((car) => `<li>${car}</li>`)}
    </ul>
    <button onclick="dispatch('ADD', 'Porsche')">Add Car</button>
  `;
}
export default connector(App);
