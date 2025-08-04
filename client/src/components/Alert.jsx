import React from 'react';

function Alert({ alert }) {
  const capitalize = (word) => {
    if (!word) return '';
    if (word === 'danger') word = 'error';
    const lower = word.toLowerCase();
    return lower.charAt(0).toUpperCase() + lower.slice(1);
  };

  if (!alert) {
    return <div style={{ height: '60px' }}></div>;
  }

  const alertTypeClasses = {
    success: 'bg-green-100 border-green-400 text-green-700',
    danger: 'bg-red-100 border-red-400 text-red-700',
  };

  return (
    <div style={{ height: '60px' }}>
      <div
        className={`border px-4 py-3 rounded-md relative my-2 ${alertTypeClasses[alert.type] || 'bg-gray-100 border-gray-400 text-gray-700'}`}
        role="alert"
      >
        <strong className="font-bold">{capitalize(alert.type)}!</strong>
        <span className="block sm:inline ml-2">{alert.msg}</span>
      </div>
    </div>
  );
}

export default Alert;