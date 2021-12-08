import React from 'react';

function SearchForm() {
  return (
    <form>
      <input
        type="text"
        data-testid="search-input"
      />
      <button type="button">Enviar</button>
    </form>
  );
}

export default SearchForm;
