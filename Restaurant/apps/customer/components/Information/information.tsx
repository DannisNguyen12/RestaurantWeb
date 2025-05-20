// components/notification.tsx
import React from 'react';

const notification: React.FC = () => {
  return (
    <div className="bg-gray-100 p-6 rounded shadow-md">
      <h3 className="text-xl font-bold">Stay in touch</h3>
      <p className="mt-2">
        <span className="text-green-500">📧</span>{' '}
        <a href="mailto:login.nm187254@gmail.com" className="hover:underline">
          login.nm187254@gmail.com
        </a>
      </p>
      <h3 className="text-xl font-bold mt-4">Location</h3>
      <p className="mt-2">
        <span className="text-green-500">📍</span>{' '}
        <a href="https://www.google.com/maps/place/Hornsby ,+NSW+AU" className="hover:underline">
          Hornsby, NSW AU
        </a>
      </p>
      <h3 className="text-xl font-bold mt-4">Hours</h3>
      <table className="w-full mt-2">
        <tbody>
          <tr>
            <td className="py-1">Monday</td>
            <td className="py-1">9:00am – 10:00pm</td>
          </tr>
          <tr>
            <td className="py-1">Tuesday</td>
            <td className="py-1">9:00am – 10:00pm</td>
          </tr>
          <tr>
            <td className="py-1">Wednesday</td>
            <td className="py-1">9:00am – 10:00pm</td>
          </tr>
          <tr>
            <td className="py-1">Thursday</td>
            <td className="py-1">9:00am – 10:00pm</td>
          </tr>
          <tr>
            <td className="py-1">Friday</td>
            <td className="py-1">9:00am – 10:00pm</td>
          </tr>
          <tr>
            <td className="py-1">Saturday</td>
            <td className="py-1">9:00am – 6:00pm</td>
          </tr>
          <tr>
            <td className="py-1">Sunday</td>
            <td className="py-1">9:00am – 12:00pm</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default notification;