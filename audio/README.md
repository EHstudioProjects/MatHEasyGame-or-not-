# MatHEasyGame or not? 🧠

¡Bienvenido a **MatHEasyGame or not?**! Este es un juego de matemáticas simple y divertido diseñado para niños, con una interfaz visualmente atractiva gracias a **Three.js**. El objetivo es resolver operaciones matemáticas básicas lo más rápido posible para avanzar de nivel y conseguir la puntuación más alta.


## 🚀 Requisitos y Configuración del Proyecto

Para que el proyecto funcione correctamente, asegúrate de tener la siguiente estructura de archivos y componentes:

### 📂 Estructura de Archivos

MatHEasyGame/
├── index.html          # Estructura principal de la página
├── style.css           # Estilos y animaciones
├── game.js             # Lógica del juego y efectos 3D
├── three.min.js        # Librería Three.js (necesaria para los gráficos 3D)
└── audio/              # Carpeta para archivos de sonido
    ├── bg-music.mp3    # Música de fondo
    ├── correct.mp3     # Sonido de respuesta correcta
    ├── wrong.mp3       # Sonido de respuesta incorrecta
    ├── win.mp3         # Sonido de victoria
    └── lose.mp3        # Sonido de derrota


### 📋 Requisitos Previos

  * **Navegador Web Moderno**: Un navegador como Chrome, Firefox o Edge es necesario para ejecutar el código JavaScript, CSS y HTML.
  * **Servidor Local**: Para evitar problemas con la carga de recursos (especialmente los archivos de audio), se recomienda ejecutar el proyecto en un servidor local. Puedes usar herramientas como **Live Server** de Visual Studio Code o Python (`python3 -m http.server`).



## ✨ Funcionalidades Principales

El juego incluye varias características diseñadas para una experiencia de usuario completa:

  * **Menú de Inicio**: Al iniciar, el juego muestra una pantalla de bienvenida con el nombre **"MatHEasyGame or not?"**, junto a opciones para empezar a jugar o configurar el juego.
  * **Operaciones Matemáticas**: Genera operaciones aleatorias de suma, resta, multiplicación y división, adaptando la dificultad a medida que el jugador avanza.
  * **Niveles de Dificultad**: El juego consta de **7 niveles** en total. La dificultad de las operaciones aumenta progresivamente, haciendo el juego más desafiante.
  * **Sistema de Vidas y Puntuación**:
      * Comienzas con **3 vidas**.
      * Cada respuesta incorrecta resta una vida.
      * El juego termina si te quedas sin vidas.
  * **Temporizador Dinámico**: Cada nivel tiene un temporizador que se ajusta:
      * Si respondes correctamente, el tiempo disponible para la siguiente pregunta aumenta, recompensando la velocidad.
      * Si respondes incorrectamente, el tiempo se reduce, aumentando la presión.
  * **Efectos de Audio**: El juego cuenta con una banda sonora de fondo y efectos de sonido para cada acción:
      * Música ambiental.
      * Sonidos para respuestas correctas e incorrectas.
      * Pistas de audio para cuando ganas o pierdes.
  * **Interfaz de Usuario 3D (Three.js)**: Los elementos decorativos en segundo plano están animados usando **Three.js**, creando una atmósfera visualmente dinámica con esferas flotantes y transiciones.
  * **Menú de Opciones**: Permite al jugador personalizar su experiencia:
      * **Control de Volumen**: Ajusta el volumen de la música y los efectos.
      * **Idioma**: Cambia el idioma de la interfaz del juego.
      * **Mute de Música**: Opción para silenciar la música de fondo.
  * **Transiciones y Pantallas**: El juego tiene transiciones suaves entre sus diferentes pantallas (**carga**, **menú**, **juego**, **resultado**), lo que mejora la experiencia visual y la fluidez del juego.

## 🛠️ Cómo Funciona la Dificultad

La dificultad del juego se ajusta de la siguiente manera:

  * **Generación de Problemas**: Los números en las operaciones aumentan de rango a medida que subes de nivel, lo que las hace más complejas.
  * **Ritmo del Juego**: El intervalo de tiempo para mostrar nuevas preguntas disminuye con el tiempo, forzándote a ser más rápido.
  * **Temporizador**: El tiempo restante se ajusta en función de tu rendimiento, premiando la precisión y penalizando los errores.

## 💻 Desarrollo

Este proyecto está construido con tecnologías web estándar:

  * **HTML5**
  * **CSS3**
  * **JavaScript (Vanilla JS)**
  * **Three.js**