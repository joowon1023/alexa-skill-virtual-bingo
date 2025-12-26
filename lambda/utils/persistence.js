/**
 * Obtiene el estado del juego actual
 */
async function getGameState(attributesManager) {
    const attributes = await attributesManager.getPersistentAttributes();
    return attributes.currentGame || null;
}

/**
 * Guarda el estado del juego
 */
async function saveGameState(attributesManager, gameState) {
    const attributes = await attributesManager.getPersistentAttributes();
    attributes.currentGame = gameState;
    attributesManager.setPersistentAttributes(attributes);
    await attributesManager.savePersistentAttributes();
}

/**
 * Limpia el estado del juego actual
 */
async function clearGameState(attributesManager) {
    const attributes = await attributesManager.getPersistentAttributes();
    delete attributes.currentGame;
    attributesManager.setPersistentAttributes(attributes);
    await attributesManager.savePersistentAttributes();
}

/**
 * Obtiene estadísticas globales del usuario
 */
async function getUserStats(attributesManager) {
    const attributes = await attributesManager.getPersistentAttributes();
    return attributes.stats || {
        gamesPlayed: 0,
        totalBallsCalled: 0,
        gamesWon: 0,
        lastPlayed: null
    };
}

/**
 * Actualiza las estadísticas del usuario
 */
async function updateUserStats(attributesManager, updates) {
    const attributes = await attributesManager.getPersistentAttributes();
    const currentStats = attributes.stats || {
        gamesPlayed: 0,
        totalBallsCalled: 0,
        gamesWon: 0,
        lastPlayed: null
    };

    attributes.stats = {
        ...currentStats,
        ...updates,
        lastPlayed: new Date().toISOString()
    };

    attributesManager.setPersistentAttributes(attributes);
    await attributesManager.savePersistentAttributes();
}

/**
 * Incrementa el contador de partidas jugadas
 */
async function incrementGamesPlayed(attributesManager, ballsCalled = 0) {
    const stats = await getUserStats(attributesManager);
    await updateUserStats(attributesManager, {
        gamesPlayed: stats.gamesPlayed + 1,
        totalBallsCalled: stats.totalBallsCalled + ballsCalled
    });
}

/**
 * Incrementa el contador de partidas ganadas
 */
async function incrementGamesWon(attributesManager) {
    const stats = await getUserStats(attributesManager);
    await updateUserStats(attributesManager, {
        gamesWon: stats.gamesWon + 1
    });
}

module.exports = {
    getGameState,
    saveGameState,
    clearGameState,
    getUserStats,
    updateUserStats,
    incrementGamesPlayed,
    incrementGamesWon
};
