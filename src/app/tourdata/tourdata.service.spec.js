import angular from 'angular';
import 'angular-mocks';
import {TourDataService} from './tourdata.service';

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

describe('TourDataService', () => {
  let TourData;
  let $httpBackend;

  beforeEach(() => {
    angular
    .module('app', [])
    .service('TourData', TourDataService);
    angular.mock.module('app');
  });

  beforeEach(angular.mock.inject((_TourData_, _$httpBackend_) => {
    $httpBackend = _$httpBackend_;
    TourData = _TourData_;

    $httpBackend.when('GET', 'app/tourdata/tourdata.json').respond(yearsJson);
    TourData._fetchData();
    $httpBackend.flush();
  }));

  it('should be available', () => {
    expect(TourData).toBeDefined();
  });

  it('should fetch data', () => {
    expect(TourData.data.length).toEqual(3);
  });

  describe('getYearData', () => {
    it('should return the year data', () => {
      expect(TourData.data.length).toEqual(3);
      const result = TourData.getYearData(2013);
      expect(result).toEqual(yearsJson[1]);
    });
  });

  describe('_addYearToPerson', () => {
    beforeEach(() => {
      TourData.persons = [];
    });

    it('should create a new object if person does not exist', () => {
      TourData._addYearToPerson('John', 2016, 'winner');
      expect(TourData.persons.length).toBe(1);
      const person = TourData.persons[0];
      expect(person.name).toEqual('John');
      expect(person.winner).toEqual([2016]);
    });

    it('should create a new field if it does not exist', () => {
      TourData._addYearToPerson('John', 2016, 'winner');
      TourData._addYearToPerson('John', 2016, 'climber');
      expect(TourData.persons.length).toBe(1);
      const person = TourData.persons[0];
      expect(person.name).toEqual('John');
      expect(person.winner).toEqual([2016]);
      expect(person.climber).toEqual([2016]);
    });

    it('should add year to list of wins', () => {
      TourData._addYearToPerson('John', 2016, 'winner');
      TourData._addYearToPerson('John', 2017, 'winner');
      expect(TourData.persons.length).toBe(1);
      const person = TourData.persons[0];
      expect(person.name).toEqual('John');
      expect(person.winner).toEqual([2016, 2017]);
    });
  });

  describe('_createNamedData', () => {
    beforeEach(() => {
      TourData.persons = [];
    });

    it('should create an array of objects with the list of years for each person', () => {
      TourData._createNamedData();
      expect(TourData.persons.length).toBe(5);

      expect(TourData.getPersonData("Christopher Froome")).toEqual({
        name: "Christopher Froome",
        winner: [2013, 2015],
        climber: [2015]
      });

      expect(TourData.getPersonData("Peter Sagan")).toEqual({
        name: "Peter Sagan",
        sprinter: [2012, 2013, 2015]
      });
    });
  });

  describe('_getDistances', () => {
    it('should return an object with years and distances', () => {
      const result = TourData._getDistances();
      expect(result).toEqual({
        x: [2012, 2013, 2015],
        y: ["3497", "3404", "35827"]
      });
    });
  });

  describe('_getSteps', () => {
    it('should return an object with years and steps', () => {
      const result = TourData._getSteps();
      expect(result).toEqual({
        x: [2012, 2013, 2015],
        y: [21, 21, 21]
      });
    });
  });

  describe('_getSpeeds', () => {
    it('should return an object with years and speeds', () => {
      const result = TourData._getSpeeds();
      expect(result).toEqual({
        x: [2012, 2013, 2015],
        y: ["39.724", "40.542", "39.567"]
      });
    });
  });
});
