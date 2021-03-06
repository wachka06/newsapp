import React from "react";

export const text = {
  defaultLn: "Language",
  en: "EN",
  jp: "JP",
  zh: "ZH",
  default: "Sort Articles",
  publishedAt: "Date",
  relevancy: "Relevance",
  popularity: "Popularity",
  none: "None",
};

const SearchBar = ({
  userInput,
  userLang,
  sortBy,
  handleChange,
  handleSubmit,
}) => {
  return (
    <form className="SearchBar" onSubmit={handleSubmit}>
      <input
        name="userInput"
        value={userInput}
        placeholder="Some search term"
        onChange={handleChange}
      />
      <select name="userLang" value={userLang} onChange={handleChange}>
        <option value="">{text.defaultLn}</option>
        <option value="en">{text.en}</option>
        <option value="jp">{text.jp}</option>
        <option value="zh">{text.zh}</option>
      </select>
      <select name="sortBy" value={sortBy} onChange={handleChange}>
        <option value="">{text.default}</option>
        <option value="publishedAt">{text.publishedAt}</option>
        <option value="relevancy">{text.relevancy}</option>
        <option value="popularity">{text.popularity}</option>
        <option value="">{text.none}</option>
      </select>
      <input type="submit" value="Search" />
    </form>
  );
};

export default SearchBar;
