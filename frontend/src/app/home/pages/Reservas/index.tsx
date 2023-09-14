/* eslint-disable @typescript-eslint/no-unused-vars */
import axios from "axios";
import { useEffect, useState } from "react";
import styles from "./index.module.css";
import Select from "react-select";
import Slider from "@mui/material/Slider";
import StarRateRoundedIcon from "@mui/icons-material/StarRateRounded";
import CircularProgress from "@mui/material/CircularProgress";
import ReservaModel from "../../models/ReservasModel";
import Checkbox from "../../../../shared/components/Checkbox";
import InputField from "../../../../shared/components/InputField";
import Button from "../../../../shared/components/Button";

const minDistance = 10;

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
  baseURL: "http://127.0.0.1:8000/",
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
  const [reservas, setReservas] = useState<ReservaModel[]>([]);
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

  const getResultsText = (length: number) => {
    if (length > 0) return `${reservas.length} reservas encontradas`;

    return "Nenhuma reserva encontrada com esses critérios";
  }

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
    setIsLoading(true);
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
      const { data } = await apiService.get(`/reservas`, { params });
      const reservaModels = data.data.map(
        (reserva) => new ReservaModel(reserva)
      );
      setReservas(reservaModels);
    } catch (error) {
      console.log(error);
      setReservas([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadReservas();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getRoomTypes = (reserva) => {
    const roomTypes = reserva.rooms.map((room) => room.type);
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
            <div style={{ width: "50%", margin: "auto" }}>
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
              disabled={isLoading}
            >
              1 Estrela
            </Checkbox>
            <Checkbox
              value={2}
              onChange={() => handleClassification(2)}
              checked={classificationCheck(2)}
              disabled={isLoading}
            >
              2 Estrelas
            </Checkbox>
            <Checkbox
              value={3}
              onChange={() => handleClassification(3)}
              checked={classificationCheck(3)}
              disabled={isLoading}
            >
              3 Estrelas
            </Checkbox>
            <Checkbox
              value={4}
              onChange={() => handleClassification(4)}
              checked={classificationCheck(4)}
              disabled={isLoading}
            >
              4 Estrelas
            </Checkbox>
            <Checkbox
              value={5}
              onChange={() => handleClassification(5)}
              checked={classificationCheck(5)}
              disabled={isLoading}
            >
              5 Estrelas
            </Checkbox>
          </div>
          <div className={styles.filterTypeContainer}>
            <h5 className={styles.filterTitle}>Tipos de Quarto</h5>
            <Checkbox onChange={() => setIndvidualRoom(!individualRoom)} disabled={isLoading}>
              Individual
            </Checkbox>
            <Checkbox onChange={() => setdoubleRoom(!doubleRoom)} disabled={isLoading}>
              Duplo
            </Checkbox>
            <Checkbox onChange={() => setFamilyRoom(!familyRoom)} disabled={isLoading}>
              Familiar
            </Checkbox>
          </div>
          <div className={styles.filterTypeContainer}>
            <h5 className={styles.filterTitle}>Avaliação dos Hóspedes</h5>
            <Checkbox
              value={9}
              onChange={() => handleRating(9)}
              checked={ratingCheck(9)}
              disabled={isLoading}
            >
              Fantástico: 9 ou mais
            </Checkbox>
            <Checkbox
              value={8}
              onChange={() => handleRating(8)}
              checked={ratingCheck(8)}
              disabled={isLoading}
            >
              Muito Bom: 8 ou mais
            </Checkbox>
            <Checkbox
              value={7}
              onChange={() => handleRating(7)}
              checked={ratingCheck(7)}
              disabled={isLoading}
            >
              Bom: 7 ou mais
            </Checkbox>
            <Checkbox
              value={6}
              onChange={() => handleRating(6)}
              checked={ratingCheck(6)}
              disabled={isLoading}
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
            disabled={isLoading}
            testId={"searchInput"}
          />
          <Button
            label="Pesquisar"
            disabled={isLoading}
            onClick={handleSearch}
            testId={"searchButton"}
          />
        </div>
        <div className={styles.reservasContainer}>
          {isLoading ? (
            <div className={styles.loadingContainer}>
              <CircularProgress />
            </div>
          ) : (
            <>
              <h4 style={{margin: "auto"}} data-cy={"resultsMessage"}>{getResultsText(reservas.length)}</h4>
              {reservas?.map((reserva) => (
                <div className={styles.reservaContainer} key={reserva?.id}>
                  <img
                    className={styles.reservaThumbnail}
                    src={reserva?.imageUrl}
                  />
                  <div className={styles.reservaInfoContainer}>
                    <div className={styles.upperInfo}>
                      <div className={styles.titleAndClassification}>
                        <span className={styles.reservaTitle} data-cy={"reservaTitle"}>
                          {reserva.name}
                        </span>
                        <div className={styles.classification}>
                          <span className={styles.classificationText} data-cy={"classification"}>
                            {reserva.classification}
                          </span>
                          <StarRateRoundedIcon />
                        </div>
                      </div>
                      <div className={styles.ratingContainer}>
                        <div className={styles.ratingTextContainer}>
                          <span className={styles.reservaRatingText}>
                            {getRatingText(reserva.rating)}
                          </span>
                          <span className={styles.reservasRatingCount}>
                            {"32 Avaliações"}
                          </span>
                        </div>
                        <div className={styles.rating}>{reserva.rating}</div>
                      </div>
                    </div>
                    <p className={styles.reservaDescription}>
                      {reserva.description}
                    </p>
                    <div className={styles.reservaLowerInfo}>
                      <div className={styles.localAndRoomContainer}>
                        <span className={styles.reservaDetailsText}>
                          {reserva.city}, {reserva.state}
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
                          R$ {reserva.rooms[0].price}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ReservasPage;
