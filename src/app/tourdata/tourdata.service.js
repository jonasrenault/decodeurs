import angular from 'angular';

export class TourDataService {

  /** @ngInject */
  constructor($http, $log) {
    this.$http = $http;
    this.$log = $log;
  }

  getYearData(year) {
    return this.data.find(elt => {
      return elt.year === year;
    });
  }

  getPersonData(name) {
    return this.persons.find(elt => {
      return elt.name === name;
    });
  }

  init(callback) {
    this._fetchData(callback);
  }

  _fetchData(callback) {
    this.$http.get('app/tourdata/tourdata.json')
    .then(response => {
      this.data = response.data;
      this.persons = [];
      this._createNamedData();
      this.speeds = this._getSpeeds();
      this.steps = this._getSteps();
      this.distances = this._getDistances();

      if (callback && typeof (callback) === "function") {
        callback();
      }
    }).catch(error => {
      if (error.status > 0) {
        this.$log.error(`XHR Failed for TourData.constructor.\n ${angular.toJson(error.data, true)}`);
      }
    });
  }

  _createNamedData() {
    this.data.forEach(data => {
      if (data.winner) {
        this._addYearToPerson(data.winner, data.year, 'winner');
      }
      if (data.climber) {
        this._addYearToPerson(data.climber, data.year, 'climber');
      }
      if (data.sprinter) {
        this._addYearToPerson(data.sprinter, data.year, 'sprinter');
      }
    });
  }

  _addYearToPerson(name, year, key) {
    let person = this.persons.find(elt => {
      return elt.name === name;
    });
    if (person && person[key]) {
      person[key].push(year);
    } else if (person) {
      person[key] = [year];
    } else {
      person = {name};
      person[key] = [year];
      this.persons.push(person);
    }
  }

  _getDistances() {
    const y = [];
    const x = [];
    this.data.forEach(data => {
      x.push(data.year);
      y.push(data.distance.replace(" ", ""));
    });
    return {x, y};
  }

  _getSteps() {
    const y = [];
    const x = [];
    this.data.forEach(data => {
      x.push(data.year);
      y.push(data.steps);
    });
    return {x, y};
  }

  _getSpeeds() {
    const y = [];
    const x = [];
    this.data.forEach(data => {
      x.push(data.year);
      y.push(data.speed.replace(" km/h", "").replace(",", "."));
    });
    return {x, y};
  }
}
