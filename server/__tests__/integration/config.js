require('dotenv').config();
const fs = require('fs');
const db = require('../../database/connect');

const resetSQL = fs.readFileSync(__dirname + '/reset.sql').toString();

const resetTestDB = async () => {
    try {
        await db.query(resetSQL);
        console.log('Test DB reset successfully');
    } catch (err) {
        console.error('Could not reset TestDB:', err);
        throw err;
    }
};

module.exports = { resetTestDB };

describe('config', () => {
    it('loads correctly', () => {
        expect(resetTestDB).toBeDefined();
    });
});
