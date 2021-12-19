import React from 'react'
import { useState, useEffect } from 'react'
import {Line, Bar} from "react-chartjs-2"

import { Chart, registerables } from 'chart.js'


import styles from "./Chart.module.css"

import {fetchData} from "../../api"
import {fetchCountries} from "../../api"

import { TableRow, TableHead, TableContainer, TableCell, TableBody, Table, Paper,Avatar } from '@material-ui/core';
import { makeStyles } from '@material-ui/core'
import { Button } from '@material-ui/core'

const Charts = ({data}) => {


    Chart.register(...registerables)

    let [dailyData, setDailyData] = useState([])
    let [value, setValue] = useState([])
    let [btnDeath, setbtnDeath] = useState(true)
    let [btnCountries, setbtnCountries] = useState(true)
    let [btnInfected, setbtnInfected] = useState(true)
    let [btnRecoveries, setbtnRecoveries] = useState(true)
    let [btnDeathsPerMillion, setbtnDeathsPerMillion] = useState(true)
    let [aMap, setAmap] = useState([])

    useEffect(() => {
       
      fetchData()
      .then((data) =>{
        setDailyData(data)
      })
    },[])

    useEffect(() => {
        fetchCountries()
        .then((data) =>{
            setValue(data)
        })
    }, [])

let barChart = ""

   let sortInfected = () =>{
       let onlyCases = 0
        onlyCases = value.map(elem => elem)


      
       onlyCases.sort(function(a,b){
        if(btnInfected){
           return b.cases-a.cases
        }
        else{
            return a.cases-b.cases
        }
       })
      
       setValue(onlyCases)
       setbtnInfected((prev)=>!prev)
   }

  let sortCountries = () =>{
  
    let onlyCountries = ""
    onlyCountries = value.map(elem => elem)
    onlyCountries.sort(function(a,b){

        if(btnCountries){
            if(a.country > b.country){
                return -1
            }
        }
        if(!btnCountries){
            if(a.country < b.country){
                return -1
            }
        }
   })
   setValue(onlyCountries)
   setbtnCountries((prev => !prev))
  }

  let sortDeaths = () =>{
    let onlyDeaths = 0
    onlyDeaths = value.map(elem => elem)

    onlyDeaths.sort(function(a,b){
        if(btnDeath){
            return b.deaths-a.deaths
        }
        else{
            return a.deaths-b.deaths
        }
       
    })
   
    setValue(onlyDeaths)
    setbtnDeath((prev) =>!prev)
}

let sortRecoveries = () =>{
    let onlyRecoveries = 0
    onlyRecoveries = value.map(elem => elem)

  
    onlyRecoveries.sort(function(a,b){
        if(btnRecoveries){
            return b.recovered-a.recovered
        }
        else{
            return a.recovered-b.recovered
        }
    })


    setValue(onlyRecoveries)
    setbtnRecoveries((prev)=>!prev)
}

let deathsPerMillion = () =>{
    let onlyDeathsPerMillion = 0
    onlyDeathsPerMillion = value.map(elem => elem)

    onlyDeathsPerMillion.sort(function(a,b){
        if(btnDeathsPerMillion){
        return b.deathsPerOneMillion-a.deathsPerOneMillion
        }
        else{
            return a.deathsPerOneMillion-b.deathsPerOneMillion
        }
    })
   
    setValue(onlyDeathsPerMillion)
    setbtnDeathsPerMillion((prev)=>!prev)
}

     const lineChart = (
          <Line
            data={{
                backgroundColor: "green",
              labels: dailyData.map(elem => elem.continent),
              datasets: [{
                  
                data: dailyData.map(elem => elem.todayCases),
                label: 'Infected',
                borderColor: '#3333ff',
                fill: true,
              }, {
                data: dailyData.map(elem => elem.todayDeaths),
                label: 'Deaths',
                borderColor: 'red',
                backgroundColor: 'rgba(255, 0, 0, 0.5)',
                fill: true,
              },  {
                data: dailyData.map(elem => elem.todayRecovered),
                label: 'Recovered',
                borderColor: 'green',
                backgroundColor: 'rgba(0, 255, 0, 0.5)',
                fill: true,
              },
            
              ],  
            }}
          />
    
      );

      console.log(data)

       barChart = (
      <Bar
            data = {{
                labels: ['Infected', 'Recovered', 'Deaths'],
                datasets: [{
                    label: 'Currently in ' + data.country,                                     
                    backgroundColor: [
                        'rgba(131, 11, 230, 0.5)',
                        'rgba(0, 255, 0, 0.5)',
                        'rgba(255, 0, 0, 0.5)',
                         ],
                    data : [data.todayCases, data.todayRecovered, data.todayDeaths, data.todayDeaths]
                }]
            }}
      ></Bar>
      )

      const stylesForTable = makeStyles((theme) => ({
          table:{
              minWidth: 650,
          },
          tableContainer:{
              borderRadius: 15,
              margin: "10px 10px",
              maxWidth: 1000,
              overflowY: "scroll",
              height:'700px',
              boxShadow: "rgba(0, 0, 0, 0.25) 0px 14px 28px, rgba(0, 0, 0, 0.22) 0px 10px 10px",
              background: "#C9D6FF",  
            background: "-webkit-linear-gradient(to right, #E2E2E2, #C9D6FF)",  /* Chrome 10-25, Safari 5.1-6 */
            background: "linear-gradient(to right, #E2E2E2, #C9D6FF)" /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */

         

              //backgroundColor: "rgb(237, 229, 239)",
              
          },
          tableHeaderCell: {
              fontWeight: "bold",
              backgroundColor: theme.palette.primary.dark,
              color: "white",
              boxShadow: "rgba(0, 0, 0, 0.25) 0px 14px 28px, rgba(0, 0, 0, 0.22) 0px 10px 10px",
  
          },
          tableCell : {
              fontWeight: "bold",
              fontSize: "20px",
          }
        }));

        let classesTable = stylesForTable();

      let table = <TableContainer component={Paper} className={classesTable.tableContainer}>
      <Table sx={{ minWidth: 650 }} stickyHeader aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell className={classesTable.tableHeaderCell} align="center" >Countries <div> <Button variant="contained" color="primary" onClick={sortCountries}>Press to sort</Button></div>  </TableCell>
            <TableCell className={classesTable.tableHeaderCell} align="center" >Total Infected<div><Button variant="contained" color="primary" onClick={sortInfected}>Press to sort</Button></div>  </TableCell>
            <TableCell className={classesTable.tableHeaderCell} align="center" >Total Deaths <div><Button variant="contained" color="primary" onClick={sortDeaths}>Press to sort</Button></div> </TableCell>
            <TableCell className={classesTable.tableHeaderCell} align="center">Total recoveries <div><Button variant="contained" color="primary" onClick={sortRecoveries}>Press to sort</Button></div> </TableCell>
            <TableCell className={classesTable.tableHeaderCell} align="center">Deaths per million <div><Button variant="contained" color="primary" onClick={deathsPerMillion}>Press to sort</Button></div> </TableCell>
          </TableRow>
        </TableHead>
        
        <TableBody>
          {value.map((element, index) => (
            <TableRow key={element.country} >
             <TableCell component="th" scope="row"> <h3>{index+1}</h3>
              <Avatar src = {element.countryInfo.flag} />  {element.country}
              </TableCell>
              <TableCell align="right" className={classesTable.tableCell} >   {element.cases.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} </TableCell>
              <TableCell align="right" className={classesTable.tableCell} >{element.deaths.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}  </TableCell> 
              <TableCell align="right" className={classesTable.tableCell} >{element.recovered.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</TableCell>
              <TableCell align="right" className={classesTable.tableCell} >{element.deathsPerOneMillion}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>

     

    return (

        <div className={styles.container}>
            {data.country? barChart :  lineChart}
            {table} 
        </div>

 

    )
}

export default Charts
