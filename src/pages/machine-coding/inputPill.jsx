import { Input } from "@/components/ui/input";
import React, { useRef, useState } from "react";
import { dataofUseras } from "../../../data";

const InputPill = () => {
  const sourceofTruth = useRef(dataofUseras);
  const inputRef = useRef();
  const [selectedUsers, setSelectecUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState(dataofUseras);
  const [searchValue, setSeatchValue] = useState("");
  const SearchHandler = (strokes) => {
    setFilteredUsers(() => {
      const foundUsers = sourceofTruth.current.filter((i) => i.name.toLowerCase().includes(strokes.toLowerCase()))
      return foundUsers.length ? foundUsers : [{ id: 40, name: "No user found" }];
    });
  };

  const selectUserHanlder = (ID, user) => {
    setSelectecUsers((p) => [...p, user]);
    const updatedFilteredArray = sourceofTruth.current.filter((i) => i.id !== ID);
    sourceofTruth.current = updatedFilteredArray;
    setFilteredUsers(updatedFilteredArray);
    setSeatchValue("");
    inputRef.current.focus();
  };

  return (
    <div className="flex w-screen h-screen justify-center items-center">
      <div className="flex flex-col items-center gap-2 w-full max-w-xl">
        {/* {JSON.stringify(selectedUsers, null, 2)} */}
        <div className="flex items-center gap-4 w-full border !border-gray-200 rounded-md p-3">
          <div className="flex flex-wrap gap-2 items-center w-full">
            <Input
              ref={inputRef}
              value={searchValue}
            //   className="w-auto"
            className='!w-[65%] border-transparent'
              placeholder="Search user"
              onChange={(e) => {
                setSeatchValue(e.target.value);
                SearchHandler(e.target.value);
              }}
            />
            {selectedUsers.map((item) => {
              return <Pill key={item.id} name={item.name} />;
            })}
          </div>
        </div>

        <div className="w-full max-h-96 overflow-y-auto bg-gray-800 rounded-md p-4">
          {filteredUsers.map((item) => {
            return (
              <div
                key={item.id}
                onClick={() => {
                  selectUserHanlder(item.id, item);
                }}
                className="p-2 cursor-pointer hover:bg-gray-700 rounded-md transition-all ease-linear duration-150"
              >
                {item.name}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default InputPill;

const Pill = ({ name }) => {
  return (
    <p className="bg-gray-800 border text-xs border-gray-700 rounded-3xl min-w-20 px-2 h-6 flex justify-center items-center">
      {name}
    </p>
  );
};
