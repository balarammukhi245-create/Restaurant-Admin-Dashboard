import { useState } from "react";
import Layout from "./components/Layout";
import MenuManagement from "./pages/MenuManagement";
import OrdersDashboard from "./pages/OrdersDashboard";
import Analytics from "./pages/Analytics";

export default function App() {
  const [activeTab, setActiveTab] = useState("dashboard");

  const renderContent = () => {
    switch (activeTab) {
      case "menu": return <MenuManagement />;
      case "orders": return <OrdersDashboard />;
      case "analytics": return <Analytics />;
      default: return <Analytics />;
    }
  };

  return (
    <Layout activeTab={activeTab} setActiveTab={setActiveTab}>
      {renderContent()}
    </Layout>
  );
}
