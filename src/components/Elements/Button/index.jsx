const Button = ({ type, classname }) => {
  return (
    <button type={type} className={classname}>
      {children}
    </button>
  );
};

export default Button;
