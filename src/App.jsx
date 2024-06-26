import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
  useNavigate,
} from "react-router-dom";

import "./App.css";
import AppLayout from "./pages/AppLayout";
import Categories from "./pages/Categories";
import Expenses from "./pages/Expenses";
import Incomes from "./pages/Incomes";
import DailyReport from "./pages/DailyReport";
import MonthlyReport from "./pages/MonthlyReport";
import YearlyReport from "./pages/YearlyReport";
import Reports from "./pages/Reports";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<AppLayout />} />
        <Route path="categories" element={<Categories />} />
        <Route path="expenses" element={<Expenses />} />
        <Route path="incomes" element={<Incomes />} />
        <Route path="reports" element={<Reports />}>
          <Route index element={<Navigate to="dailyreport" />} />
          <Route path="dailyreport" element={<DailyReport />} />
          <Route path="monthlyreport" element={<MonthlyReport />} />
          <Route path="yearlyreport" element={<YearlyReport />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
