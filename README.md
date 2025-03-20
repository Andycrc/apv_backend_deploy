<div align="center">
    <a href="https://nodejs.org/">
        <img
            alt="Node.js"
            src="https://upload.wikimedia.org/wikipedia/commons/d/d9/Node.js_logo.svg"
            width="150">
    </a>
</div>

# Node.js Backend

Esta es una API desarrollada con Node.js y Express, que implementa JWT para la autenticación. Gestiona la conexión con la base de datos y el envío de correos electrónicos.

## 📌 Requisitos

- [Node.js](https://nodejs.org/) (versión 16 o superior)
- [MongoDB](https://www.mongodb.com/) (si se usa base de datos local, asegúrate de tenerla en ejecución)

---

## 📦 Instalación

```sh
git clone https://github.com/Andycrc/apv_backend_deploy.git
cd apv_backend_deploy
npm install
```

---

## ⚙️ Configuración

Crea un archivo `.env` en la raíz del proyecto con las siguientes variables de entorno:

```ini
MONGO_URI=
JWT_SECRET=

EMAIL_USER=
EMAIL_PASS=
EMAIL_HOST=
EMAIL_PORT=

FRONTEND_URL=
```

---

## 🚀 Uso

```sh
npm run dev  # Modo desarrollo
npm start    # Modo producción
```

---


