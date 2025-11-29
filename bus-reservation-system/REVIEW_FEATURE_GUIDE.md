# User Review and Rating Feature

## Overview
A comprehensive review and rating system that allows users to rate their completed bus journeys with detailed feedback on multiple aspects of the service.

## Features

### 1. **Multi-Dimensional Ratings**
- **Overall Rating**: 1-5 stars (required)
- **Cleanliness Rating**: Rate the cleanliness of the bus
- **Punctuality Rating**: Rate the on-time performance
- **Staff Behavior Rating**: Rate the courtesy and professionalism of staff
- **Comfort Rating**: Rate the comfort level of seats and facilities

### 2. **Review Management**
- Users can only review completed bookings
- One review per booking (prevents duplicate reviews)
- Optional text comments (up to 500 characters)
- Edit and delete own reviews
- Mark reviews as helpful

### 3. **Verified Reviews**
- All reviews are automatically marked as "Verified Journey"
- Reviews are linked to actual bookings for authenticity

### 4. **Bus Rating System**
- Automatic calculation of average bus rating
- Real-time updates when reviews are added/updated/deleted
- Rating distribution display (5★, 4★, 3★, 2★, 1★)
- Detailed aspect-wise ratings display

### 5. **User Interface**
- **Review Modal**: Beautiful star-based rating interface
- **Reviews Display**: Comprehensive view with:
  - Overall rating statistics
  - Rating distribution chart
  - Individual review cards with detailed ratings
  - Helpful count for each review
  - Date of review submission

## Implementation

### Backend Components

#### Database Schema
```sql
reviews table:
- id (UUID, Primary Key)
- user_id (UUID, Foreign Key to users)
- bus_id (UUID, Foreign Key to buses)
- booking_id (UUID, Foreign Key to bookings, Unique)
- rating (Integer, 1-5, Required)
- comment (Text, Optional)
- cleanliness_rating (Integer, 1-5, Optional)
- punctuality_rating (Integer, 1-5, Optional)
- staff_behavior_rating (Integer, 1-5, Optional)
- comfort_rating (Integer, 1-5, Optional)
- is_verified (Boolean, Default: true)
- helpful_count (Integer, Default: 0)
- created_at (Timestamp)
- updated_at (Timestamp)
```

#### API Endpoints

**Public Endpoints:**
- `GET /api/reviews/bus/:busId` - Get all reviews for a bus
- `GET /api/reviews/stats/:busId` - Get rating statistics for a bus
- `PUT /api/reviews/:id/helpful` - Mark a review as helpful

**Protected Endpoints (Authentication Required):**
- `POST /api/reviews` - Create a new review
- `GET /api/reviews/my-reviews` - Get user's reviews
- `GET /api/reviews/booking/:bookingId` - Get review for a specific booking
- `PUT /api/reviews/:id` - Update own review
- `DELETE /api/reviews/:id` - Delete own review

#### Files Created/Modified

**Backend:**
- `backend/config/add-reviews-table.sql` - Database schema for reviews
- `backend/models/ReviewSupabase.js` - Review model with all CRUD operations
- `backend/controllers/reviewController.js` - Review business logic
- `backend/routes/reviewRoutes.js` - Review API routes
- `backend/server.js` - Added review routes
- `backend/setup-reviews.js` - Setup script for reviews table

**Frontend:**
- `frontend/src/components/ReviewModal.jsx` - Modal for submitting reviews
- `frontend/src/components/ReviewModal.css` - Styling for review modal
- `frontend/src/components/BusReviews.jsx` - Component to display bus reviews
- `frontend/src/components/BusReviews.css` - Styling for reviews display
- `frontend/src/pages/BusReviewsPage.jsx` - Dedicated page for viewing bus reviews
- `frontend/src/pages/MyBookings.jsx` - Updated to show "Rate Journey" button
- `frontend/src/pages/BusSearch.jsx` - Added "Reviews" button to bus cards
- `frontend/src/App.js` - Added route for bus reviews page

### Frontend Components

#### ReviewModal
- Interactive star rating interface
- Hover effects for stars
- Character counter for comments
- Form validation
- Success/error handling

#### BusReviews
- Rating statistics overview
- Rating distribution visualization
- Individual review cards
- Helpful button for each review
- Verified journey badges

## Setup Instructions

### 1. Database Setup
Run the SQL script in your Supabase SQL Editor:
```bash
cd backend
node setup-reviews.js
```
Copy the displayed SQL and run it in Supabase SQL Editor.

### 2. Install Dependencies
```bash
cd frontend
npm install react-icons
```

### 3. Backend Setup
The review routes are automatically included in `server.js`:
```javascript
app.use('/api/reviews', require('./routes/reviewRoutes'));
```

### 4. Frontend Setup
The review components are integrated into the existing pages:
- Review button appears in "My Bookings" for completed bookings
- "Reviews" button appears on bus cards in search results
- Dedicated reviews page accessible via `/bus-reviews/:busId`

## Usage

### For Users

