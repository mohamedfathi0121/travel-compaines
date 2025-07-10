
import React, { useState } from 'react';

export default function DatePickerCalendar({ selectedDate, onDateChange }) {
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const startOfMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 1);
  const endOfMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 0);
  const days = Array.from({ length: endOfMonth.getDate() }, (_, i) => i + 1);

  const handleDateClick = (day) => {
    const fullDate = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
    onDateChange(fullDate.toISOString().split('T')[0]);
  };

  const isSameDate = (day) => {
    const dateStr = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day).toISOString().split('T')[0];
    return selectedDate === dateStr;
  };

  return (
    <div className="border border-gray-200 rounded p-4 mt-2 w-fit bg-[var(--color-background)] text-[var(--color-text-primary)]">
      <div className="flex justify-between items-center mb-2">
        <button
          className="text-sm text-[var(--color-btn-primary)]"
          onClick={() =>
            setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1))
          }
        >
          &lt;
        </button>
        <span className="font-medium">
          {currentMonth.toLocaleString('default', { month: 'long' })} {currentMonth.getFullYear()}
        </span>
        <button
          className="text-sm text-button-primary"
          onClick={() =>
            setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1))
          }
        >
          &gt;
        </button>
      </div>

      <div className="grid grid-cols-7 gap-1 text-center text-xs text-[var(--color-text-secondary)] mb-1">
        {["S", "M", "T", "W", "T", "F", "S"].map((d, i) => (
          <div key={`${d}-${i}`}>{d}</div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-1 text-sm">
        {Array(startOfMonth.getDay()).fill('').map((_, i) => (
          <div key={'empty-' + i}></div>
        ))}
        {days.map((day) => {
          const isSelected = isSameDate(day);
          return (
            <div
              key={`day-${day}`}
              onClick={() => handleDateClick(day)}
              className={`cursor-pointer p-2 rounded-full transition ${
                isSelected
                  ? 'bg-[var(--color-button-primary)] text-white'
                  : 'hover:bg-[var(--color-input)] text-[var(--color-text-primary)]'
              }`}
            >
              {day}
            </div>
          );
        })}
      </div>
    </div>
  );
}
