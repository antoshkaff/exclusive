export const formatTitle = (input: string): string => {
    if (!input) return '';
    return input
        .trim()
        .split(/[-_\s]+/)
        .filter(Boolean)
        .map((w) => w[0].toUpperCase() + w.slice(1).toLowerCase())
        .join(' ');
};

export const formatDate = (input: Date): string => {
    if (!input) return '';
    const date = new Date(input);
    return new Intl.DateTimeFormat('uk-UA', {
        timeZone: 'Europe/Kyiv',
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
    }).format(date);
};
