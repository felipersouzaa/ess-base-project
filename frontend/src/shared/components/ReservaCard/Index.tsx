import styles from "./index.module.css";
import StarRateRoundedIcon from "@mui/icons-material/StarRateRounded";

const ReservaCard = (props) => {

  const { reserva } = props;

  const getRatingText = (rating: number) => {
    if (rating >= 9) return "Fantástico";
    if (rating >= 8) return "Muito Bom";
    if (rating >= 7) return "Bom";
    if (rating >= 6) return "Satisfatório";

    return "";
  };

  const getRoomTypes = (reserva) => {
    const roomTypes = reserva.rooms.map((room) => room.type);
    return roomTypes.join(", ");
  };

  return (
    <div className={styles.reservaContainer} key={reserva?.id}>
      <img className={styles.reservaThumbnail} src={reserva?.imageUrl} />
      <div className={styles.reservaInfoContainer}>
        <div className={styles.upperInfo}>
          <div className={styles.titleAndClassification}>
            <span className={styles.reservaTitle} data-cy={"reservaTitle"}>
              {reserva.name}
            </span>
            <div className={styles.classification}>
              <span
                className={styles.classificationText}
                data-cy={"classification"}
              >
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
        <p className={styles.reservaDescription}>{reserva.description}</p>
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
            <span className={styles.reservaDetailsText}>A partir de</span>
            <span className={styles.reservaDetailsText}>
              R$ {reserva.rooms[0].price}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReservaCard;