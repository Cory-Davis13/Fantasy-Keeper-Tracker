import KeeperTable from "./components/KeeperTable";
import { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

const App = () => {
  const [selectedYear, setSelectedYear] = useState("");
  const [selectedTeam, setSelectedTeam] = useState("");
  const [managerList, setManagerList] = useState([]);

  const handleChange = () => {
    setSelectedYear(document.getElementById("ft-year-select").value);
    setSelectedTeam(document.getElementById("ft-team-select").value);
  };

  useEffect(() => {
    async function populateManagers() {
      axios.get("/getManagers").then((res) => {
        setManagerList(res.data);
      });
    }
    populateManagers();
  }, []);

  return (
    <div>
      <div className="ddl-container">
        <div className="ddlStyle">
          <select defaultValue="#" onChange={handleChange} id="ft-year-select">
            <option disabled value="#">
              Select a Year
            </option>
            <option value="2020">2020</option>
            <option value="2021">2021</option>
          </select>
        </div>
        <div className="ddlStyle">
          <select defaultValue="#" onChange={handleChange} id="ft-team-select">
            <option disabled value="#">
              Select a Team
            </option>
            {managerList.map((e) => {
              return [
                <option key={e.id} value={e.manager}>
                  {e.manager}
                </option>,
              ];
            })}
          </select>
        </div>
      </div>
      <KeeperTable yearSearch={selectedYear} teamSearch={selectedTeam} />
    </div>
  );
};

export default App;
