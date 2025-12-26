# 📁 Estructura del Proyecto - Virtual Bingo

```
Bingo_skill/
│
├── 📄 README.md                          # Documentación principal
├── 📄 LICENSE                            # Licencia MIT
├── 📄 .gitignore                         # Archivos ignorados por Git
├── 📄 package.json                       # Dependencias del proyecto
├── 📄 skill.json                         # Configuración del skill
├── 📄 ask-resources.json                 # Recursos ASK CLI
│
├── 📝 CHANGELOG.md                       # Historial de cambios
├── 📝 CONTRIBUTING.md                    # Guía de contribución
├── 📝 DEPLOYMENT.md                      # Guía de despliegue
├── 📝 TESTING.md                         # Manual de testing
├── 📝 FUTURE_IDEAS.md                    # Roadmap y ideas futuras
│
├── 📁 skill-package/                     # Paquete del skill
│   └── 📁 interactionModels/
│       └── 📁 custom/
│           ├── es-ES.json               # Modelo español (España)
│           ├── es-MX.json               # Modelo español (México)
│           └── es-US.json               # Modelo español (EE.UU.)
│
└── 📁 lambda/                            # Código Lambda
    ├── 📄 package.json                   # Dependencias Lambda
    ├── 📄 index.js                       # Punto de entrada principal
    │
    ├── 📁 handlers/                      # Request handlers
    │   ├── LaunchRequestHandler.js      # Bienvenida
    │   ├── StartGameIntentHandler.js    # Iniciar partida
    │   ├── ContinueIntentHandler.js     # Cantar siguiente bola
    │   ├── PauseIntentHandler.js        # Pausar juego
    │   ├── ChangeSpeedIntentHandler.js  # Cambiar velocidad
    │   ├── RepeatLastNumberIntentHandler.js  # Repetir número
    │   ├── GetHistoryIntentHandler.js   # Histórico de números
    │   ├── VerifyCardIntentHandler.js   # Verificar cartón
    │   ├── GetStatsIntentHandler.js     # Estadísticas
    │   ├── EndGameIntentHandler.js      # Terminar partida
    │   ├── HelpIntentHandler.js         # Ayuda
    │   ├── AboutIntentHandler.js        # Info del skill
    │   ├── CancelAndStopIntentHandler.js  # Salir
    │   ├── SessionEndedRequestHandler.js  # Fin de sesión
    │   ├── IntentReflectorHandler.js    # Reflector (debug)
    │   └── ErrorHandler.js              # Manejo de errores
    │
    ├── 📁 utils/                         # Utilidades
    │   ├── gameLogic.js                 # Lógica del juego
    │   └── persistence.js               # Gestión de datos
    │
    └── 📁 data/                          # Datos del juego
        └── bingoData.js                 # Frases y configuración
```

## 💡 Componentes Clave

### 🎯 Handlers (14 total)
Cada handler maneja un tipo específico de request/intent:
- **Launch**: Primera interacción con el skill
- **Game Control**: Start, Continue, Pause, End
- **Game Info**: Repeat, History, Stats
- **Utilities**: Help, About, Cancel, Stop
- **System**: SessionEnded, IntentReflector, Error

### 🛠️ Utilidades
- **gameLogic.js**: Sorteo, frases, verificación
- **persistence.js**: Guardar/cargar estado y stats

### 📊 Datos
- **bingoData.js**: 
  - 100 frases tradicionales (0-99)
  - Configuración de velocidades
  - Frases ambientales

### 🌍 Modelos de Interacción
- **10+ intents**
- **1 slot type** (SPEED_TYPE)
- **50+ sample utterances**
- **3 locales** (es-ES, es-MX, es-US)

## 📦 Archivos por Categoría

### Documentación (8)
- README.md
- LICENSE
- CHANGELOG.md
- CONTRIBUTING.md
- DEPLOYMENT.md
- TESTING.md
- FUTURE_IDEAS.md
- (Este archivo) PROJECT_STRUCTURE.md

### Configuración (4)
- package.json
- skill.json
- ask-resources.json
- .gitignore

### Código Lambda (19)
- 1 archivo principal (index.js)
- 14 handlers
- 2 utilidades
- 1 archivo de datos
- 1 package.json

### Modelos (3)
- es-ES.json
- es-MX.json
- es-US.json

## 📈 Estadísticas del Proyecto

- **Total de archivos**: ~35
- **Líneas de código**: ~2,000+
- **Handlers**: 14
- **Intents**: 10+
- **Idiomas**: 3
- **Frases de bingo**: 100
- **Velocidades**: 4

## 🔄 Flujo de Ejecución

```
Usuario invoca skill
        ↓
LaunchRequestHandler
        ↓
Usuario: "Nueva partida rápida"
        ↓
StartGameIntentHandler
        ├── gameLogic.createNewGame()
        └── persistence.saveGameState()
        ↓
Usuario: "Continúa"
        ↓
ContinueIntentHandler
        ├── gameLogic.drawNumber()
        ├── gameLogic.createNumberAnnouncement()
        └── persistence.saveGameState()
        ↓
[Repetir hasta terminar]
        ↓
Usuario: "Terminar partida"
        ↓
EndGameIntentHandler
        ├── persistence.incrementGamesPlayed()
        └── persistence.clearGameState()
```

## 🗄️ Estructura de Datos

### Estado del Juego (currentGame)
```javascript
{
  active: boolean,
  paused: boolean,
  speed: string,
  calledNumbers: number[],
  lastNumber: number,
  startTime: ISO8601
}
```

### Estadísticas (stats)
```javascript
{
  gamesPlayed: number,
  totalBallsCalled: number,
  gamesWon: number,
  lastPlayed: ISO8601
}
```

## 🚀 Puntos de Entrada

### Para Desarrollo
- `lambda/index.js` - Punto de entrada Lambda
- `skill-package/interactionModels/custom/es-ES.json` - Modelo principal

### Para Testing
- Alexa Developer Console → Test tab
- ASK CLI: `ask dialog --locale es-ES`

### Para Despliegue
- Alexa-Hosted: Developer Console → Code tab
- ASK CLI: `ask deploy`
- Manual: AWS Lambda Console

---

**Última actualización**: Diciembre 2025
**Versión**: 1.0.0
