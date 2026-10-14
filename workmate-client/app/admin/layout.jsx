import Provider from "./dashboard/components/contextProvider/Provider";
import Sidebar from "./sidebar/Sidebar";

export default function RootLayout({ children }) {
  return (
    <Provider>
      <div className="flex flex-col md:flex-row min-h-screen bg-gray-50">
        <Sidebar />
        <main className="flex-1 mt-14 md:mt-0 p-4 md:p-8">{children}</main>
      </div>
    </Provider>
  );
}
