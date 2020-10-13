import React from "react";

export const text = {
  default: "Sort Articles",
  publishedAt: "Date",
  relevancy: "Relevance",
  popularity: "Popularity",
  none: "None",
};

const SearchBar = ({ userInput, sortBy, handleChange, handleSubmit }) => {
  return (
    <form className="SearchBar" onSubmit={handleSubmit}>
      <input
        name="userInput"
        value={userInput}
        placeholder="Some search term"
        onChange={handleChange}
      />
      <select name="sortBy" value={sortBy} onChange={handleChange}>
        <option value="">{text.default}</option>
        <option value="publishedAt">{text.publishedAt}</option>
        <option value="relevancy">{text.relevancy}</option>
        <option value="popularity">{text.popularity}</option>
        <option value="">{text.none}</option>
      </select>
      <input type="submit" value="Submit" />
    </form>
  );
};

export default SearchBar;
