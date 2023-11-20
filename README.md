# Tenis-league

Breve descripción del proyecto.

## Requisitos

- Node.js >= 18.10.0
- Git

## Tecnologías Utilizadas

- Next.js
- Typescript
- Tailwind CSS
- Prisma
- Supabase (PostgreSQL)

## Clonar y Configurar

Para ejecutar este proyecto localmente, sigue estos pasos:

### 1. Clonar el Repositorio

```bash
git clone https://github.com/stivenm16/tenis-league.git
cd tenis-league
```

### 2. Instalar dependencias

```bash
npm install
```

### 3. Configurar Variables de Entorno

Crea un archivo .env en la raíz del proyecto y agrega las siguientes variables

```bash
DATABASE_URL="postgresql://postgres:JEBf19bB0YRqMA3Q@db.lvsehlhgpsokgvrynnef.supabase.co:5432/postgres"
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="secret-key"
```

### 4. Ejecutar el Proyecto

```bash
npm run dev
```

El comando npm run dev iniciará el servidor de desarrollo. Abre http://localhost:3000 en tu navegador para ver la aplicación.

### 5. ¿Cómo funciona la aplicación?

Desde http://localhost:3000 se podrá acceder al menu principal, en donde se tiene una barra de navegación que permitirá al usuario navegar al Login o Registro según lo desee.

En el Login (Tras registrar la cuenta diligenciando el formulario de validación), basta con el correo y la contaseña para entrar al dashboard.

Para la prueba de concepto se pueden utilizar las siguientes credenciales, para acceder a un perfil de Usuario:

```bash
email="user@user.com"
password="12345"
```

Y para hacer login con un perfil tipo administrador:

```bash
email="admin@admin.com"
password="12345"
```

## Vista de usuario

Cada que se crea una cuenta esta por defecto tiene el rol Usuario, por lo que el dasboard mostrará solamente un listado de torneos que ya han sido creados por algún otro usuario con el rol Admin, el usuario puede entrar o salir del torneo si así lo desea clickeando en el botón señalado en cada torneo.

## Vista de adminsitrador

En este dashboard se presentan dos columnas, la primera con los Usuarios activos y la siguiente con los torneos que se han creado, el administrador puede editar la información de los usuarios, para este caso de uso solo puede cambiar el correo de los usuarios y/o si se desea se puede eliminar el usario.

En la sigiente columna, la de torneos, se puede editar, eliminar participantes o eliminar el torneo, al editarlo se edita solamente el nombre del torneo, al eliminar los participantes se abre un modal mostrando los participantes que estan asociados a dicho torneo y al eliminar borra el torneo directamente; además de esto debajo de la sección de torneos se tiene la opción de crear torneo que permite crear un torneo solo pasando el nombre de este.

### 6. Testing

Los componentes más críticos relacionados a las funcionalidades principales en el frontend fueron testeados utilizando testing-library y jest, para correr los test solo hace falta correr el siguiente comando en la terminal:

```bash
npm run test
```

### 7. Consideraciones en seguridad

La aplicación cuenta con unos niveles básicos de seguridad, autenticación con JWT, además de esto las contraseñas en Base de Datos se guardan encriptadas, además de esto, la aplicación cuenta con un middleware global que permite el manejo efectivo de los usuarios basados en su rol, de esta manera cualquier usuarios que no haya hecho log in no podrá acceder al panel de usuarios o al administrativo sin antes digitar sus credenciales.

### 8. Suposiciones

El sitema de autenticación y registro maneja un modelo sencillo siguiendo una paleta de colores oscura pensando principalmente en el descanso de la vista del usuario y con un enfoque a posteriormente contar con una funcionalidad de ligtmode de requerirse.

La aplicación por ahora no está pensada para que se puedan crear distintos administradores de ninguna manera, por lo que para este caso solo habrá un usuario admin que fue creado de manera manual, de esta manera solo existe un administrador que tiene el control total de los torneos y de los usuarios, manteniendo mayor seguridad en la aplicación.

Se pensó que la aplicación para los usuarios podría permitir que desde su panel puedan unirse o salirse de un torneo, en este sentido se asocia el id del usuario al torneo, ya en un futuro se podría generar una funcionalidad de pago desde el mismo torneo con todos los id's asociados.

Desde el panel administrativo se podrían realizar distintas mejoras, como poder editar más datos de los usuarios o de los mismos torneos.

A nivel de diseño el enfoque fue muy básico señalando desde la barra de navegación el tipo de usuario, esto podría ocultarse o presentarse de una manera más limpia pero para efectos prácticos y diferenciar la separación de roles se muestra de esta manera.

Y otro punto de mejora sería que los componentes pueden ser llevados a una expresión aun más comprimida, haciendolos más reutilizables, aun así se intentó manejar una estructura limpia y reutilizable de los modulos, así como se siguió el principio de separation of concerns.
