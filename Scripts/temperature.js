/////////////////////////imports
var gaul = ee.FeatureCollection("FAO/GAUL_SIMPLIFIED_500m/2015/level2"),
    modis = ee.ImageCollection("MODIS/061/MOD11A1");

// defining boundarie for area of intrest
var chennai = gaul.filter(ee.Filter.eq('ADM2_CODE',70251))
var vellore = gaul.filter(ee.Filter.eq('ADM2_NAME','Vellore'))

//filtering images from 1999 - 2022
var studyArea=modis.
filter(ee.Filter.date('1999-01-01','2022-12-31')).select('LST_Day_1km')

var years = ee.List.sequence(1999, 2022);


//creating elements to store the mean values of temperature daya anualy
var yearlyCollection={};
var yearlyMean={}
print(studyArea.size())
var chennaiMean={}
var velloreMean={}

/// the for lop below stores the images from each year as an element of the yearlyCollection object and the yearlyMean object has the mean of the coresponding years

for(var i=0;i<23;i++){
  var year=1999+i
yearlyCollection[i]=studyArea.filter(ee.Filter.date(year+'-01-01',year+'-12-31'))
 yearlyMean[i]= yearlyCollection[i].mean().select('LST_Day_1km')
// chennaiMean[i]=yearlyMean[i].clip[chennai.geometry()]
// velloreMean[i]=yearlyMean[i].clip(vellore.geometry())
}
// for(var i=0;i<23;i+){
  



print(yearlyCollection[0].size())
var visPrams = {
  temp:{
  min: 13000.0,
  max: 17000.0,
  palette: ['#fef0d9','#fdcc8a','#fc8d59','#e34a33','#b30000']}
};
// adding temperature layer to the  map  , changing the index values to 1,11 and 22 gives the temperature foo 2000 , 2010 , 2022 respectiveley
// Map.addLayer(yearlyMean[22].clip(chennai.geometry()), visPrams.temp)
Map.addLayer(yearlyMean[22].clip(vellore.geometry()), visPrams.temp)
