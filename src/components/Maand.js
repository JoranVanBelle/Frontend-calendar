import React, { useState, useEffect } from "react";
import Dag from "./Dag";
import { useMaand } from "../contexts/MaandProvider";
import { useEvents } from "../contexts/EventProvider";
import ErrorMessage from "./ErrorMessage";

export function getMaand(maand = new Date().getMonth()) {
  const jaar = new Date().getFullYear();
  maand = Math.floor(maand);
  const eersteDagMaand = new Date(jaar, maand).getDay() - 1; // -1 zodat maandag 0 is ipv zondag
  let maandTeller = 0 - eersteDagMaand;
  const maanden = new Array(5).fill([]).map(() => {
    return new Array(7).fill(null).map(() => {
      maandTeller++; // Om de dagen te laten optellen, zonder dit is het enkel de huidige datum die weergegeven wordt
      return new Date(jaar, maand, maandTeller);
    });
  });

  return maanden;
}

export function Maand() {
  const [currentMonth, setCurrentMonth] = useState(getMaand());
  const { maandIndex } = useMaand();
  const { error, loading } = useEvents();

  useEffect(() => {
    setCurrentMonth(getMaand(maandIndex));
  }, [maandIndex]); // moet updaten wanneer maandIndex verandert

  if(loading) {
    return <h1 data-cy="loading">Laden...</h1>
  };

  return (
    <>
    {
        error ? (
          // history.push('/login') // Geeft error in FireFox -> SecurityError: The operation is insecure.
          <div>
          <ErrorMessage error={error} />
          <p className="text-red-500">
            U bent te lang aangemeld <br />
            Gelieve uw pagina te refreshen
          </p>
          </div>
          ) : (
            <div className="flex-1 grid grid-cols-7 grid-rows-5">
            {currentMonth.map((week, i) =>
              week.map((dag, j) => <Dag dag={dag} key={j} weekind={i} />) // Ieder vak zijn ID is de plaats in de array
            )}
          </div>
          )
    }
    </>
  );
}