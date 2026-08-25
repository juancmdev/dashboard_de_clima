import { useState } from "react";

const App = () => {
  //Estados de la aplicación
  const [city, setCity] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);

  //Función para manejar el envío de la búsqueda
  const handleSearch = (e) => {
    e.preventDefault();
    if (!city.trim()) return;

    console.log("Buscando el clima para: ", city);
    //Aquí conectaremos la API más adelante
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
            className="px-4 py-2 bg-sky-500 hover:bg-sky-600 text-white font-medium rounded-lg transition-colors"
          >
            Buscar
          </button>
        </form>

        {/* 📌 Aquí renderizaremos la tarjeta de clima más adelante */}
      </div>
    </div>
  );
};

export default App;
