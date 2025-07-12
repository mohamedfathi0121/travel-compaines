import React from 'react';

const Input = ({ name, label, register, error, ...rest }) => (
    <div className="w-full">
        <label 
            htmlFor={name} 
            className="block text-sm font-medium text-gray-700 mb-1"
        >
            {label}
        </label>
        <input
            id={name}
            {...register(name)}
            {...rest}
            className={`w-full px-4 py-3 bg-gray-100 border border-transparent rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white ${error ? 'border-red-500' : ''}`}
        />
        {error && <p className="text-red-500 text-xs mt-1">{error.message}</p>}
    </div>
);

export default Input;