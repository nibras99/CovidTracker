import axios from "axios";

let URL = "https://corona.lmao.ninja/v2/countries?yesterday&sort"
let URL1 = "https://covid19.mathdro.id/api"
let URL2 = "https://corona.lmao.ninja/v2/continents?yesterday=true&sort"
//let URL3 = "https://corona.lmao.ninja/v2/countries/Germany?yesterday=true&strict=true&query"

export let fetchData = async() =>{
    try {
        let {data} = await axios.get(URL2)
        return data;
    } catch (error) {
        console.log("CANT GET DATA")
    }

}

export let fetchCountries = async() =>{
    try {
        let {data} = await axios.get(URL)
        return data;
    } catch (error) {
        console.log("CANT GET DATA")
    }

}

export let fetchCountry = async(country) =>{

    if(country == "[object Window]"){
        return fetchCountries()
    }
    else{
    let URL3 = "https://corona.lmao.ninja/v2/countries/" + country + "?yesterday=true&strict=true&query"
    try {
        let {data} = await axios.get(URL3)
        return data;
    } catch (error) {
        console.log("CANT GET DATA")
    }
    }
}