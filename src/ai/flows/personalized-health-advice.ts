'use server';

/**
 * @fileOverview An AI agent that provides personalized health advice based on tracked health data.
 *
 * - getPersonalizedHealthAdvice - A function that generates personalized health advice.
 * - PersonalizedHealthAdviceInput - The input type for the getPersonalizedHealthAdvice function.
 * - PersonalizedHealthAdviceOutput - The return type for the getPersonalizedHealthAdvice function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ChatMessageSchema = z.object({
  sender: z.enum(['user', 'ai']),
  content: z.string(),
});

const PersonalizedHealthAdviceInputSchema = z.object({
  chatHistory: z.array(ChatMessageSchema).optional().describe('The history of the conversation so far.'),
  userQuery: z.string().optional().describe('The user\'s specific question about their health.'),
  periodData: z.array(
    z.object({
      date: z.string().describe('Date of the period entry (YYYY-MM-DD).'),
    })
  ).optional().describe('An array of period data entries.'),
  temperatureData: z.array(
    z.object({
      date: z.string().describe('Date of the temperature entry (YYYY-MM-DD).'),
      temperature: z.number().describe('Body temperature in Celsius.'),
    })
  ).optional().describe('An array of body temperature data entries.'),
  bloodSugarData: z.array(
    z.object({
      date: z.string().describe('Date of the blood sugar entry (YYYY-MM-DD).'),
      bloodSugar: z.number().describe('Blood sugar level in mg/dL.'),
    })
  ).optional().describe('An array of blood sugar data entries.'),
  bloodPressureData: z.array(
    z.object({
        date: z.string().describe('Date of the blood pressure entry (YYYY-MM-DD).'),
        systolic: z.number().describe('Systolic blood pressure in mmHg.'),
        diastolic: z.number().describe('Diastolic blood pressure in mmHg.'),
    })
  ).optional().describe('An array of blood pressure data entries.'),
  allergies: z.array(z.string()).optional().describe('A list of known allergies.'),
  pregnancyStatus: z.string().optional().describe("The user's pregnancy status (e.g., 'Pregnant', 'Not Pregnant').")
});

export type PersonalizedHealthAdviceInput = z.infer<typeof PersonalizedHealthAdviceInputSchema>;

const PersonalizedHealthAdviceOutputSchema = z.object({
  advice: z.string().describe('Personalized health advice based on the provided data.'),
  recommendProfessionalConsultation: z.boolean().describe('Whether or not the user should seek professional medical advice.')
});

export type PersonalizedHealthAdviceOutput = z.infer<typeof PersonalizedHealthAdviceOutputSchema>;

export async function getPersonalizedHealthAdvice(
  input: PersonalizedHealthAdviceInput
): Promise<PersonalizedHealthAdviceOutput> {
  return personalizedHealthAdviceFlow(input);
}

const personalizedHealthAdvicePrompt = ai.definePrompt({
  name: 'personalizedHealthAdvicePrompt',
  input: {schema: PersonalizedHealthAdviceInputSchema},
  output: {schema: PersonalizedHealthAdviceOutputSchema},
  prompt: `You are an AI health assistant providing personalized health advice to users based on their tracked health data and conversation history.

  Analyze the following data and conversation to provide tailored advice to answer the user's latest question. Also, determine if the user needs to see a healthcare professional. If you think the user should seek a professional, set the "recommendProfessionalConsultation" field to true. If the data looks normal, you can also set "recommendProfessionalConsultation" field to false.

  {{#if chatHistory}}
  Conversation History:
  {{#each chatHistory}}
  {{#if (eq sender 'user')}}User: {{else}}AI: {{/if}}{{{content}}}
  {{/each}}
  {{/if}}

  The user's current question is: "{{userQuery}}"
  
  Relevant Health Data:
  {{#if periodData}}
  Period Data:
  {{#each periodData}}Date: {{{date}}} {{/each}}
  {{/if}}

  {{#if temperatureData}}
  Temperature Data:
  {{#each temperatureData}}Date: {{{date}}}, Temperature: {{{temperature}}} Â°C {{/each}}
  {{/if}}

  {{#if bloodSugarData}}
  Blood Sugar Data:
  {{#each bloodSugarData}}Date: {{{date}}}, Blood Sugar: {{{bloodSugar}}} mg/dL {{/each}}
  {{/if}}

  {{#if bloodPressureData}}
  Blood Pressure Data:
  {{#each bloodPressureData}}Date: {{{date}}}, Systolic: {{{systolic}}}, Diastolic: {{{diastolic}}} mmHg {{/each}}
  {{/if}}

  {{#if allergies}}
  Allergies:
  {{#each allergies}}{{{this}}}{{/each}}
  {{/if}}

  {{#if pregnancyStatus}}
  Pregnancy Status: {{{pregnancyStatus}}}
  {{/if}}

  Based on all the information, provide a specific, concise (2-3 sentences) answer to the user's question.`,
});

const personalizedHealthAdviceFlow = ai.defineFlow(
  {
    name: 'personalizedHealthAdviceFlow',
    inputSchema: PersonalizedHealthAdviceInputSchema,
    outputSchema: PersonalizedHealthAdviceOutputSchema,
  },
  async input => {
    const {output} = await personalizedHealthAdvicePrompt(input);
    return output!;
  }
);
