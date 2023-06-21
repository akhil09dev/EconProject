////////////////////imports
var gaul = ee.FeatureCollection("FAO/GAUL_SIMPLIFIED_500m/2015/level2");


var chennai = gaul.filter(ee.Filter.eq('ADM2_CODE',70251))
var vellore = gaul.filter(ee.Filter.eq('ADM2_NAME','Vellore'))


//loading air quality dataset
var collection = ee.ImageCollection('COPERNICUS/S5P/NRTI/L3_NO2')
  .select('NO2_column_number_density').filter(ee.Filter.date('1999-01-01','2022-12-31'))
 
 var years = ee.List.sequence(1999, 2022);
var yearlyCollection={};
var yearlyMean={} 
// the for loop stores the data year vise and reduces to the mean for the corresponding year
for(var i=0;i<23;i++){
  var year=1999+i
yearlyCollection[i]=collection.filter(ee.Filter.date(year+'-01-01',year+'-12-31'))
print
 yearlyMean[i]= yearlyCollection[i].mean()

}

var band_viz = {
  min: 0,
  max: 0.0002,
  palette: ['black', 'blue', 'purple', 'cyan', 'green', 'yellow', 'red']
};
print(yearlyMean[1])
// Map.addLayer(yearlyMean[22].clip(chennai.geometry()), band_viz, 'S5P N02');
Map.addLayer(yearlyMean[22].clip(vellore.geometry()), band_viz, 'S5P N02');
