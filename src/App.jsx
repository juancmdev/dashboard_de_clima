import { useState } from "react";

const App = () => {
  //Estados de la aplicación
  const [city, setCity] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);

  //Función para manejar el envío de la búsqueda
  const handleSearch = async (e) => {
    e.preventDefault();
    if (!city.trim()) return;

    setLoading(true);
    setWeatherData(null);

    const apikey = import.meta.env.VITE_WEATHER_API_KEY;
    const url = `https://api.weatherapi.com/v1/current.json?key=${apikey}&q=${city}&lang=es`;

    try {
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error("Ciudad no encontrada");
      }

      const data = await response.json();
      setWeatherData(data);
    } catch (error) {
      console.error("Error al obtener el clima: ", error);
      alert("No se pudo encontrar la ciudad o hubo un error en la búsqueda.");
    } finally {
      setLoading(false);
    }

    console.log("Buscando el clima para: ", city);
    // //Aquí conectaremos la API más adelante
  };

  return (
    <div className="min-h-screen bg-slate-900 text-white flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md bg-slate-800 p-6 rounded-2xl shadow-xl border border-slate-700">
        <h1 className="text-2xl font-bold text-center mb-6">
          Dashboard de Clima 🌤️
        </h1>
        {/* Formulario de búsqueda */}
        <form onSubmit={handleSearch} className="flex gap-2 mb-6">
          <input
            type="text"
            placeholder="Escriba una ciudad..."
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className="w-full px-4 bg-slate-700 border border-slate-600 rounded-lg focus:outline-none focus:border-sky-500 text-white transition-colors"
          />
          <button
            type="submit"
            className="px-4 py-2 bg-sky-500 hover:bg-sky-600 text-white font-medium rounded-lg transition-colors cursor-pointer"
          >
            {loading ? "Buscando..." : "Buscar"}
          </button>
        </form>
        {/* Indicador de Carga */}
        {loading ?? (
          <p className="text-center text-slate-400 py-4 animate-pulse">
            Consultando el pronóstico del clima... ⏳
          </p>
        )}
        {/* 🌤️ Tarjeta con la Información del Clima */}
        {weatherData && (
          <div className="bg-slate-700/50 border border-slate-600 rounded-xl p-5 flex flex-col items-center gap-3">
            <h2 className="text-2xl font-semibold">
              {weatherData.location.name},<span> </span>
              <span className="text-slate-400 text-lg">
                {weatherData.location.country}
              </span>
            </h2>

            <div className="flex items-center gap-2">
              <img
                src={weatherData.current.condition.icon}
                alt={weatherData.current.condition.text}
                className="w-16 h-16"
              />
              <span className="text-5xl font-bold">
                {Math.round(weatherData.current.temp_c)}°C
              </span>
            </div>

            <p className="text-lg capitalize text-sky-300 font-medium">
              {weatherData.current.condition.text}
            </p>

            <div className="flex justify-around w-full mt-3 pt-3 border-t border-slate-600 text-sm text-slate-300">
              <div>
                <p className="font-semibold text-white">Humedad</p>
                <p>{weatherData.current.humidity}%</p>
              </div>
              <div>
                <p className="font-semibold text-white">Viento</p>
                <p>{weatherData.current.wind_kph} km/h</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
