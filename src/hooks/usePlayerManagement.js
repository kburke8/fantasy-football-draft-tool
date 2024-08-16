import { useState, useCallback, useEffect } from 'react';

const useLocalStorage = (key, initialValue) => {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.log(error);
      return initialValue;
    }
  });

  const setValue = (value) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.log(error);
    }
  };

  return [storedValue, setValue];
};

export const usePlayerManagement = (settings) => {
  const [selectedPlayers, setSelectedPlayers] = useLocalStorage('selectedPlayers', []);
  const [myTeam, setMyTeam] = useLocalStorage('myTeam', []);
  const [history, setHistory] = useLocalStorage('draftHistory', []);

  const currentRound = Math.floor((selectedPlayers.length + myTeam.length) / settings.numberOfTeams) + 1;

  const handlePlayerSelect = useCallback((player) => {
    setSelectedPlayers(prev => {
      if (prev.some(p => p.rank === player.rank)) {
        return prev;
      }
      return [...prev, player];
    });
    setHistory(prev => [...prev, { action: 'select', player }]);
  }, [setSelectedPlayers, setHistory]);
  
  const handleAddToMyTeam = useCallback((player) => {
    setMyTeam(prev => [...prev, player]);
    setSelectedPlayers(prev => prev.filter(p => p.rank !== player.rank));
    setHistory(prev => [...prev, { action: 'addToTeam', player }]);
  }, [setMyTeam, setSelectedPlayers, setHistory]);

  const undoLastAction = useCallback(() => {
    if (history.length === 0) return;
    const lastAction = history[history.length - 1];
    if (lastAction.action === 'select') {
      setSelectedPlayers(prev => prev.filter(p => p.rank !== lastAction.player.rank));
    } else if (lastAction.action === 'addToTeam') {
      setMyTeam(prev => prev.filter(p => p.rank !== lastAction.player.rank));
      setSelectedPlayers(prev => [...prev, lastAction.player]);
    }
    setHistory(prev => prev.slice(0, -1));
  }, [history, setSelectedPlayers, setMyTeam, setHistory]);

  const resetDraft = useCallback(() => {
    setSelectedPlayers([]);
    setMyTeam([]);
    setHistory([]);
  }, [setSelectedPlayers, setMyTeam, setHistory]);

  // Sync localStorage on every change
  useEffect(() => {
    localStorage.setItem('selectedPlayers', JSON.stringify(selectedPlayers));
    localStorage.setItem('myTeam', JSON.stringify(myTeam));
    localStorage.setItem('draftHistory', JSON.stringify(history));
  }, [selectedPlayers, myTeam, history]);

  return {
    selectedPlayers,
    myTeam,
    history,
    currentRound,
    handlePlayerSelect,
    handleAddToMyTeam,
    undoLastAction,
    resetDraft
  };
};

export default usePlayerManagement;