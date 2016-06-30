import angular from 'angular';
import 'angular-mocks';
import {champion} from './champion';

const championJson = [
  {
    key: 'gulp',
    title: 'Gulp',
    logo: 'http://fountainjs.io/assets/imgs/gulp.png',
    text1: 'The streaming build system',
    text2: 'Automate and enhance your workflow'
  },
  {
    key: 'react',
    title: 'React',
    logo: 'http://fountainjs.io/assets/imgs/react.png',
    text1: 'A JavaScript library for building user interfaces',
    text2: 'A declarative, efficient, and flexible JavaScript library for building user interfaces'
  },
  {
    key: 'angular1',
    title: 'Angular 1',
    logo: 'http://fountainjs.io/assets/imgs/angular1.png',
    text1: 'HTML enhanced for web apps!',
    text2: 'AngularJS lets you extend HTML vocabulary for your application. The resulting environment is extraordinarily expressive, readable, and quick to develop.'
  }
];

describe('champion component', () => {
  beforeEach(() => {
    angular
      .module('decChampion', ['app/champion/champion.html'])
      .component('decChampion', champion);
    angular.mock.module('decChampion');
  });

  it('should render \'FountainJS team\'', angular.mock.inject(($rootScope, $compile, $httpBackend) => {
    $httpBackend.when('GET', 'app/champion/champion.json').respond(championJson);
    const element = $compile('<dec-champion></dec-champion>')($rootScope);
    $httpBackend.flush();
    $rootScope.$digest();
    const h4 = element.find('h4');
    expect(h4.html().trim()).toEqual('Hey there champion, what year were you born ?');
  }));
});
