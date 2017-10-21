angular.module('localization', []).filter('i18n', ['$window', '$rootScope', function ($window, $rootScope) {
    // var langSelected = $window.localStorage.getItem("langSelected");
    // if (langSelected === null || langSelected === undefined || JSON.parse(langSelected).lang === 'jp') {
    //     localizedTexts = localizationMessages_jp;
    //     $rootScope.langSelected = { lang: 'jp' };
    // } else {
    //     localizedTexts = localizationMessages_en;
    //     $rootScope.langSelected = { lang: 'en' };
    // }
    var localizedTexts = {};

    return function (text) {
        if (localizedTexts.hasOwnProperty(text)) {
            return localizedTexts[text];
        }
        return text;
    };
}])
