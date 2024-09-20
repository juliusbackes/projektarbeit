import type { Toast } from '$lib/types';
import { getContext, onDestroy, setContext } from 'svelte';

export class ToastState {
    toasts = $state<Toast[]>([]); 
    toastToTimeoutMap = new Map<string, NodeJS.Timeout>();

    constructor() {
        onDestroy(() => {
            for (const timeout of this.toastToTimeoutMap.values()) {
                clearTimeout(timeout);
            }
            this.toastToTimeoutMap.clear();
        })
    }
    
    add(type: 'success' | 'error' | 'info', message: string, durationMs = 5000) {
        const id = crypto.randomUUID();
        this.toasts.push({
            id,
            type,
            message
        })

        this.toastToTimeoutMap.set(
            id,
            setTimeout(() => {
                this.remove(id)
            }, durationMs)
        )
    }

    remove(id: string) {
        const timeout = this.toastToTimeoutMap.get(id);

        if (timeout) {
            clearTimeout(timeout)
            this.toastToTimeoutMap.delete(id);
        }
        this.toasts = this.toasts.filter(toast => toast.id !== id);
    }
};

const TOAST_KEY = Symbol('TOAST');

export function setToastState() {
    return setContext(TOAST_KEY, new ToastState());
};

export function getToastState() {
    return getContext<ReturnType<typeof setToastState>>(TOAST_KEY);
}