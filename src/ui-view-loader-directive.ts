import UiViewLoaderCtrl = require('./ui-view-loader-ctrl');

/*@ngInject*/
function uiViewLoader(): ng.IDirective {
	return {
		restrict: 'A',
		controller: 'uiViewLoaderCtrl',
		scope: {},
		replace: true,
		transclude: true,
		compile: (element: ng.IAugmentedJQuery, attrs: any, transclude: any) => {
			var viewName = attrs.uiViewLoader;
			element.append(`<div class="ui-view-loader-content" ng-hide="showLoading" ui-view="${viewName}"></div>`);
			element.append(`<div class="ui-view-loader-loading" ng-show="showLoading" ng-bind-html="loadingHtml"></div>`);

			return {
				post(scope: {}, element: JQuery, attrs: {}, ctrl: UiViewLoaderCtrl) {
					var content = element.find('.ui-view-loader-content');
					var loading = element.find('.ui-view-loader-loading');
					ctrl.init(content, loading);
				}
			};
		}
	};
}

export = uiViewLoader;
