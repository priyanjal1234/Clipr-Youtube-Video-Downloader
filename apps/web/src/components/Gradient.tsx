import React from 'react';

const Gradient: React.FC = () => {
  return (
    <>
      <div className="fixed inset-0 -z-10 bg-[#0F172A]" />
      <div className="fixed -top-40 right-0 -z-10 h-[500px] w-[500px] rounded-full bg-purple-600 opacity-20 blur-3xl" />
      <div className="fixed bottom-0 left-20 -z-10 h-[400px] w-[400px] rounded-full bg-blue-600 opacity-20 blur-3xl" />
      <div className="fixed top-60 left-1/3 -z-10 h-[300px] w-[300px] rounded-full bg-teal-500 opacity-10 blur-3xl" />
    </>
  );
};

export default Gradient;