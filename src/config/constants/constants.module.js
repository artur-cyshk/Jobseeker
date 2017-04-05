import angular from 'angular';
import URLS from './urls.constant';

export default angular.module('constants', [])
    .constant('URLS', URLS)
    .name;
