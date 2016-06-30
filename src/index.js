import angular from 'angular';

import 'angular-material';
import 'angular-messages';

// Material design css
import 'angular-material/angular-material.css';

import 'angular-ui-router';
import routesConfig from './routes';

import {main} from './app/main';
import {champion} from './app/champion/champion';

import './index.scss';

angular
  .module('app', ['ui.router', 'ngMaterial', 'ngMessages'])
  .config(routesConfig)
  .component('app', main)
  .component('decChampion', champion);
