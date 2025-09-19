# Plataforma Web para Compra de Derechos de Música 🎧

¡Bienvenido al repositorio de nuestro proyecto! Este documento es una guía completa del proyecto "Plataforma Web para Compra de Derechos de Música", desarrollado como parte de la materia **Desarrollo de Software**.

---

## Descripción del Proyecto

Este proyecto es una plataforma web innovadora diseñada para **DJs y productores musicales** que buscan adquirir derechos de uso de canciones de forma legal y segura. La plataforma no solo facilita la compra, sino que también enriquece la experiencia del usuario con funcionalidades clave:

-   **Previsualización de 30 segundos** de cada pista antes de la compra.
-   Información actualizada sobre **fechas de festivales y conciertos**.
-   Un **ranking de los artistas más populares** basado en las compras.

---

## Objetivos

Nuestros principales objetivos con este proyecto son:

-   Facilitar un entorno digital que agilice la adquisición de derechos de canciones.
-   Garantizar la **seguridad de las transacciones** y la protección de los datos de los usuarios.
-   Proveer una **experiencia de usuario intuitiva** para la búsqueda y previsualización de contenido musical.
-   Promover el acceso legal a material musical de alta calidad para la comunidad de DJs y productores.

---

## Funcionalidades Principales

La plataforma incluye las siguientes características clave:

-   **Autenticación de usuarios:** Sistema de registro e inicio de sesión seguro.
-   **Perfiles personalizados:** Los usuarios pueden gestionar su historial de compras y preferencias.
-   **Muestras de audio:** Escucha de 30 segundos de las pistas antes de comprar.
-   **Pasarela de pagos:** Integración de métodos de pago seguros como tarjetas, PayPal, entre otros.
-   **Calendario de eventos:** Un listado de festivales y conciertos relevantes.
-   **Ranking de popularidad:** Visualización de los artistas más adquiridos.
-   **Gestión de derechos:** Administración de las licencias y derechos adquiridos.

---

##  Tecnologías Utilizadas

A continuación se detallan las tecnologías elegidas para el desarrollo del proyecto:

| Categoría | Tecnologías Propuestas |
| :--- | :--- |
| **Frontend** | React / TypeScript , HTML5, CSS3 |
| **Backend** |  |
| **Base de datos** | PostgreSQL |
| **Pagos** | Mercado Pago |
| **Despliegue** | Cloudflare |

---

## Arquitectura del Sistema

El sistema se basa en una arquitectura **Cliente-Servidor**, donde el frontend consume una **API RESTful** desarrollada en el backend.

-   Se utilizará una **base de datos relacional o no relacional** para manejar la información de usuarios, canciones, transacciones y eventos.
-   Los módulos de pago y autenticación se integrarán para garantizar la **seguridad y confiabilidad** de todas las operaciones.

---

## Instrucciones de Ejecución

Sigue estos pasos para poner el proyecto en funcionamiento en tu entorno local:

1.  **Clona el repositorio** usando el siguiente comando:
    ```bash
    git clone [https://github.com/](https://github.com/)<usuario>/<nombre-del-repo>.git
    ```
2.  **Instala las dependencias** tanto para el frontend como para el backend:
    ```bash
    cd frontend && npm install
    cd ../backend && npm install
    ```
3.  **Configura las variables de entorno** en un archivo `.env` para las credenciales y llaves necesarias.
4.  **Ejecuta el proyecto** en modo de desarrollo:
    ```bash
    npm run dev
    ```

---

## Posibles Mejoras Futuras

Estamos planeando las siguientes funcionalidades para futuras iteraciones:

-   Desarrollo de una **aplicación móvil nativa** para iOS y Android.
-   **Integración con redes sociales** para compartir compras o eventos.
-   Implementación de un **sistema de recomendaciones** basado en los géneros musicales de interés del usuario.

---

### **Detalles del Equipo** - **Materia:** Desarrollo de Software
- **Integrantes:** Cuenya Mateo, Falco Valentina, Lindon Sofia, Santillan Lucas, Pilar Yael
- **Docente:** Watemberg Emilio, Giudici Paula
