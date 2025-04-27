'use client';

import { useSession } from 'next-auth/react';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { FaCalendarAlt, FaClock, FaDollarSign, FaBookOpen, FaWhatsapp } from 'react-icons/fa'; // Added FaWhatsapp

export default function LessonCard({ lesson }) {
  const { data: session } = useSession();
  const [bookingDate, setBookingDate] = useState('');
  const [bookingTime, setBookingTime] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [bookedSlots, setBookedSlots] = useState({});
  const [isLoadingSlots, setIsLoadingSlots] = useState(false);
  const router = useRouter();

  // Fetch already booked slots
  useEffect(() => {
    const fetchBookedSlots = async () => {
      setIsLoadingSlots(true);
      try {
        const response = await fetch(`/api/bookings/booked-slots?lessonId=${lesson.id}`);
        if (!response.ok) throw new Error('Failed to fetch booked slots');
        const data = await response.json();
        setBookedSlots(data.bookedSlots || {});
      } catch (error) {
        console.error('Error fetching booked slots:', error);
      } finally {
        setIsLoadingSlots(false);
      }
    };

    fetchBookedSlots();
  }, [lesson.id]);

  const handleBookNow = async () => {
    if (!session) {
      router.push('/api/auth/signin');
      return;
    }
    if (!bookingDate || !bookingTime) {
      alert('Please select both date and time for your lesson');
      return;
    }
    if (isSlotBooked(bookingDate, bookingTime)) {
      alert('This slot has just been booked. Please select another time.');
      return;
    }
    setIsLoading(true);
    try {
      const response = await fetch('/api/checkout/session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ lessonId: lesson.id, date: bookingDate, time: bookingTime }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data?.error || 'Failed to create checkout session');
      window.location.href = data.sessionUrl;
    } catch (error) {
      alert(`Error: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  const isSlotBooked = (date, time) => {
    return bookedSlots[date]?.includes(time);
  };

  const handleDateChange = (e) => {
    setBookingDate(e.target.value);
    setBookingTime('');
  };

  const allTimes = ['09:00 AM', '10:00 AM', '11:00 AM', '01:00 PM', '02:00 PM', '03:00 PM', '04:00 PM'];

  const getTimesForSelectedDate = () => {
    if (!bookingDate) return { available: [], booked: [] };
    const bookedTimesForDate = bookedSlots[bookingDate] || [];
    const availableTimes = allTimes.filter(time => !bookedTimesForDate.includes(time));
    return { available: availableTimes, booked: bookedTimesForDate };
  };

  const times = getTimesForSelectedDate();
  const hasAvailableTimes = times.available.length > 0;
  const today = new Date().toISOString().split('T')[0];

  // WhatsApp Contact Number
  const whatsappNumber = "+94766690504"; // ✅ Change to your WhatsApp number without + or spaces
  const whatsappMessage = encodeURIComponent(`Hello, I have a question about the "${lesson.title}" lesson.`);
  const whatsappLink = `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`;

  return (
    <div className="bg-white border border-gray-200 rounded-2xl shadow-md hover:shadow-lg transition-shadow duration-300 p-6 w-[700px] mt-[20px] max-w-full sm:max-w-md md:max-w-lg lg:max-w-2xl mx-auto">
      <div className="flex flex-col md:flex-row gap-6">
        {/* Left Column */}
        <div className="w-full md:w-1/2 flex flex-col">
          <div className="flex items-center justify-center mb-4">
            <h3 className="text-xl sm:text-2xl font-semibold text-blue-700 flex items-center gap-2">
              <FaBookOpen className="text-blue-500" />
              {lesson.title}
            </h3>
          </div>
          
          <div className="bg-gray-50 border-gray-100 rounded-xl p-4 mb-4 text-center">
            <p className="text-gray-600 text-sm">{lesson.description}</p>
          </div>
          
          <div className="flex items-center justify-center gap-3 text-green-700 text-3xl font-extrabold mt-auto bg-green-100 px-6 py-4 rounded-3xl shadow-lg">
            <FaDollarSign className="text-4xl" />
            {lesson.price}
          </div>


  <a
    href={whatsappLink}
    target="_blank"
    rel="noopener noreferrer"
    className="mt-6 inline-flex items-center justify-center gap-3 bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:from-green-500 hover:via-green-600 hover:to-green-700 text-white font-bold py-3 px-6 rounded-full shadow-lg transform hover:scale-105 transition-all duration-300 no-underline"
    style={{ textDecoration: 'none' }}
  >
    <FaWhatsapp className="text-3xl" />
    Chat on WhatsApp
  </a>
        </div>

        {/* Right Column */}
        <div className="w-full md:w-1/2 flex flex-col mt-4 md:mt-[60px] mb-[30px]">
          {isLoadingSlots ? (
            <div className="text-center text-gray-500">
              Loading available slots...
            </div>
          ) : (
            <>
              <div className="mb-4 w-[200px] items-center justify-center mx-auto">
                <label className="text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                  <FaCalendarAlt className="text-blue-500" />
                  Select Date
                </label>
                <input
                  type="date"
                  min={today}
                  value={bookingDate}
                  onChange={handleDateChange}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>

              <div className="mb-4 w-[200px] items-center justify-center mx-auto">
                <label className="text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                  <FaClock className="text-blue-500" />
                  Select Time
                </label>
                {bookingDate && (
                  <>
                    {hasAvailableTimes ? (
                      <select
                        value={bookingTime}
                        onChange={(e) => setBookingTime(e.target.value)}
                        className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                      >
                        <option value="">Select time</option>
                        {allTimes.map((time) => {
                          const isBooked = times.booked.includes(time);
                          const isToday = bookingDate === today;
                          const isTooLateToday = isToday && (() => {
                            const now = new Date();
                            const [timeStr, modifier] = time.split(" ");
                            let [hours, minutes] = timeStr.split(":").map(Number);
                            if (modifier === "PM" && hours !== 12) hours += 12;
                            if (modifier === "AM" && hours === 12) hours = 0;
                            const timeDate = new Date();
                            timeDate.setHours(hours, minutes, 0, 0);
                            return now > new Date(timeDate.getTime() - 15 * 60 * 1000);
                          })();
                          const disabled = isBooked || isTooLateToday;
                          return (
                            <option
                              key={time}
                              value={time}
                              disabled={disabled}
                            >
                              {time} {isBooked ? '(Booked)' : isTooLateToday ? '(Too late)' : ''}
                            </option>
                          );
                        })}
                      </select>
                    ) : (
                      <div className="p-3 bg-red-50 text-red-600 border border-red-200 rounded-lg text-center">
                        No available times for this date. All slots are already booked.
                      </div>
                    )}
                  </>
                )}
                {!bookingDate && (
                  <select
                    disabled={true}
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 text-gray-500"
                  >
                    <option value="">Please select a date first</option>
                  </select>
                )}
              </div>
            </>
          )}

          <div className="mb-4 w-[200px] items-center justify-center mx-auto">
            <button
              onClick={handleBookNow}
              disabled={isLoading || isLoadingSlots || !bookingDate || !bookingTime || !hasAvailableTimes}
              className="mt-4 w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2.5 px-6 rounded-lg transition duration-200 disabled:bg-blue-300"
            >
              {isLoading ? 'Processing...' : 'Book Now'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}


export function LessonGrid({ lessons }) {
  const groupedLessons = lessons.reduce((acc, lesson) => {
    const category = lesson.category || '';
    if (!acc[category]) acc[category] = [];
    acc[category].push(lesson);
    return acc;
  }, {});

  return (
    <div className="grid grid-cols-1 gap-x-8 gap-y-12 items-stretch justify-items-center pt-8 mt-6">
      {Object.keys(groupedLessons).map((category) => (
        <div key={category} className="w-full">
          <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">{category}</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8 items-stretch justify-items-center">
            {groupedLessons[category].map((lesson) => (
              <LessonCard key={lesson.id} lesson={lesson} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}