import Knex from 'knex';
import knexConfig from "../knexfile.js";

const env = process.env.NODE_ENV || 'development';
const knex = Knex(knexConfig[env]);
export default knex;