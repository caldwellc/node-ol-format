const {ol} = require('../build/legacy/ol.js');

const GML32 = ol.format.GML32;
const GeoJSON = ol.format.GeoJSON;
const WFS = ol.format.WFS;
const fs = require('fs');
const options = {
  featureProjection: 'EPSG:4326',
  dataProjection: 'EPSG:3857'
}

const data = fs.readFileSync('./wfs_gml32.xml', 'utf-8');
const features = new WFS({gmlFormat: new GML32(), version: '2.0.0'}).readFeatures(data, options)
const featureCollection = new GeoJSON().writeFeaturesObject(features)
console.log(featureCollection)
