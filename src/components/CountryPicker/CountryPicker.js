import React from 'react'
import { useState, useEffect } from 'react'
import { NativeSelect, FormControl } from '@material-ui/core'

import {fetchCountries} from "../../api"

import styles from "./CountryPicker.module.css"

const CountryPicker = ({handleCountryChange}) => {
    let[fetchedCountry, setFetchedCountries] = useState([])

    useEffect(() => {
        fetchCountries()
        .then((elem) =>{
            setFetchedCountries(elem)
        })
    }, [setFetchedCountries])

    let map = fetchedCountry.map(elem => elem.country)
    return (
        <FormControl className={styles.formControl}>
            <NativeSelect onChange={(e) => {handleCountryChange(e.target.value)}}>
                <option value={global}>Global</option>
                {map.map((elem,i) => <option value = {elem} key={i}>{elem}</option>)}    
                    
            </NativeSelect>
        </FormControl>
       
    )
}

export default CountryPicker
