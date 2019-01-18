const Controller = require('egg').Controller;
const heapdump = require('heapdump');

class HeapController extends Controller {
    async index() {
        this.write();
        this.ctx.body = 'write success';
    }

    write() {
        gc();
        heapdump.writeSnapshot(`./${Date.now()}.heapsnapshot`);
    }
}

module.exports = HeapController;
