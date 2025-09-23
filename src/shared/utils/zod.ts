import type { z } from 'zod';

export function zodFieldErrors<T extends z.ZodTypeAny>(
    result: ReturnType<T['safeParse']>,
): Record<string, string[]> {
    if (result.success) return {};
    const out: Record<string, string[]> = {};
    for (const issue of result.error.issues) {
        const key = String(issue.path[0] ?? 'form');
        (out[key] ??= []).push(issue.message);
    }
    return out;
}
