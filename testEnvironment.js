const getEnvAppVars = (parsed = {}) =>
  Object.keys(parsed)
    .filter((key) => key.startsWith('APP_'))
    .reduce((env, key) => {
      env[key] = parsed[key]
      return env
    }, {})

const loadDotEnv = () => {
  return require('dotenv').config()
}

const getEnvironmentVariables = (label, obj) => {
  console.log('\x1b[36m%s\x1b[0m', '  ' + label)
  for (const [key, value] of Object.entries(getEnvAppVars(obj))) {
    console.log('\x1b[33m%s\x1b[0m', '    ' + `${key}: ${value}`)
  }
}

console.log('\x1b[36m%s\x1b[0m', '* Testing Environment Variables')

getEnvironmentVariables('* Only process.env', process.env)
const dotEnvConfig = loadDotEnv()
getEnvironmentVariables('* process.env After dotEnv load', process.env)
getEnvironmentVariables('* dotEnv.parsed', dotEnvConfig.parsed)

getEnvironmentVariables('* combined process.env Prio', { ...process.env, ...dotEnvConfig.parsed })
getEnvironmentVariables('* combined dotEnv.parsed Prio', { ...dotEnvConfig.parsed, ...process.env })
