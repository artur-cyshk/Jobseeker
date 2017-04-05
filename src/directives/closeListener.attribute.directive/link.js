/*@ngInject*/
export default function ($scope, $element, $timeout) {
	$scope.setClosingEvent = () => {
			$scope.closest = (target) => {
				let flag = false;
				if (target) {
					flag = (target == $element[0]);
					if($scope.exceptionClasses && target.classList) {
						$scope.exceptionClasses.forEach((item) => {
							if(target.classList.contains(item)) {
								flag = true;
							}
						})
					}
					return (flag) ? true : $scope.closest(target.parentNode, $element[0])
				}
			};

			$scope.setUnvisible = () => {
				$scope.$apply( () => $scope.closeListener = false );
			};
			
			$scope.listener = (event) => {
				if ($scope.closest(event.target) ) {
					return;
				}
				$scope.setUnvisible();				
			};

			$scope.$watch('closeListener', (value) => {
				if(value) {
					$timeout(() => {
						document.querySelector('body').addEventListener('click', $scope.listener);
						window.addEventListener('resize', $scope.setUnvisible);
					}, 0);
				}else{
					$timeout(() => {
						document.querySelector('body').removeEventListener('click', $scope.listener);
						window.removeEventListener('resize', $scope.setUnvisible);
					}, 0);
				}
			});
		
	};
	$scope.setClosingEvent();
}
