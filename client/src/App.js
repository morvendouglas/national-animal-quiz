import React, { useState, useEffect } from 'react'
import WorldMap, { CountryContext } from 'react-svg-worldmap';
import './App.css';

const App = () => {

    const [countries, setCountries] = useState([])
    const [selectedCountry, setSelectedCountry] = useState([])
    const fetchAllCountries = () => {
        fetch('https://restcountries.com/v2/all')
            .then(response => response.json())
            .then(data => setCountries(data))
    }
    useEffect(() => {
        fetchAllCountries()
    }, [])

    const countryItems = countries.map((country) => {
        const ios = country.alpha2Code
        const area = country.area
        return { country: ios, value: "" }
    })

    const [capitals, setCapitals] = useState([
        { capital: 'the Beaver', iso: 'CA' },
        { capital: 'the Snow Monkey', iso: 'JP' },
        { capital: 'the Gallic Rooster', iso: 'FR' },
        { capital: ' the Golden Eagle', iso: 'MX' },
        { capital: 'the Gray Wolf', iso: 'TR' },
        { capital: 'the Kiwi', iso: 'NZ' },
        { capital: 'the Brown Bear', iso: 'RU' },
        { capital: 'the Bald Eagle', iso: 'US' },
    ])
    const [selectedCapital, setSelectedCapital] = useState({ capital: 'the Kangaroo', iso: 'AU' })
    const [correctCountries, setCorrectCountries] = useState([])
    const [inCorrectCountries, setInCorrectCountries] = useState([])
    const [answer, setAnswer] = useState("")
    const [question, setQuestion] = useState(`Click the Country where the National Animal is ${selectedCapital.capital}...`)

    const setNewQuestion = () => {
        let question = `Click the Country where the National Animal is ${selectedCapital.capital}...`
        setQuestion(question)
    }
    const onClick = () => {
        setNewQuestion()
        setAnswer("")
        if ( capitals === [] ) {
            console.log("working")
        } 

    }
    const newQuestion = () => {
        let capital = capitals[Math.floor(Math.random() * capitals.length)];
        setSelectedCapital(capital)
    }

    const clickAction = (country) => {
        console.log(country.countryCode)
        console.log(selectedCapital.iso)
        if (country.countryCode === selectedCapital.iso) {

            for (var i = 0; i < capitals.length; i++) {
                if (capitals[i] === selectedCapital) {
                    capitals.splice(i, 1);
                }
            }
            setCorrectCountries(country)
            newQuestion()
            console.log("Correct")
            setAnswer(`Woohoo! ${country.countryName} is Correct`)
        } else {
            console.log("Try Again")
            newQuestion()
            setAnswer(`Nope. Sorry not ${country.countryName}!`)
            setInCorrectCountries(country)
        }
    }

    return (
        <div className="App">
        <h1>National Animals Quiz</h1>
            <WorldMap
                className="Map"
                color="green"
                data={countryItems}
                onClickFunction={clickAction}
                size='responsive'
                richInteraction
            />
            <h2>{question} <button onClick={onClick}>&rarr;</button></h2>
            <h2>{answer}</h2>
        </div>
    )
}

export default App;
