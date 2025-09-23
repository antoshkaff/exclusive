import type { NextConfig } from 'next';
import path from 'path';

const nextConfig: NextConfig = {
    images: {
        remotePatterns: [
            { hostname: 'cdn.dummyjson.com' },
            { hostname: 'og.assets.so' },
        ],
    },
    sassOptions: {
        includePaths: [path.resolve(process.cwd(), 'src')],
    },
};

export default nextConfig;
