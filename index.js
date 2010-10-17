exports.Proxy = require('./node-mjpeg-proxy').Proxy;
exports.createProxy = function (srcURL, options) {
  return new exports.Proxy(srcURL, options || {});
};
