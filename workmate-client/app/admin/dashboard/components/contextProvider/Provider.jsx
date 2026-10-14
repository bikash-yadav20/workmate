import DashboardContextProvider from "../../context/DashboardContext";

export default function Provider({ children }) {
  return <DashboardContextProvider>{children}</DashboardContextProvider>;
}
