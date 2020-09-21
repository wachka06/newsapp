import React from "react";

const SearchBar = ({ userInput, sortBy, handleChange, handleSubmit }) => {
  return (
    <form className="SearchBar" onSubmit={handleSubmit}>
      <input
        className="UserInput"
        value={userInput}
        placeholder="Some search term"
        onChange={handleChange}
      />
      <select className="UserSelect" value={sortBy} onChange={handleChange}>
        <option value="">Sort Articles</option>
        <option value="publishedAt">Date</option>
        <option value="relevancy">Relevance</option>
        <option value="popularity">Popularity</option>
        <option value="">None</option>
      </select>
      <input className="SubmitButton" type="submit" value="Submit" />
    </form>
  );
};

export default SearchBar;
