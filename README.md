# 🎰 Virtual Bingo - Alexa Skill

<div align="center">

![Virtual Bingo](https://img.shields.io/badge/Alexa-Skill-00CAFF?style=for-the-badge&logo=amazon-alexa&logoColor=white)
![Version](https://img.shields.io/badge/version-1.0.0-blue?style=for-the-badge)
![License](https://img.shields.io/badge/license-MIT-green?style=for-the-badge)
![Spanish](https://img.shields.io/badge/idioma-Español-red?style=for-the-badge)

**Tu cantador de bingo personal con Alexa**

[Características](#-características) • [Instalación](#-instalación) • [Uso](#-uso) • [Comandos](#-comandos) • [Desarrollo](#-desarrollo)

</div>

---

## 📖 Descripción

**Virtual Bingo** es un skill de Alexa que actúa como tu cantador de bingo personal. Alexa cantará las bolas automáticamente usando frases tradicionales del bingo español, con múltiples velocidades de juego y funciones avanzadas para una experiencia completa.

Perfecto para jugar en familia, con amigos o en eventos sociales. ¡Deja que Alexa se encargue de cantar los números mientras tú disfrutas del juego!

---

## ✨ Características

### 🎯 Funcionalidades Principales

- **🎲 Sorteo Aleatorio**: Números del 0 al 99 sin repetición
- **🗣️ Frases Tradicionales**: Utiliza las frases clásicas del bingo español
  - "El 22, los patitos"
  - "El 33, la edad de Cristo"
  - "El 88, las gorditas"
  - "El 90, la viejita"
  - ¡Y muchas más!

### ⚡ Velocidades de Juego

| Modo | Tiempo entre bolas | Ideal para |
|------|-------------------|------------|
| **Lento** | 5 segundos | Jugadores principiantes o grupos grandes |
| **Normal** | 3 segundos | Partidas clásicas |
| **Rápido** | 1.5 segundos | Jugadores experimentados |
| **Turbo** | 1 segundo | ¡Modo frenético para expertos! |

### 🎮 Controles de Juego

- ⏸️ **Pausa/Reanudación**: Pausa el juego en cualquier momento
- 🔄 **Cambio de velocidad** en tiempo real
- 🔁 **Repetir último número** cantado
- 📜 **Histórico** de números cantados
- ✅ **Verificación de cartones** ganadores

### 📊 Estadísticas

- Total de partidas jugadas
- Bolas cantadas por partida
- Promedio de bolas
- Fecha de última partida
- Registro de victorias

---

## 🚀 Instalación

### Prerrequisitos

- Cuenta de [Amazon Developer Console](https://developer.amazon.com/alexa/console/ask)
- AWS Account (para Lambda y S3 si usas Alexa-Hosted)
- Node.js 16.x o superior (para desarrollo local)

### Opción 1: Alexa-Hosted Skill (Recomendado)

1. **Crear el Skill en Alexa Developer Console**
   ```
   - Ir a https://developer.amazon.com/alexa/console/ask
   - Click en "Create Skill"
   - Nombre: "Virtual Bingo"
   - Primary locale: Spanish (ES)
   - Hosting: Alexa-Hosted (Node.js)
   ```

2. **Importar el Interaction Model**
   ```
   - Ir a "Build" > "Interaction Model" > "JSON Editor"
   - Copiar el contenido de skill-package/interactionModels/custom/es-ES.json
   - Click en "Save Model" y luego "Build Model"
   ```

3. **Subir el código Lambda**
   ```bash
   cd lambda
   zip -r ../function.zip .
   ```
   - Ir a "Code" tab en la consola
   - Importar el archivo function.zip
   - Click en "Deploy"

### Opción 2: ASK CLI

```bash
# Instalar ASK CLI
npm install -g ask-cli

# Configurar perfil
ask configure

# Clonar el repositorio
git clone <tu-repo>
cd Bingo_skill

# Instalar dependencias
cd lambda
npm install
cd ..

# Desplegar
ask deploy
```

---

## 🎯 Uso

### Iniciar el Skill

```
"Alexa, abre Virtual Bingo"
```

### Comenzar una Partida

```
"Nueva partida"
"Nueva partida rápida"
"Iniciar partida en modo turbo"
"Empezar partida lenta"
```

### Durante el Juego

```
"Continúa"              → Canta la siguiente bola
"Pausa"                 → Pausa el juego
"El último número"      → Repite la última bola
"Histórico"             → Lista de números cantados
"Tengo línea"           → Verifica tu cartón
"Cambiar a modo rápido" → Ajusta la velocidad
"Terminar partida"      → Finaliza el juego
```

### Información

```
"Estadísticas"  → Ver tu historial
"Ayuda"         → Lista de comandos
"Acerca de"     → Información del skill
```

---

## 🎮 Comandos

### Comandos de Juego

| Comando | Descripción | Ejemplo |
|---------|-------------|---------|
| `Nueva partida [velocidad]` | Inicia una nueva partida | "Nueva partida rápida" |
| `Continúa / Sigue` | Canta la siguiente bola | "Sigue" |
| `Pausa / Detente` | Pausa el juego | "Pausa" |
| `Cambiar a modo [velocidad]` | Cambia la velocidad | "Cambiar a turbo" |
| `Terminar partida` | Finaliza la partida actual | "Terminar" |

### Comandos de Información

| Comando | Descripción |
|---------|-------------|
| `El último número / Repite` | Repite la última bola cantada |
| `Histórico / Números cantados` | Lista los números del juego |
| `Tengo línea / Tengo bingo` | Verifica tu cartón |
| `Estadísticas` | Muestra tu historial de juego |
| `Ayuda` | Ayuda completa |
| `Acerca de` | Información del skill |

---

## 🛠️ Desarrollo

### Estructura del Proyecto

```
Bingo_skill/
├── lambda/
│   ├── index.js                    # Punto de entrada principal
│   ├── package.json                # Dependencias Lambda
│   ├── handlers/                   # Request handlers
│   │   ├── LaunchRequestHandler.js
│   │   ├── StartGameIntentHandler.js
│   │   ├── ContinueIntentHandler.js
│   │   ├── PauseIntentHandler.js
│   │   ├── ChangeSpeedIntentHandler.js
│   │   ├── RepeatLastNumberIntentHandler.js
│   │   ├── GetHistoryIntentHandler.js
│   │   ├── VerifyCardIntentHandler.js
│   │   ├── GetStatsIntentHandler.js
│   │   ├── EndGameIntentHandler.js
│   │   ├── HelpIntentHandler.js
│   │   ├── AboutIntentHandler.js
│   │   ├── CancelAndStopIntentHandler.js
│   │   ├── SessionEndedRequestHandler.js
│   │   ├── IntentReflectorHandler.js
│   │   └── ErrorHandler.js
│   ├── utils/                      # Utilidades
│   │   ├── gameLogic.js           # Lógica del juego
│   │   └── persistence.js         # Gestión de datos
│   └── data/                       # Datos del juego
│       └── bingoData.js           # Frases y configuración
├── skill-package/
│   └── interactionModels/
│       └── custom/
│           └── es-ES.json         # Modelo de interacción
├── skill.json                      # Configuración del skill
├── package.json                    # Dependencias del proyecto
└── README.md                       # Este archivo
```

### Tecnologías Utilizadas

- **ASK SDK for Node.js** (v2)
- **S3 Persistence Adapter** para almacenamiento de datos
- **AWS Lambda** para hosting
- **Node.js 16.x**

### Personalización

#### Modificar Frases del Bingo

Edita `lambda/data/bingoData.js`:

```javascript
const BINGO_PHRASES = {
    0: "El cero, la bola",
    1: "El uno, tu frase personalizada",
    // ... más números
};
```

#### Ajustar Velocidades

Modifica los tiempos en milisegundos:

```javascript
const SPEED_CONFIG = {
    lento: 5000,     // 5 segundos
    normal: 3000,    // 3 segundos
    rápido: 1500,    // 1.5 segundos
    turbo: 1000      // 1 segundo
};
```

#### Añadir Nuevas Funcionalidades

1. Crea un nuevo handler en `lambda/handlers/`
2. Importa y registra el handler en `lambda/index.js`
3. Añade el intent al modelo de interacción `es-ES.json`
4. Rebuild el modelo en la consola

---

## 🤝 Contribuciones

Las contribuciones son bienvenidas. Por favor:

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

---

## 📝 Roadmap

### Versión 1.1 (Próxima)
- [ ] Soporte para cartones virtuales
- [ ] Verificación automática de líneas/bingo
- [ ] Modo multijugador (4 cartones)
- [ ] Efectos de sonido profesionales (SSML)
- [ ] APL para dispositivos con pantalla

### Versión 1.2
- [ ] Diferentes patrones de victoria (línea, esquinas, X, etc.)
- [ ] Temas musicales seleccionables
- [ ] Logros y badges
- [ ] Tablas de clasificación

### Versión 2.0
- [ ] Integración con Smart Home
- [ ] Modo torneo
- [ ] Sincronización multi-dispositivo
- [ ] API para terceros

---

## ❓ FAQ

**P: ¿Cuántos números puede cantar?**  
R: De 0 a 99, total 100 números únicos sin repetición.

**P: ¿Puedo usar mi propio cartón de bingo?**  
R: ¡Por supuesto! El skill solo canta los números, tú juegas con tu cartón físico o digital.

**P: ¿Funciona en todos los países hispanohablantes?**  
R: Sí, está disponible en español (España), español (México) y español (Estados Unidos).

**P: ¿Guarda mi progreso si cierro Alexa?**  
R: Las estadísticas sí se guardan, pero la partida actual se perderá si sales del skill.

---

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo `LICENSE` para más detalles.

---

## 👨‍💻 Autor

**Jose Alvarez Dev**

- GitHub: [@JoseAlvarezDev](https://github.com/JoseAlvarezDev)

---

## 🙏 Agradecimientos

- Amazon Alexa Team por el excelente SDK
- Comunidad de desarrolladores de Skills
- Testers y usuarios beta

---

<div align="center">

**¿Te gusta el proyecto? ¡Dale una ⭐ en GitHub!**

[Reportar Bug](https://github.com/JoseAlvarezDev/virtual-bingo/issues) • [Solicitar Feature](https://github.com/JoseAlvarezDev/virtual-bingo/issues)

</div>
