import "./globals.css";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v15-appRouter";
import { Roboto } from "next/font/google";
import { ThemeProvider } from "@mui/material/styles";
import theme from "./theme";
import { LoginProvider } from "./utils/LoginContext";
import { CombinedAntragProvider } from "./utils/CombinedAntragContext";
import { TeacherProvider } from "./utils/TeacherContext";

export const metadata = {
  title: "IHK-Projektantraege",
  description: "Anwendung zum Verwalten von IHK-Projektantraegen",
};

const roboto = Roboto({
  weight: ["300", "400", "500", "700"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-roboto",
});

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={roboto.variable}>
        <LoginProvider>
          <CombinedAntragProvider>
            <TeacherProvider>
              <AppRouterCacheProvider>
                <ThemeProvider theme={theme}>{children}</ThemeProvider>
              </AppRouterCacheProvider>
            </TeacherProvider>
          </CombinedAntragProvider>
        </LoginProvider>
      </body>
    </html>
  );
}
