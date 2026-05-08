# StudyConnect Backend

Backend para la aplicación StudyConnect, construido con Node.js, Express y PostgreSQL.

## Instalación

1. Clona el repositorio.
2. Instala las dependencias:
   ```
   npm install
   ```
3. Copia el archivo `.env.example` a `.env` y configura las variables de entorno.

## Variables de Entorno

- `PORT`: Puerto del servidor (default: 3000)
- `DB_HOST`: Host de la base de datos PostgreSQL
- `DB_PORT`: Puerto de la base de datos (default: 5432)
- `DB_NAME`: Nombre de la base de datos
- `DB_USER`: Usuario de la base de datos
- `DB_PASSWORD`: Contraseña de la base de datos
- `JWT_SECRET`: Clave secreta para JWT
- `JWT_EXPIRES_IN`: Tiempo de expiración del token JWT (default: 1h)
- `LOG_LEVEL`: Nivel de logs (default: info)

## Ejecución

### Desarrollo
```
npm run dev
```

### Producción
```
npm start
```

## Despliegue en AWS

### Lambda
Para desplegar en AWS Lambda, considera usar Serverless Framework o AWS SAM.

### EC2
1. Instala Node.js en la instancia EC2.
2. Clona el repositorio.
3. Instala dependencias y configura .env.
4. Usa PM2 para manejar el proceso:
   ```
   npm install -g pm2
   pm2 start src/app.js --name studyconnect-backend
   ```

## Logs

Los logs se escriben en la consola y en archivos en el directorio `logs/`:
- `error.log`: Errores
- `combined.log`: Todos los logs

## Estructura del Proyecto

- `src/app.js`: Punto de entrada
- `src/config/`: Configuraciones (DB, logger)
- `src/controllers/`: Controladores de rutas
- `src/middlewares/`: Middlewares (autenticación)
- `src/repositories/`: Acceso a datos
- `src/routes/`: Definición de rutas
- `src/services/`: Lógica de negocio