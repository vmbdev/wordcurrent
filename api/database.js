import Knex from 'knex';
import { database } from "../wordcurrent.config.js";

const knex = Knex(database);
export default knex;