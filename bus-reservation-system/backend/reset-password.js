require('dotenv').config();
const { supabase } = require('./config/supabase');
const bcrypt = require('bcryptjs');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

async function resetPassword() {
  rl.question('Enter email address: ', async (email) => {
    rl.question('Enter new password: ', async (newPassword) => {
      
      console.log('\n🔄 Resetting password...\n');
      
      // Check if user exists
      const { data: user, error: findError } = await supabase
        .from('users')
        .select('*')
        .eq('email', email)
        .single();
      
      if (findError || !user) {
        console.log('❌ User not found with email:', email);
        rl.close();
        return;
      }
      
      console.log('✅ User found:', user.name);
      
      // Hash new password
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(newPassword, salt);
      
      // Update password
      const { error: updateError } = await supabase
        .from('users')
        .update({ password: hashedPassword })
        .eq('email', email);
      
      if (updateError) {
        console.log('❌ Error updating password:', updateError.message);
        rl.close();
        return;
      }
      
      console.log('\n✅ Password reset successfully!\n');
      console.log('📝 New login credentials:');
      console.log(`   Email: ${email}`);
      console.log(`   Password: ${newPassword}`);
      console.log('');
      
      rl.close();
    });
  });
}

resetPassword().catch(console.error);
