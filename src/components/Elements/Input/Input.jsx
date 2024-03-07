const Input = ({
  type,
  classname = "",
  name,
  placeholder,
  onChange = () => {},
  value = "",
}) => {
  return (
    <>
      <input
        type={type}
        className={classname}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
    </>
  );
};

export default Input;
