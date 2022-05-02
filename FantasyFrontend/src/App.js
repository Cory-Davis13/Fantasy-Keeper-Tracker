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

  const successMessage = () => {
    return (
      <div id="success-msg">
        <h1>Form Submitted!</h1>
      </div>
    );
  };

  return (
    <div>
      <KeeperFilter
        handleSelectedYear={yearHandler}
        handleSelectedTeam={teamHandler}
      />
      {document.location.pathname.includes("success") && successMessage()}
      <KeeperTable yearSearch={selectedYear} teamSearch={selectedTeam} />
    </div>
  );
};

export default App;
