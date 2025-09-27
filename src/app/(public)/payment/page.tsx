import { redirect } from 'next/navigation';
import { stripe } from '@/shared/stripe';
import PaymentView from '@/app/(public)/payment/PaymentView';
import { Metadata } from 'next';
import { ROUTES } from '@/config/routes.config';
import { SearchParams } from 'next/dist/server/request/search-params';

export const metadata: Metadata = {
    title: 'Payment',
    robots: { index: false, follow: false },
};

export default async function PaymentPage({
    searchParams,
}: {
    searchParams: Promise<SearchParams>;
}) {
    const sp = (await searchParams) ?? {};
    const raw = sp.sessionId;
    const sessionId = Array.isArray(raw) ? raw[0] : raw;
    if (!sessionId) redirect(ROUTES.HOME);

    try {
        await stripe.checkout.sessions.retrieve(sessionId);
    } catch {
        redirect(ROUTES.HOME);
    }

    return <PaymentView sessionId={sessionId} />;
}
