import angular from 'angular';
import Plotly from '../plotly/custom-plotly';
import Highcharts from 'highcharts';
// import HighchartsMore from 'highcharts-more';
// HighchartsMore(Highcharts);

class ChampionController {
  /** @ngInject */
  constructor($http, $log, TourData, $window) {
    this.$http = $http;
    this.$log = $log;
    this.TourData = TourData;
    this.TourData.init(() => {
      this.plotPersonsHc();
    });

    this.distanceContainer = Plotly.d3.select("div[id='distanceContainer']").append('div').node();
    this.speedContainer = Plotly.d3.select("div[id='speedContainer']").append('div').node();

    angular.element($window).bind('resize', () => {
      this.onResize();
    });
  }

  onYearChange() {
    this.info = this.TourData.getYearData(this.year);
    this.winner = null;
    this.climber = null;
    this.sprinter = null;
    if (this.info) {
      if (this.info.winner !== "non attribué") {
        this.winner = this.TourData.getPersonData(this.info.winner);
        this.queryForThumbnail(this.winner);
      }
      if (this.info.climber) {
        this.climber = this.TourData.getPersonData(this.info.climber);
        this.queryForThumbnail(this.climber);
      }
      if (this.info.sprinter) {
        this.sprinter = this.TourData.getPersonData(this.info.sprinter);
        this.queryForThumbnail(this.sprinter);
      }
      this.plotDistance();
      this.plotSpeed();
    }
  }

  queryForThumbnail(person) {
    if (person.thumbnail) {
      return;
    }
    const url = `https://en.wikipedia.org/w/api.php?action=query&titles=${person.name}&prop=pageimages&format=json&pithumbsize=152&callback=JSON_CALLBACK`;
    this.$http.jsonp(url).then(response => {
      // Return the thumbnail from the first page, no matter what
      const pages = response.data.query.pages;
      const page = pages[Object.keys(pages)[0]];
      if (Object.keys(page).indexOf('thumbnail') >= 0) {
        person.thumbnail = page.thumbnail.source;
        // this.thumbnails[key] = page.thumbnail.source;
      }
    });
  }

  plotDistance() {
    const layout = {
      yaxis: {title: "Distance"},      // set the y axis title
      xaxis: {
        showgrid: false                  // remove the x-axis grid lines
      }
    };
    const idx = this.TourData.distances.x.indexOf(this.year);
    if (idx > -1) {
      layout.annotations = [{
        x: this.year,
        y: parseFloat(this.TourData.distances.y[idx]),
        xref: 'x',
        yref: 'y',
        text: `${this.TourData.distances.y[idx]} km`
      }];
    }

    Plotly.newPlot(this.distanceContainer, [this.TourData.distances], layout);
  }

  plotSpeed() {
    const layout = {
      yaxis: {title: "Average Speed (km/h)"},
      xaxis: {
        showgrid: false
      }
    };
    const idx = this.TourData.speeds.x.indexOf(this.year);
    if (idx > -1) {
      layout.annotations = [{
        x: this.year,
        y: this.TourData.speeds.y[idx],
        xref: 'x',
        yref: 'y',
        text: `${this.TourData.speeds.y[idx]} km/h`
      }];
    }

    Plotly.newPlot(this.speedContainer, [this.TourData.speeds], layout);
  }

  plotPersonsHc() {
    const winners = [];
    const climbers = [];
    const sprinters = [];

    this.TourData.persons.forEach(person => {
      if (person.name !== "non attribué") {
        winners.push([person.name, person.winner ? person.winner.length : 0]);
        climbers.push([person.name, person.climber ? person.climber.length : 0]);
        sprinters.push([person.name, person.sprinter ? person.sprinter.length : 0]);
      }
    });

    Highcharts.chart('personsContainer', {
      series: [{
        name: "Meilleur Sprinteur",
        data: sprinters,
        color: 'rgb(188,234,141)'
      }, {
        name: "Meilleur Grimpeur",
        data: climbers,
        color: 'rgb(234,42,42)'
      }, {
        name: "Vainqueur",
        data: winners,
        color: 'rgb(245,237,138)'
      }],
      chart: {
        polar: true,
        type: 'column'
      },
      pane: {
        size: '85%'
      },
      title: {
        text: ''
      },
      legend: {
        align: 'right',
        verticalAlign: 'top',
        y: 100,
        layout: 'vertical'
      },
      xAxis: {
        tickmarkPlacement: 'off'
      },
      yAxis: {
        title: 'Victoires',
        min: 0,
        endOnTick: false,
        showLastLabel: true,
        reversedStacks: false
      },
      plotOptions: {
        series: {
          stacking: 'normal',
          shadow: false,
          groupPadding: 0,
          pointPlacement: 'on'
        }
      }
    });
  }

  plotPersons() {
    const winners = {
      r: [],
      t: [],
      name: 'Vainqueur',
      marker: {color: 'rgb(245,237,138)'},
      type: 'area',
      hoverinfo: 'text'
    };
    const climbers = {
      r: [],
      t: [],
      name: 'Meilleur Grimpeur',
      marker: {color: 'rgb(234,42,42)'},
      type: 'area'
    };
    const sprinters = {
      r: [],
      t: [],
      name: 'Meilleur Sprinter',
      marker: {color: 'rgb(188,234,141)'},
      type: 'area'
    };

    this.TourData.persons.forEach(person => {
      if (person.name !== "non attribué") {
        winners.t.push(person.name);
        climbers.t.push(person.name);
        sprinters.t.push(person.name);
        winners.r.push(person.winner ? person.winner.length : 0);
        climbers.r.push(person.climber ? person.climber.length : 0);
        sprinters.r.push(person.sprinter ? person.sprinter.length : 0);
      }
    });
    const layout = {
      title: 'Nombre de victoires',
      font: {size: 16},
      angularaxis: {
        showticklabels: false
      },
      margin: {
        l: 10,
        r: 150,
        b: 0,
        t: 40,
        pad: 0
      },
      height: 450
    };

    Plotly.plot(this.personsContainer, [winners, climbers, sprinters], layout);
  }

  onResize() {
    Plotly.Plots.resize(this.distanceContainer);
    Plotly.Plots.resize(this.speedContainer);
  }
}

export const champion = {
  templateUrl: 'app/champion/champion.html',
  controller: ChampionController
};
