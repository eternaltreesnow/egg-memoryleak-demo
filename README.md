# egg-memoryleak-demo
## 启动步骤
#### 1. 下载项目并安装
 * 安装  -- `git clone https://github.com/eternaltreesnow/egg-memoryleak-demo.git`
 * 补全依赖  -- `yarn install || npm install`

#### 2. 下载TSW并安装
 * 需先安装Node.js，并且Node.js的版本需不低于8.0.0。
 * 安装 -- `git clone https://github.com/Tencent/TSW.git`
 * 切换工作目录 -- `cd TSW`
 * 补全依赖 -- `npm install`
 
#### 3. 配置TSW映射到项目
 * 修改 TSW/config/config.js
```
// workplaceDir为工作目录路径
module.exports = require('${workplaceDir}/egg-memoryleak-demo/config.js');
```

#### 4. 启动和使用
 * 切换到TSW工作目录 -- `node --inspect index.js`
 * `127.0.0.1:8086` -- 测试路径
 * `127.0.0.1:8086/heapdump` -- 打印内存快照

## 问题复现
 1. 启动demo之后，正常访问 `127.0.0.1:8086`, 并打印初始heapdump`normal-0.heapsnapshot`
 2. 访问1000次后，打印heapdump `normal-1.heapsnapshot`
 3. 使用ab压测 100K 次后，打印heapdump `abtest-1.heapsnapshot`
 4. 此时使用 `top -pid ${pid}` 可以观察到 MEM占用急剧上升，且在压测结束后，MEM未被释放
 5. 使用 `Chrome-devtool` 分析heapsnapshot, 使用comparison视图，在`string`类型下能够查看到大量`Before Start in /Users/dickzheng/Documents/workplace/TSW-git/bin/proxy/http.route.js:561:28`被`egg-core`的`timing`对象占用，且从未进行过Deleted。
 
## 问题修复
 1. 修改`egg-core`中`Timing.js`对属性的占用即可修复。
 1. 由于`egg-core`未提供`timing`特性的外部控制参数，因此正式环境需要将`egg-core`降级到 `egg-core@4.7.0` 版本。
