import * as Path from 'node:path'
import * as URL from 'node:url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const config = {
  development: {
    client: 'sqlite3',
    connection: {
      filename: join(__dirname, 'db', 'dev.sqlite3'),
    },
    useNullAsDefault: true,
    pool: {
      afterCreate: (conn, cb) => conn.run('PRAGMA foreign_keys = ON', cb),
    },
    migrations: {
      directory: join(__dirname, 'db', 'migrations'),
    },
    seeds: {
      directory: join(__dirname, 'db', 'seeds'),
    },
  },
  test: {
    client: 'sqlite3',
    connection: {
      filename: ':memory:',
    },
    useNullAsDefault: true,
    migrations: {
      directory: join(__dirname, 'db', 'migrations'),
    },
    seeds: {
      directory: join(__dirname, 'db', 'seeds'),
    },
  },
}

export default config
