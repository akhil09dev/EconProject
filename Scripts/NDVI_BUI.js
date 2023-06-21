var gaul = ee.FeatureCollection("FAO/GAUL_SIMPLIFIED_500m/2015/level2"),
    L7 = ee.ImageCollection("LANDSAT/LE07/C02/T1_RT");


    var chennai = gaul.filter(ee.Filter.eq('ADM2_CODE',70251))
var vellore = gaul.filter(ee.Filter.eq('ADM2_NAME','Vellore'))
var studyArea=L7.filter(ee.Filter.bounds(chennai.geometry())).filter(ee.Filter.date('1999-01-01','2022-12-31'))
var years = ee.List.sequence(1999, 2022);
var yearlyCollection={};
var yearlyMean={}
print(studyArea.size())
for(var i=0;i<23;i++){
  var year=1999+i
yearlyCollection[i]=studyArea.filter(ee.Filter.date(year+'-01-01',year+'-12-31'))
 yearlyMean[i]= yearlyCollection[i].mean()

}
print( yearlyMean)
////////////////////////BUI
var anualBUI = {}
var anualNDVI={}
var C_anualBUI = {}
var C_anualNDVI={}
var V_anualBUI = {}
var V_anualNDVI={}
for(var i =0 ;i<23;i++){
  var ndvi = yearlyMean[i].normalizedDifference(['B5', 'B4']);
  anualNDVI[i]=ndvi
  var ndbi = yearlyMean[i].normalizedDifference(['B5', 'B6_VCID_1']);
  anualBUI[i]=ndvi.subtract(ndbi);
  C_anualBUI[i]=anualBUI[i].clip(chennai.geometry())
  C_anualNDVI[i]=anualNDVI[i].clip(chennai.geometry())
  V_anualBUI[i]=anualBUI[i].clip(vellore.geometry())
  V_anualNDVI[i]=anualNDVI[i].clip(vellore.geometry())

}
print(anualBUI)


// for x in years{
//     Yearlycollection[x]=studyArea.filter(ee.Filter.date(year+'01-01',year+'12-31'))
//   }
  var visPrams = {
    BUI:{
    min:-.5,
    max:1,
    palette:['#ffffb2','#fecc5c','#fd8d3c','#f03b20','#bd0026']
  },
    NDVI:
    {
      min:-1,
      max:0.5,
    palette:['#d7191c','#fdae61','#ffffbf','#a6d96a','#1a9641']
    }
  }
//adding BUI and NDVI to the map

// Map.addLayer(C_anualBUI[22],visPrams.BUI)
// Map.addLayer(C_anualNDVI[22],visPrams.BUI)

// Map.addLayer(V_anualBUI[22],visPrams.BUI)
Map.addLayer(V_anualNDVI[22],visPrams.NDVI)


