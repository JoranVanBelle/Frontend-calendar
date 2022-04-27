import Header from "../components/Header";
import { Maand } from "../components/Maand";
import Footer from "../components/Footer";
import SideBar from "../components/SideBar";

export default function Home() {
  return (
        <div className="h-screen flex flex-col overflow-hidden">
          <Header />
          <div className="flex flex-1">
            <SideBar />
            <Maand />
          </div>
          <Footer />
        </div>
  );
}
