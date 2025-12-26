# Notas del Desarrollador - Virtual Bingo

## 🎯 Decisiones de Diseño

### Arquitectura
**Decisión**: Handlers modulares separados por funcionalidad  
**Razón**: Facilita mantenimiento, testing y escalabilidad  
**Alternativa considerada**: Un solo handler con switch/case (rechazada por complejidad creciente)

### Persistencia
**Decisión**: S3 Persistence Adapter  
**Razón**: Compatible con Alexa-Hosted, simple de configurar  
**Alternativa considerada**: DynamoDB (más complejo para usuarios nuevos)

### Velocidades de Juego
**Decisión**: 4 niveles (Lento: 5s, Normal: 3s, Rápido: 1.5s, Turbo: 1s)  
**Razón**: Balance entre variedad y usabilidad  
**Notas**: Turbo puede ser difícil de seguir para principiantes

### Rango de Números
**Decisión**: 0-99 (100 números)  
**Razón**: Estándar español, fácil de implementar  
**Futuro**: Considerar 1-75 (estilo americano) o 1-90 (estilo británico)

---

## 🔧 Detalles Técnicos

### Generación de Números Aleatorios
```javascript
// Método actual: Array filtering
const availableNumbers = [];
for (let i = 0; i <= 99; i++) {
    if (!usedNumbers.includes(i)) {
        availableNumbers.push(i);
    }
}
```

**Pros**: Simple, claro  
**Cons**: O(n²) en peor caso  
**Optimización futura**: Fisher-Yates shuffle al inicio

### SSML y Emociones
Se usa `<amazon:emotion>` para dar vida a las respuestas:
- `intensity="high"` para inicio de partida
- `intensity="medium"` para números cantados
- `intensity="low"` para despedida

**Nota**: No todos los dispositivos soportan emociones completamente

### Estado del Juego
```javascript
{
  active: true,           // ¿Hay partida activa?
  paused: false,          // ¿Está pausada?
  speed: 'normal',        // Velocidad actual
  calledNumbers: [],      // Array de números cantados
  lastNumber: null,       // Último número (para "repetir")
  startTime: ISO8601      // Timestamp de inicio
}
```

**Consideración**: En v1.0 no guardamos cuándo se pausó ni duración total. Podría añadirse.

---

## 🚨 Limitaciones Conocidas

### 1. Verificación de Cartones (v1.0)
**Actual**: Solo da instrucciones al usuario  
**Ideal**: Sistema automático de verificación  
**Bloqueador**: Alexa no puede "recordar" números del cartón del usuario fácilmente  
**Solución futura**: Usar APL + input de usuario, o companion app

### 2. Sin Auto-Play
**Actual**: Usuario debe decir "continúa" para cada bola  
**Razón**: 
- Alexa Skills no pueden ejecutar código sin input del usuario
- SSML `<break>` tiene límite de ~10 segundos
**Workaround considerado**: Audio de larga duración con todas las bolas (inflexible)

### 3. Efectos de Sonido
**Actual**: Solo SSML básico  
**Ideal**: Sonidos de bombo, aplausos, música  
**Bloqueador**: Requiere hosting de archivos de audio (S3)  
**Versión futura**: 1.1 con APL Audio

### 4. Multijugador
**Actual**: Un solo juego a la vez  
**Ideal**: Hasta 4 cartones simultáneos  
**Complejidad**: Estado mucho más complejo, verificación individual  
**Versión futura**: 1.2

---

## 🐛 Bugs Corregidos Durante Desarrollo

### Bug #1: Números duplicados
**Problema**: Ocasionalmente salía el mismo número dos veces  
**Causa**: No se guardaba el estado antes de anunciar  
**Fix**: `saveGameState()` antes del response

### Bug #2: Stats no se guardaban
**Problema**: Stats se perdían entre sesiones  
**Causa**: Olvidé `await` en `savePersistentAttributes()`  
**Fix**: Añadir `await` consistentemente

