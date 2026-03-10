# My Pass - Gestor de Contraseñas Local

Un gestor de contraseñas seguro y local que funciona directamente en el navegador. Construido con Next.js y enfocado en la privacidad y seguridad de tus credenciales.

## 🚀 Características

### Fase 1 - Funcionalidad Actual
- **Almacenamiento Local**: Todas las contraseñas se guardan localmente en tu navegador
- **Encriptación**: Tus contraseñas están encriptadas con algoritmos de criptografía modernos
- **Interfaz Moderna**: Diseño limpio y responsivo con Tailwind CSS
- **Gestión de Vault**: Sistema seguro para almacenar y organizar tus credenciales
- **Zero Knowledge**: Solo tú tienes acceso a tus contraseñas

### Fase 2 - Próximamente
- **WebAuthn Integration**: Autenticación biométrica y con hardware de seguridad
- **Autenticación sin Contraseña**: Soporte para huellas digitales, Face ID y llaves de seguridad
- **Multi-dispositivo**: Sincronización segura entre dispositivos

## 🛠️ Tecnología

- **Frontend**: Next.js 16.1.6 con React 19
- **Estilos**: Tailwind CSS v4
- **Estado**: Zustand para gestión de estado
- **Criptografía**: API Web Crypto nativa del navegador
- **Tipado**: TypeScript para mayor seguridad en el código

## 📁 Estructura del Proyecto

```
my-pass/
├── app/                 # Páginas y layouts de Next.js
├── components/          # Componentes React reutilizables
├── lib/
│   ├── crypto/         # Funciones de encriptación y desencriptación
│   └── vault/          # Gestión del bóveda de contraseñas
├── public/             # Archivos estáticos
└── storage/            # Almacenamiento local de datos
```

## 🚀 Empezar

### Prerrequisitos
- Node.js 18 o superior
- npm, yarn, pnpm o bun

### Instalación

1. Clona el repositorio:
```bash
git clone <repository-url>
cd my-pass
```

2. Instala las dependencias:
```bash
npm install
# o
yarn install
# o
pnpm install
```

3. Inicia el servidor de desarrollo:
```bash
npm run dev
# o
yarn dev
# o
pnpm dev
```

4. Abre [http://localhost:3000](http://localhost:3000) en tu navegador

## 🔐 Seguridad

My Pass está diseñado con la seguridad como prioridad:

- **Encriptación Local**: Todas las contraseñas se encriptan antes de guardarlas
- **Sin Servidores**: Los datos nunca salen de tu navegador
- **Código Abierto**: Puedes verificar cada línea de código
- **Web Crypto API**: Utiliza la criptografía nativa del navegador

## 📋 Scripts Disponibles

```bash
npm run dev      # Inicia servidor de desarrollo
npm run build    # Construye para producción
npm run start    # Inicia servidor de producción
npm run lint     # Ejecuta ESLint
```

## 🚀 Despliegue

La forma más fácil de desplegar es usar [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme).

Consulta la [documentación de despliegue de Next.js](https://nextjs.org/docs/app/building-your-application/deploying) para más detalles.

## 🤝 Contribuir

Las contribuciones son bienvenidas. Por favor:

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/amazing-feature`)
3. Commit tus cambios (`git commit -m 'Add some amazing feature'`)
4. Push a la rama (`git push origin feature/amazing-feature`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto está bajo licencia MIT - consulta el archivo [LICENSE](LICENSE) para más detalles.

## 🔮 Roadmap

- [x] Sistema básico de vault
- [x] Encriptación local
- [x] Interfaz de usuario moderna
- [ ] Integración WebAuthn
- [ ] Sincronización segura
- [ ] Generador de contraseñas
- [ ] Importación/Exportación
- [ ] Extensiones de navegador

---

**⚠️ Importante**: My Pass es un proyecto educativo y de código abierto. Siempre verifica la seguridad de tus herramientas de gestión de contraseñas y considera soluciones auditadas profesionalmente para uso crítico.
