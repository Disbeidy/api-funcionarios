# API Funcionarios - Pruebas JDBC

Este proyecto implementa una API académica para la gestión de **funcionarios e inventarios**, con autenticación y autorización por roles (Administrador y Docente).  
Incluye pruebas en Java con conexión a MySQL Workbench mediante JDBC.

---

## 🚀 Características principales
- Autenticación con email y contraseña (encriptada).
- Autorización por rol:
  - **Administrador** → CRUD completo de usuarios, inventarios, estados, marcas y tipos.
  - **Docente** → solo puede listar inventarios.
- Conexión a MySQL Workbench mediante `ConexionBD.java` (credenciales ocultas en `db.properties`).
- Pruebas de:
  - JOIN extendido (funcionarios + inventarios + estado + marca + tipo).
  - CRUD sobre funcionarios.
  - CRUD sobre usuarios.

---

## 📦 Requisitos previos
- **Java JDK 17+** instalado  
- **MySQL Server** configurado con la base de datos `funcionarios_db`  
- **Conector JDBC de MySQL** (`mysql-connector-j-9.7.0.jar`) en carpeta `lib/`  
- Archivo `db.properties` con credenciales de conexión:

## properties
db.url=jdbc:mysql://localhost:3306/funcionarios_db
db.user=root
db.password=tu_clave_segura

## ⚙️ Instalación y ejecución en PowerShell
1. clona el repositorio:
git clone https://github.com/tuusuario/api-funcionarios.git
cd api-funcionarios
2. Compila los archivos Java:
javac -cp ".;lib/mysql-connector-j-9.7.0.jar" ConexionBD.java PruebaGeneral.java
3. Ejecuta el programa:
java -cp ".;lib/mysql-connector-j-9.7.0.jar" PruebaGeneral

## 📌 Resultados esperados en consola:
✅ Conexión exitosa a la base de datos.
📌 Listado del JOIN extendido (funcionarios con inventarios, estado, marca y tipo).
✅ Mensajes de prueba CRUD:
-Funcionario insertado, actualizado y eliminado (Juan Veintemillo).
-Usuario insertado, actualizado y eliminado (Usuario Prueba)

## 🔑 Autenticación
Para acceder a las rutas protegidas es necesario hacer login
-POST /api/login y el token debe enviarse en los headers.

## 👥 Roles y permisos
**Admin**

Crear inventarios (POST /api/inventarios)

Editar inventarios (PUT /api/inventarios/:id)

Eliminar inventarios (DELETE /api/inventarios/:id)

Listar inventarios (GET /api/inventarios)

**Docente**
Solo puede listar inventarios (GET /api/inventarios)


## 🗒️Notas
-Este proyecto es solo backend (API), no incluye frontend.
-Los ejemplos CRUD son pruebas de validación y no forman parte del flujo final de la API.
-Puedes adaptar las consultas SQL según tu esquema de base de datos.
-Proyecto totalmente académico.

## 🧠 Integrantes: 
° Daniela Anzueta Gongora, Disbeidy Anzueta Gongora y Sebastian Posada Duque.