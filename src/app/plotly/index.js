import angular from 'angular';

import Plotly from './custom-plotly';

export const plotlyModule = 'plotlyjs';

angular
  .module(plotlyModule, [])
  // create plotlyjs module with an plotlyJs service that can be injected
  .factory('Plotly', () => {
    // const Plotly = require('./custom-plotly');
    return Plotly;
  });
