import { getMessages, getLocale } from 'next-intl/server';

export default async function DebugPage() {
    const locale = await getLocale();
    const messages = await getMessages();

    return (
        <div className="p-4">
            <h1 className="text-xl font-bold mb-4">Debug Information</h1>
            <div className="space-y-2">
                <p><strong>Current Locale:</strong> {locale}</p>
                <p><strong>Messages:</strong></p>
                <pre className="bg-gray-100 p-2 rounded text-sm overflow-auto">
                    {JSON.stringify(messages, null, 2)}
                </pre>
            </div>
        </div>
    );
}