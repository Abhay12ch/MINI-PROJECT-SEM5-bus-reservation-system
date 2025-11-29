const { supabase } = require('./config/supabase');

async function markBookingAsCompleted() {
  try {
    console.log('Fetching bookings...\n');
    
    // Get all bookings
    const { data: bookings, error } = await supabase
      .from('bookings')
      .select(`
        *,
        user:users(name, email),
        bus:buses(bus_name, from_location, to_location)
      `)
      .order('booking_date', { ascending: false })
      .limit(10);

    if (error) {
      console.error('Error fetching bookings:', error.message);
      return;
    }

    if (!bookings || bookings.length === 0) {
      console.log('No bookings found. Please make a booking first.');
      return;
    }

    console.log('Recent bookings:');
    console.log('================\n');
    
    bookings.forEach((booking, index) => {
      console.log(`${index + 1}. Booking ID: ${booking.id}`);
      console.log(`   User: ${booking.user?.name} (${booking.user?.email})`);
      console.log(`   Bus: ${booking.bus?.bus_name}`);
      console.log(`   Route: ${booking.bus?.from_location} → ${booking.bus?.to_location}`);
      console.log(`   Journey Date: ${booking.journey_date}`);
      console.log(`   Status: ${booking.booking_status}`);
      console.log('');
    });

    // Mark first confirmed booking as completed
    const confirmedBooking = bookings.find(b => b.booking_status === 'Confirmed');
    
    if (!confirmedBooking) {
      console.log('No confirmed bookings to mark as completed.');
      console.log('All bookings are already completed or cancelled.');
      return;
    }

    console.log(`Marking booking ${confirmedBooking.id} as completed...`);
    
    const { data: updated, error: updateError } = await supabase
      .from('bookings')
      .update({ booking_status: 'Completed' })
      .eq('id', confirmedBooking.id)
      .select()
      .single();

    if (updateError) {
      console.error('Error updating booking:', updateError.message);
      return;
    }

    console.log('\n✓ Success! Booking marked as completed.');
    console.log('\nDetails:');
    console.log(`  Booking ID: ${updated.id}`);
    console.log(`  Status: ${updated.booking_status}`);
    console.log(`  User can now review this booking!`);
    console.log('\nTo test reviews:');
    console.log('1. Login as the user who made this booking');
    console.log('2. Go to "My Bookings" page');
    console.log('3. Click "⭐ Rate Journey" button');
    console.log('4. Submit your review');

  } catch (error) {
    console.error('Error:', error.message);
  }
}

markBookingAsCompleted();
