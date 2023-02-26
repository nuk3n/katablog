import { favoriteArticle, unfavoriteArticle } from '../../store/actions';
import { toast } from 'react-toastify';
import { useState } from 'react';

const useFavorite = (favorite, favoriteCount, slug) => {
  const [isFavorite, setIsFavorite] = useState(favorite);
  const [favorites, setFavorites] = useState(favoriteCount);

  const onFavoriteClick = async () => {
    await setIsFavorite(!isFavorite);
    if (isFavorite) {
      unfavoriteArticle(slug).then(() => {
        setIsFavorite(false);
        setFavorites(favorites - 1);
      });
    } else
      favoriteArticle(slug).then(() => {
        setIsFavorite(true);
        setFavorites(favorites + 1);
      });
  };

  const toastError = () => {
    toast.error('You are not authorized', {
      toastId: 'error',
    });
  };

  return {
    isFavorite,
    favorites,
    onFavoriteClick,
    setIsFavorite,
    setFavorites,
    toastError,
  };
};

export default useFavorite;
