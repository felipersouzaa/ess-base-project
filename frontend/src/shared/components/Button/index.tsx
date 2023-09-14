import styles from "./index.module.css";

const Button = ({ disabled = false, label = "", onClick, testId }) => (
  <button
    disabled={disabled}
    onClick={onClick}
    data-cy={testId}
    className={styles.button}
  >
    <span className={styles.buttonLabel}>
      {label}
    </span>
  </button>
);


export default Button;
