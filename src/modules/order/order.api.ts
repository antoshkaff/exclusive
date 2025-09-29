export const apiGetOrders = async (limit: number, skip: number) => {
    const q = new URLSearchParams({
        take: String(limit),
        skip: String(skip),
    });

    const res = await fetch(`/api/orders?${q.toString()}`, {
        credentials: 'include',
    });

    const text = await res.text();
    const json = text ? JSON.parse(text) : null;

    if (!res.ok) {
        throw new Error(json?.error || 'Something get wrong');
    }

    return json;
};
