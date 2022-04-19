import KeeperTable from "./components/KeeperTable";
import { useState } from "react";
import "./App.css";

const App = () => {
  const [selectedYear, setSelectedYear] = useState("");
  const [selectedTeam, setSelectedTeam] = useState("");

  const handleChange = () => {
    setSelectedYear(document.getElementById("ft-year-select").value);
    setSelectedTeam(document.getElementById("ft-team-select").value);
  };
  return (
    <div>
      <div className="ddl-container">
        <div className="ddlStyle">
          <select onChange={handleChange} id="ft-year-select">
            <option default value="#">
              Select a Year
            </option>
            <option default value="2020">
              2020
            </option>
            <option default value="2021">
              2021
            </option>
          </select>
        </div>
        <div className="ddlStyle">
          <select onChange={handleChange} id="ft-team-select">
            <option default value="#">
              Select a Team
            </option>
            <option default value="Cory">
              Cory
            </option>
            <option default value="Dan">
              Dan
            </option>
            <option default value="Hebe">
              Hebe
            </option>
          </select>
        </div>
      </div>
      <KeeperTable yearSearch={selectedYear} teamSearch={selectedTeam} />
    </div>
  );
};

export default App;
