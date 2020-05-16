const {Pool} = require('pg');

const pool = new Pool({
    host: 'ec2-35-171-31-33.compute-1.amazonaws.com',
    port: 5432,
    user: 'titkbsntfhqobg',
    password: 'bed21019f446d9b60c38a29ea94158ba947e9f44aec584c798e6db44f9542f93',
    database: 'd2l28i1bfgbi0v',
    max: 20,
    connectionTimeoutMillis: 0,
    idleTimeoutMillis: 0,
    ssl: { rejectUnauthorized: false }
});

module.exports = pool;