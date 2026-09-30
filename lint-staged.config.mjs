const config = {
  '*.{js,jsx,ts,tsx,mjs}': ['eslint --fix', 'prettier --write'],
  '*.{css,md,json}': 'prettier --write',
}

export default config
