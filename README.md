# Dashboard - ElectroMarket 🛒

Panel de administración y gestión comercial para **ElectroMarket**, una tienda de productos electrónicos. Construido con **React 19**, **Vite 8** y **Recharts**.

## ✨ Características

- **Autenticación** — Registro e inicio de sesión con persistencia en `localStorage`. El primer usuario registrado obtiene rol `admin`.
- **Panel de control (Overview)** — Tarjetas con estadísticas (usuarios, productos, ventas, ingresos) y gráfico de barras por nivel de ventas.
- **Gestión de productos** — CRUD completo: agregar, editar, eliminar y filtrar productos por categoría o nivel de ventas.
- **Gestión de ventas** — Registrar ventas con validación de stock, actualización automática de inventario, cambio de estados y filtros.
- **Compras a proveedores** — Registro de compras con control de acceso solo para administradores.
- **Gestión de usuarios** — Solo admin: editar perfiles, cambiar roles (admin/user) y eliminar usuarios.
- **Configuración de perfil** — Editar nombre y correo electrónico del usuario autenticado.
- **Tema claro/oscuro** — Alternancia de tema con persistencia en `localStorage`.
- **Notificaciones toast** — Feedback visual en acciones del sistema.
- **Roles de usuario** — Los administradores ven secciones adicionales (Compras, Usuarios).
- **Gráficos interactivos** — Visualización de datos con Recharts (barras y áreas).
- **Diseño responsive** — Sidebar colapsable para dispositivos móviles.

## 🛠️ Tecnologías y Herramientas

| Herramienta       | Versión | Propósito                              |
|-------------------|---------|----------------------------------------|
| React             | 19      | UI y lógica de componentes             |
| Vite              | 8       | Bundler y dev server rápido            |
| React Router DOM  | 7       | Enrutamiento SPA (HashRouter)          |
| Recharts          | 3       | Gráficos interactivos                  |
| Lucide React      | 1.7     | Iconos SVG modernos                    |
| ESLint            | 9       | Linter de código                       |
| Babel + Rolldown  | —       | Transpilación y bundling con plugin    |
| React Compiler    | 1.0     | Optimización automática de re-renders  |
| gh-pages          | 6       | Deploy a GitHub Pages                  |
| Netlify           | —       | Configuración de deploy (redirects SPA)|

## 🚀 Scripts

```bash
npm run dev        # Inicia el servidor de desarrollo
npm run build      # Compila para producción
npm run preview    # Previsualiza la build
npm run lint       # Ejecuta ESLint
npm run deploy     # Publica en GitHub Pages
```

## 📁 Estructura del Proyecto

```
src/
├── assets/components/
│   ├── Card/              # Tarjeta de estadística
│   ├── ChartCard/         # Tarjeta con gráfico de área
│   ├── Navbar/            # Barra de navegación superior
│   ├── Sidebar/           # Menú lateral con navegación
│   └── ProyectosTabla/    # Tabla de proyectos (componente base)
├── context/
│   ├── AuthContext.jsx     # Autenticación y roles
│   ├── ProductContext.jsx  # CRUD de productos
│   ├── SaleContext.jsx     # CRUD de ventas
│   ├── PurchaseContext.jsx # CRUD de compras
│   ├── UserContext.jsx     # Perfil del usuario
│   ├── ThemeContext.jsx    # Tema claro/oscuro
│   └── ToastContext.jsx    # Notificaciones toast
├── data/
│   └── products.json       # Datos de productos (semilla)
├── pages/
│   ├── Auth/               # Login y Register
│   ├── Overview/           # Panel principal con estadísticas
│   ├── Products/           # Gestión de productos
│   ├── Sales/              # Gestión de ventas
│   ├── Purchases/          # Compras a proveedores (admin)
│   ├── Users/              # Gestión de usuarios (admin)
│   └── Settings/           # Configuración de perfil
├── App.jsx                 # Punto de entrada con routing
├── main.jsx                # Renderizado con providers
└── index.css               # Estilos globales y variables
```
