
---

# Meloday: Una melodía para cada día
### ¡Perfecto para dedicar a una persona especial!

Este proyecto proporciona una canción diferente para cada día del año. Utiliza la [API de Youtube](https://developers.google.com/youtube/v3) para obtener una lista de reproducción especial y selecciona la canción correspondiente al día actual.
También incluye frases relacionadas con la música para acompañar la experiencia.

## ¿Cómo funciona?

El proyecto utiliza [Vite](https://vite.dev/) y [Svelte 5](https://svelte.dev/), con ayuda de la [API de Youtube](https://developers.google.com/youtube/v3) para crear una interfaz simple pero atractiva que muestra la canción del día junto con una cita inspiradora relacionada con la música.

Es una migración hacia Svelte del proyecto [365-days](https://github.com/101rockyprojects/365-days/) que fue hecho con Javascript puro, y me sirvió para aprender desde cero cada una de las herramientas anteriormente nombradas.

La aplicación tiene en cuenta la cantidad de canciones para que, en caso de no contar con una para cada día del año, se vaya de la última a la primera, en un ciclo que garantiza que cada día haya una canción y no te quedes con las ganas; así como las fechas especiales que designes, reproducción automática, años bisiestos, fechas congruentes, y otros detalles.

---

# Personalización

Puedes agregar en el ```.env``` tu propia playlist y los días espaciales (cumpleaños, aniversario, etc). Los controlas a través del *store* ```variables.js```, también puedes cambiar las frases que se muestran en ```quotes.js```, y las que se muestran solo en fechas especiales ```specialQuotes.js```.

Una vez configurados como en el ```.env.example```, puedes revisar cuál es tu canción del día o utilizar las siguientes opciones:

## 1. Elige la canción que desees:
El proyecto permite a través del parámetro `song` elegir la canción que desees dedicar con ayuda del id del video de dicho video en Youtube (la serie de caracteres luego del `watch?v=`).
### Ejemplo:

Intenta con una canción que seguramente ya habrás escuchado:

[Ejemplo canción usando video id from Youtube](https://meloday.host/?song=o-YBDTqX_ZU&autoplay=1)
```
https://meloday.host/?song=o-YBDTqX_ZU&autoplay=1
```
> Un clásico...

---

## 2. Descubre la canción de cada día:
El proyecto también permite a través del parámetro `day` elegir el día del año y descubrir qué canción es la de un día en especial. En formato `DD-MM`, donde `DD` son los dígitos del día, y `MM` los dígitos del mes.

### Ejemplo:

Para saber la canción del día 28 del quinto mes (28 de mayo del respectivo año). O cualquier día que desees:

[Ejemplo Canción del 28 de mayo](https://meloday.host/?day=28-05)
```
https://meloday.host/?day=28-05
```

> ¿Y qué tal intentar con 31 de Febrero? Te reto a averiguarlo ;)

---

# Inspiración detrás del proyecto
El proyecto nació de una antigua playlist para dedicarle a mi pareja llamada **'Te dedico 365 canciones'**.

> ¿Cómo elegir entre tantas canciones?

La lista de canciones es útil por sí misma, sin embargo, quería que mi pareja pudiera tener una canción distinta al día sin tener que ir a buscarlas en la playlist manualmente.

Pensé rápidamente en una página para buscar entre todas las canciones indexadas según el día del año en el que se ingrese a la página; así que me puse manos a la obra durante un fin de semana y luego de unos detalles e ideas de personalización.

## Autor
Este proyecto fue creado por [101rockyprojects](https://github.com/101rockyprojects), pero puedes llamarme **Rocky**.

> Sí, como el de la película. No, no es un apodo o sobrenombre.

## Contribución

Si tienes alguna duda o deseas contribuir a este proyecto, no dudes en enviar un pull request. 
### ¡Estamos abiertos a nuevas ideas y mejoras! :D
