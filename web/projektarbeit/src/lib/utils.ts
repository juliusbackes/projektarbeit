import readXlsxFile from 'read-excel-file'
import type { TODO } from '$lib/types';

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
    return arr
        .filter(x => x)
        .map((el: any) => Array.isArray(el) ? removeNullElements(el) : el);
};

export const convertXLSXtoJSON = async (file: File): Promise<TODO> => {
    const data = (await readXlsxFile(file));
    data.shift();
    
    const columns_raw = transpose(data);
    columns_raw.shift();
    
    const columns = removeNullElements(columns_raw);

    let result = {};

    for (let i = 0; i < columns.length; i++) {
        const res_col = convertColumnToObject(columns[i]);
        result = { ...result, ...res_col };
    };

    return result;
};

const transpose = (matrix: any) => {
    return matrix[0].map((_: any, colIndex: any) => matrix.map((row: any) => row[colIndex]));
};

export const BASE_URL = "https://pa.juliusbackes.com";
 
 

import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { cubicOut } from "svelte/easing";
import type { TransitionConfig } from "svelte/transition";

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
	const transform = style.transform === "none" ? "" : style.transform;

	const scaleConversion = (
		valueA: number,
		scaleA: [number, number],
		scaleB: [number, number]
	) => {
		const [minA, maxA] = scaleA;
		const [minB, maxB] = scaleB;

		const percentage = (valueA - minA) / (maxA - minA);
		const valueB = percentage * (maxB - minB) + minB;

		return valueB;
	};

	const styleToString = (
		style: Record<string, number | string | undefined>
	): string => {
		return Object.keys(style).reduce((str, key) => {
			if (style[key] === undefined) return str;
			return str + `${key}:${style[key]};`;
		}, "");
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