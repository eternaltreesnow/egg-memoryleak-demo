const Controller = require('egg').Controller;

class HomeController extends Controller {
  async index() {
    this.ctx.body = 'Egg-core Memory-leak Demo';
  }
}

module.exports = HomeController;
