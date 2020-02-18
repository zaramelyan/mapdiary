const { Pool } = require('pg');

const pool = new Pool({
    connectionString: process.env.DATABASE_URL, 
  });


  async function createEntry(mapEntry) {

    const sql = `
    INSERT INTO entries (
      entry_id, 
      location, 
      entry
      )  
    VALUES
      ($1, $2, $3)
    RETURNING *;`
    const { id, location, entry } = mapEntry;
    let newEntry = await pool.query(sql, [id, location, entry]);
    
    return newEntry;
  }


  module.exports = createEntry;