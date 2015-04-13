import UiViewLoaderDirective = require('./ui-view-loader-directive');
import UiViewLoaderCtrl = require('./ui-view-loader-ctrl');

var mod = angular.module('smrq.uiViewLoader', ['ui.router', 'ui.router.util'])
	.directive('smrqUiViewLoader', UiViewLoaderDirective)
	.controller('smrqUiViewLoaderCtrl', UiViewLoaderCtrl);

export = mod;
