// @ts-nocheck
import writeXlsxFile from 'write-excel-file';
import { getWorkingDays, getCalendarWeek, getDatesBetween, fetchHolidays } from './utils';

const HeaderRow = [
	{
		value: 'KW',
		fontWeight: 'bold',
		width: 5,
		borderColor: '#000000'
	},
	{
		value: 'SW',
		fontWeight: 'bold',
		width: 5,
		borderColor: '#000000'
	},
	{
		value: 'E - Phase',
		fontWeight: 'bold',
		width: 15,
		backgroundColor: '#080180',
		color: '#FFFFFF',
		align: 'center'
	},
	{
		value: 'Q1 - Phase',
		fontWeight: 'bold',
		width: 15,
		backgroundColor: '#080180',
		color: '#FFFFFF',
		align: 'center'
	},
	{
		value: 'Q2 - Phase',
		fontWeight: 'bold',
		width: 15,
		backgroundColor: '#080180',
		color: '#FFFFFF',
		align: 'center'
	},
	{
		value: 'Weitere Termine',
		fontWeight: 'bold',
		width: 100,
		backgroundColor: '#080180',
		color: '#FFFFFF',
		align: 'center'
	}
];

const DATA_ROW_1 = [
	{
		type: String,
        value: '15',
	},
	{
		type: String,
		value: '1'
	},
	{
		type: String,
		value: 'MAT_227'
	},
	{
		type: String,
		value: 'MAT_226'
	},
	{
		type: String,
		value: 'MAT_225'
	},
	{
		type: String,
		value: 'ZK',
	}
];

const data = [HeaderRow, DATA_ROW_1];

const columns = [
	{
		width: 5
	},
	{
		width: 10
	},
	{
		width: 15
	},
	{
		width: 15
	},
	{
		width: 15
	},
	{
		width: 20
	}
];

const createHolidayCell = (holidayName) => ({
    type: String,
    value: holidayName,
    backgroundColor: '#feff66',
    align: 'center',
    span: 4,
    borderColor: '#000000'
});

const createEmptyCells = () => [
    { type: String, value: '' },
    { type: String, value: '' },
    { type: String, value: '' },
    { type: String, value: '' }
];

const createWeekSummaryRow = (date, currentSchoolWeek) => ([
    {
        type: String,
        value: getCalendarWeek(date).toString(),
        backgroundColor: '#53ffff',
        color: '#000000',
        borderColor: '#000000',
        fontWeight: 'bold'
    },
    {
        type: String,
        value: currentSchoolWeek.toString(),
        backgroundColor: '#53ffff',
        color: '#000000',
        borderColor: '#000000',
        fontWeight: 'bold'
    },
    ...Array(4).fill({
        type: String,
        value: '',
        backgroundColor: '#53ffff',
        color: '#000000',
        borderColor: '#000000'
    })
]);

const isHolidayDate = (date, holiday) => {
    const holidayStart = new Date(holiday.startDate);
    const holidayEnd = new Date(holiday.endDate);
    return date >= holidayStart && date <= holidayEnd;
};

const getHolidayName = (date, publicHolidays, schoolHolidays) => {
    return publicHolidays.find(h => isHolidayDate(date, h))?.name?.[0]?.text || 
           schoolHolidays.find(h => isHolidayDate(date, h))?.name?.[0]?.text || 
           'Ferien';
};

const createExamCells = (date, examSchedule) => {
    const cells = [
        { type: String, value: '', backgroundColor: undefined },
        { type: String, value: '', backgroundColor: undefined },
        { type: String, value: '', backgroundColor: undefined },
        { type: String, value: '', backgroundColor: undefined }
    ];

    for (const [examName, examDate] of examSchedule.entries()) {
        if (examDate.toDateString() === date.toDateString()) {
            const phase = examName.includes('_227') ? 0 :
                         examName.includes('_226') ? 1 : 
                         examName.includes('_225') ? 2 :
                         3;
            
            const currentValue = cells[0].value;
            cells[0] = {
                type: String,
                value: currentValue ? currentValue + ', ' + examName : examName,
            };
        }
    }

    return cells;
};

export const writeCalendarToFile = async (startDate, endDate, examSchedule) => {
    const dateRange = await getDatesBetween(startDate, endDate);
    const workingDays = dateRange.filter(date => date.getDay() !== 0 && date.getDay() !== 6);
    const { publicHolidays, schoolHolidays } = await fetchHolidays(startDate, endDate);
    
    const data = [HeaderRow];
    let currentSchoolWeek = 1;

    for (const date of workingDays) {
        const isPublicHoliday = publicHolidays.some(holiday => isHolidayDate(date, holiday));
        const isSchoolHoliday = schoolHolidays.some(holiday => isHolidayDate(date, holiday));
        
        const row = [
            {
                type: String,
                value: date.toLocaleString('de-DE', { weekday: 'short' }),
            },
            {
                type: String,
                value: date.toLocaleString('de-DE', { day: '2-digit', month: 'short' }),
            }
        ];

        if (isPublicHoliday || isSchoolHoliday) {
            const holidayName = getHolidayName(date, publicHolidays, schoolHolidays);
            row.push(createHolidayCell(holidayName));
        } else {
            row.push(...createExamCells(date, examSchedule));
        }

        data.push(row);

        if (date.getDay() === 5) {
            data.push(createWeekSummaryRow(date, currentSchoolWeek));
            currentSchoolWeek++;
        }
    }
    console.log(startDate, endDate)
    await writeXlsxFile(data, {
        columns,
        fileName: 'calendar.xlsx'
    });
};
