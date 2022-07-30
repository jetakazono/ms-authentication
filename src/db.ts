import { Pool } from "pg";

const connectionString = 'YOURCONEECTIONSTRINGHERE';

const db = new Pool({ connectionString });

export default db;

