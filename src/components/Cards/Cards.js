import React from 'react'
import { Card, CardContent, Typography, Grid } from '@material-ui/core'
import CountUp from 'react-countup'
import cx from "classnames"

import styles from "./Cards.module.css"


const Cards = ({data}) => {

    let styleAllCards =  {   
    boxShadow: "rgba(0, 0, 0, 0.25) 0px 14px 28px, rgba(0, 0, 0, 0.22) 0px 10px 10px"} 
  
    
    let day = ""
    let infected = 0
    let recover = 0
    let deaths = 0
    let infectedToday = 0
    let recoveredToday = 0
    let deathsToday = 0

     let getInfectedData = () =>{
         let infected = 0
         data.map(elem => infected += elem.cases)
         return infected
     }

    let getDay = () =>{
        let allDays = []
        data.map(days => allDays.push(days.updated))
        return new Date (allDays[0]).toDateString()
    }

    let getRecoverData = () =>{
        let recovered = 0
        data.map(elem => recovered+= elem.recovered)
        return recovered
    }

    let getDeathsData = () =>{
        let deaths = 0
        data.map(elem => deaths+=elem.deaths)
        return deaths
    }

    let getDeathsDataToday = () =>{
        let deaths = 0
        data.map(elem => deaths+=elem.todayDeaths)
        return deaths
    }

    let getInfectedDataToday = () =>{
        let infected = 0
        data.map(elem => infected+=elem.todayCases)
        return infected
    }

    let getRecoverDataToday = () =>{
        let recover = 0
        data.map(elem => recover+=elem.todayRecovered)
        return recover
    }

  
    if(data.country){
        day = new Date (data.updated).toDateString()
        infected = data.cases
        deaths = data.deaths
        recover = data.recovered
        infectedToday = data.todayCases
        deathsToday = data.todayDeaths
        recoveredToday = data.todayRecovered
   
    }

    else{
        
        day = getDay();
        infected = getInfectedData()
        recover = getRecoverData()
        deaths = getDeathsData()
        recoveredToday = getRecoverDataToday()
        infectedToday = getInfectedDataToday()
        deathsToday = getDeathsDataToday()
        
    }
  


    return (
        <div className={styles.container}>
            <Grid container spacing = {3} justifyContent='center'>
                <Grid item component = {Card} style={styleAllCards} xs = {12} md={3} className={cx(styles.card, styles.infected)}>
                    <CardContent>
                        <Typography gutterBottom variant='h5'>Total Infected</Typography>
                            <hr></hr>
                        <Typography variant = "h5" color='primary'>
                        <CountUp 
                        start = {0}
                        end = {infected}
                        duration={1.5}
                        separator=','
                        />
                        </Typography>
                        <br></br>
                        <Typography variant = "h5">Today</Typography>
                        <Typography variant='body2'>{day}</Typography>
                        <hr></hr>
                     <Typography variant = "h5" color='secondary'>
                        <CountUp 
                        start = {0}
                        end = {infectedToday}
                        duration={1.5}
                        separator=','
                        />
                        </Typography>
    
                    </CardContent>
                </Grid>
                <Grid item component = {Card} style={styleAllCards} xs = {12} md={3} className={cx(styles.card, styles.recovered)}>
                    <CardContent>
                        <Typography  gutterBottom variant='h5'>Total Recovered</Typography>
                        <hr></hr>
                        <Typography variant = "h5" color='primary'>
                        <CountUp 
                        start = {0}
                        end = {recover}
                        duration={1.5}
                        separator=','
                        />
                        </Typography>
                        <br></br>
                        <Typography variant = "h5">Today</Typography>
                        <Typography variant='body2'>{day}</Typography>
                        <hr></hr>
                        <Typography variant = "h5" color='secondary'>
                        <CountUp 
                        start = {0}
                        end = {recoveredToday}
                        duration={1.5}
                        separator=','
                        />
                        </Typography>
                    </CardContent>
                </Grid>
                <Grid item component = {Card} style={styleAllCards} xs = {12} md={3} className={cx(styles.card, styles.deaths)}>
                    <CardContent>
                        <Typography  gutterBottom variant='h5'>Total Deaths</Typography>
                        <hr></hr>
                        <Typography variant = "h5" color='primary'>
                        <CountUp 
                        start = {0}
                        end = {deaths}
                        duration={1.5}
                        separator=','
                        />
                        </Typography>
                        <br></br>
                        <Typography variant = "h5">Today</Typography>
                        <Typography variant='body2'>{day}</Typography>
                        <hr></hr>
                        <Typography variant = "h5" color='secondary'>
                        <CountUp 
                        start = {0}
                        end = {deathsToday}
                        duration={1.5}
                        separator=','
                        />
                        </Typography>
                    </CardContent>
                </Grid>
            </Grid>
        </div>
    )
}

export default Cards
