import { creatStore } from "./core.js";
import { reducer } from "./reducer.js";

const { attach, connect, dispatch } = creatStore(reducer);

window.dispatch = dispatch;

export { attach, connect };
