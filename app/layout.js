import "@radix-ui/themes/styles.css";
import "./globals.css";

export const metadata = {
  title: "/ ANN /",
  description: "A 3D Character Selector...",
};

export default function RootLayout({ children }) {
  return (
    <html lang="zh-TW">
      <body>
        {children}
      </body>
    </html>
  );
};