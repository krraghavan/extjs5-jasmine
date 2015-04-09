/**
 * Created by rkolliva on 4/3/2015.
 */

KRR.jasmineSpecs.addSpec(function() {
    Ext.Loader.syncRequire("KRR.util.IPUtils");
    Ext.Loader.syncRequire("KRR.validator.HostIPAddressValidator");

    var ipu,
        classAData,
        classBData,
        classCData,
        classDData,
        classEData,
        loopbackData,
        linkLocalData,
        randomClassAIP,
        randomClassBIP,
        randomClassCIP,
        randomClassDIP,
        randomClassEIP,
        randomLoopbackAddress,
        randomLinkLocalAddress,
        validResult = {isValid:true},
        invalidResult = {isValid:false, message:""},
        validator,
        _it = function (msg, ip, expectedResult) {
            it(msg, function () {
                var result = validator.validate(ip);
                expect(result.isValid).toEqual(expectedResult.isValid);
                expect(result.message).toEqual(expectedResult.message);
            });
        };
    ipu = KRR.util.IPUtils;
    classAData = ipu.classAData;
    classBData = ipu.classBData;
    classCData = ipu.classCData;
    classDData = ipu.classDData;
    classEData = ipu.classEData;
    loopbackData = ipu.loopbackData;
    linkLocalData = ipu.linkLocalData;
    validator = KRR.validator.HostIPAddressValidator;
    describe("Unit tests for IP Address Validator", function() {

        describe("Class A network and subnet mask validation [" + classAData.startIP + " - " + classAData.endIP + "]", function () {
            randomClassAIP = ipu.randomIPGenerator(classAData);
            _it("Must validate the first address for a Class A network [" + classAData.startIP + "]", classAData.startIP, validResult);
            _it("Must validate the last address for a Class A network [" + classAData.endIP + "]", classAData.endIP, validResult);
            _it("Must validate a random Class A network IP address [" + randomClassAIP + "]", randomClassAIP, validResult);
        });

        describe("Host IP validation for ClassB [" + classBData.startIP + " - " + classBData.endIP + "] IP Addresses", function () {
            randomClassBIP = ipu.randomIPGenerator(classBData);
            _it("Must validate the first address for a Class B network [" + classBData.startIP + "]", classBData.startIP, validResult);
            _it("Must validate the last address for a Class B network [" + classBData.endIP + "]", classBData.endIP, validResult);
            if(ipu.isLoopBackAddress(randomClassBIP)) {
                invalidResult["message"] = validator.loopbackNotAllowed;
                _it("Must not  a random Class B network IP address [" + randomClassBIP + "]", randomClassBIP, invalidResult);
            }
            else {
                _it("Must validate a random Class B network IP address [" + randomClassBIP + "]", randomClassBIP, validResult);
            }
        });

        describe("Class C network host IP validation [" + classCData.startIP + " - " + classCData.endIP + "]", function () {
            randomClassCIP = ipu.randomIPGenerator(classCData);
            _it("Must validate the first address for a Class C network [" + classCData.startIP + "]", classCData.startIP, validResult);
            _it("Must validate the last address for a Class C network [" + classCData.endIP + "]", classCData.endIP, validResult);
            _it("Must validate a random Class C network IP address  [" + randomClassCIP + "]", randomClassCIP, validResult);
        });

        describe("Class D network host IP validation [" + classDData.startIP + " - " + classDData.endIP + "]", function () {
            randomClassDIP = ipu.randomIPGenerator(classDData);
            invalidResult["message"] = validator.multicastNotAllowed;
            _it("Must validate the first address for a Class D network [" + classDData.startIP + "]", classDData.startIP, invalidResult);
            _it("Must validate the last address for a Class D network [" + classDData.endIP + "]", classDData.endIP, invalidResult);
            _it("Must validate a random Class D network IP address  [" + randomClassDIP + "]", randomClassDIP, invalidResult);
        });
        if(__SUITEMETADATA["testMetadata"]["ipAddressValidator"]["classE"] === true) {
            describe("Class E network host IP validation [" + classEData.startIP + " - " + classEData.endIP + "]", function () {
                randomClassEIP = ipu.randomIPGenerator(classEData);
                invalidResult["message"] = validator.classENotAllowed;
                _it("Must validate the first address for a Class E network [" + classEData.startIP + "]", classEData.startIP, invalidResult);
                _it("Must validate the last address for a Class E network [" + classEData.endIP + "]", classEData.endIP, invalidResult);
                _it("Must validate a random Class E network IP address  [" + randomClassEIP + "]", randomClassEIP, invalidResult);
            });
        }

        describe("Loopback address host IP validation [" + loopbackData.startIP + " - " + loopbackData.endIP + "]", function () {
            randomLoopbackAddress = ipu.randomIPGenerator(loopbackData);
            invalidResult["message"] = validator.loopbackNotAllowed;
            _it("Must validate the first loopback address [" + loopbackData.startIP + "]", loopbackData.startIP, invalidResult);
            _it("Must validate the last loopback address [" + loopbackData.endIP + "]", loopbackData.endIP, invalidResult);
            _it("Must validate a random loopback address [" + randomLoopbackAddress + "]", randomLoopbackAddress, invalidResult);
        });

        describe("Link local address host IP validation [" + loopbackData.startIP + " - " + loopbackData.endIP + "]", function () {
            randomLinkLocalAddress = ipu.randomIPGenerator(linkLocalData);
            invalidResult["message"] = validator.linkLocalNotAllowed;
            _it("Must validate the first link local address[" + linkLocalData.startIP + "]", linkLocalData.startIP, invalidResult);
            _it("Must validate the last link local address [" + linkLocalData.endIP + "]", linkLocalData.endIP, invalidResult);
            _it("Must validate a random link local address  [" + randomLinkLocalAddress + "]", randomLinkLocalAddress, invalidResult);
        });
    });
});