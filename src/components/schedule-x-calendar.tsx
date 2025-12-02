
'use client';

import 'temporal-polyfill/global';
import { createCalendar, viewDay, viewMonthGrid, viewWeek } from '@schedule-x/calendar';
import '@schedule-x/theme-default/dist/index.css';
import { useEffect, useRef } from 'react';
import type { CalendarApp } from '@schedule-x/calendar';
import type { Appointment, TimeBlock } from '@/lib/types';
import { EventImpl } from '@schedule-x/shared/src/classes/event.impl';

interface ScheduleXCalendarProps {
    appointments: Appointment[];
    unavailableBlocks: TimeBlock[];
    onCreateBlock: (block: { start: Date; end: Date }) => void;
}

export function ScheduleXCalendar({ appointments, unavailableBlocks, onCreateBlock }: ScheduleXCalendarProps) {
    const calendarRef = useRef<HTMLElement | null>(null);
    const calendarApp = useRef<CalendarApp | null>(null);

    useEffect(() => {
        const appointmentEvents: TimeBlock[] = appointments.map(app => ({
            id: app.id,
            title: `Appt: ${app.reason}`,
            start: new Date(`${app.date.split('T')[0]}T${app.time.split(' ')[0]}:00`),
            end: new Date(new Date(`${app.date.split('T')[0]}T${app.time.split(' ')[0]}:00`).getTime() + 60 * 60 * 1000), // Assuming 1hr appointments
            type: 'appointment'
        }));
        
        const allEvents = [...appointmentEvents, ...unavailableBlocks];

        const transformedEvents = allEvents.map(e => ({
            id: e.id,
            title: e.title,
            start: e.start.toISOString(),
            end: e.end.toISOString(),
            ...(e.type === 'appointment' ? {
                style: {
                    backgroundColor: 'hsl(var(--primary))',
                    color: 'hsl(var(--primary-foreground))',
                }
            } : {
                style: {
                    backgroundColor: 'hsl(var(--muted))',
                    color: 'hsl(var(--muted-foreground))',
                }
            })
        }));

        if (calendarRef.current && !calendarApp.current) {
            const now = new Date();
            const currentTime = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;

            calendarApp.current = createCalendar({
                views: [viewWeek, viewDay, viewMonthGrid],
                firstDayOfWeek: 1, // Monday
                events: transformedEvents,
                dayBoundaries: {
                    start: '00:00',
                    end: '23:59',
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
            calendarApp.current.events.set(transformedEvents);
        }
    }, [appointments, unavailableBlocks, onCreateBlock]);

    return <div ref={calendarRef} className="h-full w-full" />;
}
