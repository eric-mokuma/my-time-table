import * as Path from 'node:path'
import * as URL from 'node:url'

const __filename = URL.fileURLToPath(import.meta.url)
const __dirname = Path.dirname(__filename)

const baseConfig = {
  client: 'sqlite3',
  useNullAsDefault: true,
  migrations: {
    directory: Path.join(__dirname, 'migrations'),
  },
  seeds: {
    directory: Path.join(__dirname, 'seeds'),
  },
  pool: {
    afterCreate: (conn, cb) => conn.run('PRAGMA foreign_keys = ON', cb),
  },
}

export default {
  development: {
    ...baseConfig,
    connection: {
      filename: Path.join(__dirname, 'dev.sqlite3'),
    },
  },

  test: {
    ...baseConfig,
    connection: {
      filename: ':memory:',
    },
  },

  production: {
    ...baseConfig,
    connection: {
      filename: '/app/storage/prod.sqlite3',
    },
  },
}
