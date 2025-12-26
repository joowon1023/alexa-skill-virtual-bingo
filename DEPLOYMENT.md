# Guía de Despliegue - Virtual Bingo

## 📦 Despliegue con Alexa-Hosted (Recomendado para Principiantes)

### Paso 1: Crear el Skill

1. Ve a [Alexa Developer Console](https://developer.amazon.com/alexa/console/ask)
2. Click en **"Create Skill"**
3. Configuración:
   - **Skill name**: Virtual Bingo
   - **Primary locale**: Spanish (ES)
   - **Choose a model**: Custom
   - **Choose a method to host**: Alexa-Hosted (Node.js)
   - **Hosting region**: EU (Europe) [Para español de España]
4. Click **"Create Skill"**
5. En templates, selecciona **"Start from Scratch"**

### Paso 2: Configurar el Interaction Model

1. En el panel izquierdo, ve a **"Build" > "Interaction Model" > "JSON Editor"**
2. Copia el contenido de: `skill-package/interactionModels/custom/es-ES.json`
3. Pega en el editor JSON
4. Click **"Save Model"**
5. Click **"Build Model"** (espera a que complete)

### Paso 3: Añadir Más Idiomas (Opcional)

Para **es-MX** (Español México):
1. Click en **"Language Settings"** (arriba a la derecha)
2. **"Add new language"** > Spanish (MX)
3. Repite el paso 2 con `es-MX.json`

Para **es-US** (Español EE.UU.):
1. Añade Spanish (US)
2. Usa `es-US.json`

### Paso 4: Subir el Código Lambda

#### Opción A: Desde la Consola Web
1. Ve a la pestaña **"Code"**
2. Verás los archivos predeterminados
3. Para cada archivo del proyecto:
   - Crea la estructura de carpetas (`handlers/`, `utils/`, `data/`)
   - Copia y pega el código correspondiente
4. Actualiza `package.json` con nuestras dependencias
5. Click **"Save"**
6. Click **"Deploy"**

#### Opción B: ZIP Upload
```bash
cd lambda
zip -r ../function.zip .
```
1. En la pestaña **"Code"**
2. **"Import Code"** > **"Upload .zip file"**
3. Sube `function.zip`
4. Click **"Deploy"**

### Paso 5: Configurar Permisos S3

Alexa-Hosted automáticamente crea un bucket S3. No requiere configuración adicional.

### Paso 6: Probar el Skill

1. Ve a la pestaña **"Test"**
2. Activa **"Test is enabled for this skill"**
3. Prueba con: `"abre virtual bingo"`

---

## 🚀 Despliegue con ASK CLI (Para Desarrolladores)

### Requisitos Previos

```bash
# Instalar ASK CLI
npm install -g ask-cli

# Configurar perfil AWS
ask configure
```

### Paso 1: Inicializar el Proyecto

```bash
# Si es un proyecto nuevo
ask init

# Si clonaste el repo
cd Bingo_skill
```

### Paso 2: Instalar Dependencias

```bash
cd lambda
npm install
cd ..
```

### Paso 3: Desplegar

```bash
# Desplegar todo (skill + lambda)
ask deploy

# Solo skill metadata
ask deploy --target skill-metadata

# Solo lambda
ask deploy --target lambda

# Solo interaction model
ask deploy --target model
```

### Paso 4: Verificar el Despliegue

```bash
# Ver el skill ID
ask smapi get-skill-status -s <skill-id>

# Ver logs de Lambda
ask lambda log -s <skill-id>
```

---

## 🔧 Despliegue Manual con AWS Lambda

### Paso 1: Crear la Función Lambda

1. Ve a [AWS Lambda Console](https://console.aws.amazon.com/lambda)
2. **Create function**
3. Configuración:
   - **Name**: virtual-bingo-skill
   - **Runtime**: Node.js 16.x
   - **Architecture**: x86_64
4. **Create function**

### Paso 2: Subir el Código

```bash
cd lambda
npm install --production
zip -r ../function.zip .
```

1. En Lambda console, **"Upload from"** > **".zip file"**
2. Sube `function.zip`

### Paso 3: Configurar el Trigger

1. **Add trigger** > **Alexa Skills Kit**
2. En Skill ID, pega el ID de tu skill desde Developer Console
3. **Add**

### Paso 4: Crear S3 Bucket para Persistencia

1. Ve a [S3 Console](https://s3.console.aws.amazon.com/)
2. **Create bucket**
3. Nombre: `virtual-bingo-persistence-[unique-id]`
4. Región: Misma que Lambda
5. **Create**

### Paso 5: Configurar Permisos IAM

Añade a la política del rol de Lambda:

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": [
        "s3:PutObject",
        "s3:GetObject"
      ],
      "Resource": "arn:aws:s3:::virtual-bingo-persistence-*/*"
    }
  ]
}
```

### Paso 6: Configurar Variable de Entorno

En Lambda:
1. **Configuration** > **Environment variables**
2. **Edit** > **Add**
   - Key: `S3_PERSISTENCE_BUCKET`
   - Value: `virtual-bingo-persistence-[unique-id]`

### Paso 7: Conectar con Alexa Skill

1. En Developer Console
2. **Build** > **Endpoint**
3. Selecciona **AWS Lambda ARN**
4. Pega el ARN de tu función Lambda
5. **Save Endpoints**

---

## ✅ Checklist Pre-Despliegue

- [ ] Código testeado localmente
- [ ] Todos los handlers implementados
- [ ] Dependencies instaladas
- [ ] Interaction model válido
- [ ] Metadata del skill completa
- [ ] Iconos subidos (108x108 y 512x512)
- [ ] Privacy policy (si aplica)
- [ ] Testing instructions escritas

---

## 🔄 Actualizar una Versión Existente

### Con Alexa-Hosted:
1. Modifica el código en la pestaña **"Code"**
2. **Save** > **Deploy**
3. Si cambias interaction model: **Build Model**

### Con ASK CLI:
```bash
# Actualizar código
ask deploy --target lambda

