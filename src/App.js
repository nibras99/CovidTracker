import React, { useState } from "react";
import Cards from "./components/Cards/Cards";
import Chart from "./components/Chart/Chart";
import CountryPicker from "./components/CountryPicker/CountryPicker";
import { useEffect } from "react";

import axios from "axios";

import covidImg from "./images/covid.png"
import styles from "./App.module.css"
import {fetchData} from "./api"
import {fetchCountry} from "./api"


const App = () => {
  let [data, setData] = useState([])
  useEffect(() => {
    fetchData()
    .then((data) =>{
      setData(data)
    })
  },[])

  let handleCountryChange = async (country) =>{
    let fetchedData = await fetchCountry(country)
   setData(fetchedData);
  }
  return (
    <div>
    <div className={styles.container}>
      <img className={styles.image} src = {covidImg}></img>
      <Cards data = {data}/>
      <CountryPicker handleCountryChange = {handleCountryChange} />
      <Chart data = {data}/>
    </div>
 
    </div>
  )
}

export default App
