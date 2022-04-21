import KeeperTable from "./components/KeeperTable/KeeperTable";
import KeeperFilter from "./components/KeeperFilters/KeeperFiilter";
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
      <KeeperTable yearSearch={selectedYear} teamSearch={selectedTeam} />
    </div>
  );
};

export default App;
