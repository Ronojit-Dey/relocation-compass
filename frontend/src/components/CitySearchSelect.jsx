import React, { useState, useRef, useEffect } from "react";

export default function CitySearchSelect({ label, icon: Icon, cities, selectedCity, onSelectCity, placeholder }) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const dropdownRef = useRef(null);

  useEffect(() => {
    setSearchTerm(selectedCity || "");
  }, [selectedCity]);

  useEffect(() => {
    function handleClickOutside(e) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsOpen(false);
        setSearchTerm(selectedCity || "");
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [selectedCity]);

  const filteredCities = cities.filter((c) => {
    const term = searchTerm.toLowerCase();
    const cityName = (c.city || "").toLowerCase();
    const countryName = (c.country || "").toLowerCase();
    return cityName.includes(term) || countryName.includes(term);
  }).slice(0, 40);

  return (
    <div className="relative flex-1 min-w-[220px]" ref={dropdownRef}>
      <label className="block text-xs font-semibold text-on-surface-variant mb-2 ml-1 uppercase tracking-wider">
        {label}
      </label>
      <div className="relative">
        {Icon && (
          <Icon className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-outline pointer-events-none z-10" />
        )}
        <input
          type="text"
          value={searchTerm}
          placeholder={placeholder || "Search city or country..."}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setIsOpen(true);
          }}
          onFocus={() => setIsOpen(true)}
          className="w-full h-12 bg-surface shadow-neo-inset rounded-xl pl-12 pr-4 border-none text-sm font-medium text-on-surface focus:outline-none"
        />
      </div>

      {isOpen && (
        <ul className="absolute z-50 left-0 right-0 top-full mt-2 max-h-60 overflow-y-auto bg-surface rounded-xl shadow-neo border border-outline-variant/30 py-1 divide-y divide-outline-variant/20">
          {filteredCities.length > 0 ? (
            filteredCities.map((item, idx) => (
              <li
                key={`${item.city}-${item.country}-${idx}`}
                onClick={() => {
                  onSelectCity(item.city);
                  setSearchTerm(item.city);
                  setIsOpen(false);
                }}
                className="px-4 py-2.5 hover:bg-primary-container/20 cursor-pointer flex justify-between items-center text-sm text-on-surface transition-colors"
              >
                <span className="font-semibold">{item.city}</span>
                <span className="text-xs text-on-surface-variant">{item.country}</span>
              </li>
            ))
          ) : (
            <li className="px-4 py-3 text-xs text-on-surface-variant text-center">
              No matching cities found
            </li>
          )}
        </ul>
      )}
    </div>
  );
}