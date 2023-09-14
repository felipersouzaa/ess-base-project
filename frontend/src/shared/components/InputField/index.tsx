import styles from "./index.module.css";

const InputField = ({
  disabled = false,
  placeholder = "InputField...",
  onChange,
  testId,
}) => (
  <input
    disabled={disabled}
    placeholder={placeholder}
    onChange={onChange}
    data-cy={testId}
    className={styles.inputField}
  />
);

export default InputField;
