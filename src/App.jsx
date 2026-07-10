import SearchBar from "./components/SearchBar"
import TemperatureToggle from "./components/TemperatureToggle"
import LoadingSpinner from "./components/LoadingSpinner"
import ErrorMessage from "./components/ErrorMessage"
import WeatherCard from "./components/WeatherCard"
import WeatherForecast from "./components/WeatherForecast"
import { useWeather } from "./hooks/useWeather"


const App = () => {

  const { currentWeather, forecast, loading, error, unit, fetchWeatherCity, fetchWeatherByLocation, toggleUnit, searchCities } = useWeather();

  return (
    <div className='relative min-h-screen w-full overflow-hidden'>
      {/* Background Image with Overlay*/}
      <div
        className='absolute inset-0 bg-cover bg-center bg-no-repeat'
        style={{
          backgroundImage: "url('https://static.vecteezy.com/system/resources/previews/040/549/591/non_2x/ai-generated-sunset-over-the-tranquil-water-nature-beauty-in-twilight-generated-by-ai-free-photo.jpg')",
        }} />

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-900/40 via-purple-900/30 to-indigo-900/40"></div>

      {/* Contenu visible */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 py-20">
        <div className='text-center mb-12'>
          <h1 className='text-5xl md:text-7xl font-bold text-white mb-4 drop-shadow-2xl tracking-tight'>
            Weather <span className='bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent'>Pro</span>
          </h1>

          <p className='text-white/80 text-lg md:text-xl mb-8 max-w-2xl mx-auto leading-relaxed'>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Rerum optio neque dicta vel, doloremque earum nostrum provident repellat distinctio quaerat aliquam, fugit numquam sit quis, molestiae adipisci quo est atque.
          </p>
        </div>

        <div className=" flex flex-col lg:flex-row items-center justify-center space-y-6 lg:space-y-0 lg:-space-x-6 mb-12">
          <SearchBar onsearch={fetchWeatherCity} onlocationSearch={fetchWeatherByLocation} searchCities={searchCities} loading={loading} />
          <TemperatureToggle unit={unit} onToggle={toggleUnit} />
        </div>
      </div>
      {/* Main Content */}
      <div className="space-y-8">
        {/* Conditional Rendering */}
        {loading && (<div className="flex justify-center">
          <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-8 border border-white/20">
            {/*<LoadingSpinner />*/}
            <p className="text-white/80 text-center mt-4 font-medium">Fetching latest weather data....</p>
          </div>
        </div>
        )}

        {/* Conditional Rendering */}
        {error && !loading && (<div className="max-w-2xl mx-auto"> {/*<ErrorMessage />*/}</div>)}

        {/* Conditional Rendering */}
        {currentWeather && !loading && (
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
            <div className="xl:col-span-2"><WeatherCard />
            </div>
            <div className="xl:col-span-1">
              {/* Conditional Rendering */}
              {forecast && <WeatherForecast />}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default App