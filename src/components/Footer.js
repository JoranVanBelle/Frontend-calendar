import { IoArrowBackOutline, IoArrowForwardOutline } from "react-icons/io5";
import { useCallback } from "react";
import { useMaand } from "../contexts/MaandProvider";

export default function Footer() {
  const { maandIndex, setMaandIndex } = useMaand();

  const handleVorigeMaand = useCallback(() => {
    setMaandIndex(maandIndex - 1);
  }, [maandIndex, setMaandIndex]);

  const handleVolgendeMaand = useCallback(() => {
    setMaandIndex(maandIndex + 1);
  }, [maandIndex, setMaandIndex]);

  const vandaag = useCallback(() => {
    setMaandIndex(new Date().getMonth())
  }, [setMaandIndex]);

  return (
    <footer className="px-4 sm:py-1 lg:py-2 flex justify-center">
      <button onClick={handleVorigeMaand} className="border border-gray-300 rounded-lg px-4 pb-1 hover:bg-gray-500 hover:text-white">
        <IoArrowBackOutline className="pt-1 text-xl" />
      </button>
      <button className="mx-2 px-4 rounded-lg border border-gray-300 hover:bg-gray-500 hover:text-white" onClick={vandaag}>Vandaag</button>
      <button onClick={handleVolgendeMaand } className="border border-gray-300 rounded-lg px-4 pb-1 hover:bg-gray-500 hover:text-white">
        <IoArrowForwardOutline className="pt-1 text-xl" />
      </button>
    </footer>
  );
}
