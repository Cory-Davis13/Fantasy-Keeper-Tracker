import KeeperTable from "./components/KeeperTable/KeeperTable";
import KeeperFilter from "./components/KeeperFilters/KeeperFiilter";
import SuccessMessage from "./components/UI/SuccessMessage";
import { useState } from "react";
import "./App.css";

const App = () => {
  const [selectedYear, setSelectedYear] = useState("");
  const [selectedTeam, setSelectedTeam] = useState("");

  const yearHandler = (year) => {
    setSelectedYear(year);
  };

  const teamHandler = (team) => {
    setSelectedTeam(team);
  };

  return (
    <div>
      <KeeperFilter
        handleSelectedYear={yearHandler}
        handleSelectedTeam={teamHandler}
      />
      {document.location.pathname.includes("success") && <SuccessMessage />}
      <KeeperTable yearSearch={selectedYear} teamSearch={selectedTeam} />
    </div>
  );
};

export default App;
