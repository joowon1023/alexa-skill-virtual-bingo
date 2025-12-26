# Guía de Contribución - Virtual Bingo

¡Gracias por tu interés en contribuir a Virtual Bingo! 🎰

## 🤝 Cómo Contribuir

### Reportar Bugs

Si encuentras un bug, por favor abre un issue con:
- Descripción clara del problema
- Pasos para reproducirlo
- Comportamiento esperado vs actual
- Logs si es posible
- Versión de Alexa/dispositivo

### Sugerir Features

Para nuevas características:
- Describe la funcionalidad detalladamente
- Explica el caso de uso
- Si es posible, mockups o ejemplos

### Pull Requests

1. **Fork** el repositorio
2. **Crea** una rama desde `main`:
   ```bash
   git checkout -b feature/mi-feature
   ```
3. **Implementa** tus cambios
4. **Prueba** exhaustivamente
5. **Commit** con mensajes descriptivos:
   ```bash
   git commit -m "feat: añade verificación automática de cartones"
   ```
6. **Push** a tu fork:
   ```bash
   git push origin feature/mi-feature
   ```
7. **Abre** un Pull Request

### Convenciones de Código

#### JavaScript
- Usar ES6+ features
- 4 espacios de indentación
- Nombres descriptivos de variables
- Comentarios para lógica compleja
- JSDoc para funciones públicas

#### Mensajes de Commit
Seguir [Conventional Commits](https://www.conventionalcommits.org/):
- `feat:` Nueva característica
- `fix:` Corrección de bug
- `docs:` Cambios en documentación
- `style:` Formato, sin cambios de código
- `refactor:` Refactorización
- `test:` Añadir tests
- `chore:` Mantenimiento

### Testing

Antes de enviar un PR:
1. Prueba en simulador de Alexa
2. Prueba en dispositivo físico si es posible
3. Verifica todos los paths de conversación
4. Revisa logs de errores

### Áreas de Contribución

**Fácil**:
- Mejorar frases del bingo
- Añadir más variaciones de mensajes
- Documentación
- Traducciones

**Intermedio**:
- Nuevos handlers
- Mejoras en la lógica del juego
- Optimizaciones de rendimiento

**Avanzado**:
- APL para pantallas
- Modo multijugador
- Integración con APIs externas

## 📋 Checklist del PR

- [ ] El código sigue las convenciones del proyecto
- [ ] He probado los cambios exhaustivamente
- [ ] He actualizado la documentación si es necesario
- [ ] Los mensajes de commit son descriptivos
- [ ] No hay conflictos con `main`

## 🙏 Gracias

Toda contribución es valiosa, sin importar su tamaño. ¡Gracias por hacer Virtual Bingo mejor!
