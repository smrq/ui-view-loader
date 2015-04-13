(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.smrqUiViewLoader = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(_dereq_,module,exports){
var UiViewLoaderDirective = _dereq_('./ui-view-loader-directive');
var UiViewLoaderCtrl = _dereq_('./ui-view-loader-ctrl');
var mod = angular.module('smrq.uiViewLoader', ['ui.router', 'ui.router.util']).directive('smrqUiViewLoader', UiViewLoaderDirective).controller('smrqUiViewLoaderCtrl', UiViewLoaderCtrl);
module.exports = mod;

},{"./ui-view-loader-ctrl":2,"./ui-view-loader-directive":3}],2:[function(_dereq_,module,exports){
var UiViewLoaderCtrl = (function () {
    /*@ngInject*/
    function UiViewLoaderCtrl($scope, $templateFactory, $sce) {
        this.$scope = $scope;
        this.$templateFactory = $templateFactory;
        this.$sce = $sce;
    }
    UiViewLoaderCtrl.prototype.init = function (content, loading) {
        var _this = this;
        this.$scope.$on('$stateChangeStart', function (event, toState, toParams) {
            _this.showLoadingIfConfigured(toState, toParams);
        });
        this.$scope.$on('$stateChangeSuccess', function () {
            _this.hideLoading();
        });
    };
    UiViewLoaderCtrl.prototype.showLoadingIfConfigured = function (toState, toParams) {
        var _this = this;
        if (!toState.resolve)
            return;
        var htmlStringOrPromise = this.fromConfig(toState, toParams, { $stateParams: toParams });
        if (!htmlStringOrPromise)
            return;
        if (angular.isString(htmlStringOrPromise)) {
            this.showLoading(htmlStringOrPromise);
        }
        else {
            this.currentLoadingPromise = htmlStringOrPromise;
            htmlStringOrPromise.then(function (htmlString) {
                if (_this.currentLoadingPromise === htmlStringOrPromise)
                    _this.showLoading(htmlString);
            });
        }
    };
    UiViewLoaderCtrl.prototype.showLoading = function (html) {
        this.$scope.showLoading = true;
        this.$scope.loadingHtml = this.$sce.trustAsHtml(html);
        this.currentLoadingPromise = null;
    };
    UiViewLoaderCtrl.prototype.hideLoading = function () {
        this.$scope.showLoading = false;
        this.currentLoadingPromise = null;
    };
    UiViewLoaderCtrl.prototype.fromConfig = function (config, params, locals) {
        return (angular.isDefined(config.loadingTemplate) ? this.$templateFactory.fromString(config.loadingTemplate, params) : angular.isDefined(config.loadingTemplateUrl) ? this.$templateFactory.fromUrl(config.loadingTemplateUrl, params) : angular.isDefined(config.loadingTemplateProvider) ? this.$templateFactory.fromProvider(config.loadingTemplateProvider, params, locals) : null);
    };
    return UiViewLoaderCtrl;
})();
module.exports = UiViewLoaderCtrl;

},{}],3:[function(_dereq_,module,exports){
/*@ngInject*/
function uiViewLoader() {
    return {
        restrict: 'A',
        controller: 'uiViewLoaderCtrl',
        scope: {},
        replace: true,
        transclude: true,
        compile: function (element, attrs, transclude) {
            var viewName = attrs.uiViewLoader;
            element.append("<div class=\"ui-view-loader-content\" ng-hide=\"showLoading\" ui-view=\"" + viewName + "\"></div>");
            element.append("<div class=\"ui-view-loader-loading\" ng-show=\"showLoading\" ng-bind-html=\"loadingHtml\"></div>");
            return {
                post: function (scope, element, attrs, ctrl) {
                    var content = element.find('.ui-view-loader-content');
                    var loading = element.find('.ui-view-loader-loading');
                    ctrl.init(content, loading);
                }
            };
        }
    };
}
module.exports = uiViewLoader;

},{}],4:[function(_dereq_,module,exports){

},{}]},{},[1,4])(4)
});
