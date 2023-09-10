import { useState } from "react";
import styles from "./index.module.css";
import Select from "react-select";
import { reservasMock } from "./reservasMock";

const Checkbox = ({
  children,
  value,
  checked,
  onChange,
  ...props
}: JSX.IntrinsicElements["input"]) => (
  <label style={{ display: "flex", alignItems: "center", paddingLeft: "8px" }}>
    <input
      type="checkbox"
      checked={checked}
      value={value}
      onChange={onChange}
      {...props}
      style={{ width: "18px", height: "18px", marginRight: "12px" }}
    />
    {children}
  </label>
);

const InputField = ({
  disabled = false,
  placeholder = "InputField...",
  onChange,
}) => (
  <input
    disabled={disabled}
    placeholder={placeholder}
    onChange={onChange}
    style={{
      flex: 1,
      height: "38px",
      border: "1px solid",
      borderColor: "#CCCCCC",
      borderRadius: "4px",
      padding: "2px 8px",
    }}
  />
);

const Button = ({ disabled = false, label = "", onClick }) => (
  <button
    disabled={disabled}
    onClick={onClick}
    style={{
      width: 132,
      height: "38px",
      padding: "2px 8px",
      borderRadius: "4px",
      backgroundColor: "#006ce4",
      cursor: "pointer",
      border: "none",
    }}
  >
    <span style={{ color: "white", fontWeight: 700, fontSize: 16 }}>
      {label}
    </span>
  </button>
);

const stateOptions = [
  { value: "Pernambuco", label: "Pernambuco" },
  { value: "Bahia", label: "Bahia" },
  { value: "São Paulo", label: "São Paulo" },
];

const cityOptions = [
  { value: "Ipojuca", label: "Ipojuca" },
  { value: "Porto Seguro", label: "Porto Seguro" },
  { value: "São Paulo", label: "São Paulo" },
];

const menuWidth = 200;

const selectStyles = {
  control: (css) => ({
    ...css,
    width: menuWidth || "auto",
    opacity: menuWidth ? 1 : 0,
  }),
  menu: ({ width, ...css }) => ({
    ...css,
    opacity: menuWidth ? 1 : 0,
    width: menuWidth,
  }),
  // Add padding to account for width of Indicators Container plus padding
  option: (css) => ({ ...css, paddingRight: 36 + 8 }),
};

const ReservasPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [state, setState] = useState("");
  const [city, setCity] = useState("");
  const [minimumPrice, setMinimumPrice] = useState(0);
  const [maximumPrice, setMaximum] = useState(0);
  const [classification, setClassification] = useState(0);
  const [rating, setRating] = useState(0);
  const [individualRoom, setIndvidualRoom] = useState(false);
  const [doubleRoom, setdoubleRoom] = useState(false);
  const [familyRoom, setFamilyRoom] = useState(false);
  const [reservas, setReservas] = useState(reservasMock);

  const classificationCheck = (value: number) => value === classification;
  const ratingCheck = (value: number) => value == rating;
  const getRatingText = (rating: number) => {
    if (rating >= 9) return "Fantástico";
    if (rating >= 8) return "Muito Bom";
    if (rating >= 7) return "Bom";
    if (rating >= 6) return "Satisfatório";

    return "";
  };

  return (
    <div className={styles.pageContainer}>
      <div className={styles.leftMenu}>
        <h3>Para onde você vai?</h3>
        <div className={styles.selectsContainer}>
          <Select
            options={stateOptions}
            placeholder={"Estado"}
            isClearable={true}
            styles={selectStyles}
          />
          <Select
            options={cityOptions}
            placeholder={"Cidade"}
            isClearable={true}
            styles={selectStyles}
          />
        </div>
        <div className={styles.filtersContainer}>
          <h4 className={styles.filtersHeadline}>Filtrar Reservas por:</h4>
          <div className={styles.filterTypeContainer}>
            <h5 className={styles.filterTitle}>Classificação da Reserva</h5>
            <Checkbox
              value={1}
              onChange={() => setClassification(1)}
              checked={classificationCheck(1)}
            >
              1 Estrela
            </Checkbox>
            <Checkbox
              value={2}
              onChange={() => setClassification(2)}
              checked={classificationCheck(2)}
            >
              2 Estrelas
            </Checkbox>
            <Checkbox
              value={3}
              onChange={() => setClassification(3)}
              checked={classificationCheck(3)}
            >
              3 Estrelas
            </Checkbox>
            <Checkbox
              value={4}
              onChange={() => setClassification(4)}
              checked={classificationCheck(4)}
            >
              4 Estrelas
            </Checkbox>
            <Checkbox
              value={5}
              onChange={() => setClassification(5)}
              checked={classificationCheck(5)}
            >
              5 Estrelas
            </Checkbox>
          </div>
          <div className={styles.filterTypeContainer}>
            <h5 className={styles.filterTitle}>Tipos de Quarto</h5>
            <Checkbox onChange={() => setIndvidualRoom(!individualRoom)}>
              Individual
            </Checkbox>
            <Checkbox onChange={() => setdoubleRoom(!doubleRoom)}>
              Duplo
            </Checkbox>
            <Checkbox onChange={() => setFamilyRoom(!familyRoom)}>
              Familiar
            </Checkbox>
          </div>
          <div className={styles.filterTypeContainer}>
            <h5 className={styles.filterTitle}>Avaliação dos Hóspedes</h5>
            <Checkbox
              value={9}
              onChange={() => setRating(9)}
              checked={ratingCheck(9)}
            >
              Fantástico: 9 ou mais
            </Checkbox>
            <Checkbox
              value={8}
              onChange={() => setRating(8)}
              checked={ratingCheck(8)}
            >
              Muito Bom: 8 ou mais
            </Checkbox>
            <Checkbox
              value={7}
              onChange={() => setRating(7)}
              checked={ratingCheck(7)}
            >
              Bom: 7 ou mais
            </Checkbox>
            <Checkbox
              value={6}
              onChange={() => setRating(6)}
              checked={ratingCheck(6)}
            >
              Satisfatório: 6 ou mais
            </Checkbox>
          </div>
        </div>
      </div>
      <div className={styles.mainContainer}>
        <div className={styles.menuContainer}>
          <InputField
            placeholder="Buscar Reservas..."
            onChange={(e) => setSearchTerm(e.target.value)}
            disabled={false}
          />
          <Button label="Pesquisar" disabled={false} onClick />
        </div>
        <h4>{reservas.length} reservas encontradas</h4>
        <div className={styles.reservasContainer}>
          {reservas.map((reserva) => (
            <div className={styles.reservaContainer} key={reserva.id}>
              <img className={styles.reservaThumbnail} src={reserva.imageUrl} />
              <div className={styles.reservaInfoContainer}>
                <div className={styles.upperInfo}>
                  <span className={styles.reservaTitle}>{reserva.nome}</span>
                  <div className={styles.ratingContainer}>
                    <div className={styles.ratingTextContainer}>
                      <span className={styles.reservaRatingText}>
                        {getRatingText(reserva.avaliacao)}
                      </span>
                      <span className={styles.reservasRatingCount}>
                        {"32 Avaliações"}
                      </span>
                    </div>
                    <div className={styles.rating}>{reserva.avaliacao}</div>
                  </div>
                </div>
                <p className={styles.reservaDescription}>{reserva.descricao}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ReservasPage;
