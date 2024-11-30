import readXlsxFile from 'read-excel-file';
import type { Database, TODO } from '$lib/types';
import {
	getLocalTimeZone,
	today,
	type CalendarDate,
	type DateValue
} from '@internationalized/date';
import type { Holiday } from '$lib/types';
import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { cubicOut } from 'svelte/easing';
import type { TransitionConfig } from 'svelte/transition';
import { Graph } from '$lib/graph';
import type { ExamData, ExamDataItem } from '$lib/types';
import writeXlsxFile, { type Row_ } from 'write-excel-file';
import alignCenter from 'lucide-svelte/icons/align-center';

export const checkForUpperCase = (str: string) => str === str.toUpperCase();

const convertColumnToObject = (column: any[]) => {
	return column.reduce((acc, item, index) => {
		if (index === 0) {
			acc[item] = [];
		} else {
			acc[column[0]].push(item);
		}
		return acc;
	}, {});
};

const removeNullElements = (arr: any[][]): any[][] => {
	return arr.filter((x) => x).map((el: any) => (Array.isArray(el) ? removeNullElements(el) : el));
};

/**
 * Converts a date object to a German date string format (DD.MM.YYYY)
 * @param {CalendarDate} date - The date object to convert
 * @returns {string} The formatted date string
 */
export const toGermanDateString = (date: CalendarDate): string => {
	if (!date) return '';
	return `${date.day.toString().padStart(2, '0')}.${date.month.toString().padStart(2, '0')}.${date.year}`;
};

export const convertXLSXtoJSON = async (file: File): Promise<TODO> => {
	const data = await readXlsxFile(file);
	data.shift();

	const columns_raw = transpose(data);
	columns_raw.shift();

	const columns = removeNullElements(columns_raw);

	let result = {};

	for (let i = 0; i < columns.length; i++) {
		const res_col = convertColumnToObject(columns[i]);
		result = { ...result, ...res_col };
	}

	return result;
};

const transpose = (matrix: any) => {
	return matrix[0].map((_: any, colIndex: any) => matrix.map((row: any) => row[colIndex]));
};

export const BASE_URL = 'https://pa.juliusbackes.com';

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

type FlyAndScaleParams = {
	y?: number;
	x?: number;
	start?: number;
	duration?: number;
};

export const flyAndScale = (
	node: Element,
	params: FlyAndScaleParams = { y: -8, x: 0, start: 0.95, duration: 150 }
): TransitionConfig => {
	const style = getComputedStyle(node);
	const transform = style.transform === 'none' ? '' : style.transform;

	const scaleConversion = (valueA: number, scaleA: [number, number], scaleB: [number, number]) => {
		const [minA, maxA] = scaleA;
		const [minB, maxB] = scaleB;

		const percentage = (valueA - minA) / (maxA - minA);
		const valueB = percentage * (maxB - minB) + minB;

		return valueB;
	};

	const styleToString = (style: Record<string, number | string | undefined>): string => {
		return Object.keys(style).reduce((str, key) => {
			if (style[key] === undefined) return str;
			return str + `${key}:${style[key]};`;
		}, '');
	};

	return {
		duration: params.duration ?? 200,
		delay: 0,
		css: (t) => {
			const y = scaleConversion(t, [0, 1], [params.y ?? 5, 0]);
			const x = scaleConversion(t, [0, 1], [params.x ?? 0, 0]);
			const scale = scaleConversion(t, [0, 1], [params.start ?? 0.95, 1]);

			return styleToString({
				transform: `${transform} translate3d(${x}px, ${y}px, 0) scale(${scale})`,
				opacity: t
			});
		},
		easing: cubicOut
	};
};

export const isDateInPast = (date: DateValue) => {
	const now = today(getLocalTimeZone());
	const todayDate = new Date(now.year, now.month - 1, now.day);
	const compareDate = new Date(date.toString());
	return compareDate.getTime() < todayDate.getTime();
};

export const fetchHolidays = async (
	examStartDate?: string | Date | null,
	examEndDate?: string | Date | null
): Promise<{ schoolHolidays: Holiday[]; publicHolidays: Holiday[] }> => {
	const startDateRaw = examStartDate ?? new Date();
	const endDateRaw = examEndDate ?? new Date();

	const startDate = new Date(startDateRaw);
	const endDate = new Date(endDateRaw);

	const holidaysResponse = await fetch(`/api/holidays?startDate=${startDate}&endDate=${endDate}`);

	if (!holidaysResponse.ok) {
		throw new Error('Failed to fetch holidays');
	}

	return await holidaysResponse.json();
};

export const getDatesBetween = (startDate: Date, endDate: Date): Date[] => {
	const allDates: Date[] = [];
	const currentDate = new Date(startDate);

	while (currentDate <= endDate) {
		allDates.push(new Date(currentDate));
		currentDate.setDate(currentDate.getDate() + 1);
	}

	return allDates;
};

export const normalizeDate = (date: Date): Date => {
	const normalized = new Date(date);
	normalized.setHours(0, 0, 0, 0);
	return normalized;
};

