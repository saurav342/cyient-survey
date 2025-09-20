import './globals.css';

export const metadata = {
  title: 'Cyient Feedback Platform',
  description: 'Share your experience and help us improve our events and programs.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
