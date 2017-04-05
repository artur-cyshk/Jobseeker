/*@ngInject*/
export default function run($transitions, $rootScope) {
	$transitions.onStart({}, (response)=>{
    	const from = response.from();
    	const to = response.to();
    	to.params = response.params();
    	$rootScope.currentState = to;
    });
}