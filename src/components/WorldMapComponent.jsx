"use client";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import DotMap from "./DotMap";

const COUNTRIES = [
  {
    name: "India",
    lat: 20.5937,
    lng: 78.9629,
    color: "#4834d4",
    progress: 40,
    flagUrl: "https://flagcdn.com/in.svg",
  },
  {
    name: "USA",
    lat: 37.0902,
    lng: -95.7129,
    color: "#bd5302",
    progress: 25,
    flagUrl: "https://flagcdn.com/us.svg",
  },
  {
    name: "CANADA",
    lat: 56.1304,
    lng: -106.3468,
    color: "#e9c16b",
    progress: 10,
    flagUrl: "https://flagcdn.com/ca.svg",
  },
  {
    name: "UAE",
    lat: 23.4241,
    lng: 53.8478,
    color: "#01754f",
    progress: 7,
    flagUrl: "https://flagcdn.com/ae.svg",
  },
];

export default function WorldMapComponent() {
  const connections = [];
  for (let i = 0; i < COUNTRIES.length; i++) {
    for (let j = i + 1; j < COUNTRIES.length; j++) {
      connections.push({
        start: {
          lat: COUNTRIES[i].lat,
          lng: COUNTRIES[i].lng,
          color: COUNTRIES[i].color,
        },
        end: {
          lat: COUNTRIES[j].lat,
          lng: COUNTRIES[j].lng,
          color: COUNTRIES[j].color,
        },
      });
    }
  }

  return (
    <div className="dark:bg-black bg-white w-full h-full max-h-70 flex flex-col relative">
      <div className="flex-1 flex">
        <div className="grow max-h-48 flex items-center justify-center">
          <DotMap />
        </div>

        <div className="w-68 flex flex-col items-start justify-center pe-4">
          <ul className="w-full flex flex-col items-start gap-3 mt-3">
            {COUNTRIES.map((country, index) => (
              <li key={index} className="w-full flex items-end gap-2">
                <img
                  src={country.flagUrl}
                  alt={`${country.name} flag`}
                  className="w-10 h-7 mr-2 object-cover rounded-sm"
                />
                <div className="grow flex flex-col items-start gap-1">
                  <div className="w-full flex items-end justify-between">
                    <p className="text-white font-manrope-medium font-semibold -tracking-title">
                      {country.name}
                    </p>
                    <span className="text-white text-xss font-manrope-medium tracking-title">
                      {country.progress}%
                    </span>
                  </div>
                  <div className="w-full bg-primary-gray rounded-full h-2">
                    <div
                      className="h-2 rounded-full"
                      style={{
                        width: `${country.progress}%`,
                        backgroundColor: country.color,
                      }}
                    ></div>
                  </div>
                </div>
              </li>
              // <div key={index} className="flex flex-col">
              //   <img
              //     src={country.flagUrl}
              //     alt={`${country.name} flag`}
              //     className="w-10 h-7 mr-2 object-cover"
              //   />
              //   <div className="w-full flex items-start gap-2">
              //     <div>
              //       <span className="text-white text-xs">{country.name}</span>
              //       <span className="text-white text-xs mt-1">
              //         {country.progress}%
              //       </span>
              //     </div>
              //     <div className="w-full bg-gray-700 rounded-full h-2">
              //       <div
              //         className="h-2 rounded-full"
              //         style={{
              //           width: `${country.progress}%`,
              //           backgroundColor: country.color,
              //         }}
              //       ></div>
              //     </div>
              //   </div>
              // </div>
            ))}
          </ul>
          <small className="w-full h-0.5 bg-primary-gray mt-6"></small>
          <Link
            to="/"
            className="w-full flex items-center justify-end pt-4 gap-3"
          >
            <p className="text-white font-manrope-medium text-xss">
              View detailed insights
            </p>
            <ArrowRight className="text-white w-4 h-4" />
          </Link>
        </div>
      </div>

      <div className="flex justify-start items-center gap-6 absolute left-4 bottom-4 border border-primary-gray p-2 rounded-primary-20">
        {COUNTRIES.map((country, index) => (
          <div key={index} className="flex items-start gap-1">
            <div
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: country.color }}
            ></div>
            <span className="text-white text-xs font-manrope-medium tracking-title -mt-0.5">
              {country.name}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
