const {Client} = require('pg');
const logger = require('../startup/logging');

const client = new Client({
    user: 'titkbsntfhqobg',
    password: 'bed21019f446d9b60c38a29ea94158ba947e9f44aec584c798e6db44f9542f93',
    host: 'ec2-35-171-31-33.compute-1.amazonaws.com',
    port: 5432,
    database: 'd2l28i1bfgbi0v',
    ssl: { rejectUnauthorized: false }
})

module.exports = async () => {
    try {
        await client.connect();
        logger.info('connected to PG');
    } catch (ex) { 
        logger.error('error connection to PostgreSql: ' + ex);
    }
};