import React from 'react'
import Input from './components/Input'
import { CardContent, Cards } from './components/Cards'
// import Button from './components/Button'
import {Sun, CloudRain , Snowflake} from 'lucide-react'
import { useState } from 'react'

const API_KEY = '69a1396497642a868114843012c4473d'

const WeatherApp = () => {

    const [city, setCity]=useState('')
    const [weather, setWeather]=useState(null)
    const [loading, setLoading]=useState(false)
    const [error, setError]=useState('')
    
    const fetchWeather = async()=>{
        setLoading(true)
        setError('')
        try {
            const response =  await fetch(`https://api.openweathermap.org/data/2.5/weather?q=Pune&appid=69a1396497642a868114843012c4473d`)
             if(!response.ok)throw new Error('City not found')
        
        const data = await(response.json())
        setWeather(data)
        console.log(weather)
        
        } catch (error) {
            setError(error.message)
            setWeather(null)
        }
        setLoading(false)
    }
  
    const getWeatherIcon = (main)=>{
      switch(main){
        case "clear" :
          return <Sun className='text-yellow-400 w-10 h-10'/>
        case "Rain" :
          return <CloudRain className='text-blue-400 w-10 h-10' />
        case "Snow" :
          return <Snowflake className= 'text-blue-200 w-10 h-10' />
        
      }
    }
    fetchWeather()
    
  return (
    <div className='min-h-screen bg-gradient-to-br from-blue-100 to blue-300 flex items-center justify-center p-4'>
      <Cards className='w-full max-w-md p-6 shadow-2xl rounded-2xl'>
        <CardContent>
          <h1 className='text-3x1 font-bold mb-4 p-6 shadow-2xl '>Weather App</h1>
          <div className ='flex gap-2 mb-4'>
            <Input type= 'text' value={city} onChange={(e)=>setCity(e.target.value)} placeholder='Enter city Name' className='flex-1' />

            <Button onCLICK={fetchWeather} disabled={loading}>
              {
                loading?'loading':"Search"
              }

            </Button>
            {
              weather && (
                <div className='text-center mt-6'>
                  {
                    getWeatherIcon(weather.weather[0].main)
                    
                  }
                  <h2>{weather.name}, {weather.sys.country}</h2>

                </div>
              )
            }
          </div>

        </CardContent>
      </Cards>
      
    </div>
  )
}

export default WeatherApp
