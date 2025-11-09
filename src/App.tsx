import { Routes, Route, Navigate } from "react-router-dom";
import Layout from "./Components/Layout/Layout";
import MyRoute from "./Routes/MyRoute";
import Login from "./Pages/Login";
import Dashboard from "./Pages/Dashboard";
import Partners from "./Pages/Partners";
import Channels from "./Pages/PaymentChannels";
import Transactions from "./Pages/Transactions";
import Currencies from "./Pages/Currencies";

export default function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route
        path="/"
        element={
          <MyRoute>
            <Layout />
          </MyRoute>
        }
      >
        <Route index element={<Dashboard />} />
        <Route path="partners" element={<Partners />} />
        <Route path="channels" element={<Channels />} />
        <Route path="transactions" element={<Transactions />} />
        <Route path="currencies" element={<Currencies />} />
      </Route>

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
