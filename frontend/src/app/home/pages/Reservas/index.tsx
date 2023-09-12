/* eslint-disable @typescript-eslint/no-unused-vars */
import axios from "axios";
import { useEffect, useState } from "react";
import styles from "./index.module.css";
import Select from "react-select";
import Slider from "@mui/material/Slider";
import { reservasMock } from "./reservasMock";
import StarRateRoundedIcon from '@mui/icons-material/StarRateRounded';

const minDistance = 10;

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

const apiService = axios.create({
  baseURL: "http://localhost:8000/",
});

const ReservasPage = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [state, setState] = useState<string | undefined>("");
  const [city, setCity] = useState<string | undefined>("");
  const [priceRange, setPriceRange] = useState<number[]>([0, 99999]);
  const [classification, setClassification] = useState<number>(0);
  const [rating, setRating] = useState<number>(0);
  const [individualRoom, setIndvidualRoom] = useState<boolean>(false);
  const [doubleRoom, setdoubleRoom] = useState<boolean>(false);
  const [familyRoom, setFamilyRoom] = useState<boolean>(false);
  const [reservas, setReservas] = useState(reservasMock);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const handleClassification = (value: number) => {
    if (value === classification) {
      setClassification(0);
    } else {
      setClassification(value);
    }
  };

  const handleRating = (value: number) => {
    if (value === rating) {
      setRating(0);
    } else {
      setRating(value);
    }
  };

  const handlePrice = (
    event: Event,
    newValue: number | number[],
    activeThumb: number
  ) => {
    if (!Array.isArray(newValue)) return;

    if (activeThumb === 0) {
      setPriceRange([
        Math.min(newValue[0], priceRange[1] - minDistance),
        priceRange[1],
      ]);
    } else {
      setPriceRange([
        priceRange[0],
        Math.max(newValue[1], priceRange[0] + minDistance),
      ]);
    }
  };

  const classificationCheck = (value: number) => value === classification;

  const ratingCheck = (value: number) => value == rating;

  const getRatingText = (rating: number) => {
    if (rating >= 9) return "Fantástico";
    if (rating >= 8) return "Muito Bom";
    if (rating >= 7) return "Bom";
    if (rating >= 6) return "Satisfatório";

    return "";
  };

  const handleSearch = () => {
    loadReservas();
  };

  const loadReservas = async () => {
    try {
      const params = {
        nome: searchTerm,
        classificacao: classification,
        avaliacao: rating,
        estado: state,
        cidade: city,
        quarto_individual: individualRoom,
        quarto_duplo: doubleRoom,
        quarto_familiar: familyRoom,
        preco_minimo: priceRange[0],
        preco_maximo: priceRange[1],
      };
      console.log(params);
      const { data } = await apiService.get(`/reservas`, { params });
      console.log(data);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    loadReservas();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getRoomTypes = (reserva) => {
    const roomTypes = reserva.quartos.map((quarto) => quarto.tipo);
    return roomTypes.join(", ");
  };

  return (
    <div className={styles.pageContainer}>
      <div className={styles.leftMenu}>
        <h3>Para onde você vai?</h3>
        <div className={styles.selectsContainer}>
          <Select
            options={stateOptions}
            placeholder={"Estado"}
            onChange={(e) => setState(e?.value)}
            isClearable={true}
            styles={selectStyles}
          />
          <Select
            options={cityOptions}
            placeholder={"Cidade"}
            onChange={(e) => setCity(e?.value)}
            isClearable={true}
            styles={selectStyles}
          />
        </div>
        <div className={styles.filtersContainer}>
          <h4 className={styles.filtersHeadline}>Filtrar Reservas por:</h4>
          <div className={styles.filterTypeContainer}>
            <h5 className={styles.filterTitle}>Preço</h5>
            <div style={{width: "50%", margin: "auto"}}>
              <Slider
                min={0}
                max={1000}
                step={50}
                value={priceRange}
                onChange={handlePrice}
                valueLabelDisplay="auto"
                disableSwap
              />
            </div>
          </div>
          <div className={styles.filterTypeContainer}>
            <h5 className={styles.filterTitle}>Classificação da Reserva</h5>
            <Checkbox
              value={1}
              onChange={() => handleClassification(1)}
              checked={classificationCheck(1)}
            >
              1 Estrela
            </Checkbox>
            <Checkbox
              value={2}
              onChange={() => handleClassification(2)}
              checked={classificationCheck(2)}
            >
              2 Estrelas
            </Checkbox>
            <Checkbox
              value={3}
              onChange={() => handleClassification(3)}
              checked={classificationCheck(3)}
            >
              3 Estrelas
            </Checkbox>
            <Checkbox
              value={4}
              onChange={() => handleClassification(4)}
              checked={classificationCheck(4)}
            >
              4 Estrelas
            </Checkbox>
            <Checkbox
              value={5}
              onChange={() => handleClassification(5)}
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
              onChange={() => handleRating(9)}
              checked={ratingCheck(9)}
            >
              Fantástico: 9 ou mais
            </Checkbox>
            <Checkbox
              value={8}
              onChange={() => handleRating(8)}
              checked={ratingCheck(8)}
            >
              Muito Bom: 8 ou mais
            </Checkbox>
            <Checkbox
              value={7}
              onChange={() => handleRating(7)}
              checked={ratingCheck(7)}
            >
              Bom: 7 ou mais
            </Checkbox>
            <Checkbox
              value={6}
              onChange={() => handleRating(6)}
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
          <Button label="Pesquisar" disabled={false} onClick={handleSearch} />
        </div>
        <h4>{reservas.length} reservas encontradas</h4>
        <div className={styles.reservasContainer}>
          {reservas.map((reserva) => (
            <div className={styles.reservaContainer} key={reserva.id}>
              <img className={styles.reservaThumbnail} src={reserva.imageUrl} />
              <div className={styles.reservaInfoContainer}>
                <div className={styles.upperInfo}>
                  <div className={styles.titleAndClassification}>
                    <span className={styles.reservaTitle}>{reserva.nome}</span>
                    <div className={styles.classification}>
                      <span className={styles.classificationText}>{reserva.classificacao}</span>
                      <StarRateRoundedIcon />
                    </div>
                  </div>
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
                <div className={styles.reservaLowerInfo}>
                  <div className={styles.localAndRoomContainer}>
                    <span className={styles.reservaDetailsText}>
                      {reserva.cidade}, {reserva.estado}
                    </span>
                    <span className={styles.reservaDetailsText}>
                      Quartos: {getRoomTypes(reserva)}
                    </span>
                  </div>
                  <div className={styles.priceContainerContainer}>
                    <span className={styles.reservaDetailsText}>
                      A partir de
                    </span>
                    <span className={styles.reservaDetailsText}>
                      R$ {reserva.quartos[0].preco}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ReservasPage;
