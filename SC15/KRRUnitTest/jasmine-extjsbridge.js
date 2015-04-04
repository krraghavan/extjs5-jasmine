/**
 * Created by rkolliva on 4/3/2015.
 */

var KRR = KRR || {};
(function() {
    var specsToRun = [],
        jasmineSpecs = {
            addSpec : function(spec) {
                specsToRun.push(spec);
            },
            hasSpecs : function() {
                return specsToRun.length > 0;
            },
            getSpecs : function() {
                return specsToRun;
            }
        };
    KRR.jasmineSpecs = jasmineSpecs;
})();
