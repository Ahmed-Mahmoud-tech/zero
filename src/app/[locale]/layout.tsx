import { NextIntlClientProvider } from 'next-intl';
import { getMessages, getTranslations } from 'next-intl/server';
import { ToastContainer } from 'react-toastify';
import '../globals.css';
type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale });

  return {
    title: t('title'),
  };
}

export default async function RootLayout({
  children,
  params
}: Props) {
  const { locale } = await params;
  const messages = await getMessages();

  return (
    <html lang={locale} dir={locale === 'ar' ? 'rtl' : 'ltr'}>
      <body className='bg-black'>
        <NextIntlClientProvider messages={messages}>
          {children}
          <ToastContainer position="bottom-right" autoClose={3000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={locale === 'ar'} pauseOnFocusLoss draggable pauseOnHover />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}