import styles from './constructor-page.module.css';
import { FC } from 'react';

import { BurgerIngredients, BurgerConstructor } from '../../components';
import { Preloader } from '@ui';
import { selectIsLoading } from '../../services/slices/ingredientsSlice';
import { useSelector } from '../../services/store';
export const ConstructorPage: FC = () => {
  /** TODO: взять переменную из стора*/
  const isLoadingIngredients = useSelector(selectIsLoading);
  return (
    <>
      {isLoadingIngredients ? (
        <Preloader />
      ) : (
        <main className={styles.containerMain}>
          <h1
            className={`${styles.title} text text_type_main-large mt-10 mb-5 pl-5`}
          >
            Соберите бургер
          </h1>
          <div className={`${styles.main} pl-5 pr-5`}>
            <BurgerIngredients />
            <BurgerConstructor />
          </div>
        </main>
      )}
    </>
  );
};
