import React from 'react';

const About = () => {
  return (
    <div className="container mx-auto p-8 bg-white rounded-lg shadow-xl">
      <h1 className="text-4xl font-bold text-gray-800 mb-4">About MyNotebook</h1>
      <p className="text-lg text-gray-600 leading-relaxed">
        MyNotebook is a modern, cloud-based note-taking application designed to help you capture your thoughts, ideas, and tasks securely and efficiently.
      </p>
      <div className="mt-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-3">Technology Stack</h2>
        <p className="text-lg text-gray-600">This application is built using the MERN stack:</p>
        <ul className="list-disc list-inside mt-2 text-gray-600 space-y-1">
          <li><span className="font-semibold">MongoDB:</span> A NoSQL database for flexible, JSON-like document storage.</li>
          <li><span className="font-semibold">Express.js:</span> A minimal and flexible Node.js web application framework for the backend API.</li>
          <li><span className="font-semibold">React.js:</span> A JavaScript library for building user interfaces, powered by Vite for a fast development experience.</li>
          <li><span className="font-semibold">Node.js:</span> A JavaScript runtime for executing server-side code.</li>
        </ul>
      </div>
      <div className="mt-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-3">Styling</h2>
        <p className="text-lg text-gray-600">
          The user interface is crafted with <span className="font-semibold">Tailwind CSS</span>, a utility-first CSS framework that allows for rapid and responsive design.
        </p>
      </div>
    </div>
  );
};

export default About;