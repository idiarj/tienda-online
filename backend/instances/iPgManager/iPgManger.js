import { PgHandler } from "../../sub-sistemas/DB/pgHandler.js"
import config from '../../config/db-config.json' assert {type: 'json'}
import querys from './querys.json' assert {type: 'json'}

export const pgFrameworks = new PgHandler({config, querys})