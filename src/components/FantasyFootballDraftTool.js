import React, { useState, useMemo, useCallback } from 'react';
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { positions, playerData } from '../data/playerData';
import usePlayerManagement from '../hooks/usePlayerManagement';
import { usePositionalScarcity } from '../hooks/usePositionalScarcity';
import PositionTable from './PositionTable';
import { renderMyTeam } from './MyTeam';
import DraftSettings from './DraftSettings';
import DraftHeader from './DraftHeader';
import DraftSummary from './DraftSummary';
import { calculateTiers } from '../utils/tierCalculation';
import SearchDropdown from './SearchDropdown';
import TargetPlayersEditor from './TargetPlayersEditor';
import { useLocalStorage } from '../hooks/useLocalStorage';

const initialSettings = {
  numberOfTeams: 12,
  draftPosition: 6,
  qbSlots: 1,
  rbSlots: 2,
  wrSlots: 2,
  teSlots: 1,
  flexSlots: 1,
  benchSlots: 7,
  playersToShow: 10
};

const FantasyFootballDraftTool = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [settings, setSettings] = useLocalStorage('draftSettings', initialSettings);
  const [showSettings, setShowSettings] = useState(false);
  const [showTargetPlayersEditor, setShowTargetPlayersEditor] = useState(false);
  const [targetPlayers, setTargetPlayers] = useLocalStorage('targetPlayers', []);
  
  const {
    selectedPlayers,
    myTeam,
    handlePlayerSelect,
    handleAddToMyTeam,
    undoLastAction,
    resetDraft,
    currentRound
  } = usePlayerManagement(settings);

  const filteredPlayers = useMemo(() => {
    if (!playerData || playerData.length === 0) {
      return [];
    }
    return playerData.filter(player => 
      player.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm]);

  const availablePlayers = useMemo(() => {
    if (!playerData || playerData.length === 0) {
      return [];
    }
    return playerData.filter(player => 
      !selectedPlayers.some(sp => sp.rank === player.rank) && 
      !myTeam.some(mp => mp.rank === player.rank)
    );
  }, [playerData, selectedPlayers, myTeam]);

  const searchResults = useMemo(() => {
    if (searchTerm.length < 2) return [];
    return availablePlayers
      .filter(player => player.name.toLowerCase().includes(searchTerm.toLowerCase()))
      .slice(0, 10);
  }, [availablePlayers, searchTerm]);

  const playersWithCalculatedTiers = useMemo(() => {
    const positionGroups = positions.reduce((acc, pos) => {
      acc[pos] = calculateTiers(playerData.filter(p => p.position === pos));
      return acc;
    }, {});
    return playerData.map(player => {
      const tieredPlayer = positionGroups[player.position].find(p => p.rank === player.rank);
      return {
        ...player,
        calculatedTier: tieredPlayer ? tieredPlayer.calculatedTier : null
      };
    });
  }, []);

  const { topAvailablePlayers, shouldHighlight } = usePositionalScarcity(availablePlayers, myTeam, settings);
  const currentPick = selectedPlayers.length + myTeam.length + 1;

  const updateSettings = (newSettings) => {
    setSettings(prevSettings => ({ ...prevSettings, ...newSettings }));
  };

  const applySettings = () => {
    setShowSettings(false);
  };

  const calculateRemainingValuePercentage = useCallback((position) => {
    const allPositionPlayers = playerData.filter(p => p.position === position);
    const availablePositionPlayers = allPositionPlayers.filter(p => 
      !selectedPlayers.some(sp => sp.rank === p.rank) && 
      !myTeam.some(mp => mp.rank === p.rank)
    );
    const totalPositionValue = allPositionPlayers.reduce((sum, p) => sum + p.rv, 0);
    const remainingValue = availablePositionPlayers.reduce((sum, p) => sum + p.rv, 0);
    return ((remainingValue / totalPositionValue) * 100).toFixed(2);
  }, [selectedPlayers, myTeam]);

  const isPlayerTargeted = useCallback((player) => {
    const targetPlayer = targetPlayers.find(tp => tp.name === player.name);
    return targetPlayer ? targetPlayer.targetRound : null;
  }, [targetPlayers]);

  return (
    <div className="p-2 bg-gray-900 text-gray-100 min-h-screen">
      {(!playerData || playerData.length === 0) ? (
        <div className="text-center py-10">
          <h2 className="text-2xl font-bold mb-4">No Player Data Available</h2>
          <p>Please import your player data as described in the README file.</p>
        </div>
      ) : (
        <>
          <DraftHeader 
            showSettings={showSettings}
            setShowSettings={setShowSettings}
            undoLastAction={undoLastAction}
            resetDraft={resetDraft}
          />

          <Button onClick={() => setShowTargetPlayersEditor(true)} className="mb-2">
            Edit Target Players
          </Button>

          {showSettings && (
            <DraftSettings
              settings={settings}
              updateSettings={updateSettings}
              applySettings={applySettings}
            />
          )}

          <TargetPlayersEditor
            isOpen={showTargetPlayersEditor}
            onClose={() => setShowTargetPlayersEditor(false)}
            targetPlayers={targetPlayers}
            setTargetPlayers={setTargetPlayers}
          />

          <div className="relative mb-2">
            <Input
              type="text"
              placeholder="Search players..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="bg-gray-800 text-gray-300 border-gray-700"
            />
            <SearchDropdown 
              searchResults={searchResults}
              handlePlayerSelect={handlePlayerSelect}
              handleAddToMyTeam={handleAddToMyTeam}
            />
          </div>

          <DraftSummary 
            positions={positions}
            availablePlayers={availablePlayers}
            currentPick={currentPick}
          />

          <div className="mb-4">
            <h2 className="text-lg font-semibold mb-1 text-gray-200">My Team</h2>
            {renderMyTeam(myTeam)}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            {['RB', 'WR', 'QB', 'TE'].map(position => (
              <PositionTable
                key={position}
                position={position}
                filteredPlayers={playersWithCalculatedTiers}
                selectedPlayers={selectedPlayers}
                myTeam={myTeam}
                handlePlayerSelect={handlePlayerSelect}
                handleAddToMyTeam={handleAddToMyTeam}
                shouldHighlight={shouldHighlight}
                isPlayerTargeted={isPlayerTargeted}
                numberOfTeams={settings.numberOfTeams}
                playersToShow={settings.playersToShow}
                calculateRemainingValuePercentage={calculateRemainingValuePercentage}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default FantasyFootballDraftTool;