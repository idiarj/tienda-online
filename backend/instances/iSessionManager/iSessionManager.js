import { SessionWrapper } from "../../sub-sistemas/session/SessionHandler.js";
import session_config from '../../config/session-config.json' assert {type: 'json'}
// console.log(session_config)
export const iSessionWrapper = new SessionWrapper(session_config)