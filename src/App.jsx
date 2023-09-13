/* eslint-disable react/prop-types */
import { useQuery, gql } from "@apollo/client";
import { useState, useEffect } from "react";

const GET_POKEMON = gql`
  query samplePokeAPIquery {
    gen3_species: pokemon_v2_pokemonspecies(
      where: { pokemon_v2_generation: { name: {} } }
      order_by: { id: asc }
    ) {
      name
      id
      order
    }
  }
`;

function App() {
  const { loading, error, data } = useQuery(GET_POKEMON);
  const [selectedColor, setSelectedColor] = useState("bg-green-700");
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState("");

  useEffect(() => {
    if (data && data.gen3_species.length > 10) {
      setSelected(9);
    }
  }, [data]);

  if (loading)
    return <p className="text-center text-2xl text-green-700">Loading...</p>;

  if (error) return <p className="text-center text-2xl text-red-700">Error </p>;

  return (
    <div className="max-w-7xl mx-auto min-h-screen p-8">
      <h1 className="text-center text-5xl m-4 font-bold">Pokemons</h1>

      <input
        className="p-4 m-4 rounded-lg shadow-md font-bold w-full"
        type="text"
        placeholder="Search Pokemon by Name or ID"
        onChange={(e) => setSearch(e.target.value)}
      />
      <div className="flex justify-center items-center">
        <h2>Pick Color for Selection</h2>
        <div className="flex">
          <div
            className="bg-green-200 p-4 m-4 rounded-lg shadow-md font-bold hover:cursor-pointer"
            onClick={() => setSelectedColor("bg-green-700")}
          >
            Green
          </div>
          <div
            className="bg-blue-200 p-4 m-4 rounded-lg shadow-md font-bold hover:pointer hover:cursor-pointer"
            onClick={() => setSelectedColor("bg-blue-700")}
          >
            Blue
          </div>
          <div
            className="bg-red-200 p-4 m-4 rounded-lg shadow-md font-bold hover:pointer hover:cursor-pointer"
            onClick={() => setSelectedColor("bg-red-700")}
          >
            Red
          </div>
        </div>
      </div>
      <ul className="text-center">
        {data.gen3_species
          .filter(
            (pokemon) =>
              pokemon.name.toLowerCase().includes(search.toLowerCase()) ||
              pokemon.id.toString().includes(search)
          )
          .map((pokemon, index) => (
            <Pokemon
              key={pokemon.id}
              pokemon={pokemon}
              index={index}
              selectedColor={selectedColor}
              selected={selected}
              setSelected={setSelected}
            />
          ))}
      </ul>
    </div>
  );
}

export default App;

function Pokemon({ selectedColor, pokemon, selected, setSelected }) {
  return (
    <li
      onClick={() => setSelected(pokemon.id)}
      id={pokemon.id}
      className={`p-4 m-4 rounded-lg shadow-md font-bold cursor-pointer text-white ${
        selected === pokemon.id ? selectedColor : "bg-gray-700"
      }`}
    >
      {pokemon.id}: {pokemon.name}
    </li>
  );
}
