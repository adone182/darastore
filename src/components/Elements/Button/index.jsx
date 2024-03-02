const Button = ({ type, classname, children }) => {
  return (
    <button type={type} className={classname}>
      {children}
    </button>
  );
};

export default Button;
