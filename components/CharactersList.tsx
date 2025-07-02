"use client";

import { Character } from "@/types/character";
import { ChevronDown, ChevronUp } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

const CharactersList = ({ characters }: { characters: Character[] }) => {
  const [showAll, setShowAll] = useState(false);

  const MAX_DISPLAY = 5;
  const displayedCharacters = showAll
    ? characters
    : characters.slice(0, MAX_DISPLAY);
  return (
    <div className="w-full flex flex-col gap-2 mt-1">
      {displayedCharacters.map((character, index) => (
        <div
          className="w-full bg-input-field-gray rounded-sm h-[80px] flex overflow-hidden font-poppins text-[11px]"
          key={index}
        >
          <div className="w-[60px] h-full relative">
            <Image
              src={character.image.medium || ""}
              alt="character image"
              fill
              className="object-cover"
            />
          </div>
          <div className="flex-1 h-full p-2 flex flex-col justify-between">
            <p>Full name: {character.name.full}</p>
            <p>Age: {character.age}</p>
            <p>Gender: {character.gender}</p>
          </div>
        </div>
      ))}

      {characters.length > MAX_DISPLAY && (
        <div className="w-full border-b-1 border-gray-600 flex justify-center mt-2">
          <button
            onClick={() => setShowAll(!showAll)}
            className="text-xs text-white font-poppins cursor-pointer flex items-center pb-1 font-semibold"
          >
            {showAll ? "Show Less" : `Show All (${characters.length})`}
            {showAll ? (
              <ChevronUp className="w-[18px] h-[14px]" />
            ) : (
              <ChevronDown className="w-[18px] h-[14px]" />
            )}
          </button>
        </div>
      )}
    </div>
  );
};

export default CharactersList;
