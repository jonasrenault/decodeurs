import angular from 'angular';
import 'angular-mocks';
import {champion} from './champion';
import {TourDataService} from '../tourdata/tourdata.service';

const yearsJson = [
  {
    year: 2012,
    winner: "Bradley Wiggins",
    team: "Sky",
    steps: 21,
    distance: "3 497",
    speed: "39,724 km/h",
    climber: "Thomas Voeckler",
    sprinter: "Peter Sagan",
    young: "Tejay van Garderen"
  },
  {
    year: 2013,
    winner: "Christopher Froome",
    team: "Sky",
    steps: 21,
    distance: "3 404",
    speed: "40,542 km/h",
    climber: "Nairo Quintana",
    sprinter: "Peter Sagan",
    young: "Nairo Quintana"
  },
  {
    year: 2015,
    winner: "Christopher Froome",
    team: "Sky",
    steps: 21,
    distance: "3 5827",
    speed: "39,567 km/h",
    climber: "Christopher Froome",
    sprinter: "Peter Sagan",
    young: "Nairo Quintana"
  }
];

describe('champion component', () => {
  let element;
  let $ctrl;

  beforeEach(() => {
    angular
     .module('decChampion', ['app/champion/champion.html'])
     .component('decChampion', champion)
     .service('TourData', TourDataService);
    angular.mock.module('decChampion');
  });

  beforeEach(angular.mock.inject(($rootScope, $compile, $httpBackend) => {
    $httpBackend.when('GET', 'app/tourdata/tourdata.json').respond(yearsJson);
    element = $compile('<dec-champion></dec-champion>')($rootScope);
    $httpBackend.flush();
    $rootScope.$digest();
    $ctrl = element.isolateScope().$ctrl;
  }));

  // Fix imports in html for this test to work
  xit('should render the heading', () => {
    const h4 = element.find('h4');
    expect(h4.html().trim()).toEqual('Hey there champion, what year were you born ?');
  });

  // Fix imports in html for this test to work
  xdescribe('onYearChange', () => {
    it('should update the year info', () => {
      $ctrl.year = 2015;
      $ctrl.onYearChange();
      expect($ctrl.info).toEqual(yearsJson[2]);
    });

    it('should update the winner, climber and sprinter infos', () => {
      $ctrl.year = 2012;
      $ctrl.onYearChange();
      expect($ctrl.winner).toEqual({
        name: "Bradley Wiggins",
        winner: [2012]
      });
      expect($ctrl.climber).toEqual({
        name: "Thomas Voeckler",
        climber: [2012]
      });
      expect($ctrl.sprinter).toEqual({
        name: "Peter Sagan",
        sprinter: [2012, 2013, 2015]
      });
    });
  });
});