### Bug #3: Último número null
**Problema**: "Repite el último" fallaba al inicio  
**Fix**: Añadir check de `lastNumber !== null`

---

## 💡 Mejoras Pendientes (No críticas)

### Performance
- [ ] Pre-shuffle de números al inicio (evitar cálculo en cada bola)
- [ ] Cache de frases generadas
- [ ] Reducir tamaño del estado persistido

### UX
- [ ] Mensajes más variados (no repetitivos)
- [ ] Reacciones a eventos (75% completo, etc.)
- [ ] Onboarding para nuevos usuarios
- [ ] Tips contextuales

### Code Quality
- [ ] Unit tests
- [ ] Integration tests
- [ ] JSDoc en todas las funciones
- [ ] ESLint configuration
- [ ] Error tracking (Sentry?)

---

## 📊 Métricas Importantes

Monitorear post-lanzamiento:

### User Engagement
- Porcentaje de usuarios que completan una partida
- Promedio de bolas por sesión
- Velocidad más popular
- Tasa de repetición (usuarios que vuelven)

### Technical
- Lambda execution time (objetivo: <500ms)
- Error rate (objetivo: <0.1%)
- Cold start frequency
- S3 read/write latency

### Voice UX
- Intents no reconocidos (mejorar modelo)
- Comandos más usados
- Drop-off points (dónde abandonan)

---

## 🔐 Seguridad y Privacidad

### Datos Guardados
- ✅ Solo estadísticas agregadas
- ✅ Sin información personal identificable
- ✅ User ID es el ID de Alexa (anónimo)

### Compliance
- ✅ No apto para niños (isChildDirected: false)
- ✅ No usa información personal (usesPersonalInfo: false)
- ✅ Sin compras in-app
- ✅ Sin publicidad

---

## 🌍 Internacionalización

### Español (ES, MX, US)
**Decisión**: Mismo modelo para las 3 variantes  
**Razón**: Frases del bingo son universales en español  
**Futuro**: Personalizar frases por región
- ES: Frases tradicionales españolas
- MX: Frases mexicanas ("el charro", etc.)
- US: Frases más neutras

### Otros Idiomas
Para añadir inglés, portugués, etc.:
1. Crear `en-US.json`, `pt-BR.json`
2. Traducir `bingoData.js` (crear `bingoData_en.js`)
3. Actualizar `skill.json` con nuevos locales
4. Importar módulo de datos según locale

---

## 🎓 Lecciones Aprendidas

### 1. SSML es poderoso pero limitado
Los breaks largos no funcionan bien. Para auto-play se necesitaría Audio directives.

### 2. Alexa-Hosted simplifica mucho
S3 y Lambda pre-configurados ahorran horas de setup.

### 3. Testing exhaustivo es crucial
Los usuarios dicen cosas inesperadas. Añadir muchos synonyms.

### 4. La voz importa
Usar `<amazon:emotion>` hace una GRAN diferencia en engagement.

### 5. Documentación desde el inicio
Escribir README, DEPLOYMENT, etc. mientras desarrollas ahorra tiempo después.

---

## 🚀 Próximas Prioridades

### v1.1 (Próxima)
1. **APL básico** para Echo Show
2. **Audio effects** (bombo, ding, aplausos)
3. **Mejoras en frases** (más variedad)

### v1.2 (Futuro cercano)
1. **Modo multijugador** (2-4 cartones)
2. **Patrones de victoria** (esquinas, X, etc.)
3. **Logros básicos**

### v2.0 (Visión)
1. **Companion app** (web/móvil)
2. **Online multiplayer**
3. **AI-powered features**

---

## 📞 Contacto del Desarrollador

**Jose Alvarez Dev**  
GitHub: [@JoseAlvarezDev](https://github.com/JoseAlvarezDev)

Para reportar bugs o sugerir features: abrir issue en GitHub

---

**Última actualización**: 26 Diciembre 2025  
**Versión actual**: 1.0.0  
**Estado**: Release Candidate
