Ext.define("KRR.util.StringUtils", {
    singleton : true,
    generateRandomStr : function(length){
        var result = '',
            chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
        for (var i = length; i > 0; --i){
            result += chars[Math.round(Math.random() * (chars.length - 1))];
        }
        return result;
    }
})