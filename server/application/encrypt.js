var crypt = require("crypto-js/md5");
var encrypt = function(str) {
    return crypt(str);
}
module.exports = encrypt;