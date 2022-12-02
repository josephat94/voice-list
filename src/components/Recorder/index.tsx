import { MicrophoneIcon } from "@heroicons/react/24/solid";
import React, { useEffect } from "react";
import useSpeechToText from "react-hook-speech-to-text";
import { useDispatch } from "react-redux";
import {
  addToList,
  setCurrentText,
  setIsRecording,
  setItems,
} from "../../store/reducers/list-reducer";

export default function Recorder() {
  const {
    error,
    interimResult,
    isRecording,
    results,
    startSpeechToText,
    stopSpeechToText,
  } = useSpeechToText({
    continuous: true,
    useLegacyResults: false,
  });

  const dispatch = useDispatch();

  if (error) return <p>Web Speech API is not available in this browser 🤷‍</p>;

  useEffect(() => {
    dispatch(setCurrentText(interimResult));
  }, [interimResult]);

  const onStart = () => {
    dispatch(setIsRecording(true));
    startSpeechToText();
  };
  const onEnd = () => {
    if (interimResult && interimResult !== "") {
      dispatch(addToList(interimResult));
    }
    dispatch(setIsRecording(false));
    setTimeout(() => {
      stopSpeechToText();
    }, 500);
  };
  return (
    <div className=" w-auto text-red-500 flex flex-col justify-end items-center  py-4">
      <h1 className="text-[1rem] mb-4 font-semibold flex">
        Mantén presionado para grabar
        <MicrophoneIcon className="ml-2 w-6 h-6" />
      </h1>
      <button
        className="w-[9.375rem] h-[9.375rem] rounded-[50%] border-[.125rem] border-solid border-red-400 cursor-pointer hover:bg-red-400 hover:text-white transition-all duration-150 shadow-sm hover:shadow-xl"
        onTouchStart={onStart}
        onTouchEnd={onEnd}
        onMouseUp={onEnd}
        onMouseDown={onStart}
      >
        {isRecording ? "Suelta para detener" : "Iniciar grabación"}
      </button>
    </div>
  );
}
