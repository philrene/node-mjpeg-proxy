node-mjpeg-proxy
================

This is a simple implementation of a MJPEG proxy written with node.js.

## Documentation

### Example Usage

    var mpjegproxy = require("./lib/node-mjpeg-proxy");
    mpjegproxy.createProxy("http://192.1.2.3:8080/videofeed");

Here, it will create a proxy to the source video feed (http://192.1.2.3:8080/videofeed) with the default options (below). You can now access the feed at http://localhost:5080/ .

### Proxy

    Proxy.createProxy(sourceURL, [options]);

Returns: a `Proxy` instance.

Arguments:

- *sourceURL*

  The source URL of the MJPEG feed to be proxied.

Options:

- *port*

  The destination port. Defaults to `5080`.

## TODO

- Add a resource URL so that it can serve on certain resource URLs rather than require its onw http.Server instance.

## Credits

- Phil Rene ([philrene](http://github.com/philrene))

- Chris Chua ([chrisirhc](http://github.com/chrisirhc))
