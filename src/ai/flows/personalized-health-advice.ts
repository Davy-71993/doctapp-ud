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

const PersonalizedHealthAdviceInputSchema = z.object({
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
  prompt: `You are an AI health assistant providing personalized health advice to users based on their tracked health data.

  Analyze the following data and provide tailored advice. Also, determine if the user needs to see a healthcare professional. If you think the user should seek a professional, set the "recommendProfessionalConsultation" field to true. If the data looks normal, you can also set "recommendProfessionalConsultation" field to false.

  Period Data: {{#if periodData}}{{#each periodData}}Date: {{{date}}} {{/each}}{{else}}No period data provided.{{/if}}
  Temperature Data: {{#if temperatureData}}{{#each temperatureData}}Date: {{{date}}}, Temperature: {{{temperature}}} Â°C {{/each}}{{else}}No temperature data provided.{{/if}}
  Blood Sugar Data: {{#if bloodSugarData}}{{#each bloodSugarData}}Date: {{{date}}}, Blood Sugar: {{{bloodSugar}}} mg/dL {{/each}}{{else}}No blood sugar data provided.{{/if}}

  Based on the data, provide specific advice and recommendations. The advice should be short (2-3 sentences).`,
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
