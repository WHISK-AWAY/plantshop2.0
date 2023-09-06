const config = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
};

if (
  process.env.NODE_ENV === 'staging' ||
  process.env.NODE_ENV === 'production'
) {
  config.plugins.cssnano = {};
}

export default config;
