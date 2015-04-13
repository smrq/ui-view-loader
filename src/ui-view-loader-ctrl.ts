import IUiViewLoaderScope = require('./IUiViewLoaderScope');

class UiViewLoaderCtrl {
	private currentLoadingPromise: any;

	/*@ngInject*/
	constructor(
		private $scope: IUiViewLoaderScope,
		private $templateFactory: any,
		private $sce: ng.ISCEService) { }

	init(content: JQuery, loading: JQuery) {
		this.$scope.$on('$stateChangeStart', (event, toState, toParams) => {
			this.showLoadingIfConfigured(toState, toParams);
		});

		this.$scope.$on('$stateChangeSuccess', () => {
			this.hideLoading();
		});
	}

	showLoadingIfConfigured(toState: any, toParams: any) {
		if (!toState.resolve)
			return;

		var htmlStringOrPromise = this.fromConfig(toState, toParams, { $stateParams: toParams });
		if (!htmlStringOrPromise)
			return;

		if (angular.isString(htmlStringOrPromise)) {
			this.showLoading(htmlStringOrPromise);
		} else {
			this.currentLoadingPromise = htmlStringOrPromise;
			htmlStringOrPromise.then((htmlString: string) => {
				if (this.currentLoadingPromise === htmlStringOrPromise)
					this.showLoading(htmlString);
			});
		}
	}

	showLoading(html: string) {
		this.$scope.showLoading = true;
		this.$scope.loadingHtml = this.$sce.trustAsHtml(html);
		this.currentLoadingPromise = null;
	}

	hideLoading() {
		this.$scope.showLoading = false;
		this.currentLoadingPromise = null;
	}

	fromConfig(config: any, params: any, locals: any) {
		return (
			angular.isDefined(config.loadingTemplate) ? this.$templateFactory.fromString(config.loadingTemplate, params) :
			angular.isDefined(config.loadingTemplateUrl) ? this.$templateFactory.fromUrl(config.loadingTemplateUrl, params) :
			angular.isDefined(config.loadingTemplateProvider) ? this.$templateFactory.fromProvider(config.loadingTemplateProvider, params, locals) :
			null);
	}
}

export = UiViewLoaderCtrl;
