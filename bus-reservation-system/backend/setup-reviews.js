const { supabase } = require('./config/supabase');
const fs = require('fs');
const path = require('path');

async function setupReviewsTable() {
  try {
    console.log('Setting up reviews table...');
    
    // Read the SQL file
    const sqlFile = path.join(__dirname, 'config', 'add-reviews-table.sql');
    const sql = fs.readFileSync(sqlFile, 'utf8');
    
    console.log('SQL script loaded, executing...');
    console.log('\nPlease run this SQL in your Supabase SQL Editor:');
    console.log('='.repeat(80));
    console.log(sql);
    console.log('='.repeat(80));
    console.log('\nAfter running the SQL, the reviews table will be created.');
    console.log('The reviews feature will then be fully functional!');
    
  } catch (error) {
    console.error('Error:', error);
  }
}

setupReviewsTable();
