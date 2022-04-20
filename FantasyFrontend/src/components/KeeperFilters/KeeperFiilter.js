import { useState, useEffect } from "react";
import "./KeeperFilter.css";
import axios from "axios";

const KeeperFilter = (props) => {
  const [managerList, setManagerList] = useState([]);

  const handleChange = () => {
    props.handleSelectedYear(document.getElementById("ft-year-select").value);
    props.handleSelectedTeam(document.getElementById("ft-team-select").value);
  };

  //Populate the dropdown list with managers
  useEffect(() => {
    async function populateManagers() {
      axios.get("/getManagers").then((res) => {
        setManagerList(res.data);
      });
    }
    populateManagers();
  }, []);

  return (
    <div className="ddl-container">
      <div className="ddlStyle">
        <select defaultValue="#" onChange={handleChange} id="ft-year-select">
          <option disabled value="#">
            Select a Year
          </option>
          <option value="2020">2020</option>
          <option value="2021">2021</option>
          <option value="2022">2022</option>
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
  );
};

export default KeeperFilter;
