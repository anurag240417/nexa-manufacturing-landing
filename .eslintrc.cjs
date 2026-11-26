module.exports = {
  root: true,
  env: { browser: true, es2021: true },
  extends: ['airbnb', 'airbnb/hooks'],
  parserOptions: { ecmaVersion: 'latest', sourceType: 'module', ecmaFeatures: { jsx: true } },
  settings: { react: { version: '18.3' } },
  rules: {
    // React 17+ JSX transform: React import not required
    'react/react-in-jsx-scope': 'off',
    'react/jsx-uses-react': 'off',
    // React 18.3 deprecates defaultProps on function components; use default arguments
    'react/require-default-props': ['error', { functions: 'defaultArguments' }],
    // FormField passes a11y props to native controls via a render function
    'react/jsx-props-no-spreading': ['error', { html: 'ignore' }],
  },
  ignorePatterns: ['dist', 'node_modules'],
};
