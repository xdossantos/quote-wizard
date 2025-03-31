"use client";

import React from "react";

/**
 * Props for the ErrorNotification component
 * @interface ErrorNotificationProps
 * @property {string} [iconSource] - Optional URL or path to the icon image
 * @property {string} [iconAlt] - Alt text for the icon for accessibility
 * @property {string} [title] - The title of the notification
 * @property {string} [message] - The message to display in the notification
 */
interface ErrorNotificationProps {
  iconSource?: string;
  iconAlt?: string;
  title?: string;
  message?: string;
}

/**
 * A reusable error notification component that displays an icon, title, and message
 */
const ErrorNotification: React.FC<ErrorNotificationProps> = ({
  iconSource = "http://localhost:3000/error.png",
  iconAlt = "Error icon",
  title = "Payment details expired",
  message = "The payment details for your transaction have expired.",
}) => {
  return (
    <section
      className="flex justify-center items-center p-5 mx-auto max-w-none min-h-screen bg-neutral-100 max-md:max-w-[991px] max-sm:p-4 max-sm:max-w-screen-sm"
      role="alert"
      aria-labelledby="notification-title"
    >
      <article className="flex flex-col items-center p-10 w-full bg-white rounded-xl max-w-[460px] shadow-[0_2px_4px_rgba(0,0,0,0.1)] max-md:p-8 max-md:max-w-[400px] max-sm:p-6 max-sm:max-w-full">
        <figure className="mb-5">
          <img
            src={iconSource}
            alt={iconAlt}
            className="w-12 h-12 rounded-3xl"
          />
        </figure>
        <h2
          id="notification-title"
          className="mb-5 text-xl font-semibold leading-7 text-center text-slate-900 max-sm:text-lg max-sm:leading-7"
        >
          {title}
        </h2>
        <p className="text-base leading-6 text-center text-gray-500 max-w-[336px] max-sm:text-sm max-sm:leading-6">
          {message}
        </p>
      </article>
    </section>
  );
};

export default ErrorNotification;
