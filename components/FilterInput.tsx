"use client";

import { ChevronDown, ChevronUp } from "lucide-react";
import { Input } from "./ui/input";
import { Dispatch, SetStateAction, useState } from "react";

type Props = {
  title: string;
  placeholder: string;
  //   onDownButtonClick: () => {};
  filterList: string[];
  selectedList: string[];
  statusList: number[];
  selectedListSetter: Dispatch<SetStateAction<string[]>>;
  statusListSetter: Dispatch<SetStateAction<number[]>>;
};

const FilterInput = ({
  title,
  placeholder,
  filterList,
  selectedList = [],
  statusList = [],
  selectedListSetter,
  statusListSetter,
}: Props) => {
  const [isListOut, setIsListOut] = useState(false);
  const [filterListRef, setFilterListRef] = useState(filterList);
  const [selectorStatusArray, setSelectorStatusArray] = useState(
    Array(filterList.length).fill(-1)
  );
  const onSearchList = (value: string) => {
    setFilterListRef(filterList.filter((e) => e.includes(value)));
  };

  const onSelect = (item: string, buttonIndex: number) => {
    if (!selectedListSetter || !statusListSetter) {
      console.log("!selectedListSetter || !statusListSetter");
      return;
    }

    const index = selectedList.indexOf(item);

    if (index === -1) {
      // Step 1: Add new tag with status 0 - included
      selectedListSetter([...selectedList, item]);
      statusListSetter([...statusList, 0]);
      const selectorStatusArrayUpdated = [...selectorStatusArray];
      selectorStatusArrayUpdated[buttonIndex] = 0;
      setSelectorStatusArray(selectorStatusArrayUpdated);
    } else if (statusList[index] === 0) {
      // Step 2: Change status from 0 to 1 - excluded
      const updatedStatus = [...statusList];
      updatedStatus[index] = 1;
      statusListSetter(updatedStatus);
      const selectorStatusArrayUpdated = [...selectorStatusArray];
      selectorStatusArrayUpdated[buttonIndex] = 1;
      setSelectorStatusArray(selectorStatusArrayUpdated);
    } else {
      // Step 3: Remove tag and its status - not selected
      const newSelected = [...selectedList];
      const newStatus = [...statusList];
      newSelected.splice(index, 1);
      newStatus.splice(index, 1);
      selectedListSetter(newSelected);
      statusListSetter(newStatus);
      const selectorStatusArrayUpdated = [...selectorStatusArray];
      selectorStatusArrayUpdated[buttonIndex] = -1;
      setSelectorStatusArray(selectorStatusArrayUpdated);
    }
  };

  const OnSelectedListClick = (item: string) => {
    const index = selectedList.indexOf(item);

    // Step 3: Remove tag and its status
    const newSelected = [...selectedList];
    const newStatus = [...statusList];
    newSelected.splice(index, 1);
    newStatus.splice(index, 1);
    selectedListSetter(newSelected);
    statusListSetter(newStatus);

    const buttonIndex = filterListRef.indexOf(item);
    const selectorStatusArrayUpdated = [...selectorStatusArray];
    selectorStatusArrayUpdated[buttonIndex] = -1;
    setSelectorStatusArray(selectorStatusArrayUpdated);
  };
  return (
    <div className="flex flex-col items-start">
      <h3>{title}</h3>
      <div className="bg-input-field-gray flex w-full rounded-sm items-center justify-between ">
        <Input
          placeholder={placeholder}
          className="rounded-l-sm rounded-r-none border-0 focus:border-purple-500 focus:ring-purple-500 focus:outline-none"
          onClick={() => {
            if (!isListOut) setIsListOut(!isListOut);
          }}
          onChange={(e) => {
            onSearchList(e.target.value);
          }}
        />
        <div
          className="px-2 rounded-r-sm cursor-pointer"
          onClick={() => {
            setIsListOut(!isListOut);
          }}
        >
          {" "}
          {isListOut ? <ChevronUp /> : <ChevronDown />}
        </div>
      </div>
      <div
        className={`w-full pr-10 overflow-hidden transition-all duration-500 ${
          isListOut ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="flex flex-col gap-1 bg-input-field-gray border-t p-2 rounded-b items-start max-h-[200px] overflow-y-auto">
          <p className="font-light text-light-gray">
            Click once to include, twice to exclude
          </p>{" "}
          <div className="flex gap-1 flex-wrap bg-input-field-gray rounded-b">
            {filterListRef.length === 0 && (
              <p>Hm.. no genres match your search.</p>
            )}
            {filterListRef.map((element, index) => (
              <div
                key={element}
                className={`cursor-pointer ${
                  selectorStatusArray[index] === 0
                    ? "bg-green-600"
                    : selectorStatusArray[index] === 1
                    ? "bg-red-400"
                    : "bg-black"
                } rounded-sm px-2 py-1 text-[16px]`}
                onClick={() => {
                  onSelect(element, index);
                }}
              >
                {element}
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="flex gap-1 mt-2 flex-wrap pr-10">
        {selectedList.length === 0 ? (
          <div
            className={`bg-black  rounded-sm text-[16px] px-2 py-1 font-zain`}
          >
            Any {title}{" "}
          </div>
        ) : (
          selectedList.map((selectedItem, index) => (
            <div
              key={index}
              onClick={() => {
                OnSelectedListClick(selectedItem);
              }}
              className={`${
                statusList[index] === 0 ? "bg-green-600" : "bg-red-400"
              } rounded-sm text-[16px] px-2 py-1 font-zain cursor-pointer`}
            >
              {selectedItem}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default FilterInput;
