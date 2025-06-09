if (process.env.NODE_ENV !== 'production') {
  const { execSync } = require('child_process')
  execSync('npx husky install', { stdio: 'inherit' })
}
