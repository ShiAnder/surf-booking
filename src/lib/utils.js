/**
 * Format a date object to a localized string
 * @param {Date} date - The date to format
 * @returns {string} - Formatted date string
 */
export function formatDate(date) {
  return new Date(date).toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

/**
 * Format currency amount
 * @param {number} amount - The amount to format
 * @param {string} currency - Currency code (default: USD)
 * @returns {string} - Formatted currency string
 */
export function formatCurrency(amount, currency = 'USD') {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
  }).format(amount);
}

/**
 * Generate time slots for bookings
 * @param {number} startHour - Starting hour (24h format)
 * @param {number} endHour - Ending hour (24h format)
 * @param {number} intervalMinutes - Interval between slots in minutes
 * @returns {Array} - Array of time slot strings
 */
export function generateTimeSlots(startHour = 9, endHour = 17, intervalMinutes = 120) {
  const slots = [];
  const startMinutes = startHour * 60;
  const endMinutes = endHour * 60;
  
  for (let minutes = startMinutes; minutes < endMinutes; minutes += intervalMinutes) {
    const hour = Math.floor(minutes / 60) % 24;
    const minute = minutes % 60;
    
    const period = hour >= 12 ? 'PM' : 'AM';
    const displayHour = hour % 12 || 12;
    const displayMinute = minute.toString().padStart(2, '0');
    
    slots.push(`${displayHour}:${displayMinute} ${period}`);
  }
  
  return slots;
}

/**
 * Check if a booking time slot is available
 * @param {string} date - The date to check
 * @param {string} time - The time slot to check
 * @param {Array} existingBookings - Array of existing bookings
 * @returns {boolean} - True if the slot is available
 */
export function isTimeSlotAvailable(date, time, existingBookings) {
  return !existingBookings.some(
    booking => 
      booking.date.toISOString().split('T')[0] === date && 
      booking.time === time
  );
}