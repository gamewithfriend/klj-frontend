import Fetcher from '../utils/Fetcher';

export const fetchCode = async () => {
    const data = {
        id: "region",
        name : "test"
    };

    const fetcher = new Fetcher().setUrl("/search/area")
                                    .setMethod("POST")
                                    .setData(JSON.stringify(data));
    try{
        const result = await fetcher.jsonFetch();
        return result;
    } catch(error){
        console.log(error)
    }
}

export const fetchCategoryCode = async () => {
    const data = {
        id: "category",
        name : "test"
    };

    const fetcher = new Fetcher().setUrl("/search/area")
                                    .setMethod("POST")
                                    .setData(JSON.stringify(data));
    try{
        const result = await fetcher.jsonFetch();
        return result;
    }catch(error){
        console.log(error)
    }
}

export const fetchSportsCode = async (categoryCode) => {
    
    const data = {
        id: categoryCode,
        name : "test"
    };

    const fetcher = new Fetcher().setUrl("/search/area")
                                    .setMethod("POST")
                                    .setData(JSON.stringify(data));
    try{
        const result = await fetcher.jsonFetch();
        return result;
    }catch(error){
        console.log(error)
    }
}


export const fetchRegionCode = async (regionCode) => {
      
    const data = {
      id: regionCode,
      name : "test"
    };

    const fetcher = new Fetcher().setUrl("/search/area")
                                    .setMethod("POST")
                                    .setData(JSON.stringify(data));
    try{
        const result = await fetcher.jsonFetch();
        return result;
    }catch(error){
        console.log(error)
    }
  }

  export const selectRegionCode = async (reduxRegion) => {
      
    const data = {
        area: reduxRegion.area,
        region : reduxRegion.region
      };

    const fetcher = new Fetcher().setUrl("/search/regionCode")
                                    .setMethod("POST")  
                                    .setData(JSON.stringify(data));
    try{
        const result = await fetcher.jsonFetch();
        return result;
    }catch(error){
        console.log(error)
    }
  }

  
//   export const getGymList = async () => {
      
//     const fetcher = new Fetcher().setUrl("/search/gym")
//                                     .setMethod("GET")
//     try{
//         const result = await fetcher.jsonFetch();
//         return result;
//     }catch(error){
//         console.log(error)
//     }
//   }

  export const trainerSearch = async (data) => {

    const fetcher = new Fetcher().setUrl("/search/trainer")
                                    .setMethod("POST")
                                    .setData(JSON.stringify(data));

    try{
        const result = await fetcher.jsonFetch();
        return result;

    }catch(error){
        console.log(error)
    }
  }
