
'use client';

import 'temporal-polyfill/global';
import { createCalendar, viewDay, viewMonthGrid, viewWeek } from '@schedule-x/calendar';
import '@schedule-x/theme-default/dist/index.css';
import { useEffect, useRef } from 'react';
import type { CalendarApp } from '@schedule-x/calendar';
import type { TimeBlock } from '@/lib/types';
import { EventImpl } from '@schedule-x/shared/src/classes/event.impl';

interface ScheduleXCalendarProps {
    events: TimeBlock[];
    onCreateBlock: (block: { start: Date; end: Date }) => void;
}

export function ScheduleXCalendar({ events, onCreateBlock }: ScheduleXCalendarProps) {
    const calendarRef = useRef<HTMLElement | null>(null);
    const calendarApp = useRef<CalendarApp | null>(null);

    useEffect(() => {
        if (calendarRef.current && !calendarApp.current) {
            const transformedEvents = events.map(e => ({
                id: e.id,
                title: e.title,
                start: e.start.toISOString(),
                end: e.end.toISOString(),
                // Add styling based on type
                ...(e.type === 'appointment' && {
                    style: {
                        color: 'white',
                        backgroundColor: '#3b82f6', // blue-500
                    },
                }),
                ...(e.type === 'unavailable' && {
                     style: {
                        color: 'white',
                        backgroundColor: '#a1a1aa', // gray-400
                    },
                })
            }));

            const now = new Date();
            const currentTime = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;

            calendarApp.current = createCalendar({
                views: [viewWeek, viewDay, viewMonthGrid],
                firstDayOfWeek: 1, // Monday
                events: transformedEvents,
                dayBoundaries: {
                    start: '00:00',
                    end: '24:00',
                },
                scrollToTime: currentTime,
                callbacks: {
                    onEventUpdate: (updatedEvent) => {
                        console.log('Event updated', updatedEvent);
                    },
                    onClickDate: (date) => {
                        if(calendarApp.current) {
                            calendarApp.current.date.value = date;
                            calendarApp.current.view.value = 'day';
                        }
                    },
                    onRangeUpdate: (range) => {
                         console.log('Range updated', range);
                    },
                    onEventDragEnd: (event: EventImpl) => {
                         onCreateBlock({
                             start: new Date(event.start),
                             end: new Date(event.end)
                         })
                    }
                }
            });

            calendarApp.current.render(calendarRef.current);
        } else if (calendarApp.current) {
            // Update events if they change
            const transformedEvents = events.map(e => ({
                id: e.id,
                title: e.title,
                start: e.start.toISOString(),
                end: e.end.toISOString(),
                 ...(e.type === 'appointment' && { class: 'sx-event-primary' }),
                 ...(e.type === 'unavailable' && { class: 'sx-event-secondary' })
            }));
            calendarApp.current.events.set(transformedEvents);
        }
    }, [events, onCreateBlock]);

    return <div ref={calendarRef} className="h-full w-full" />;
}
