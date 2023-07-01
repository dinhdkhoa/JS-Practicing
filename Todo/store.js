import { creatStore } from "./core.js";
import logger from "./middleware/logger.js";
import { reducer } from "./reducer.js";

const { attach, connect, dispatch } = creatStore(logger(reducer));

window.dispatch = dispatch;

export { attach, connect };
