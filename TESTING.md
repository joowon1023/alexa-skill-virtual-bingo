# Manual de Testing - Virtual Bingo

## 🧪 Guía de Pruebas

### Testing en Simulador Alexa

#### 1. Configuración Inicial
```
Ir a: Alexa Developer Console > Test
Activar: "Test is enabled for this skill"
Seleccionar idioma: Spanish (ES/MX/US)
```

#### 2. Casos de Prueba Básicos

##### Test 1: Lanzamiento del Skill
```
Usuario: "Abre virtual bingo"
Esperado: Mensaje de bienvenida + opciones de juego
```

##### Test 2: Iniciar Partida Normal
```
Usuario: "Nueva partida"
Esperado: Confirmación + explicación del modo normal
Usuario: "Continúa"
Esperado: Primera bola con frase tradicional
```

##### Test 3: Diferentes Velocidades
```
Usuario: "Nueva partida rápida"
Esperado: Confirmación modo rápido (1.5s)

Usuario: "Nueva partida lenta"
Esperado: Confirmación modo lento (5s)

Usuario: "Nueva partida turbo"
Esperado: Confirmación modo turbo (1s)
```

##### Test 4: Controles Durante el Juego
```
Usuario: "Nueva partida"
Usuario: "Continúa" x3
Usuario: "Pausa"
Esperado: Confirmación de pausa + stats

Usuario: "El último número"
Esperado: Repetición del último número

Usuario: "Histórico"
Esperado: Lista de números cantados

Usuario: "Continúa"
Esperado: Nueva bola
```

##### Test 5: Cambio de Velocidad
```
Usuario: "Nueva partida normal"
Usuario: "Continúa" x3
Usuario: "Cambiar a modo turbo"
Esperado: Confirmación del cambio

Usuario: "Continúa"
Esperado: Siguiente bola con nueva velocidad
```

##### Test 6: Verificación de Cartón
```
Usuario: "Nueva partida"
Usuario: "Continúa" x5
Usuario: "Tengo línea"
Esperado: Instrucciones de verificación
```

##### Test 7: Estadísticas
```
Usuario: "Estadísticas"
Esperado: Stats del usuario (Si es primera vez: mensaje de bienvenida)
```

##### Test 8: Terminar Partida
```
Usuario: "Nueva partida"
Usuario: "Continúa" x10
Usuario: "Terminar partida"
Esperado: Resumen de la partida + actualización stats
```

##### Test 9: Ayuda
```
Usuario: "Ayuda"
Esperado: Lista completa de comandos
```

##### Test 10: Salir
```
Usuario: "Salir"  / "Cancela" / "Para"
Esperado: Mensaje de despedida
```

### 3. Flujos de Conversación Completos

#### Flujo A: Partida Rápida Completa
```
1. "Abre virtual bingo"
2. "Nueva partida rápida"
3. "Continúa" (repetir ~15 veces)
4. "Pausa"
5. "Histórico"
6. "Continúa" (repetir ~10 veces)
7. "Tengo bingo"
8. "Terminar partida"
9. "Estadísticas"
10. "Salir"
```

#### Flujo B: Cambios de Velocidad
```
1. "Abre virtual bingo"
2. "Nueva partida lenta"
3. "Continúa" x3
4. "Cambiar a modo normal"
5. "Continúa" x3
6. "Cambiar a modo turbo"
7. "Continúa" x5
8. "Terminar partida"
```

#### Flujo C: Usuario Nuevo
```
1. "Abre virtual bingo"
   → Debe recibir mensaje de bienvenida para nuevos usuarios
2. "Ayuda"
3. "Nueva partida"
4. "Continúa" x10
5. "Estadísticas"
   → Primera partida registrada
6. "Salir"
```

#### Flujo D: Usuario Recurrente
```
1. "Abre virtual bingo"
   → Debe recibir mensaje personalizado con stats
2. "Nueva partida turbo"
3. [Completar partida]
4. "Estadísticas"
   → Stats actualizadas
```

### 4. Edge Cases

#### Test: Repetir sin números
```
Usuario: "Abre virtual bingo"
Usuario: "Nueva partida"
Usuario: "El último número"
Esperado: Mensaje indicando que no hay números aún
```

#### Test: Histórico sin números
```
Usuario: "Abre virtual bingo"
Usuario: "Nueva partida"
Usuario: "Histórico"
Esperado: Mensaje indicando que no hay números
```

#### Test: Continuar sin partida
```
Usuario: "Abre virtual bingo"
Usuario: "Continúa"
Esperado: Pedir iniciar nueva partida
```

#### Test: Pausa sin partida
```
Usuario: "Abre virtual bingo"
Usuario: "Pausa"
Esperado: Mensaje que no hay partida activa
```

#### Test: Velocidad inválida
```
Usuario: "Nueva partida super mega rápida"
Esperado: Usar velocidad normal por defecto
O pedir aclaración
```

#### Test: Todos los números cantados
```
Usuario: "Nueva partida turbo"
Usuario: "Continúa" x100
Esperado: Mensaje de finalización al llegar a 100
```

### 5. Testing en Dispositivo Físico

#### Dispositivos a Probar:
- [ ] Amazon Echo (sin pantalla)
- [ ] Echo Dot
- [ ] Echo Show (con pantalla)
- [ ] Alexa en móvil

#### Aspectos a Verificar:
- [ ] Claridad de la voz
- [ ] Timing entre números
- [ ] Reconocimiento de comandos
- [ ] Volumen apropiado
- [ ] Experiencia completa de usuario

### 6. Checklist de Certificación

Antes de enviar a certificación:

#### Funcionalidad:
- [ ] Todas las pruebas básicas pasan
- [ ] No hay crashes
- [ ] Manejo de errores correcto
- [ ] Persistencia funciona
- [ ] Stats se guardan correctamente

#### UX:
- [ ] Mensajes claros y concisos
- [ ] Reprompts útiles
- [ ] No hay dead ends
- [ ] Ayuda es completa
- [ ] Experiencia fluida

#### Localización:
- [ ] Funciona en es-ES
- [ ] Funciona en es-MX
- [ ] Funciona en es-US
- [ ] Frases apropiadas para cada región

#### Metadata:
- [ ] Nombre del skill es correcto
- [ ] Descripción completa
- [ ] Keywords relevantes
- [ ] Iconos de alta calidad
- [ ] Example phrases correctas
- [ ] Privacy policy (si aplica)

### 7. Métricas a Monitorear

Post-lanzamiento:
- Número de partidas iniciadas
- Velocidad más popular
- Promedio de bolas por partida
- Tasa de retención
- Comandos más usados
- Errores más comunes

### 8. Logs Útiles

Revisar CloudWatch Logs para:
```javascript
// Request logging
REQUEST: { type, intent, slots }

// Error logging
Error handled: { error, stack }

// Game state
gameState: { active, speed, calledNumbers }

// Stats
userStats: { gamesPlayed, totalBalls }
```

---

## 🐛 Bugs Conocidos

Ninguno actualmente.

## 📝 Notas

- Las pruebas turbo pueden ser difíciles de seguir manualmente
- Probar con diferentes acentos españoles
- Verificar que SSML se procesa correctamente
- Asegurar que los números se escuchan claramente
