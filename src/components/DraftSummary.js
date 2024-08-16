import React from 'react';
import { Badge } from "./ui/badge";

const DraftSummary = ({ positions, availablePlayers, currentPick }) => (
  <div className="flex flex-wrap gap-1 mb-2">
    {positions.map(position => (
      <Badge key={position} variant="secondary" className="text-xs bg-gray-700 text-gray-300">
        {position}: {availablePlayers.filter(p => p.position === position).length} left
      </Badge>
    ))}
    <Badge variant="secondary" className="text-xs bg-gray-700 text-gray-300">
      Current Pick: {currentPick}
    </Badge>
  </div>
);

export default DraftSummary;