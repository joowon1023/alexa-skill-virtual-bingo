const { BINGO_PHRASES, AMBIENT_PHRASES } = require('../data/bingoData');

/**
 * Genera un número aleatorio que no haya sido usado
 */
function drawNumber(usedNumbers) {
    const availableNumbers = [];
    for (let i = 0; i <= 99; i++) {
        if (!usedNumbers.includes(i)) {
            availableNumbers.push(i);
        }
    }

    if (availableNumbers.length === 0) {
        return null; // No hay más números disponibles
    }

    const randomIndex = Math.floor(Math.random() * availableNumbers.length);
    return availableNumbers[randomIndex];
}

/**
 * Obtiene la frase tradicional para un número
 */
function getNumberPhrase(number) {
    return BINGO_PHRASES[number] || `El ${number}`;
}

/**
 * Obtiene una frase ambiental aleatoria
 */
function getAmbientPhrase() {
    const randomIndex = Math.floor(Math.random() * AMBIENT_PHRASES.length);
    return AMBIENT_PHRASES[randomIndex];
}

/**
 * Crea un mensaje con efectos de sonido
 */
function createNumberAnnouncement(number, includeAmbient = false) {
    let announcement = '';

    // Añadir frase ambiental ocasionalmente (30% de probabilidad)
    if (includeAmbient && Math.random() < 0.3) {
        announcement += getAmbientPhrase() + ' ';
    }

    // Añadir el número con su frase tradicional
    announcement += getNumberPhrase(number);

    return announcement;
}

/**
 * Verifica si un conjunto de números es ganador
 */
function verifyWinningCard(calledNumbers, playerNumbers) {
    // Verificar que todos los números del jugador han sido llamados
    return playerNumbers.every(num => calledNumbers.includes(num));
}

/**
 * Obtiene estadísticas de la partida actual
 */
function getGameStats(usedNumbers, totalNumbers = 100) {
    const called = usedNumbers.length;
    const remaining = totalNumbers - called;
    const progress = Math.round((called / totalNumbers) * 100);

    return {
        called,
        remaining,
        progress
    };
}

/**
 * Formatea la lista de números cantados para lectura
 */
function formatCalledNumbers(numbers) {
    if (numbers.length === 0) return "No se han cantado números aún.";
    if (numbers.length <= 5) {
        return numbers.join(', ');
    }

    // Si hay muchos números, dar solo los últimos 10
    const recent = numbers.slice(-10);
    return `Los últimos números son: ${recent.join(', ')}`;
}

/**
 * Crea el estado inicial del juego
 */
function createNewGame(speed = 'normal') {
    return {
        active: true,
        paused: false,
        speed: speed,
        calledNumbers: [],
        lastNumber: null,
        startTime: new Date().toISOString()
    };
}

module.exports = {
    drawNumber,
    getNumberPhrase,
    getAmbientPhrase,
    createNumberAnnouncement,
    verifyWinningCard,
    getGameStats,
    formatCalledNumbers,
    createNewGame
};
