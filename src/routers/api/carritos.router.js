import CustomRouter from "../../helpers/router.helper.js";

class CarritosRouter extends CustomRouter {
  constructor() {
    super();
    this.init;
  }
  init = () => {};
}

const carritosRouter = new CarritosRouter().getRouter();
 export default carritosRouter;
