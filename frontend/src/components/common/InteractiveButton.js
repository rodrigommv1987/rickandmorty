import { useState } from "react";

const InteractiveButton = ({ type = "button", onClick, children }) => {
  const [showLoading, setShowLoading] = useState(false);
  const hideLoading = () => {
    setShowLoading(false);
  };
  const handleClick = (event) => {
    setShowLoading(true);
    return onClick(event, hideLoading);
  };
  const btnClass = `btn-loader ${showLoading ? "btn-loader-show" : ""}`;

  return (
    <>
      <div className="interactive-button-container">
        <button
          className="interactive-button-btn"
          type={type}
          onClick={handleClick}
        >
          {children}
        </button>
        <div className={btnClass}></div>
      </div>
    </>
  );
};

export default InteractiveButton;
