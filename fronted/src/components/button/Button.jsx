import "./button.css";

const Button = ({ value, onClick }) => {
  return (
    <button type="button" id="primary-button" onClick={onClick}>
      {value}
    </button>
  );
};

export default Button;
