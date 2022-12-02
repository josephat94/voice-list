import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { checkItem, setItems } from "../../store/reducers/list-reducer";
import { RootState } from "../../store/store";
import { CheckIcon } from "@heroicons/react/24/solid";
import { PencilIcon } from "@heroicons/react/24/solid";
const List = () => {
  const { currentText, isRecording, items } = useSelector(
    (state: RootState) => state.list
  );
  const [enableEdit, setEnableEdit] = useState(false);

  const [listName, setListName] = useState("Lista nueva...");
  const [enableListEdit, setEnableListEdit] = useState(false);
  const [productName, setProductName] = useState("");
  const dispatch = useDispatch();
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (listRef.current && listRef.current.focus) {
      listRef.current.focus();
    }
  }, [enableListEdit]);

  useEffect(() => {
    if (inputRef.current && inputRef.current.focus) {
      inputRef.current.focus();
    }
  }, [enableEdit]);
  return (
    <div className="flex flex-col w-full ">
      <div className="py-4 flex justify-between items-center">
        {enableListEdit ? (
          <input
            ref={listRef}
            onKeyDown={(e) => {
              if (e.code === "Enter") {
                setEnableListEdit(false);
              }
            }}
            className="h-[3.25rem] w-full px-4"
            value={listName}
            onChange={(e) => setListName(e.target.value)}
            onBlur={() => setEnableListEdit(false)}
          />
        ) : (
          <p className="text-lg  font-semibold">{listName}</p>
        )}

        {!enableListEdit ? (
          <PencilIcon
            className="w-7 h-7 text-red-400 ml-4"
            onClick={() => {
              setEnableListEdit(!enableListEdit);
            }}
          />
        ) : (
          <CheckIcon
            className="w-8 h-8 text-red-400 ml-4"
            onClick={() => {
              setEnableListEdit(!enableListEdit);
            }}
          />
        )}
      </div>
      <div className="w-full h-[.0625rem] bg-gray-400 mb-2"></div>

      <ul className="w-full">
        {items.map((item, index) => (
          <li
            key={"item_result_" + index}
            className="flex w-full items-center justify-between py-2 slide-in-fwd-center"
          >
            <div className="w-full flex items-center justify-start capitalize">
              <div
                onClick={() => {
                  dispatch(checkItem(index));
                }}
                className={`w-6 h-6 min-w-6 min-h-6 border-[1px] border-solid border-blue-200 rounded-sm mr-2 flex items-center justify-center cursor-pointer ${
                  item.checked && "bg-red-400"
                }`}
              >
                {item.checked && <CheckIcon className="w-6 h-6 text-white" />}
              </div>

              {enableEdit && productName === item.item ? (
                <input
                  className="w-full h-[2.625rem] px-2"
                  ref={inputRef}
                  type="text"
                  value={productName}
                  onKeyDown={(e) => {
                    if (e.code === "Enter") {
                      setEnableEdit(false);
                      let itemsCopy = [...items];
                      itemsCopy[index] = {
                        ...itemsCopy[index],
                        item: productName,
                      };
                      dispatch(setItems(itemsCopy));
                    }
                  }}
                  onChange={(e) => setProductName(e.target.value)}
                />
              ) : (
                <p className={`${item.checked && "line-through opacity-60"}`}>
                  {item.item}
                </p>
              )}
            </div>

            <PencilIcon
              onClick={() => {
                setProductName(item.item ?? "");
                setEnableEdit(!enableEdit);
              }}
              className="text-[1rem] w-7 h-7 ml-4 text-red-400 cursor-pointer hover:scale-105"
            />
          </li>
        ))}
        {isRecording && <li className="slide-in-blurred-top">{currentText}</li>}
      </ul>
    </div>
  );
};

export default List;
