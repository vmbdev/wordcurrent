/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
 export default {

  development: {
    client: 'pg',
    connection: {
      host: '127.0.0.1',
      database: 'wordcurrent',
      user: 'wordcurrent',
      password: 'password',
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      directory: '../../db'
    }
  },

  staging: {
    client: 'pg',
    connection: {
      host: '127.0.0.1',
      database: 'wordcurrent',
      user: 'wordcurrent',
      password: 'password',
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      directory: '../../db'
    }
  },

  production: {
    client: 'pg',
    connection: {
      host: '127.0.0.1',
      database: 'wordcurrent',
      user: 'wordcurrent',
      password: 'password',
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      directory: '../../db'
    }
  }

};
