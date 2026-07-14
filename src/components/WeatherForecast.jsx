import React from 'react'
import * as LucideIcons from 'lucide-react'
import { Calendar, Droplets } from 'lucide-react'

const WeatherForecast = ({ forecast, unit }) => {

  // --- 1. Extraction correcte des 5 jours (1 item toutes les 8 entrées)
  const dailyItems = forecast.list.filter((_, index) => index % 8 === 0).slice(0, 5)

  // --- 2. Fonction utilitaire pour formater la date
  const formatDate = (timestamp) => {
    return new Date(timestamp * 1000).toLocaleDateString('en-US', {
      weekday: 'long',
      month: 'short',
      day: 'numeric',
    })
  }

  // --- 3. Fonction utilitaire pour choisir l’icône
  const getWeatherIcon = (weather) => {
    const main = weather.main.toLowerCase()

    if (main.includes("cloud")) return "Cloud"
    if (main.includes("rain")) return "CloudRain"
    if (main.includes("clear")) return "Sun"
    if (main.includes("storm")) return "CloudLightning"
    if (main.includes("snow")) return "Snowflake"

    return "Cloud"
  }

  // --- 4. Fonction utilitaire pour la température
  const formatTemperature = (temp, unit) => {
    return unit === "metric"
      ? `${Math.round(temp)}°C`
      : `${Math.round((temp * 9) / 5 + 32)}°F`
  }

  return (
    <div className='w-full max-w-[400px] mr-auto lg:-ml-60 bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-6 shadow-2xl'>

      {/* Header */}
      <div className='flex items-center space-x-3 mb-8'>
        <div className='p-2 bg-white/10 rounded-full'>
          <Calendar className='w-6 h-6 text-white/80' />
        </div>
        <h2 className='text-2xl font-bold text-white'>5 Day Forecast</h2>
      </div>

      {/* Forecast Items */}
      <div className='space-y-4'>
        {dailyItems.map((item, index) => {
          const iconName = getWeatherIcon(item.weather[0])
          const IconComponent = LucideIcons[iconName] || LucideIcons.Cloud

          return (
            <div
              key={index}
              className='flex items-center justify-between p-5 bg-white/5 backdrop-blur-sm rounded-2xl hover:bg-white/10 transition-all duration-300 group border border-white/10'
            >
              <div className='flex items-center space-x-5 flex-1'>
                <div className='text-white/90 group-hover:text-white transition-all transform group-hover:scale-110 duration-300'>
                  <IconComponent size={40} />
                </div>

                <div className='flex-1'>
                  <div className='text-white font-semibold text-lg'>
                    {index === 0 ? "Today" : formatDate(item.dt)}
                  </div>
                  <div className='text-white/70 text-sm capitalize font-medium'>
                    {item.weather[0].description}
                  </div>
                </div>
              </div>

              <div className='flex items-center space-x-6'>
                <div className='flex items-center space-x-2 text-white/60'>
                  <Droplets className='w-4 h-4 text-blue-300' />
                  <span className='text-sm font-medium'>
                    {Math.round(item.pop * 100)}%
                  </span>
                </div>

                <div className='text-right'>
                  <div className='text-white font-bold text-xl'>
                    {formatTemperature(item.main.temp, unit)}
                  </div>
                  <div className='text-white text-sm font-medium'>
                    {formatTemperature(item.main.temp_min, unit)} / {formatTemperature(item.main.temp_max, unit)}
                  </div>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default WeatherForecast
