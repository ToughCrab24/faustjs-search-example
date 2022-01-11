import React, { Dispatch, SetStateAction } from "react";

import styles from "scss/components/SearchForm.module.scss";

interface Props {
  query: string | string[];
  setQuery: Dispatch<SetStateAction<string>>;
  onFormSubmit?: (e: any) => void;
}

function SearchForm({ query, setQuery, onFormSubmit }: Props): JSX.Element {
  return (
    <form onSubmit={onFormSubmit} className={`${styles.form__group} field`}>
      <input
        className={`${styles.form__field}`}
        name="search"
        placeholder="Search..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <label htmlFor="search" className={styles.form__label}>
        Search
      </label>
    </form>
  );
}

export default SearchForm;
