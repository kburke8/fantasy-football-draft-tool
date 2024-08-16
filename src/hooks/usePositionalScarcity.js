import { useMemo, useCallback } from 'react';
import { positions } from '../data/playerData';

export const usePositionalScarcity = (availablePlayers, myTeam, settings) => {
  const positionCounts = useMemo(() => {
    const counts = { QB: 0, RB: 0, WR: 0, TE: 0 };
    myTeam.forEach(player => counts[player.position]++);
    return counts;
  }, [myTeam]);

  const positionNeeds = useMemo(() => {
    const { qbSlots, rbSlots, wrSlots, teSlots, flexSlots, benchSlots } = settings;
    
    const idealCounts = {
      QB: qbSlots + Math.floor(benchSlots * 0.1),
      RB: rbSlots + Math.floor(flexSlots * 0.4) + Math.floor(benchSlots * 0.3),
      WR: wrSlots + Math.floor(flexSlots * 0.4) + Math.floor(benchSlots * 0.4),
      TE: teSlots + Math.floor(flexSlots * 0.2) + Math.floor(benchSlots * 0.2)
    };

    return Object.keys(idealCounts).reduce((needs, pos) => {
      needs[pos] = Math.max(0, idealCounts[pos] - positionCounts[pos]);
      return needs;
    }, {});
  }, [positionCounts, settings]);

  const calculatePositionalScarcity = useCallback((position) => {
    const availableAtPosition = availablePlayers.filter(p => p.position === position);
    const topPlayersAtPosition = availableAtPosition.slice(0, 10);
    const avgRV = topPlayersAtPosition.reduce((sum, p) => sum + p.rv, 0) / topPlayersAtPosition.length;
    const positionSlots = settings[`${position.toLowerCase()}Slots`];
    const scarcityFactor = 1 + (positionNeeds[position] / (positionSlots || 1));
    return avgRV * scarcityFactor;
  }, [availablePlayers, positionNeeds, settings]);

  const topAvailablePlayers = useMemo(() => {
    const scarcityScores = positions.reduce((scores, pos) => {
      scores[pos] = calculatePositionalScarcity(pos);
      return scores;
    }, {});

    return availablePlayers
      .map(player => ({
        ...player,
        scarcityAdjustedRV: player.rv * (1 + scarcityScores[player.position] / 100)
      }))
      .sort((a, b) => b.scarcityAdjustedRV - a.scarcityAdjustedRV)
      .slice(0, 5);
  }, [availablePlayers, calculatePositionalScarcity]);

  const shouldHighlight = useCallback((player) => {
    return topAvailablePlayers.some(p => p.rank === player.rank);
  }, [topAvailablePlayers]);

  return { topAvailablePlayers, shouldHighlight };
};