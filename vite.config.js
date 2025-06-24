import { defineConfig, loadEnv } from 'vite';

export default defineConfig(({ command, mode }) => {
  // Load env file based on `mode` in the current working directory.
  // Set the third parameter to '' to load all env regardless of the `VITE_` prefix.
  const env = loadEnv(mode, process.cwd(), '');
  
  return {
    root: 'src',
    envDir: '../', // This tells Vite where to look for .env files
    envPrefix: 'VITE_', // Only variables starting with VITE_ will be exposed
    build: {
      outDir: '../dist'
    },
    // Define environment variables for production
    define: {
      __DEV__: JSON.stringify(mode === 'development'),
      // Explicitly define environment variables for production
      'import.meta.env.NODE_ENV': JSON.stringify(env.NODE_ENV || mode),
      'import.meta.env.DEV': JSON.stringify(mode === 'development'),
      'import.meta.env.PROD': JSON.stringify(mode === 'production'),
      // Add your VITE_ prefixed variables
      ...Object.keys(env).reduce((prev, key) => {
        if (key.startsWith('VITE_')) {
          prev[`import.meta.env.${key}`] = JSON.stringify(env[key]);
        }
        return prev;
      }, {})
    }
  };
});