export const getWorkingDays = async (startDate: Date, endDate: Date): Promise<Date[]> => {
	const allDates = getDatesBetween(startDate, endDate);

	const holidays = await fetchHolidays(startDate, endDate);

	if (!holidays) {
		return allDates;
	}

	const { publicHolidays, schoolHolidays } = holidays;

	const withoutWeekends = allDates.filter((date) => {
		const dayOfWeek = date.getDay();
		return dayOfWeek !== 0 && dayOfWeek !== 6;
	});

	const withoutPublicHolidays = withoutWeekends.filter((date) => {
		const normalizedDate = normalizeDate(date);
		return !publicHolidays.some((holiday) => {
			const holidayStart = normalizeDate(new Date(holiday.startDate));
			const holidayEnd = normalizeDate(new Date(holiday.endDate));
			return normalizedDate >= holidayStart && normalizedDate <= holidayEnd;
		});
	});

	const workingDays = withoutPublicHolidays.filter((date) => {
		const normalizedDate = normalizeDate(date);
		return !schoolHolidays.some((holiday) => {
			const holidayStart = normalizeDate(new Date(holiday.startDate));
			const holidayEnd = normalizeDate(new Date(holiday.endDate));
			return normalizedDate >= holidayStart && normalizedDate <= holidayEnd;
		});
	});

	return workingDays;
};

const mapDatesToIndex = (dates: Date[]): Map<number, number> => {
	const map = new Map<number, number>();
	dates.forEach((date, index) => {
		map.set(date.getTime(), index);
	});
	return map;
};

export const createAdjacencyList = (exams: ExamData): Record<string, Set<string>> => {
	const adjacencyList: Record<string, Set<string>> = {};

	exams.forEach((exam) => {
		adjacencyList[exam.name] = new Set();
	});

	exams.forEach((exam1) => {
		exams.forEach((exam2) => {
			if (exam1.name === exam2.name || adjacencyList[exam1.name].has(exam2.name)) {
				return;
			}

			const hasCommonStudents = exam1.studentList?.some(student => 
				exam2.studentList?.includes(student)
			);

			if (hasCommonStudents) {
				adjacencyList[exam1.name].add(exam2.name);
				adjacencyList[exam2.name].add(exam1.name);
			}
		});
	});
	return adjacencyList;
};

/**
 * Preprocesses exams to handle 2xHJ splitting
 * @param exams - The exams to preprocess
 * @returns The preprocessed exams
 */
export const preprocessExams = (
	exams: Database['public']['Tables']['exams']['Row'][]
): ExamData => {
	const processedExams: ExamData = [];

	exams.forEach((exam) => {
		if (exam.is2xHJ) {
			const exam1: ExamDataItem = {
				name: exam.name + '_1',
				is2xHJ: false,
				studentCount: exam.studentList?.length || 0,
				adjancencyList: new Set(),
				studentList: exam.studentList || [],
				possibleExamDates: exam.possibleExamDates || []
			};

			const exam2: ExamDataItem = {
				name: exam.name + '_2',
				is2xHJ: false,
				studentCount: exam.studentList?.length || 0,
				adjancencyList: new Set(),
				studentList: exam.studentList || [],
				possibleExamDates: exam.possibleExamDates || []
			};

			processedExams.push(exam1, exam2);
		} else {
			processedExams.push({
				name: exam.name || '',
				is2xHJ: false,
				studentCount: exam.studentList?.length || 0,
				adjancencyList: new Set(),
				studentList: exam.studentList || [],
				possibleExamDates: exam.possibleExamDates || []
			});
		}
	});

	const adjacencyList = createAdjacencyList(processedExams);
	processedExams.forEach((exam) => {
		exam.adjancencyList = adjacencyList[exam.name];
	});

	return processedExams;
};

export const createProjectGraph = (
	exams: Database['public']['Tables']['exams']['Row'][],
	workingDays: Date[]
): Graph => {
	const graph = new Graph();
	const processedExams = preprocessExams(exams);

	graph.colors = new Set(workingDays);
	workingDays.forEach((date) => {
		graph.colorToWeekday.set(date, date.getDay() - 1);
	});

	processedExams.forEach((exam) => {
		graph.addVertex(exam.name);
	});

	processedExams.forEach((exam) => {
		exam.adjancencyList.forEach((adj) => {
			if (!graph.graph.has(adj)) {
				graph.addVertex(adj);
			}
			graph.addEdge(exam.name, adj);
		});
	});

	processedExams.forEach((exam) => {
		graph.vertexToWeekdays.set(exam.name, exam.possibleExamDates);
	});

	return graph;
};

export const getCalendarWeek = (date: Date): number => {
	const firstJan = new Date(date.getFullYear(), 0, 1);
	const dayNr = Math.ceil((date.getTime() - firstJan.getTime()) / (24 * 60 * 60 * 1000));
	const weekNr = Math.ceil((dayNr + firstJan.getDay()) / 7);
	return weekNr;
};
