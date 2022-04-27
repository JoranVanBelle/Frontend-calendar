import logo from "../Images/logo.png";
import { useMaand } from "../contexts/MaandProvider";
import { useLogout, useSession } from "../contexts/AuthProvider";
import { useCallback } from "react";

export default function Header() {
  const { maandIndex } = useMaand();
  const { user} = useSession();
  const logout = useLogout();

  const handleLogout = useCallback(() => {
    logout();
  }, [logout]);

  let huidigeDatum = new Date(2021, Number(maandIndex));
  const namen = [
    "December",
    "Januari",
    "Februari",
    "Maart",
    "April",
    "Mei",
    "Juni",
    "Juli",
    "Augustus",
    "September",
    "Oktober",
    "November",
  ];
  return (
    <header className="sm:py-1 px-4 lg:py-2 grid grid-cols-2 bg-gradient-to-r from-gray-400 to-white">
      {/* Cel 1 */}
      <div className="flex items-center">
        <img src={logo} alt="Logo agenda" className="mr-2 w-11 h-11" />
        <h1 className="mr-10 text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-gray-100 to-white">
          Agenda
        </h1>
        <h2 className="ml-4 text-xl flex justify-start texy-gray-500 font-bold text-transparent bg-clip-text bg-gradient-to-r from-gray-100 to-white">
          {maandIndex > -2
            ? namen[(maandIndex + 1 + 12) % 12]
            : namen[(maandIndex + 1 + 12 * -maandIndex) % 12]}
          {"\t"}
          {huidigeDatum.getFullYear()}
        </h2>
      </div>
      {/* Cel 2 */}
      <div className="flex flex-row-reverse items-center">
        <h2 onClick={handleLogout} className="hover: cursor-pointer text-xl font-bold">
          { user ? 
           "Welkom " + user.name.split(' ')[0]
          :
          "Laden..."
        }
        </h2>
      </div>
    </header>
  );
}
