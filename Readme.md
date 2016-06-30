# Tour de France Champion

This is a simple project that I did for [Les Décodeurs][decodeurs].

### Web app specifications :

> A partir de données que vous irez récupérer sur le web, saurez-vous concevoir et réaliser un générateur capable de fournir, selon l’année de naissance du lecteur, le vainqueur du tour de france de cette année, le meilleur grimpeur et le meilleur sprinter ? L’objet créé devra être “responsive”, et hébergé sur un serveur dont vous nous communiquerez l’URL. 

### Live Demo

[Live demo](https://jonasrenault.github.io/decodeurs)

### Data

The data was scraped from https://fr.wikipedia.org/wiki/Palmar%C3%A8s_du_Tour_de_France using the chrome plugin scraper to export it to a Google Spreadsheet. Data was then exported to JSON dict format using http://www.convertcsv.com/csv-to-json.htm .

Minor alterations were made to clean up the data (remove edition number from the keys, and remove links to footnotes).

### Images

Cyclist profile pictures are retrieved from wikipedia. A query is sent to wikipedia with the cyclist's name :

```
const url = `https://en.wikipedia.org/w/api.php?action=query&titles=${name}&prop=pageimages&format=json&pithumbsize=152&callback=JSON_CALLBACK`;
```

This returns a url for the thumbnail to that person's wikipedia page.

### Tech

The web app was started with the [Foundation Webapp Generator][Foundation] and uses

* [Angular 1.5][Angular]
* [Angular Material Design][Material]
 
### Installation

Running the web app requires [Node.js](https://nodejs.org/).

```sh
git clone https://github.com/jonasrenault/decodeurs.git decodeurs
cd decodeurs
npm install
npm run serve
```

### Contact

[@jonasrza]

License
----

MIT


**Free Software, Hell Yeah!**





   [decodeurs]: <http://www.lemonde.fr/les-decodeurs/>
   [@jonasrza]: <https://twitter.com/jonasrza>
   [Angular]: <http://angularjs.org>
   [Material]: <https://material.angularjs.org/latest/>
   [Foundation]: <https://github.com/FountainJS/generator-fountain-webapp>

