import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import PortfolioPage from "./pages/portfolio/PortfolioPage";
import CardDemo from "./CardDemo";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Trang mặc định có Intro màn hình danh thiếp lật xoay phóng to mượt mà */}
        <Route path="/" element={<PortfolioPage />} />

        {/* Trang portfolio trực tiếp bỏ qua intro */}
        <Route path="/portfolio" element={<PortfolioPage skipIntro={true} />} />

        {/* Bản demo thẻ lật cũ */}
        <Route path="/demo" element={<CardDemo />} />

        {/* Fallback về trang chủ */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
