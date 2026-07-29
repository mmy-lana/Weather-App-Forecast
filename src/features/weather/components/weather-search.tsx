'use client';

import * as React from 'react';
import { Search, MapPin, Loader2 } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { GeocodingResult, TemperatureUnit } from '../types';

interface WeatherSearchProps {
  searchQuery: string;
  searchResults: GeocodingResult[];
  isSearching: boolean;
  unit: TemperatureUnit;
  onSearchChange: (query: string) => void;
  onSelectLocation: (location: GeocodingResult) => void;
  onToggleUnit: () => void;
}

export const WeatherSearch: React.FC<WeatherSearchProps> = ({
  searchQuery,
  searchResults,
  isSearching,
  unit,
  onSearchChange,
  onSelectLocation,
  onToggleUnit,
}) => {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = React.useState<boolean>(false);

  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative w-full max-w-xl mx-auto z-50" ref={containerRef}>
      <div className="flex items-center gap-3">
        <div className="relative flex-1">
          <Input
            value={searchQuery}
            onChange={(e) => {
              onSearchChange(e.target.value);
              setIsOpen(true);
            }}
            onFocus={() => setIsOpen(true)}
            onClear={() => onSearchChange('')}
            placeholder="Search city or location..."
            leftElement={<Search className="h-4 w-4" />}
            rightElement={
              isSearching ? (
                <Loader2 className="h-4 w-4 animate-spin text-white/70" />
              ) : null
            }
          />

          {isOpen && searchResults.length > 0 && (
            <div className="absolute top-full left-0 right-0 mt-2 bg-slate-900/80 backdrop-blur-xl border border-white/20 rounded-2xl overflow-hidden shadow-2xl z-50 divide-y divide-white/10 animate-in fade-in-50 slide-in-from-top-2">
              {searchResults.map((location) => (
                <button
                  key={location.id}
                  onClick={() => {
                    onSelectLocation(location);
                    setIsOpen(false);
                  }}
                  className="w-full px-4 py-3 text-left flex items-center justify-between hover:bg-white/15 transition-colors group"
                >
                  <div className="flex items-center gap-2.5">
                    <MapPin className="h-4 w-4 text-sky-400 group-hover:scale-110 transition-transform" />
                    <div>
                      <p className="text-sm font-medium text-white">
                        {location.name}
                      </p>
                      <p className="text-xs text-white/60">
                        {[location.admin1, location.country]
                          .filter(Boolean)
                          .join(', ')}
                      </p>
                    </div>
                  </div>
                  <span className="text-[10px] uppercase font-semibold text-white/40 tracking-wider">
                    Select
                  </span>
                </button>
              ))}
            </div>
          )}
        </div>

        <Button
          variant="glass"
          onClick={onToggleUnit}
          className="shrink-0 font-bold tracking-wider"
          aria-label="Toggle Temperature Unit"
        >
          {unit === 'celsius' ? '°C' : '°F'}
        </Button>
      </div>
    </div>
  );
};