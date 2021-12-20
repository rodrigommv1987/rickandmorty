const FormErrors = ({ errors = [] }) => {
  if (!errors.length) return null;

  return (
    <div className="form-errors-container" role="alert">
      <ul>
        {errors.map((msg, index) => (
          <li key={index}>
            <span>{msg}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FormErrors;
