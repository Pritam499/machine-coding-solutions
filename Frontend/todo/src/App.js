import React, { useState } from "react";
import TodoApp from "./components/TodoApp";
import ThemeToggle from "./components/ThemeToggle";
import KanbanBoard from "./components/KanbanBoard";
import WeatherApp from "./components/WeatherApp";
import StarRating from "./components/StarRating";
import SnakeAndLadderBoard from "./components/SnakeAndLadderBoard";
import Quiz from "./components/QuizApp";
import ProgressBar from "./components/ProgressBar";
import PasswordGenerator from "./components/PasswordGenerator";
import ProductsPagination from "./components/ProductsPagination";
import ProductsLoader from "./components/ProductsLoader";
import PhoneLogin from "./components/PhoneLogin";
import OTPVerify from "./components/OTPVerify";
import CommentThread from "./components/CommentThread";
import LikeButton from "./components/LikeButton";
import Calculator from "./components/Calculator";
import Navbar from "./components/Navbar";
import SearchableList from "./components/SearchableList";
import Chat from "./components/Chat";

export default function App() {
  const handleRate = (newRating) => {
    console.log("Rated:", newRating);
  };

  const [page, setPage] = useState("login");
  const [otp, setOtp] = useState("");

  const handleNext = (generatedOtp) => {
    setOtp(generatedOtp);
    console.log("Generated OTP:", generatedOtp);
    setPage("verify");
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* <TodoApp /> */}
      {/* <ThemeToggle /> */}
      {/* <KanbanBoard /> */}
      {/* <WeatherApp /> */}
      {/* <div>
        <h1>Rate this product:</h1>
        <StarRating totalStars={5} onRate={handleRate} />
      </div> */}
      {/* <SnakeAndLadderBoard /> */}
      {/* <Quiz /> */}
      {/* <ProgressBar /> */}
      {/* <PasswordGenerator /> */}
      {/* <ProductsPagination /> */}
      {/* <ProductsLoader /> */}
      {/* <div>
        {page === "login" && <PhoneLogin onNext={handleNext} />}
        {page === "verify" && <OTPVerify actualOtp={otp} />}
      </div> */}
      {/* <CommentThread /> */}
      {/* <LikeButton /> */}
      {/* <Calculator /> */}
      {/* <Navbar /> */}
      {/* <SearchableList /> */}
      <>
        <Chat username="Pritam" />
        <Chat username="Joy" />
      </>
    </div>
  );
}
