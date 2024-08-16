import React from 'react';
import { Button } from "./ui/button";

const SearchDropdown = ({ searchResults, handlePlayerSelect, handleAddToMyTeam }) => {
  if (searchResults.length === 0) return null;

  return (
    <div className="absolute z-10 w-full bg-gray-800 border border-gray-700 rounded-md mt-1 max-h-60 overflow-y-auto">
      {searchResults.map((player) => (
        <div key={player.rank} className="flex items-center justify-between p-2 hover:bg-gray-700">
          <div>
            <span className="text-gray-200">{player.name}</span>
            <span className="text-gray-400 ml-2">({player.position} - {player.team})</span>
          </div>
          <div>
            <Button 
              size="sm" 
              variant="outline" 
              className="mr-1 py-0 px-1 text-xs bg-gray-700 text-gray-300 hover:bg-gray-600"
              onClick={() => handlePlayerSelect(player)}
            >
              Draft
            </Button>
            <Button 
              size="sm" 
              variant="outline" 
              className="py-0 px-1 text-xs bg-gray-700 text-gray-300 hover:bg-gray-600"
              onClick={() => handleAddToMyTeam(player)}
            >
              My Team
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SearchDropdown;