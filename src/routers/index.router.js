import CustomRouter from "../helpers/router.helper.js";
import viewsRouter from "./views.router.js";
import apiRouter from "./api.router.js";

class IndexRouter extends CustomRouter {
  constructor() {
    super();
    this.init();
  }
  init = () => {
    this.use("/", viewsRouter);
    this.use("/api", apiRouter);
  };
}
const indexRouter = new IndexRouter().getRouter();
export default indexRouter;