# Actualizar modelo
ask deploy --target model

# Actualizar todo
ask deploy
```

### Con Lambda Manual:
```bash
# Crear nuevo ZIP
cd lambda
zip -r ../update.zip .

# Subir en consola Lambda
# O usar AWS CLI
aws lambda update-function-code \
  --function-name virtual-bingo-skill \
  --zip-file fileb://../update.zip
```

---

## 🌍 Configurar Múltiples Regiones

Para mejor latencia global:

1. Crea funciones Lambda en:
   - **us-east-1** (N. Virginia) - Para América
   - **eu-west-1** (Irlanda) - Para Europa
   - **us-west-2** (Oregón) - Backup

2. En Developer Console:
   - **Endpoint** > **Different endpoints for different geographic regions**
   - Asigna ARN correspondiente a cada región

---

## 📊 Monitoreo Post-Despliegue

### CloudWatch Logs
```bash
# Ver logs recientes
ask lambda log -s <skill-id> --tail

# Logs específicos
aws logs tail /aws/lambda/virtual-bingo-skill --follow
```

### Métricas en Developer Console
1. **Analytics** tab
2. Monitorea:
   - Unique users
   - Sessions
   - Utterances
   - Intents

### Alertas CloudWatch
Crear alarmas para:
- Errors > 5 en 5 minutos
- Invocations = 0 por 24 horas
- Duration > 5000ms

---

## 🐛 Troubleshooting

### El skill no responde
- Verifica que Lambda está recibiendo requests (CloudWatch Logs)
- Revisa que el ARN en Developer Console es correcto
- Confirma que el trigger Alexa Skills Kit está configurado

### Errores de persistencia
- Verifica variable de entorno `S3_PERSISTENCE_BUCKET`
- Confirma permisos IAM del rol Lambda
- Revisa que el bucket existe

### Modelo no se construye
- Valida JSON del interaction model
- Revisa que no hay intents duplicados
- Confirma que invocation name es válido

---

## 📝 Notas

- El primer despliegue puede tardar 5-10 minutos
- Los cambios en interaction model requieren rebuild
- Lambda cold starts pueden causar latencia inicial
- Usa Lambda provisioned concurrency para mejor performance

¡Listo para desplegar! 🚀
