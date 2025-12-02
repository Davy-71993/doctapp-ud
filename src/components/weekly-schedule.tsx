
"use client";

import { useState, useRef, MouseEvent } from 'react';
import { format, startOfWeek, addDays, eachDayOfInterval, getHours, getMinutes, setHours, setMinutes, isSameDay } from 'date-fns';
import { cn } from '@/lib/utils';
import type { TimeBlock } from '@/lib/types';

const timeSlots = Array.from({ length: 24 * 2 }, (_, i) => {
  const totalMinutes = i * 30;
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;
  return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`;
});

const getRowIndex = (date: Date) => {
    return getHours(date) * 2 + Math.floor(getMinutes(date) / 30);
}

interface WeeklyScheduleProps {
  events: TimeBlock[];
  onCreateBlock: (block: { start: Date; end: Date }) => void;
}

export function WeeklySchedule({ events, onCreateBlock }: WeeklyScheduleProps) {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selecting, setSelecting] = useState(false);
  const [selection, setSelection] = useState<{ start: Date; end: Date, dayIndex: number } | null>(null);
  const gridRef = useRef<HTMLDivElement>(null);


  const start = startOfWeek(currentDate, { weekStartsOn: 1 });
  const weekDays = eachDayOfInterval({ start, end: addDays(start, 6) });
  
  const getEventStyle = (event: TimeBlock) => {
    const startRow = getRowIndex(event.start);
    const endRow = getRowIndex(event.end);
    const dayIndex = weekDays.findIndex(day => isSameDay(day, event.start));

    if (dayIndex === -1) return {};

    return {
      gridColumnStart: dayIndex + 2,
      gridRowStart: startRow + 1,
      gridRowEnd: endRow + 1,
    };
  };

  const getCoordinates = (e: MouseEvent<HTMLDivElement>): { y: number, x: number } | null => {
      if (!gridRef.current) return null;
      const rect = gridRef.current.getBoundingClientRect();
      return { y: e.clientY - rect.top, x: e.clientX - rect.left };
  }

  const handleMouseDown = (e: MouseEvent<HTMLDivElement>) => {
    const coords = getCoordinates(e);
    if (!coords) return;
    
    const dayWidth = gridRef.current!.clientWidth / 7;
    const dayIndex = Math.floor(coords.x / dayWidth);

    const hourHeight = gridRef.current!.clientHeight / (24 * 2);
    const rowIndex = Math.floor(coords.y / hourHeight);
    
    const hour = Math.floor(rowIndex / 2);
    const minute = (rowIndex % 2) * 30;

    const day = weekDays[dayIndex];
    const startDate = setMinutes(setHours(day, hour), minute);

    setSelecting(true);
    setSelection({ start: startDate, end: new Date(startDate.getTime() + 30 * 60 * 1000), dayIndex });
  };

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!selecting || !selection || !gridRef.current) return;
    
    const coords = getCoordinates(e);
    if (!coords) return;

    const hourHeight = gridRef.current!.clientHeight / (24 * 2);
    const rowIndex = Math.floor(coords.y / hourHeight);

    const hour = Math.floor(rowIndex / 2);
    const minute = (rowIndex % 2) * 30;

    const day = weekDays[selection.dayIndex];
    let endDate = setMinutes(setHours(day, hour), minute);
    
    if (endDate < selection.start) {
      // Don't allow dragging upwards past the start time
      endDate = selection.start;
    }
    
    // Snap to the end of the 30min slot
    endDate = new Date(endDate.getTime() + 30 * 60 * 1000);
    
    setSelection({ ...selection, end: endDate });
  };

  const handleMouseUp = () => {
    if (selecting && selection) {
      if (selection.end > selection.start) {
          onCreateBlock({ start: selection.start, end: selection.end });
      }
    }
    setSelecting(false);
    setSelection(null);
  };

  return (
    <div className="relative" onMouseUp={handleMouseUp} onMouseLeave={handleMouseUp}>
      <div className="grid grid-cols-[auto_repeat(7,1fr)] grid-rows-[auto_repeat(48,1fr)] text-xs h-[70vh] bg-background">
        {/* Time column */}
        <div className="col-start-1 row-start-1 sticky top-0 bg-background z-10 pr-2"></div>
        {timeSlots.map((time, index) => (
          index % 2 === 0 && (
             <div key={time} className="row-start-[-1] flex items-center justify-end pr-2 -translate-y-1/2" style={{ gridRow: index + 1 }}>
                <span className="text-muted-foreground">{time}</span>
             </div>
          )
        ))}

        {/* Day headers and grid columns */}
        {weekDays.map((day, dayIndex) => (
          <div key={day.toString()} className="col-start-[-1] row-start-1 flex flex-col items-center border-l sticky top-0 bg-background z-10 py-2" style={{ gridColumn: dayIndex + 2 }}>
            <span className="font-semibold">{format(day, 'EEE')}</span>
            <span className={cn("text-lg", isSameDay(day, new Date()) && "text-primary font-bold")}>{format(day, 'd')}</span>
          </div>
        ))}
        
        {/* Grid lines */}
        {Array.from({length: 48 * 7}).map((_, i) => (
            <div key={i} className={cn(
                "border-t", 
                i % 2 !== 0 && "border-dashed",
                i % 7 !== 0 && "border-l"
            )}></div>
        ))}

        {/* Interaction Layer */}
        <div 
            className="absolute top-0 left-[3rem] right-0 bottom-0 z-20 cursor-crosshair"
            ref={gridRef}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
        />

        {/* Events */}
        {events.map((event) => (
          <div key={event.id} 
               className={cn("absolute m-1 p-2 rounded-lg text-white text-xs overflow-hidden z-30", {
                   'bg-blue-500': event.type === 'appointment',
                   'bg-gray-400': event.type === 'unavailable'
               })} 
               style={getEventStyle(event)}>
            <p className="font-semibold">{event.title}</p>
          </div>
        ))}
        
        {/* Selection overlay */}
        {selection && (
             <div className="absolute m-1 p-2 rounded-lg bg-primary/30 pointer-events-none z-30" style={getEventStyle(selection as TimeBlock)}>
             </div>
        )}
      </div>
    </div>
  );
}
