import link from './link';
/*@ngInject*/
export default ($timeout) => {
	return {
		restrict: 'A',
		link: ($scope, $element) => {
			link($scope, $element, $timeout);
		},
		scope : {
			'closeListener' : '=',
			'exceptionClasses' : '='
		}
	}
}
