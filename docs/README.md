# Delivery

Сервис расчёта и отслеживания доставки посылок.

## Tech Stack

### Core

- React 19
- TypeScript
- Vite

### State Management

- Wouter

### HTTP Client

- Ky

### Internationalization:

- i18next

### UI

- Tailwind CSS
- shadcn/ui
- Radix UI

### Quality

- ESLint
- Stylelint
- Prettier

### Testing

- Vitest
- Storybook

### CI/CD

- GitHub Actions
- Nginx
- Let's Encrypt SSL

---

### Development

https://dev.delivery.andreimushavets.tech

### Production

https://delivery.andreimushavets.tech

---

## Git Flow

The project uses the following branching strategy:

```text
feature/*
    ↓
dev
    ↓
main
```

### Development Process

1. Create feature branch from `dev`
2. Implement changes
3. Open Pull Request into `dev`
4. CI checks must pass
5. Merge into `dev`
6. Open Pull Request from `dev` into `main`
7. Automatic deployment to production

---

## Available Scripts

Install dependencies:

```bash
npm install
```

Run development server:

```bash
npm run dev
```

Run linting:

```bash
npm run lint
```

```bash
npm run format
```

Run formatting check:

```bash
npm run format:check
```

Run tests:

```bash
npm run test
```

Start Storybook:

```bash
npm run storybook
```

Build Storybook:

```bash
npm run build-storybook
```

Create production build:

```bash
npm run build
```

Preview production build:

```bash
npm run preview
```

---

## Deployment

### DEV

Every push to the `dev` branch triggers:

- Build application
- Deploy to DEV environment

### PROD

Every push to the `main` branch triggers:

- Build application
- Deploy to Production environment

Deployment is performed automatically using GitHub Actions.

---

## Planned Features

- Delivery cost calculation
- Package size selection
- Shipping method selection
- Multi-step order form
- Parcel tracking
- User profile
- Multi-language support

---

## Author

Andrei Mushovets

Junior Frontend Developer
