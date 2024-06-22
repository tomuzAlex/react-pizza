import React from 'react';
import debounce from 'lodash.debounce';
import { useDispatch } from 'react-redux';

import inputIcon from '../../accert/img/inputIcon.svg';
import styles from './Search.module.scss';
import closeIcon from '../../accert/img/closeIcon.svg';

import { setSearchValue } from '../../redux/slices/filterSlice.ts';

export const Search: React.FC = () => {
  const dispatch = useDispatch();
  const [value, setValue] = React.useState('');
  const inputRef = React.useRef<HTMLInputElement>(null);

  const updateSearchValue = React.useCallback(
    debounce((valueString: string) => {
      dispatch(setSearchValue(valueString));
    }, 250),
    [],
  );

  const onChangeInput = (event: React.ChangeEvent <HTMLInputElement>) => {
    const inputValue = event.target.value;
    setValue(inputValue);
    updateSearchValue(inputValue);
  };

  const onClickClear = () => {
    setSearchValue('');
    setValue('');
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  return (
    <div className={styles.root}>
      <img className={styles.icon} src={inputIcon} alt="Иконка поиска" />
      <input
        ref={inputRef}
        className={styles.input}
        value={value}
        onChange={onChangeInput}
        type="text"
        placeholder="Поиск пиццы..."
      />
      {value && (
        <button className={styles.button} onClick={onClickClear}>
          <img className={styles.closeIcon} src={closeIcon} alt="Иконка закрытия" />
        </button>
      )}
    </div>
  );
};

export default Search;
