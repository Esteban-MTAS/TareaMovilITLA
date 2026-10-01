# TareaMovilITLA

Aplicación académica de ITLA para la asignatura Introducción al Desarrollo de Aplicaciones Móviles. Desarrollada con React Native y TypeScript para Android.

## Tecnologías

- React Native 0.87.1
- React 19.2.3
- TypeScript
- Android, Gradle y Kotlin para la integración nativa
- React Native WebView para el video de YouTube
- Jest y React Test Renderer para las pruebas

## Funcionalidades

- Página Inicial con fotografía y datos personales.
- Sumadora con validación de entradas y botón para limpiar.
- Conversor de números enteros del 1 al 1000 a letras en español, con rechazo de entradas vacías y fuera de rango.
- Tabla de multiplicar desde el 1 hasta el 13.
- Experiencia Personal con el video https://youtu.be/Me7Th-gGcdE.

El conversor utiliza exclusivamente la lógica local desarrollada en `App.tsx`: no realiza peticiones HTTP ni utiliza APIs externas, servicios de OpenAI/Google o bibliotecas de conversión. Solo la reproducción del video requiere conexión a Internet.

## Requisitos

- Node.js 22.11.0 o superior y npm.
- JDK 21.
- Android Studio con Android SDK Platform 37, Build Tools 37.0.0 y NDK 27.1.12297006.
- Un emulador Android o dispositivo con depuración USB (Android 7.0/API 24 o superior).
- Configurar `JAVA_HOME` y `ANDROID_HOME`; agregar `platform-tools` al PATH.

## Instalar dependencias

```sh
git clone https://github.com/Esteban-MTAS/TareaMovilITLA.git
cd TareaMovilITLA
npm ci
```

Si es necesario, crear `android/local.properties` con `sdk.dir` apuntando al SDK local. Ese archivo no se incluye en Git.

## Ejecutar en Android

En una terminal:

```sh
npm start
```

Con un emulador iniciado o dispositivo conectado, en otra terminal:

```sh
npm run android
```

Abrir la carpeta `android/` si se utiliza Android Studio.

## Compilar el APK

En Windows, desde la raíz:

```powershell
cd android
.\gradlew.bat :app:assembleRelease
```

En macOS/Linux:

```sh
cd android
./gradlew :app:assembleRelease
```

El APK se genera en `android/app/build/outputs/apk/release/app-release.apk`. La configuración actual utiliza la firma de desarrollo estándar para la entrega académica; una publicación en una tienda requiere una firma propia.

## Verificación

```sh
npm test -- --runInBand
npx tsc --noEmit
npm run lint
```

Las pruebas comprueban la suma 20 + 15, las conversiones 1, 15, 22, 48, 100, 101, 256, 500, 999 y 1000, el rechazo de 0, 1001 y campos vacíos, las trece filas de la tabla del 5 y el enlace del video en Experiencia Personal.

## Entrega

- `entrega/qr-github.png`: enlace exacto a este repositorio.
- `entrega/qr-youtube.png`: enlace exacto a https://youtu.be/Me7Th-gGcdE.

Los QR se generan como archivos PNG y se validan mediante lectura de sus contenidos.

Se excluyen de Git las dependencias, cachés, compilaciones, configuración local del IDE y archivos de secretos. La aplicación React Native utiliza el proyecto nativo ubicado en `android/`.
