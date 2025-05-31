// Define types for better type safety
interface Booking {
  date: Date;
  time: string;
}

/**
 * Format a date object to a localized string
 * @param {Date | string | number} date - The date to format
 * @returns {string} - Formatted date string
 */
export function formatDate(date: Date | string | number): string {
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
export function formatCurrency(amount: number, currency: string = 'USD'): string {
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
export function generateTimeSlots(
  startHour: number = 9, 
  endHour: number = 17, 
  intervalMinutes: number = 120
): string[] {
  const slots: string[] = [];
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
export function isTimeSlotAvailable(
  date: string, 
  time: string, 
  existingBookings: Booking[]
): boolean {
  return !existingBookings.some(
    booking =>
      booking.date.toISOString().split('T')[0] === date &&
      booking.time === time
  );
}