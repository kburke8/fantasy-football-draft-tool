import React from 'react';

const organizeTeam = (team) => {
  const sortedTeam = [...team].sort((a, b) => b.rv - a.rv);
  const organized = {
    QB: [], RB: [], WR: [], TE: [], FLX: [], BN: []
  };

  sortedTeam.forEach(player => {
    switch (player.position) {
      case 'QB':
        if (organized.QB.length < 1) organized.QB.push(player);
        else organized.BN.push(player);
        break;
      case 'RB':
        if (organized.RB.length < 2) organized.RB.push(player);
        else if (organized.FLX.length < 1 && organized.FLX.every(p => p.position !== 'RB')) organized.FLX.push(player);
        else organized.BN.push(player);
        break;
      case 'WR':
        if (organized.WR.length < 2) organized.WR.push(player);
        else if (organized.FLX.length < 1 && organized.FLX.every(p => p.position !== 'WR')) organized.FLX.push(player);
        else organized.BN.push(player);
        break;
      case 'TE':
        if (organized.TE.length < 1) organized.TE.push(player);
        else if (organized.FLX.length < 1 && organized.FLX.every(p => p.position !== 'TE')) organized.FLX.push(player);
        else organized.BN.push(player);
        break;
    }
  });

  return organized;
};

const checkByeWeekConflicts = (team) => {
  const byeWeeks = {};
  team.forEach(player => {
    byeWeeks[player.bye] = (byeWeeks[player.bye] || 0) + 1;
  });
  return Object.entries(byeWeeks).filter(([, count]) => count > 3);
};

export const renderMyTeam = (myTeam) => {
  const organizedTeam = organizeTeam(myTeam);
  const positions = ['QB', 'RB', 'WR', 'TE', 'FLX', 'BN'];
  const byeWeekConflicts = checkByeWeekConflicts(myTeam);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {positions.map(pos => (
        <div key={pos} className="mb-4">
          <h3 className="text-sm font-semibold mb-1 text-gray-300">{pos}</h3>
          <ul className="text-sm">
            {organizedTeam[pos].map((player, index) => (
              <li key={index} className="text-gray-300">
                {player.name} ({player.position} - RV: {player.rv}, Bye: {player.bye})
                {byeWeekConflicts.some(([week]) => week === player.bye.toString()) && (
                  <span className="ml-2 text-red-500">Conflict</span>
                )}
              </li>
            ))}
            {pos !== 'BN' && organizedTeam[pos].length === 0 && (
              <li className="text-gray-500 italic">Empty</li>
            )}
            {pos === 'RB' && organizedTeam[pos].length === 1 && (
              <li className="text-gray-500 italic">Empty</li>
            )}
            {pos === 'WR' && organizedTeam[pos].length === 1 && (
              <li className="text-gray-500 italic">Empty</li>
            )}
          </ul>
        </div>
      ))}
    </div>
  );
};