
export type Contact = {
    id: string;
    name: string;
    avatar: string;
};

export type Message = {
    id: string;
    senderId: string;
    receiverId: string;
    text: string;
    timestamp: string;
};

export type Chat = {
    id: string;
    contact: Contact;
    messages: Message[];
};


export const specialists: Contact[] = [
  { id: '1', name: 'Dr. Amina Nakigudde', avatar: 'doctor-1' },
  { id: '2', name: 'Dr. Ben Muwonge', avatar: 'doctor-2' },
  { id: '3', name: 'Dr. Charity Atim', avatar: 'doctor-3' },
];

export const patients: Contact[] = [
    { id: 'user-avatar', name: 'Alex Mukisa', avatar: 'user-avatar'},
    { id: 'patient-1', name: 'Brenda Nansubuga', avatar: 'patient-1' },
    { id: 'patient-2', name: 'Charles Oboth', avatar: 'patient-2' },
    { id: 'patient-3', name: 'Doreen Abenakyo', avatar: 'patient-3' },
];

export const messages: Message[] = [
    {
        id: 'msg1',
        senderId: 'user-avatar',
        receiverId: '1',
        text: 'Hello Dr. Amina, I wanted to ask about my recent blood pressure readings.',
        timestamp: new Date(new Date().setDate(new Date().getDate() - 1)).toISOString(),
    },
    {
        id: 'msg2',
        senderId: '1',
        receiverId: 'user-avatar',
        text: 'Hello Alex, of course. I see your latest readings. What is your question?',
        timestamp: new Date(new Date().setDate(new Date().getDate() - 1)).toISOString(),
    },
    {
        id: 'msg3',
        senderId: 'patient-1',
        receiverId: '1',
        text: 'Hi Doc, I need to reschedule my appointment.',
        timestamp: new Date(new Date().setDate(new Date().getDate() - 2)).toISOString(),
    },
];