#### Submitting a Review
1. Go to "My Bookings" page
2. Find a completed booking
3. Click "⭐ Rate Journey" button
4. Provide ratings (overall rating is required)
5. Optionally add detailed ratings and comments
6. Click "Submit Review"

#### Viewing Reviews
1. **From Search Page**: Click "📝 Reviews" button on any bus card
2. **From Reviews Page**: View all reviews and statistics for the bus
3. **Mark Helpful**: Click "Helpful" button on useful reviews

#### Managing Reviews
- Edit: Update your review from the reviews page (if implemented)
- Delete: Remove your review (if implemented)

### For System

#### Automatic Bus Rating Update
- When a review is added, the bus rating is automatically recalculated
- Average is computed from all reviews for that bus
- Rating is displayed as X.X stars (e.g., 4.2 stars)

#### Review Verification
- All reviews are automatically marked as "Verified Journey"
- Reviews are linked to actual bookings for authenticity
- One review per booking prevents spam

## Security Features

1. **Authentication Required**: Users must be logged in to submit reviews
2. **Authorization**: Users can only review their own bookings
3. **Validation**: 
   - Rating must be between 1 and 5
   - Only completed bookings can be reviewed
   - No duplicate reviews per booking
4. **Row Level Security**: Supabase RLS policies enforce access control

## Business Logic

### Review Eligibility
A booking can be reviewed only if:
- Booking exists and belongs to the user
- Booking status is "Completed"
- No review exists for that booking yet

### Rating Calculation
- Overall bus rating = Average of all review ratings
- Rounded to 1 decimal place
- Updated in real-time via database triggers

### Statistics Display
- Total number of reviews
- Average overall rating
- Average for each detailed aspect
- Rating distribution (how many 5★, 4★, etc.)

## Future Enhancements

1. **Admin Moderation**: Allow admins to moderate/remove inappropriate reviews
2. **Review Photos**: Allow users to upload photos with reviews
3. **Review Responses**: Allow bus operators to respond to reviews
4. **Review Sorting**: Sort by helpful count, date, rating
5. **Review Filtering**: Filter by rating, verified status
6. **Review Reporting**: Allow users to report inappropriate reviews
7. **Review Insights**: Analytics dashboard for operators
8. **Email Notifications**: Notify operators of new reviews
9. **Review Reminders**: Remind users to review after journey completion
10. **Gamification**: Badges for helpful reviewers

## Testing

### Manual Testing Steps

1. **Create a Completed Booking**:
   - Make a booking as a test user
   - Manually update booking status to "Completed" in database

2. **Submit a Review**:
   - Go to My Bookings
   - Click "Rate Journey" on completed booking
   - Fill in ratings and submit
   - Verify success message

3. **View Reviews**:
   - Go to bus search
   - Click "Reviews" on a bus
   - Verify reviews display correctly
   - Check statistics are calculated correctly

4. **Mark as Helpful**:
   - Click "Helpful" button on a review
   - Verify count increases

5. **Prevent Duplicates**:
   - Try to review same booking again
   - Verify error message about duplicate review

## Database Triggers

### update_bus_rating()
Automatically updates the bus rating whenever:
- A new review is inserted
- An existing review is updated
- A review is deleted

### update_updated_at_column()
Automatically updates the `updated_at` timestamp whenever a review is modified.

## API Response Examples

### Get Bus Reviews
```json
{
  "success": true,
  "count": 15,
  "data": [
    {
      "id": "...",
      "rating": 5,
      "comment": "Excellent service!",
      "cleanliness_rating": 5,
      "punctuality_rating": 4,
      "staff_behavior_rating": 5,
      "comfort_rating": 4,
      "is_verified": true,
      "helpful_count": 3,
      "created_at": "2025-11-29T...",
      "user": {
        "id": "...",
        "name": "John Doe"
      }
    }
  ]
}
```

### Get Rating Statistics
```json
{
  "success": true,
  "data": {
    "totalReviews": 15,
    "averageRating": 4.3,
    "averageCleanliness": 4.5,
    "averagePunctuality": 4.1,
    "averageStaffBehavior": 4.4,
    "averageComfort": 4.2,
    "ratingDistribution": {
      "5": 8,
      "4": 5,
      "3": 2,
      "2": 0,
      "1": 0
    }
  }
}
```

## Troubleshooting

### Reviews Not Showing
1. Verify reviews table exists in database
2. Check if SQL script was executed successfully
3. Verify RLS policies are enabled
4. Check browser console for errors

### Cannot Submit Review
1. Verify booking status is "Completed"
2. Check if review already exists for that booking
3. Verify authentication token is valid
4. Check backend logs for errors

### Bus Rating Not Updating
1. Verify database triggers are created
2. Check trigger logs in Supabase
3. Manually verify rating calculation

## Conclusion

The review and rating feature provides a robust system for collecting user feedback, building trust through verified reviews, and helping users make informed booking decisions. The multi-dimensional rating system gives comprehensive insights into service quality across different aspects.
