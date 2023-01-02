import React from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { fetchDataByGenre } from "../Store/store";

const Select = ({ genres, type }) => {
  const dispatch = useDispatch();
  return (
    <SelectMenu
      onChange={(e) =>
        dispatch(fetchDataByGenre({ genre: e.target.value, type }))
      }
    >
      {genres.map((genre) => (
        <option value={genre.id} key={genre.id}>
          {genre.name}
        </option>
      ))}
    </SelectMenu>
  );
};

const SelectMenu = styled.select`
  margin-left: 5rem;
  cursor: pointer;
  font-size: 1.4rem;
  background-color: rgba(0, 0, 0, 0.4);
  color: white;
  padding: 0.4rem 1rem;
`;
export default Select;
