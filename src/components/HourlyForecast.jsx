import React,  { useRef } from 'react';
import img from "../images/cloudyimg.png";
import { FaChevronLeft, FaChevronRight  } from 'react-icons/fa';

function HourlyForecast({hourlyData}) {

    const scrollRef=useRef(null);//スクロール
    const scrollLeft=()=> {
        scrollRef.current.scrollBy({left:-300, behavior:'smooth'});
    }
    const scrollRight=()=> {
        scrollRef.current.scrollBy({left:300, behavior:'smooth'});
    }

  return (
    <div className="mt-6 relative">
        <div ref={scrollRef}
             className="flex gap-4 mx-10 py-2 overflow-x-auto scrollbar-hide"
             style={{scrollBehavior:'smooth'}}>
                {
                    hourlyData.map((hour,index)=>(
                         <div key={index} className="flex flex-col items-center shadow-lg bg-yellow py-2 rounded px-4">
                            <p>{new Date(hour.time).getHours()}:00</p>
                            <img src={hour.condition.icon}
                                alt="weather icon"
                                className="w-10 mx-auto"/>
                            <p>{hour.temp_c}°C</p>
            </div>
                    ))
                }
           
        </div>

        {/* スクロールボタン */}
        <button onClick={scrollLeft}
            className="absolute left-0 top-1/2 ">
            <FaChevronLeft className="w-4 w-4"/>
        </button>
        <button onClick={scrollRight}
            className="absolute right-0 top-1/2 ">
            <FaChevronRight className="w-4 w-4"/>
        </button>
    </div>
  )
}

export default HourlyForecast