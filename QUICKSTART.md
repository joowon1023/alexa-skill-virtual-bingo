# 🚀 Quick Start - Virtual Bingo

Esta guía te ayudará a tener el skill funcionando en menos de 15 minutos.

## ⚡ Opción Rápida: Alexa-Hosted

### Paso 1: Crear el Skill (3 min)

1. Ve a https://developer.amazon.com/alexa/console/ask
2. Click **"Create Skill"**
3. Configuración:
   - Nombre: `Virtual Bingo`
   - Idioma: `Spanish (ES)`
   - Modelo: `Custom`
   - Hosting: `Alexa-Hosted (Node.js)`
4. Click **"Create Skill"** → **"Start from Scratch"**

### Paso 2: Subir el Modelo (3 min)

1. Ve a **Build** → **Interaction Model** → **JSON Editor**
2. Copia TODO el contenido de:
   ```
   skill-package/interactionModels/custom/es-ES.json
   ```
3. Pégalo en el editor
4. Click **"Save Model"** → **"Build Model"**
5. ☕ Espera 1-2 minutos a que compile

### Paso 3: Subir el Código (5 min)

1. Ve a la pestaña **"Code"**
2. Elimina todo el contenido predeterminado
3. Crea la estructura:

   **Click en "Create File" y crea:**
   
   ```
   📁 handlers/
      → StartGameIntentHandler.js
      → ContinueIntentHandler.js
      → PauseIntentHandler.js
      → (y todos los demás de la carpeta lambda/handlers/)
   
   📁 utils/
      → gameLogic.js
      → persistence.js
   
   📁 data/
      → bingoData.js
   
   📄 index.js
   📄 package.json
   ```

4. Copia y pega el contenido de cada archivo
5. Click **"Save"** → **"Deploy"**
6. ⏳ Espera ~30 segundos

### Paso 4: ¡Probar! (2 min)

1. Ve a **Test**
2. Activa: **"Test is enabled for this skill"**
3. Escribe o di:
   ```
   abre virtual bingo
   ```
4. Luego:
   ```
   nueva partida
   continúa
   ```

**🎉 ¡Listo! Tu skill está funcionando.**

---

## 🎯 Comandos de Prueba Rápida

```
Alexa, abre virtual bingo
→ nueva partida rápida
→ continúa
→ continúa
→ el último número
→ pausa
→ histórico
→ continúa
→ terminar partida
→ estadísticas
```

---

## 🔧 Troubleshooting Rápido

### ❌ Error: "There was a problem with the requested skill's response"
- Ve a **Code** → Click **"Deploy"** de nuevo
- Verifica los logs en la pestaña **"Logs"**

### ❌ El modelo no se construye
- Verifica que el JSON es válido
- Asegúrate de copiar TODO el contenido

### ❌ No reconoce mis comandos
- Reconstruye el modelo: **Build Model**
- Espera a que termine completamente

---

## 📋 Checklist de Verificación

- [ ] Skill creado en Developer Console
- [ ] Modelo de interacción importado y compilado
- [ ] Todos los archivos Lambda copiados
- [ ] package.json actualizado
- [ ] Código desplegado
- [ ] Test habilitado
- [ ] Skill responde correctamente

---

## 🎮 Próximos Pasos

Una vez funcionando:

1. **Añade más idiomas**:
   - Importa `es-MX.json` y `es-US.json`

2. **Personaliza las frases**:
   - Edita `lambda/data/bingoData.js`

3. **Ajusta velocidades**:
   - Modifica los tiempos en `bingoData.js`

4. **Prepara para publicación**:
   - Lee `DEPLOYMENT.md` para guía completa
   - Sigue checklist de certificación en `TESTING.md`

---

## 📚 Documentación Completa

- **README.md** - Visión general y características
- **DEPLOYMENT.md** - Guía detallada de despliegue
- **TESTING.md** - Manual de testing
- **PROJECT_STRUCTURE.md** - Arquitectura del proyecto

---

## 💡 Tips

- **Usa el simulador web**: Es más rápido que un dispositivo físico
- **Revisa los logs**: Si algo falla, los logs te dirán por qué
- **Prueba todas las velocidades**: Cada una da una experiencia diferente
- **Comparte con amigos**: ¡Es más divertido con otros!

---

**¿Problemas?** Abre un issue en GitHub o revisa DEPLOYMENT.md

**¡Disfruta tu Virtual Bingo!** 🎰✨
