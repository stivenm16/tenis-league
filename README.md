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
