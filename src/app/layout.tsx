import type { Metadata } from 'next';
import { Poppins, Inter } from 'next/font/google';
import 'simplebar-react/dist/simplebar.min.css';
import './globals.scss';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Providers from '@/app/(public)/Providers';
import { getServerUser } from '@/server/getServerUser';

const poppinsFont = Poppins({
    subsets: ['latin'],
    variable: '--font-family-base',
    weight: ['400', '500', '600'],
    display: 'swap',
});

const interFont = Inter({
    subsets: ['latin'],
    variable: '--font-family-alt',
    weight: ['400', '500', '600', '700'],
    display: 'swap',
});

export const metadata: Metadata = {
    title: {
        default: 'Exclusive — online electronics store',
        template: '%s | Exclusive',
    },
    description:
        'Exclusive is an online store for electronics and accessories. Fast delivery, official warranty, and daily deals.',
    applicationName: 'Exclusive',
    keywords: [
        'online store',
        'electronics',
        'accessories',
        'buy online',
        'Exclusive',
    ],

    openGraph: {
        type: 'website',
        url: '/',
        siteName: 'Exclusive',
        title: 'Exclusive — online electronics store',
        description: 'Wide assortment, fair prices, and official warranty.',
        images: [
            {
                url: 'https://og.assets.so/?template=modern&title=Exclusive&subtitle=E-commerce&darkMode=true',
                width: 1200,
                height: 630,
                alt: 'Exclusive — store',
            },
        ],
        locale: 'en_US',
    },
};

export default async function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const initialUser = await getServerUser();

    return (
        <html lang="en">
            <body className={`${poppinsFont.variable} ${interFont.variable}`}>
                <Providers initialUser={initialUser}>
                    <h1 className="visually-hidden">Exclusive</h1>
                    <Header />
                    <main style={{ minHeight: '100vh', overflowX: 'hidden' }}>
                        {children}
                    </main>
                    <Footer />
                </Providers>
            </body>
        </html>
    );
}
