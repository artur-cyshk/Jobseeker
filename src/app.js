// vendor
import angular from 'angular';
import 'angular-ui-router';
// configs
import constantsModule from 'config/constants/constants.module';
import config from 'config';
import runConfig from 'config/run';

//directives
import closeListenerDirective from 'directives/closeListener.attribute.directive';

// components
import loginComponent from 'components/login.component';
import homeComponent from 'components/home.component';

//common components
import errorComponent from 'components/common/error.component';

// services
import restService from 'services/rest.service';
import storageService from 'services/storage.service';
import errorService from 'services/error.service';

// styles
import 'generic/generic.style.styl';

angular.module('app', [
	'ui.router',
	constantsModule
])
.config(config)
.run(runConfig)
.directive('closeListener', closeListenerDirective)
.component('home', homeComponent)
.component('error', errorComponent)
.component('login', loginComponent)
.service('restService', restService)
.service('storageService', storageService)
.service('errorService', errorService)