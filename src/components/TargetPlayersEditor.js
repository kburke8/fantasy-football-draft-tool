import React, { useState, useMemo } from 'react';
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { playerData } from '../data/playerData';

const TargetPlayersEditor = ({ isOpen, onClose, targetPlayers, setTargetPlayers }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [newTargetRound, setNewTargetRound] = useState('');

  const searchResults = useMemo(() => {
    if (searchTerm.length < 2) return [];
    return playerData
      .filter(player => 
        player.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
        !targetPlayers.some(tp => tp.name === player.name)
      )
      .slice(0, 10);
  }, [searchTerm, targetPlayers]);

  if (!isOpen) return null;

  const handleAddPlayer = (player) => {
    if (newTargetRound) {
      setTargetPlayers([...targetPlayers, { name: player.name, targetRound: parseInt(newTargetRound) }]);
      setSearchTerm('');
      setNewTargetRound('');
    }
  };

  const handleUpdatePlayer = (index, field, value) => {
    const updatedPlayers = targetPlayers.map((player, i) => 
      i === index ? { ...player, [field]: field === 'targetRound' ? parseInt(value) : value } : player
    );
    setTargetPlayers(updatedPlayers);
  };

  const handleRemovePlayer = (index) => {
    setTargetPlayers(targetPlayers.filter((_, i) => i !== index));
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-gray-800 p-6 rounded-lg max-w-md w-full">
        <h2 className="text-xl font-bold mb-4">Edit Target Players</h2>
        <div className="space-y-4">
          {targetPlayers.map((player, index) => (
            <div key={index} className="flex items-center space-x-2">
              <Input
                type="number"
                value={player.targetRound}
                onChange={(e) => handleUpdatePlayer(index, 'targetRound', e.target.value)}
                placeholder="Round"
                min="1"
                className="w-20"
              />
              <Input
                value={player.name}
                readOnly
                className="flex-grow"
              />
              <Button onClick={() => handleRemovePlayer(index)}>Remove</Button>
            </div>
          ))}
          <div className="space-y-2">
            <Input
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search for a player"
            />
            <Input
              type="number"
              value={newTargetRound}
              onChange={(e) => setNewTargetRound(e.target.value)}
              placeholder="Target Round"
              min="1"
            />
            {searchResults.length > 0 && (
              <div className="bg-gray-700 rounded-md max-h-40 overflow-y-auto">
                {searchResults.map((player) => (
                  <div 
                    key={player.rank} 
                    className="p-2 hover:bg-gray-600 cursor-pointer"
                    onClick={() => handleAddPlayer(player)}
                  >
                    {player.name} ({player.position} - {player.team})
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
        <Button onClick={onClose} className="mt-4">Close</Button>
      </div>
    </div>
  );
};

export default TargetPlayersEditor;