var DHCPDLeasesParser;

DHCPDLeasesParser = function () {};

DHCPDLeasesParser.prototype.hostParser = function (data) {
    if (data === undefined || data === "") { return []; }

    var matches = data.match(/^host\s+[\w-]+\s*\{[^}]+}/gm);

    if (matches === null) { return []; }

    return matches.map(function (hostData) {
        var options = {};

        hostData = hostData.match(/host\s+([\w-]+)\s*\{\s*([^}]+)\s*}/);

        var optionMatches = hostData[2].match(/option (.*);/g);

        if (optionMatches) {
            optionMatches.forEach(function (option) {
                var match = option.match(/option (\S+)\s+(.*);/);
                options[match[1]] = match[2];
            });
        }

        return {
            'options': options,
            'name': hostData[1],
            'mac-address': hostData[2].match(/hardware ethernet (.*);/)[1],
            'ip-address': hostData[2].match(/fixed-address (.*);/)[1]
        };
    });
};

DHCPDLeasesParser.prototype.leaseParser = function (data) {
    if (data === undefined || data === "") { return []; }

    var matches = data.match(/^lease\s+(\S+)\s*\{[^}]+}/gm);

    if (matches === null) { return []; }

    return matches.map(function (leaseData) {
        leaseData = leaseData.match(/^lease\s+(\S+)\s*\{[\s\S]*hardware ethernet\s+([^;]+)/);

        return {
            'ip-address': leaseData[1],
            'mac-address': leaseData[2]
        }
    });
};

module.exports = (function () {
    return new DHCPDLeasesParser();
})();