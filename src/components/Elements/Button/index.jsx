const Button = ({
  type,
  title = "",
  classname = "",
  children,
  arialLabel,
  onClick = () => {},
}) => {
  return (
    <button
      type={type}
      title={title}
      className={classname}
      onClick={onClick}
      arial-label={arialLabel}
    >
      {children}
    </button>
  );
};

export default Button;
