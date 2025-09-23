export const formatTitle = (input: string): string =>
    input
        .trim()
        .split(/[-_\s]+/)
        .filter(Boolean)
        .map((w) => w[0].toUpperCase() + w.slice(1).toLowerCase())
        .join(' ');
