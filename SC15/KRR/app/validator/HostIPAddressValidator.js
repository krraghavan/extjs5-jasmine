/**
 * Created by rkolliva on 4/3/2015.
 */

Ext.define('KRR.validator.HostIPAddressValidator',
{
    singleton: true,

    messages : {
        "notEnoughOctets"       : "An IP address must have 4 octets",
        "invalidOctet"          : "Octet values must be between 0 and 255 (except for the first octet which must be 1 or higher)",
        "loopbackNotAllowed"    : "Loopback addresses are not allowed as host IP Addresses",
        "multicastNotAllowed"   : "Multicast addresses (Class D) are not valid for host IP Addresses",
        "linkLocalNotAllowed"   : "Link Local addresses cannot be used as host IP Addresses",
        "classENotAllowed"      : "Class E addresses cannot be used as host IP addresses"
    },
    requires: [
        'KRR.util.IPUtils'
    ],
    areOctetsValid: function (octets) {
        if (octets.length > 4) {
            return false;
        }
        // no more than the last one must be empty
        var cnt = octets.length,
            hasEmptyLastOctet = (Ext.isEmpty(octets[octets.length - 1]));
        // last octet is empty
        for (var i = 0; i < cnt - 1; i++) {
            if (Ext.isEmpty(octets[i]) && hasEmptyLastOctet === true) {
                return false;
            }
        }
        return true;
    },
    /**
     * Returns true if a single IP address octet is valid
     *
     * @param {String} octet - the octet to validate
     * @param {boolean} allowZero - true if zero is a valid input for this
     * octet (for example, the first octet cannot be 0).
     * @returns {boolean} true if this is a valid octet
     */
    validateOctet: function (octet, allowZero, allowEmpty) {
        var matches,
            match,
            RE = /^([1-9][0-9]{0,2})$/;
        if (allowZero === true) {
            RE = /^([1-9][0-9]{1,2}|[0-9]{1})$/;
        }
        if (Ext.isEmpty(octet)) {
            return (allowEmpty === true);
        }
        matches = octet.match(RE); //ipAddress.split(".");
        if (!matches) {
            return false;
        }
        // index=0 is the string itself
        for (var i = 1; i < matches.length; i++) {
            try {
                match = matches[i].trim();
                if (match !== '.' && match != "") {
                    match = parseInt(matches[i]);
                    if (isNaN(match)) {
                        return false;
                    }
                    if (match.toString().length !== matches[i].length) {
                        // leading 0's
                        return false;
                    }
                    if (match < 0 || match > 255) {
                        return false;
                    }
                }
            }
            catch (err) {
                // not an integer
                return false;
            }
        }
        return true;
    },
    /**
     * Validates if an ipv4Address has valid octets
     * @param val
     * @returns {boolean|Object}
     */
    validateOctets: function (val, allowEmpty) {
        var me = KRR.validator.HostIPAddressValidator,
            octets = val.split(".");

        if (me.areOctetsValid(octets) === false) {
            return false;
        }
        for (var i = 0; i < octets.length; i++) {
            if (me.validateOctet(octets[i], (i > 0), allowEmpty) === false) {
                return false;
            }
        }
        return true;
    },
    /**
     * A simple validator for validating host IP addresses.
     *
     * @param ipAddress
     * @param subnetMask
     * @return {Object}
     *  {isValid: true} if the validation succeeded
     *  {isValid: false, message: "errorMessage"} if the validation failed
     */
    validate: function (ipAddress) {
        var ret = {isValid: true},
            me = KRR.validator.HostIPAddressValidator,
            ipu = KRR.util.IPUtils,
            octets = ipAddress.split(".");

        if (ipAddress.trim() === "") {
            // this validator doesn't know if blanks are valid or not - we return true because
            // we dont' validate anything
            return ret;
        }
        if (octets.length !== 4) {
            return {isValid: false, message: me.notEnoughOctets };
        }
        if (me.validateOctets(ipAddress, false) === false) {
            return {
                isValid: false,
                message: me.invalidOctet
            };
        }
        if (ipu.isLoopBackAddress(ipAddress)) {
            return {isValid: false, message: me.loopbackNotAllowed};
        }
        else if (ipu.isClassDIPAddress(ipAddress)) {
            return {isValid: false, message: me.multicastNotAllowed};
        }
        else if (ipu.isLinkLocalAddress(ipAddress)) {
            return {isValid: false, message: me.linkLocalNotAllowed};
        }
        else if (ipu.isClassEIPAddress(ipAddress)) {
            return {isValid: false, message: me.classENotAllowed};
        }
        return ret;
    }
});