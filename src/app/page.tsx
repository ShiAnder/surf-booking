"use client";
import Link from 'next/link';
import Image from 'next/image';
import { useEffect } from 'react';
import { useAOS } from '../hooks/useAOS';
import { FaUserGraduate, FaMapMarkedAlt, FaWater } from 'react-icons/fa';

const surfLessons = [
  {
    title: 'Beginner Surf Lesson',
    description:
      'Perfect for first-time surfers. Learn the basics of surfing, ocean safety, and proper technique in a safe, controlled environment.',
    time: '2 hours',
    price: 'From LKR 15,000 / $45 USD',
    isPopular: true,
    includes: ['Professional instructor', 'Surfboard', 'Rash guard', 'Basic theory'],
  },
  {
    title: 'Intermediate Surf Coaching',
    description:
      'Take your surfing to the next level with personalized coaching on wave selection, technique refinement, and advanced maneuvers.',
    time: '3 hours',
    price: 'From LKR 25,000 / $75 USD',
    isPopular: false,
    includes: ['Advanced coaching', 'Video analysis', 'Equipment included'],
  },
  {
    title: 'Private Surf Lesson',
    description:
      'One-on-one instruction tailored to your skill level and goals. Ideal for focused learning and faster progress.',
    time: '2 hours',
    price: 'From LKR 30,000 / $90 USD',
    isPopular: false,
    includes: ['Private instructor', 'Customized program', 'All equipment'],
  },
];

const features = [
  { icon: FaUserGraduate, title: 'Expert instructors', text: 'Learn from certified professionals with years of teaching experience.' },
  { icon: FaMapMarkedAlt, title: 'Great location', text: 'Beautiful beaches with ideal conditions for every skill level.' },
  { icon: FaWater, title: 'Quality equipment', text: 'Well-maintained boards and gear provided for every lesson.' },
];

export default function Home() {
  useAOS();

  useEffect(() => {
    // Elfsight widget (kept from the original page).
    const script = document.createElement('script');
    script.src = 'https://static.elfsight.com/platform/platform.js';
    script.async = true;
    document.body.appendChild(script);
    return () => {
      if (script.parentNode) script.parentNode.removeChild(script);
    };
  }, []);

  return (
    <div>
      {/* Hero */}
      <section className="relative isolate flex min-h-[calc(100vh-5rem)] items-center overflow-hidden">
        <Image src="/images/hero-surf.jpg" alt="Surfing waves" fill className="-z-10 object-cover" priority />
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-slate-900/50 via-slate-900/30 to-slate-900/60" />

        <div className="container-custom text-center" data-aos="fade-up">
          <p className="mb-4 text-xs font-medium uppercase tracking-[0.2em] text-sky-200">
            Surf lessons in Unawatuna
          </p>
          <h1 className="mx-auto mb-4 max-w-3xl text-4xl font-semibold text-white md:text-5xl">
            Experience the perfect wave
          </h1>
          <p className="mx-auto mb-8 max-w-xl text-base text-sky-50/90 md:text-lg">
            Professional surf lessons and unforgettable adventures for every level.
          </p>
          <Link href="/lessons" className="btn-primary !bg-white !text-sky-700 hover:!bg-sky-50 !px-7 !py-3">
            Book your lesson
          </Link>
        </div>
      </section>

      {/* Features */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <h2 className="section-title" data-aos="fade-up">Why choose us</h2>
          <p className="section-subtitle" data-aos="fade-up">
            Everything you need for a safe, enjoyable day on the water.
          </p>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {features.map(({ icon: Icon, title, text }, i) => (
              <div
                key={title}
                className="rounded-xl border border-sky-100 bg-white p-6"
                data-aos="fade-up"
                data-aos-delay={i * 100}
              >
                <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-sky-50 text-sky-600">
                  <Icon size={18} />
                </div>
                <h3 className="mb-2 font-semibold text-slate-900">{title}</h3>
                <p className="text-sm text-slate-500">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Lessons */}
      <section id="lessons" className="section-padding border-t border-sky-100 bg-sky-50/40">
        <div className="container-custom">
          <h2 className="section-title" data-aos="fade-up">Our surf lessons</h2>
          <p className="section-subtitle" data-aos="fade-up">
            Choose the session that matches your experience.
          </p>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {surfLessons.map((lesson, index) => (
              <div
                key={lesson.title}
                className="card flex flex-col p-6"
                data-aos="fade-up"
                data-aos-delay={index * 100}
              >
                {lesson.isPopular && (
                  <span className="mb-4 inline-flex w-fit rounded-full bg-sky-100 px-3 py-1 text-xs font-medium text-sky-700">
                    Most popular
                  </span>
                )}
                <h3 className="mb-2 text-lg font-semibold text-slate-900">{lesson.title}</h3>
                <p className="mb-5 text-sm text-slate-500">{lesson.description}</p>

                <dl className="mb-5 space-y-2 border-t border-sky-100 pt-4 text-sm">
                  <div className="flex justify-between">
                    <dt className="text-slate-500">Duration</dt>
                    <dd className="font-medium text-slate-800">{lesson.time}</dd>
                  </div>
                  <div className="flex justify-between gap-4">
                    <dt className="text-slate-500">Price</dt>
                    <dd className="text-right font-medium text-slate-800">{lesson.price}</dd>
                  </div>
                </dl>

                <ul className="mb-6 space-y-2 text-sm text-slate-600">
                  {lesson.includes.map((item) => (
                    <li key={item} className="flex items-center gap-2">
                      <span className="h-1.5 w-1.5 rounded-full bg-sky-400" />
                      {item}
                    </li>
                  ))}
                </ul>

                <Link href="/lessons" className="btn-secondary mt-auto w-full">
                  Book this lesson
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
