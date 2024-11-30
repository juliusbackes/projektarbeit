import { Holiday } from 'open-holiday-js';
import type { RequestEvent } from './$types';
import { json } from '@sveltejs/kit';

export async function GET({ url }: RequestEvent) {
    const holidayAPI = new Holiday();

    const params = await url.searchParams;
    const startDateParam = params.get('startDate');
    const endDateParam = params.get('endDate');
    
    if (!(startDateParam && endDateParam)) {
        return new Response('startDate and endDate are required', { status: 400 });
    };

    const startDate = new Date(startDateParam);
    const endDate = new Date(endDateParam);

    const publicHolidays = await holidayAPI.getPublicHolidays("DE", startDate, endDate, "DE-HB", "DE");
    const schoolHolidays = await holidayAPI.getSchoolHolidays("DE", startDate, endDate, "DE-HB", "DE");

    return json({ publicHolidays, schoolHolidays });
}
