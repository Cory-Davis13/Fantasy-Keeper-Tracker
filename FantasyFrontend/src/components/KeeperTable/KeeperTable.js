import { useState, useEffect } from "react";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import "./KeeperTable.css";

const KeeperTable = (props) => {
  const [playersList, setPlayersList] = useState([]);
  const [url, setUrl] = useState("/getData");

  useEffect(() => {
    if (props.yearSearch !== "#" && props.teamSearch !== "#") {
      setUrl(`/getData/${props.yearSearch}/${props.teamSearch}`);
    }
  }, [props.yearSearch, props.teamSearch]);

  useEffect(() => {
    async function getTeams() {
      axios.get(url).then((res) => {
        setPlayersList(res.data);
      });
    }
    getTeams();
  }, [url]);

  return (
    <div className="flex">
      <table id="keepers">
        <thead>
          <tr>
            <th key={uuidv4()}>Manager</th>
            <th key={uuidv4()}>Player</th>
            <th key={uuidv4()}>Year</th>
            <th key={uuidv4()}>Drafts Retained</th>
            <th key={uuidv4()}>Drafts Remaining</th>
          </tr>
        </thead>
        <tbody>
          {playersList.map((e, i) => {
            return [
              <tr key={uuidv4()}>
                <td key={uuidv4()}>{e.manager}</td>
                <td key={uuidv4()}>{e.player_name}</td>
                <td key={uuidv4()}>{e.year}</td>
                <td key={uuidv4()}>
                  {e.drafts_retained === null ? 0 : e.drafts_retained}
                </td>
                <td key={uuidv4()}>
                  {e.drafts_remaining === null ? 0 : e.drafts_remaining}
                </td>
              </tr>,
            ];
          })}
        </tbody>
      </table>
    </div>
  );
};

export default KeeperTable;
