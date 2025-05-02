# React Vite Project

This is a React application bootstrapped with Vite, a fast frontend build tool. The project uses React 18 and React Router DOM for routing.

## Prerequisites

- Node.js (version 14 or higher recommended)
- npm (comes with Node.js)

## Getting Started

1. Clone the repository or download the source code.

2. Install dependencies:

```bash
npm install
```

3. Start the development server:

```bash
npm run dev
```

This will start the Vite development server and open the app in your default browser. The app supports hot module replacement for fast development.

## Building for Production

To build the app for production, run:

```bash
npm run build
```

The production-ready files will be generated in the `dist` folder.

To preview the production build locally, run:

```bash
npm run preview
```

## Project Structure

- `index.html` - The main HTML file that loads the React app.
- `src/` - Contains React components and application code.
  - `main.jsx` - Entry point of the React app.
  - `App.jsx` - Root React component.
  - `index.css` - Global styles.
  - `component/` - Folder containing React components.
  - `assets/` - Static assets like images.
- `public/` - Public static files served as-is.
- `vite.config.js` - Vite configuration file.
- `package.json` - Project metadata and dependencies.

## Dependencies

- React 18
- React DOM
- React Router DOM
- Vite (build tool)

## Linting

This project uses ESLint with React and hooks plugins. To run linting, use:

```bash
npm run lint
```

## License


