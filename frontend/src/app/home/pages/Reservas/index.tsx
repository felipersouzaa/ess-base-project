import axios from "axios";
import { useEffect, useState } from "react";
import styles from "./index.module.css";
import Select from "react-select";
import Slider from "@mui/material/Slider";
import CircularProgress from "@mui/material/CircularProgress";
import ReservaModel from "../../models/ReservasModel";
import Checkbox from "../../../../shared/components/Checkbox";
import InputField from "../../../../shared/components/InputField";
import Button from "../../../../shared/components/Button";
import { SLIDER_MIN_DISTANCE, cityOptions, selectStyles, stateOptions } from "../../utils/reservas";
import ReservaCard from "../../../../shared/components/ReservaCard/Index";

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
        Math.min(newValue[0], priceRange[1] - SLIDER_MIN_DISTANCE),
        priceRange[1],
      ]);
    } else {
      setPriceRange([
        priceRange[0],
        Math.max(newValue[1], priceRange[0] + SLIDER_MIN_DISTANCE),
      ]);
    }
  };

  const classificationCheck = (value: number) => value === classification;

  const ratingCheck = (value: number) => value == rating;

  const getResultsText = (length: number) => {
    if (length > 0) return `${reservas.length} reservas encontradas`;

    return "Nenhuma reserva encontrada com esses critérios";
  }

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
                data-cy="slider"
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
                <ReservaCard key={reserva.id} reserva={reserva} />
              ))}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ReservasPage;
