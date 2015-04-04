/**
 * Created by rkolliva on 4/3/2015.
 */

Ext.define('KRR.util.IPUtils',
{
    singleton: true,

    classAData: {
        "startIP": "1.0.0.1",
        "endIP": "126.255.255.254",
        "validMasks": ["255.0.0.0", "255.128.0.0", "255.192.0.0", "255.224.0.0", "255.240.0.0", "255.248.0.0", "255.252.0.0", "255.254.0.0",
            "255.255.0.0", "255.255.128.0", "255.255.192.0", "255.255.224.0", "255.255.240.0", "255.255.248.0", "255.255.252.0", "255.255.254.0",
            "255.255.255.0", "255.255.255.128", "255.255.255.192", "255.255.255.224", "255.255.255.240", "255.255.255.248", "255.255.255.252"]
    },
    loopbackData: {
        "startIP": "127.0.0.1",
        "endIP": "127.255.255.254",
        "validMasks": ["255.255.255.0", "255.255.255.128", "255.255.255.192", "255.255.255.224", "255.255.255.240", "255.255.255.248", "255.255.255.252"]
    },
    classBData: {
        "startIP": "128.0.0.0",
        "endIP": "191.255.255.255",
        "validMasks": ["255.255.0.0", "255.255.128.0", "255.255.192.0", "255.255.224.0", "255.255.240.0", "255.255.248.0", "255.255.252.0", "255.255.254.0",
            "255.255.255.0", "255.255.255.128", "255.255.255.192", "255.255.255.224", "255.255.255.240", "255.255.255.248", "255.255.255.252"]
    },
    linkLocalData: {
        "startIP": "169.254.0.0",
        "endIP": "169.254.254.255",
        "validMasks": []
    },
    classCData: {
        "startIP": "192.0.0.1",
        "endIP": "223.255.255.255",
        "validMasks": ["255.255.255.0", "255.255.255.128", "255.255.255.192", "255.255.255.224", "255.255.255.240", "255.255.255.248", "255.255.255.252"]
    },
    classDData: {
        "startIP": "224.0.0.0",
        "endIP": "239.255.255.255",
        "validMasks": []
    },
    classEData: {
        "startIP": "240.0.0.0",
        "endIP": "255.255.255.255",
        "validMasks": []
    },
    CLASSA_IPv4_ADDRESS_RANGE: {
        "start": [1, 0, 0, 0],
        "end": [126, 255, 255, 255]
    },
    CLASSB_IPv4_ADDRESS_RANGE: {
        "start": [128, 0, 0, 0],
        "end": [191, 255, 255, 255]
    },
    CLASSC_IPv4_ADDRESS_RANGE: {
        "start": [192, 0, 0, 0],
        "end": [223, 255, 255, 255]
    },
    CLASSD_IPv4_ADDRESS_RANGE: {
        "start": [224, 0, 0, 0],
        "end": [239, 255, 255, 255]
    },
    CLASSE_IPv4_ADDRESS_RANGE: {
        "start": [240, 0, 0, 0],
        "end": [255, 255, 255, 255]
    },
    LOCALHOST_IPv4_ADDRESS_RANGE: {
        "start": [127, 0, 0, 0],
        "end": [127, 255, 255, 254]
    },
    LINKLOCAL_IPv4_ADDRESS_RANGE: {
        "start": [169, 254, 0, 0],
        "end": [169, 254, 254, 255]
    },
    getNumericIPValue: function (ip) {
        return parseInt(ip[0]) * Math.pow(256, 3) + parseInt(ip[1]) * Math.pow(256, 2) + parseInt(ip[2]) * 256 + parseInt(ip[3])
    },
    /**
     * Returns true if the IP address is a Class A address
     *
     * @param {String} ipAddress - the ipAddress to validate
     * @returns {boolean} true if this is a class A address
     */
    isClassAIPAddress: function (ipAddress) {
        var me = KRR.util.IPUtils;
        return me.isIPInRange(ipAddress, me.CLASSA_IPv4_ADDRESS_RANGE);
    },
    /**
     * Returns true if the IP address is a Class B address
     *
     * @param {String} ipAddress - the ipAddress to validate
     * @returns {boolean} true if this is a class B address
     */
    isClassBIPAddress: function (ipAddress) {
        var me = KRR.util.IPUtils;
        return me.isIPInRange(ipAddress, me.CLASSB_IPv4_ADDRESS_RANGE);
    },
    /**
     * Returns true if the IP address is a Class C address
     *
     * @param {String} ipAddress - the ipAddress to validate
     * @returns {boolean} true if this is a class C address
     */
    isClassCIPAddress: function (ipAddress) {
        var me = KRR.util.IPUtils;
        return this.isIPInRange(ipAddress, me.CLASSC_IPv4_ADDRESS_RANGE);
    },
    /**
     * Returns true if the IP address is a Class D address
     *
     * @param {String} ipAddress - the ipAddress to validate
     * @returns {boolean} true if this is a class D address
     */
    isClassDIPAddress: function (ipAddress) {
        var me = KRR.util.IPUtils;
        return me.isIPInRange(ipAddress, me.CLASSD_IPv4_ADDRESS_RANGE);
    },
    /**
     * Returns true if the IP address is a Class E address
     *
     * @param {String} ipAddress - the ipAddress to validate
     * @returns {boolean} true if this is a class E address
     */
    isClassEIPAddress: function (ipAddress) {
        var me = KRR.util.IPUtils;
        return me.isIPInRange(ipAddress, me.CLASSE_IPv4_ADDRESS_RANGE);
    },
    /**
     * Returns true if the IP address is a loopback address
     *
     * @param {String} ipAddress - the ipAddress to validate
     * @returns {boolean} true if this is a loopback address
     */
    isLoopBackAddress: function (ipAddress) {
        var me = KRR.util.IPUtils;
        return me.isIPInRange(ipAddress, me.LOCALHOST_IPv4_ADDRESS_RANGE);
    },
    /**
     * Returns true if the IP address is a link local address
     *
     * @param {String} ipAddress - the ipAddress to validate
     * @returns {boolean} true if this is a link local address
     */
    isLinkLocalAddress: function (ipAddress) {
        var me = KRR.util.IPUtils;
        return me.isIPInRange(ipAddress, me.LINKLOCAL_IPv4_ADDRESS_RANGE);
    },
    isIPInRange: function (ipAddressString, rangeConfig) {
        var matches,
            octet,
            ret = true;
        matches = ipAddressString.split(".");
        if (!matches || matches.length !== 4) {
            // 4 octets.
            return false;
        }
        for (var i = 0; i < matches.length; i++) {
            try {
                octet = parseInt(matches[i]);
            }
            catch (err) {
                // not an integer.
                return false;
            }
            if (octet >= rangeConfig["start"][i] && octet <= rangeConfig["end"][i]) {
                continue;
            }
            else {
                ret = false;
                break;
            }
        }
        return ret;
    },
    /**
     * generate a random IP in the class.
     * @param ipClassData
     * @returns {string}
     */
    randomIPGenerator: function (ipClassData) {
        var me = KRR.util.IPUtils,
            startIP = ipClassData.startIP,
            endIP = ipClassData.endIP,
            generatedIP = [],
            generatedIPNum,
            generatedOffset,
            startIPNum,
            endIPNum;

        startIPNum = me.getNumericIPValue(startIP.split("."));
        endIPNum = me.getNumericIPValue(endIP.split("."));
        // get a random offset in this range.
        generatedOffset = Math.floor(Math.random() * (endIPNum - startIPNum));
        generatedIPNum = startIPNum + generatedOffset;
        generatedIP.push("" + ((generatedIPNum >> 24) & 0xff));
        generatedIP.push("" + ((generatedIPNum >> 16) & 0xff));
        generatedIP.push("" + ((generatedIPNum >> 8) & 0xff));
        generatedIP.push("" + (generatedIPNum) & 0xff);

        return generatedIP.join(".");
    }
});