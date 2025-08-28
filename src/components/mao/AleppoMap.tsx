import React, { useMemo, useState } from "react";
import { GoogleMap, LoadScript, Polygon } from "@react-google-maps/api";
import data from '../../config/blocks.json'
import MapFilters from "./MapFilters";
// Example GeoJSON with multiple polygons
const geoJsonData = data


const containerStyle = {
  width: "100%",
  height: "600px"
};

const center = {
  lat: 36.1995,
  lng: 37.1627
};


const polygonOptions = {
  
  
  strokeOpacity: 1,
  strokeWeight: 0
};
const polygonKeyOptions = (item:any)=>{
    let color =''
    switch (item.key) {
        case 'nearCollapse':
             color= "#EF4626"
            break;
            case 'riskyCondition':
             color="#fb8500"
                
            break;
            case 'moderateCondition':
                color='#CBDB2A'
            
            break;
            case 'minor':
                color='#34C759'
            
            break;
    
        default:
            color='#34C759'
            break;
    }
    return {
        fillColor: color,
  fillOpacity: 0.4,
  strokeColor: color,
  strokeOpacity: 1,
  strokeWeight: 2
    }
}
type props ={
    dataKeys:any
}
function AleppoMap({dataKeys}:props) {
    console.log(dataKeys.dataList);
    const [stateFilter,setStateFilter]=useState('')
    const [typeFilter,setTypeFilter]=useState('')
  const exportToJsonFile = () => {
    const results:any = []
    dataKeys?.dataList?.forEach((item:any, idx:number) => {
        if(!item.index){
            return null
        }
        else if(stateFilter && item.key !== stateFilter && stateFilter !== 'all'){
            return null
        }
        else if(typeFilter && item.function !== typeFilter && typeFilter !== 'all'){
            return null
        }
        else{
 results.push({
  ...geoJsonData.features[item.index],
  report:item
})
        }
       
       
      })
      console.log(results);
      
    const fileName = "data.json";
    const jsonStr = JSON.stringify(results, null, 2); // pretty print with 2 spaces

    const blob = new Blob([jsonStr], { type: "application/json" });
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = fileName;
    link.click();

    URL.revokeObjectURL(url); // cleanup
  };  
  const polygons = useMemo(
    () =>
      geoJsonData.features.map((feature, idx) => {
        const coords = feature.geometry.coordinates[0].map(([lng, lat]) => ({
          lat,
          lng
        }));
        //@ts-ignore
        return <Polygon key={idx} paths={coords} options={polygonOptions} />;
      }),
    []
  );
   const keyPolygon = useMemo(
    () =>
      dataKeys?.dataList?.map((item:any, idx:number) => {
        if(!item.index){
            return null
        }
        if(stateFilter && item.key !== stateFilter && stateFilter !== 'all'){
            return null
        }
        if(typeFilter && item.function !== typeFilter && typeFilter !== 'all'){
            return null
        }

        const coords = geoJsonData.features[item.index].geometry.coordinates[0].map(([lng, lat]) => ({
          lat,
          lng
        }));
        //@ts-ignore
        return <Polygon key={idx} paths={coords} options={polygonKeyOptions(item)} />;
      }),
    [stateFilter,typeFilter]
  );
  return (
    <div className="relative ">

        <MapFilters typeFilter={typeFilter} setTypeFilter={setTypeFilter} stateFilter={stateFilter} setStateFilter={setStateFilter} exportToJsonFile={exportToJsonFile}/>
        <LoadScript googleMapsApiKey={"AIzaSyCEbRUDAvy7CNUMi5_o61CI5wv7gwv6mZ4"}>
      <GoogleMap

        mapContainerStyle={containerStyle}
        
        center={center}
        zoom={18}
        mapTypeId="satellite" // use "roadmap" for normal view, "satellite" for imagery
      >
        {polygons}
        {keyPolygon}
      </GoogleMap>
    </LoadScript>
    </div>
    
  );
}

export default AleppoMap;
