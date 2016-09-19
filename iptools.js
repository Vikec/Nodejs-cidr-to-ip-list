function ip2bin(ip) {
    var b = "";
    var inQuads = ip.split("."),
        outQuads = 4;
    for (var q in inQuads) {
        q = inQuads[q];
        if (q != "") {
            b += dec2bin(parseInt(q), 8)
            outQuads -= 1
        }
    }
    while (outQuads > 0) {
        b += "00000000";
        outQuads -= 1;
    }
    return b
}

function dec2bin(n, d) {
    var s = "";
    while (n > 0) {
        if (n & 1)
            s = "1" + s;
        else
            s = "0" + s;
        n >>= 1;
    }
    if (d != null) {
        while (s.length < d)
            s = "0" + s;
    }
    if (s == "")
        s = "0";
    return s;
}


function bin2ip(b) {
    var ip = "";
    for (var i = 0; i < b.length; i += 8) {

        ip += parseInt(b.slice(i, i + 8), 2) + "."
    }
    return ip.slice(0, ip.length - 1);
}
exports.listCIDR = function(c) {
    var cidrlist = [],
        parts = c.split("/"),
        baseIP = ip2bin(parts[0]),
        subnet = parseInt(parts[1]);
    if (subnet == 32)
        return [{
            "ipRange": parts[0],
            "cidr": c
        }];
    else {
        var ipPrefix = baseIP.slice(0, subnet);
        for (var i = 0; i < Math.pow(2, (32 - subnet)); i++) {
            var ip = bin2ip(ipPrefix + dec2bin(i, (32 - subnet)));
            // console.log(ip)
            cidrlist.push({
                "ipRange": ip,
                "cidr": c
            });
        }

        return cidrlist;
    }
}