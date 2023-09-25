import { useEffect, useRef, useState } from "react";
import "./App.css";
import useFetch from "./hooks/useFetch";
import getRandomNumber from "./utils/getRandomNumber";
import LocationInfo from "./components/LocationInfo";
import ResidentCard from "./components/ResidentCard";
import Pagination from "./components/Pagination";
import Message from "./components/Message";

function App() {
  const [inputValue, setInputValue] = useState(getRandomNumber(126));

  const url = `https://rickandmortyapi.com/api/location/${inputValue}`;
  const [location, getLocation, hasError] = useFetch(url);

  useEffect(() => {
    getLocation();
  }, [inputValue]);

  const inputSearch = useRef();

  const handleSubmit = (e) => {
    e.preventDefault();
    const inputValueTrimmed = inputSearch.current.value.trim();
    setInputValue(inputValueTrimmed);
  };

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;
  const items = location?.residents || [];
  const totalPage = Math.ceil(items.length / itemsPerPage);

  const onPageChange = (page) => {
    setCurrentPage(page);
  };

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = items.slice(startIndex, endIndex);
  const maxVisibleItems = 6;

  const pageNumbers = [];
  for (let i = 1; i <= totalPage; i++) {
    pageNumbers.push(i);
  }

  return (
    <>
      <header className="header">
        <img src="/images/ricky-morty.png" alt="" />
      </header>
      <div>
        <form className="form" onSubmit={handleSubmit}>
          <input className="form__input" ref={inputSearch} type="text" />
          <button className="form__button">Search</button>
        </form>

        {hasError ? (
          <h2 className="error__mesagge">
            ❌ Hey! you must provide an id from 1 to a 126 🥺
          </h2>
        ) : (!inputValue || inputValue === "0" || !location || !location.residents) ? (
          <h2 className="error__message">
            ❌ Hey! you must provide an id from 1 to a 126 🥺
          </h2>
        ) : (
          <>
            <LocationInfo location={location} />
            {location.residents.length === 0 ? (
              <Message />
            ) : (
              <div className="container__cards">
                {currentItems.map((url) => (
                  <ResidentCard key={url} url={url} />
                ))}
              </div>
            )}
          </>
        )}
        <div className="pagination__container">
          {items.length > itemsPerPage && (
            <Pagination
              currentPage={currentPage}
              totalPages={totalPage}
              onPageChange={onPageChange}
              maxVisibleItems={maxVisibleItems}
            />
          )}
        </div>
      </div>
    </>
  );
}

export default App;
