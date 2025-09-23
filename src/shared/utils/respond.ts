import { NextResponse } from 'next/server';

export type FieldErrors = Record<string, string[]>;

export type ServiceOk<T> = {
    ok: true;
    status: number;
    data: T;
    token?: string;
};
export type ServiceErr = {
    ok: false;
    status: number;
    error: string;
    fieldErrors?: FieldErrors;
};

export type ServiceResult<T> = ServiceOk<T> | ServiceErr;

export function respond<T>(result: ServiceResult<T>) {
    if (!result.ok) {
        const body = {
            error: {
                message: result.error,
            },
        };
        return NextResponse.json(body, { status: result.status });
    }
    const body = { data: result.data };
    return NextResponse.json(body, { status: result.status });
}

export function respond500(e: unknown) {
    console.error(e);
    const body = {
        error: { message: 'Internal server error' },
    };
    return NextResponse.json(body, { status: 500 });
}
