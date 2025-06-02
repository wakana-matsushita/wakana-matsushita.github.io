import {FaSearch, FaMapMarkerAlt} from 'react-icons/fa'
import img from "./images/cloudyimg.png";
import HourlyForecast from './components/HourlyForecast.jsx';
import axios from 'axios';
import {useState} from 'react';
import { ImFacebook } from 'react-icons/im';


function App() {

  const [weatherData, setWeatherData] = useState(null); // 天気データを保存するためのステート(初期化)
  const [city, setCity] = useState(""); // 入力された都市名を保存する
  const [error, setError] = useState(""); // エラーメッセージを保存する

  const api_key = "80a30b9fe5174f0293894428252905"; // 天気のAPIのキー
  const api_url = "http://api.weatherapi.com/v1/forecast.json";// 天気のAPIのURL

  const fetchData=async(query)=>{
    try{
      const response  = await axios.get(`${api_url}?key=${api_key}&q=${query}&days=1`);
      console.log(response.data.forecast);
      setWeatherData(response.data); // 取得したデータをステートに保存
       setError(""); // 成功したらエラーメッセージをクリア
    }catch(err){
      setError("データが見つかりません");
      setWeatherData(null)
    }
  }
  // 現在地の取得
  const getCurrentLocation = () => {
    if(navigator.geolocation){
      navigator.geolocation.getCurrentPosition((position)=>{
        const {latitude,longitude} =position.coords;
        const query = `${latitude},${longitude}`;
        fetchData(query);
        console.log(latitude,longitude);
      },(error)=>{
        setError(error.message);
      })
    }else{
      setError("位置情報はサポートされていません");
    }
  }
  // Enter押されたら
  const handleKeyPress = (event) =>{
    if(event.key === "Enter"){
      if (!city.trim()|| city.trim().length < 2) {
      setError("2文字以上の都市名を入力してください");
      setWeatherData(null);
      return;
    }
      fetchData(city);
    }
  }

  //日本語変換
  const weatherTextJa = {
   "Sunny": "晴れ",
  "Clear": "快晴",
  "Partly cloudy": "晴れ時々くもり",
  "Cloudy": "くもり",
  "Overcast": "曇天",
  "Mist": "霧",
  "Patchy rain possible": "雨の可能性",
  "Patchy snow possible": "雪の可能性",
  "Patchy sleet possible": "みぞれの可能性",
  "Patchy freezing drizzle possible": "凍雨の可能性",
  "Thundery outbreaks possible": "雷雨の可能性",
  "Blowing snow": "吹雪",
  "Blizzard": "猛吹雪",
  "Fog": "霧",
  "Freezing fog": "凍霧",
  "Patchy light drizzle": "小雨",
  "Light drizzle": "小雨",
  "Heavy rain": "大雨",
};

  return (
    <>
      <div className="bg-yellow min-h-screen flex items-center justify-center">
        {/*外枠 */}
        <div className="bg-yellow shadow-lg rounded w-full max-w-lg py-12 px-6 ">
          <div className="flex">
            {/* 入出力フィールドと検索ボタン */}
            <div className="flex border rounded items-center px-2 py-2 w-full">
              <FaSearch className="h-5 w-5"/>          
              <input
                type="text"
                placeholder="都市名を英語で入力してください
"
                onKeyUp={handleKeyPress}
                value={city}
                onChange={(e)=>setCity(e.target.value)}
                className="pl-2 border-none focus:outline-none w-full"
                />
            </div>
            {/* 現在地ボタン */}
            <button onClick={getCurrentLocation}
            className="px-2 py-1 bg-green-500 text-white ml-2 rounded hover:bg-green-300 flex flex-col items-center justify-center">
              <FaMapMarkerAlt className="w-5 h-5 "/>
              <span className="text-[12px] whitespace-nowrap">現在地</span>
            </button>
          </div>
          {/* エラー表示 */}
          { error && <p className="text-red-500">{error}</p>}
          {/* 起床データ表示 */}
            {weatherData && (
              <div className="mt-4 text-center">
                <h2 className="text-xl font-semibold">{weatherData.location.name}</h2>
                {/* 天気アイコン */}
                <img
                src={weatherData.current.condition.icon}
                className="mx-auto h-40"
                />
                <p className="text-lg font-semibold">{weatherData.current.temp_c}°c</p>
                <p className="text-sm capitalize font-semibold">{weatherTextJa[weatherData.current.condition.text]|| weatherData.current.condition.text}</p>

                {/*　時間別予報 */}
                <HourlyForecast hourlyData={weatherData.forecast.forecastday[0].hour}/>
              </div>
            )}
        </div>
      </div>
    </>
  );
}

export default App
