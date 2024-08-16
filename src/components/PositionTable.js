import React, { useMemo } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../components/ui/table";
import { Button } from "../components/ui/button";

const PositionTable = ({ 
  position, 
  filteredPlayers, 
  selectedPlayers, 
  myTeam, 
  handlePlayerSelect, 
  handleAddToMyTeam, 
  shouldHighlight, 
  isPlayerTargeted,
  numberOfTeams,
  playersToShow,
  calculateRemainingValuePercentage
}) => {
  const positionPlayers = useMemo(() => {
    const allPositionPlayers = filteredPlayers.filter(player => player.position === position);
    const available = allPositionPlayers.filter(player => 
      !selectedPlayers.some(sp => sp.rank === player.rank) && 
      !myTeam.some(mp => mp.rank === player.rank)
    );
    const recentlyDrafted = [...selectedPlayers, ...myTeam]
      .filter(player => player.position === position)
      .sort((a, b) => b.rank - a.rank)  // Sort by rank descending to get the most recently drafted
      .slice(0, 5);
    
    const playersToDisplay = [...available, ...recentlyDrafted].slice(0, playersToShow);
    
    return playersToDisplay.sort((a, b) => a.calculatedTier - b.calculatedTier || b.rv - a.rv);
  }, [filteredPlayers, selectedPlayers, myTeam, position, playersToShow]);

  const getADPDiffClass = (player) => {
    const adpDiff = player.rank - player.adp.average;
    if (adpDiff > numberOfTeams * 2) return "bg-red-700";
    if (adpDiff > numberOfTeams) return "bg-red-500";
    if (adpDiff < -numberOfTeams) return "bg-green-500";
    return "";
  };

  const remainingValuePercentage = calculateRemainingValuePercentage(position);

  return (
    <div className="mt-2">
      <h3 className="text-sm font-semibold mb-1 text-gray-300">
        {position} - Remaining Value: {remainingValuePercentage}%
      </h3>
      <Table className="border-collapse">
        <TableHeader>
          <TableRow className="text-xs">
            <TableHead className="p-1 text-gray-400">Rank</TableHead>
            <TableHead className="p-1 text-gray-400">Name</TableHead>
            <TableHead className="p-1 text-gray-400">Team</TableHead>
            <TableHead className="p-1 text-gray-400">Bye</TableHead>
            <TableHead className="p-1 text-gray-400">RV</TableHead>
            <TableHead className="p-1 text-gray-400">Tier</TableHead>
            <TableHead className="p-1 text-gray-400">Avg ADP</TableHead>
            <TableHead className="p-1 text-gray-400">ESPN ADP</TableHead>
            <TableHead className="p-1 text-gray-400">GC</TableHead>
            <TableHead className="p-1 text-gray-400">ADP Diff</TableHead>
            <TableHead className="p-1 text-gray-400">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {positionPlayers.map((player, index) => {
            const isSelected = selectedPlayers.some(sp => sp.rank === player.rank);
            const isMyTeam = myTeam.some(mp => mp.rank === player.rank);
            const isTierChange = index > 0 && player.calculatedTier !== positionPlayers[index - 1].calculatedTier;
            const isHighlighted = shouldHighlight(player);
            const targetRound = isPlayerTargeted(player);
            const adpDiff = player.rank - player.adp.average;
            const adpDiffClass = getADPDiffClass(player);
            
            let rowClassName = "text-xs";
            if (isSelected || isMyTeam) rowClassName += " opacity-50";
            if (isHighlighted && !isSelected && !isMyTeam) rowClassName += " bg-blue-900";
            if (targetRound && !isSelected && !isMyTeam) rowClassName += " bg-green-900";
            if (isHighlighted && targetRound && !isSelected && !isMyTeam) rowClassName += " bg-purple-900";

            return (
              <React.Fragment key={player.rank}>
                {isTierChange && (
                  <TableRow>
                    <TableCell colSpan={11} className="p-1 bg-gray-600 text-center text-xs font-semibold text-gray-300">
                      Tier {player.calculatedTier}
                    </TableCell>
                  </TableRow>
                )}
                <TableRow className={rowClassName}>
                  <TableCell className="p-1 text-gray-300">{player.rank}</TableCell>
                  <TableCell className={`p-1 ${isSelected || isMyTeam ? "line-through" : ""} text-gray-300`}>
                    {player.name}
                    {targetRound && <span className="ml-1 text-yellow-400">({targetRound})</span>}
                  </TableCell>
                  <TableCell className="p-1 text-gray-300">{player.team}</TableCell>
                  <TableCell className="p-1 text-gray-300">{player.bye}</TableCell>
                  <TableCell className="p-1 text-gray-300">{player.rv}</TableCell>
                  <TableCell className="p-1 text-gray-300">{player.calculatedTier}</TableCell>
                  <TableCell className="p-1 text-gray-300">{player.adp.average || 'N/A'}</TableCell>
                  <TableCell className="p-1 text-gray-300">{player.adp.espn || 'N/A'}</TableCell>
                  <TableCell className="p-1 text-gray-300">{player.gc}</TableCell>
                  <TableCell className={`p-1 text-gray-300 ${adpDiffClass}`}>{adpDiff}</TableCell>
                  <TableCell className="p-1">
                    {!isSelected && !isMyTeam && (
                      <>
                        <Button size="sm" variant="outline" className="mr-1 py-0 px-1 text-xs bg-gray-700 text-gray-300 hover:bg-gray-600" onClick={() => handlePlayerSelect(player)}>Drafted</Button>
                        <Button size="sm" variant="outline" className="py-0 px-1 text-xs bg-gray-700 text-gray-300 hover:bg-gray-600" onClick={() => handleAddToMyTeam(player)}>Draft</Button>
                      </>
                    )}
                    {isSelected && (
                      <Button size="sm" variant="outline" className="py-0 px-1 text-xs bg-gray-700 text-gray-300 hover:bg-gray-600" onClick={() => handleAddToMyTeam(player)}>Add to My Team</Button>
                    )}
                  </TableCell>
                </TableRow>
              </React.Fragment>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
};

export default PositionTable;