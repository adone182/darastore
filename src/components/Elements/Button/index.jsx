const Button = ({ type, classname, children, onClick = () => {} }) => {
  return (
    <button type={type} className={classname} onClick={onClick}>
      {children}
    </button>
  );
};

export default Button;
