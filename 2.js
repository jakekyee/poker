// Functions to determine Hand Hierarchy

//
function handHierarchy(shownCards, hands, playerCount) {
  const hierarchy = {};
  const handStrengths = {};
  for (let player = 0; player < playerCount; player++) {
    strength = handStrength(hands[player], shownCards);
    [hierarchy, handStrengths] = addPlayer(
      player,
      strength,
      handStrengths,
      hierarchy
    );
  }
  return hierarchy;
}

function addPlayer(player, handStrengh, handStrengths, hierarchy) {
  return [hierarchy, handStrengths];
}

function handStrength(playerHands, shownCards) {
  return playerStrength;
}
