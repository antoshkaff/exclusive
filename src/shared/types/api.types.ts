type ServiceOk<T> = { ok: true; status: number; data: T; token?: string };
type ServiceErr = { ok: false; status: number; error: string };

export type ServiceResult<T> = ServiceOk<T> | ServiceErr;
