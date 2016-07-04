import angular from 'angular';

import 'angular-material';
import 'angular-messages';
import 'angular-ui-router';

// Material design css
import 'angular-material/angular-material.css';

import routesConfig from './routes';

import {main} from './app/main';
import {champion} from './app/champion/champion';
import {TourDataService} from './app/tourdata/tourdata.service';

import './index.scss';

angular
  .module('decodeurs', ['ui.router', 'ngMaterial', 'ngMessages'])
  .config(routesConfig)
  .component('app', main)
  .component('decChampion', champion)
  .service('TourData', TourDataService);
