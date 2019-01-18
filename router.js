const logger = plug('logger');

this.name = function(req) { // tsw 提供的 name 方法
    // mod_act，logger 中会用到，截取 pathname 前两级路径
    const modAct = req.REQUEST.pathname.slice(1).split('/').filter((item) => {
        return item !== '';
    }).slice(0, 2).join('/');
    return modAct === '' ? '/' : modAct;
};

this.find = function(name, req, res) { // tsw 提供的路由 find 方法，直接转向 app
    return require('./app');
};
