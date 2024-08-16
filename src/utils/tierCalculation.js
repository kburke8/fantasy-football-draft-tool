export const calculateTiers = (players) => {
    const sortedPlayers = [...players].sort((a, b) => b.rv - a.rv);
  
    // Define position-based drop-off percentages
    const thresholds = {
      "QB": 0.2,
      "RB": 0.1,
      "WR": 0.15,
      "TE": 0.25,
      "default": 0.10 // Fallback percentage if a position isn't specified
    };
  
    let currentTier = 1;
    let currentTierPlayers = [sortedPlayers[0]]; // Start with the first player in Tier 1
  
    return sortedPlayers.map((player, index) => {
      if (index > 0) {
        // Get the drop-off percentage based on the player's position
        const dropOffPercentage = thresholds[player.position] || thresholds.default;
  
        // Calculate the average RV of the current tier
        const averageRV = currentTierPlayers.reduce((sum, p) => sum + p.rv, 0) / currentTierPlayers.length;
        const rvDrop = (averageRV - player.rv) / averageRV; // Calculate drop-off as a percentage
  
        if (rvDrop >= dropOffPercentage) {
          currentTier++;
          currentTierPlayers = []; // Start a new tier
        }
  
        currentTierPlayers.push(player); // Add the player to the current tier
      } else {
        currentTierPlayers.push(player); // Add the first player to Tier 1
      }
  
      return { ...player, calculatedTier: currentTier };
    });
  };
  