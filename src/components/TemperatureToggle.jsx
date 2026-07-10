import React from 'react'

const TemperatureToggle = (unit, toggleunit) => {
  return (
    <div className='bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-2 shadow-lg'>
      <div className='flex items-center'>
        <button
          className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-300 ${unit === 'metric' ? 'bg-white text-gray-800' : 'text-white hover:bg-white/10'}`}
          onClick={() => onToggle('metric')}
        >
          °C
        </button>
        <button
          className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-300 ${unit === 'imperial' ? 'bg-white text-gray-800' : 'text-white hover:bg-white/10'}`}
          onClick={() => onToggle('imperial')}
        >
          °F
        </button>
      </div>
    </div>
  )
}

export default TemperatureToggle
