# beautylog
beautiful logging

## Buildstatus
[![Build Status](https://travis-ci.org/pushrocks/beautylog.svg?branch=v0.0.9)](https://travis-ci.org/pushrocks/beautylog)
[![Dependency Status](https://david-dm.org/pushrocks/beautylog.svg)](https://david-dm.org/pushrocks/beautylog)


## Usage
```javascript
var bl = require('beautylog');
bl.log('some log message'); //normal console log message
bl.success('some success message'); //success console log message
bl.error('some error message'); //error console log message

//alternatively you can use a logType parameter
bl.log('some log message','normal');
bl.log('some success message','success');
bl.log('some error message','error');
```
The plugin produces beautyful output like this:
![console.png](https://mediaserve.lossless.digital/github.com/pushrocks/beautylog/console.png)
