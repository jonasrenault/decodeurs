class ChampionController {
  /** @ngInject */
  constructor($http) {
    this.$http = $http;
    this.$http
      .get('app/champion/champion.json')
      .then(response => {
        this.champions = response.data;
      });
  }

  onYearChange() {
    this.info = this.champions[this.year];
    this.thumbnails = {
      winner: '',
      climber: '',
      sprinter: ''
    };
    if (this.info) {
      this.queryForThumbnail(this.info.winner, 'winner');
      if (this.info.climber) {
        this.queryForThumbnail(this.info.climber, 'climber');
      }
      if (this.info.sprinter) {
        this.queryForThumbnail(this.info.sprinter, 'sprinter');
      }
    }
  }

  queryForThumbnail(name, key) {
    const url = `https://en.wikipedia.org/w/api.php?action=query&titles=${name} &prop=pageimages&format=json&pithumbsize=152&callback=JSON_CALLBACK`;
    this.$http.jsonp(url).then(response => {
      const pages = response.data.query.pages;
      const page = pages[Object.keys(pages)[0]];
      if (Object.keys(page).indexOf('thumbnail') >= 0) {
        this.thumbnails[key] = page.thumbnail.source;
      }

      // Return the thumbnail from the first page, no matter what
    });
  }
}

export const champion = {
  templateUrl: 'app/champion/champion.html',
  controller: ChampionController
};
