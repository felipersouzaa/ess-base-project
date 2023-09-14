import axios from 'axios';
import React, { useState } from 'react';
import styles from './index.module.css';

const apiService = axios.create({
  baseURL: 'http://127.0.0.1:8000',
});

interface AvaliaPageProps {
  onSubmit: (ratings: Record<string, number>, comment: string) => void;
}

const AvaliaPage: React.FC<AvaliaPageProps> = ({ onSubmit }) => {
  const [categoryRatings, setCategoryRatings] = useState<Record<string, number>>(
    {
      'Localização': -1,
      'Atendimento': -1,
      'Infraestrutura': -1,
      'Limpeza': -1,
      'Conforto': -1,
      'Serviços Ofertados': -1,
    }
  );

  const [comment, setComment] = useState<string>('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await apiService.post('/avaliacoes', {
        user: "MockUser",
        name: "MockReserva",
        rate_local: categoryRatings['Localização'],
        rate_service: categoryRatings['Atendimento'],
        rate_structure: categoryRatings['Infraestrutura'],
        rate_clean: categoryRatings['Limpeza'],
        rate_confort: categoryRatings['Conforto'],
        rate_offer: categoryRatings['Serviços Ofertados'],
        rate_comment: comment
      },
      {
        headers: {},
        params: {
          user: "MockUser",
          name: "MockReserva",
          rate_local: categoryRatings['Localização'],
          rate_service: categoryRatings['Atendimento'],
          rate_structure: categoryRatings['Infraestrutura'],
          rate_clean: categoryRatings['Limpeza'],
          rate_confort: categoryRatings['Conforto'],
          rate_offer: categoryRatings['Serviços Ofertados'],
          rate_comment: comment          
        }
      }
      );

      onSubmit(categoryRatings, comment);
      console.log('Response:', response.data);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleRatingChange = (category: string, value: number) => {
    setCategoryRatings(prevRatings => ({
      ...prevRatings,
      [category]: value
    }));
  };

  const handleCommentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setComment(e.target.value);
  };

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit}>
        <div className={styles.returnButtonContainer}>
          <button
            className={styles.returnButton}
            type="button"
            onClick={() => window.history.back()}
          >
            Retornar
          </button>
        </div>
        <div className={styles.RatingName}>
          Avaliação de 'MockUser' para 'MockReserva'
        </div>
        {Object.keys(categoryRatings).map(category => (
          <div className={styles.categoryContainer} key={category}>
            <label className={styles.categoryLabel}>
              {category}
            </label>
            <div className={styles.ratingOptions}>
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(value => (
                <label className={styles.radioLabel} key={value}>
                  <input
                    type="radio"
                    name={category}
                    value={value.toString()}
                    checked={categoryRatings[category] === value}
                    onChange={() => handleRatingChange(category, Number(value))}
                  />
                  {value}
                </label>
              ))}
            </div>
          </div>
        ))}
        <div className={styles.textareaContainer}>
          <textarea
            className={styles.inputField}
            value={comment}
            onChange={handleCommentChange}
            placeholder="Deixe um comentário!"
          />
        </div>
        <div className={styles.buttonContainer}>
          <button type="submit" className={styles.button}>
            Enviar
          </button>
        </div>
      </form>
    </div>
  );
};

export default AvaliaPage;