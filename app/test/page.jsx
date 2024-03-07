"use client";

import React, { useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';


const selectedInterests = [
  "All",
  "People",
  "Question",
  "Feeds",
  "Events",
  "Companies",
];

const searchData = {
  People: [
    {
      id: 1,
      title: "Purshottam Kumar Singh",
      position: "Co-founder and CTO @ Echelon Ex...",
      category: "Artificial Intelligence",
    },
    {
      id: 2,
      title: "Preet Harpal Singh",
      position: "Co-founder and CTO @ Echelon Ex...",
      category: "Business",
    },
  ],
  Question: [
    {
      id: 1,
      title: "What is scania?",
      answer: "1 Answers",
      category: "Artificial Intelligence",
    },
    {
      id: 2,
      title: "How much does Scania cost multi-axle?",
      answer: "8 Answers",
      category: "Businessdsvniroh",
    },
  ],
  Feeds: [
    {
      id: 1,
      title: "What is scania?",
      answer: "1 Answers",
      category: "Artificial Intelligence",
    },
    {
      id: 2,
      title: "How much does Scania cost multi-axle?",
      answer: "8 Answers",
      category: "Business",
    },
  ],
};

const interests = [
  { id: "1", name: "Artificial Intelligence", isSelected: false },
  { id: "2", name: "Business", isSelected: false },
  { id: "3", name: "People", isSelected: false },
  { id: "4", name: "Question", isSelected: false },
  { id: "5", name: "CRM", isSelected: false },
  { id: "6", name: "Crypto", isSelected: false },
  { id: "7", name: "Information Technology", isSelected: false },
  { id: "8", name: "Ed-Tech", isSelected: false },
  { id: "9", name: "Entertainment", isSelected: false },
  { id: "10", name: "Finance", isSelected: false },
  { id: "11", name: "Forecasting", isSelected: false },
  { id: "12", name: "Food & Drink", isSelected: false },
  { id: "13", name: "Graphics & Design", isSelected: false },
  { id: "14", name: "Health & Fitness", isSelected: false },
  { id: "15", name: "Jobs & Recruitment", isSelected: false },
  { id: "16", name: "Lifestyle", isSelected: false },
  { id: "17", name: "Maps & Navigation", isSelected: false },
  { id: "18", name: "News", isSelected: false },
  { id: "19", name: "Photo & Video", isSelected: false },
  { id: "20", name: "Productivity", isSelected: false },
  { id: "21", name: "Real Estate", isSelected: false },
];

const Test = () => {
  const [selectedCategories, setSelectedCategories] = useState([]);
  console.log(selectedCategories, "66")

  const [filterData, setFilterData] = useState([]);
  const [search, setSearch] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  console.log(suggestions, "77")


  // const handleCategoryToggle = (category) => {
  //   let updatedCategories = [...selectedCategories];

  //   console.log(category, "22")
  //   const index = updatedCategories.indexOf(category);
  //   console.log(index, "33")

  //   if (index > -1) {
  //     updatedCategories.splice(index, 1);
  //     console.log(updatedCategories, "44")
  //   } else if (updatedCategories.length > 0) {
  //     updatedCategories = [category];
  //   }
  //   else {
  //     updatedCategories.push(category);
  //     console.log(updatedCategories, "55")
  //   }
  //   setSelectedCategories(updatedCategories);

  // };

  const handleCategoryToggle = (category) => {
    let updatedCategories = [...selectedCategories];
    if (category === "All") {
      updatedCategories = updatedCategories.includes("All") ? [] : ["All"];
    } else {
      updatedCategories = updatedCategories.filter(cat => cat != "All");
      const index = updatedCategories.indexOf(category);
      if (index > -1) {
        updatedCategories.splice(index, 1);
      } else {
        updatedCategories.push(category);
      }
    }
    setSelectedCategories(updatedCategories);
    filterBasedOnInterests(updatedCategories);
  }


  const filterBasedOnInterests = (selectedInterests) => {
    if (selectedInterests.includes("All")) {
      setFilterData(Object.values(searchData).flat());
    } else {
      const filteredData = Object.keys(searchData)
        .filter(category => selectedInterests.includes(category))
        .flatMap(category => searchData[category]);
      setFilterData(filteredData);
    }
  };

  const handleCheckBox = (category) => {
    handleCategoryToggle(category);
  };

  const handleSearch = (event) => {
    const value = event.target.value;
    setSearch(value);
    filterBasedOnSearch(value);
  };

  const filterBasedOnSearch = (value) => {
    if (!value) {
      filterBasedOnInterests(selectedCategories);
    } else {
      const filteredSuggestions = Object.values(searchData).flat().filter((item) =>
        item.title.toLowerCase().includes(value.toLowerCase()));
      setFilterData(filteredSuggestions);
    }
  };

  // const handleCheckBox = (category) => {
  //   const updatedCategories = [...selectedCategories];

  //   const index = updatedCategories.indexOf(category);
  //   if (index > -1) {
  //     updatedCategories.splice(index, 1)
  //   } else {
  //     updatedCategories.push(category)
  //   }
  //   setSelectedCategories(updatedCategories);
  // }

  // const filterData = selectedCategories.includes("All") ? Object.values(searchData).flat() :
  //   Object.keys(searchData).flat().filter((category) => selectedCategories.includes(category))
  //     .map((category) => searchData[category]).flat();




  // const handleSearch = (event) => {
  //   const value = event.target.value;
  //   setSearch(value);
  //   if (value === "") {
  //     setSelectedCategories([]);
  //   } else {
  //     const filteredSuggestions = Object.values(searchData).flat().filter((item) =>
  //       item.title.toLowerCase().includes(value.toLowerCase()));
  //     setSelectedCategories(filteredSuggestions);

  //   }
  // };


  return (
    <>
      <div className="input-group w-50 mx-auto mt-5">
        <input
          type="search"
          id="form1"
          className="form-control"
          onChange={handleSearch}
          value={search}
        />
      </div>

      {/* Suggestions */}
      <div>
        {selectedCategories.map((item, index) => (
          <div key={index} className="suggestion">
            <p>{item.title}</p>
          </div>
        ))}
      </div>

      {/* Category */}
      <div className="anme flex justify-center gap-5 mt-5">
        {selectedInterests.map((item, index) => {
          return (
            <ul key={index} className="flex">
              <li>
                <button
                  className={`btn border ${selectedCategories.includes(item) ? `act` : ""
                    }`}
                  onClick={() => handleCategoryToggle(item)}
                >
                  {item}
                </button>
              </li>
            </ul>
          );
        })}
      </div>

      {/* Sub Category */}
      <div className="cat ml-5">
        {interests.map((item, index) => {
          return (
            <div className="form-check" key={index}>
              <input
                className="form-check-input"
                type="checkbox"
                value=""
                id={`category-${index}`}
                onChange={() => handleCheckBox(item.name)}
              />
              <label className="form-check-label" htmlFor={`category-${index}`}>
                {item.name}
              </label>
            </div>
          );
        })}
      </div>

      <div>
        {filterData.map((item) => (
          <div key={item.id} className="text-white">
            <p>Title: {item.title}</p>
            <p>Category: {item.category}</p>
          </div>
        ))}
      </div>
    </>
  );
};

export default Test;