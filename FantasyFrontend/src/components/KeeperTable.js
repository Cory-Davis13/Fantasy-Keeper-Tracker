import { useState, useEffect } from "react";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import "./KeeperTable.css";

const KeeperTable = (props) => {
  const [playersList, setPlayersList] = useState([]);
  const [url, setUrl] = useState("/getData/2021/BillDaly");

  let players = [];

  useEffect(() => {
    if (props.yearSearch != "" || props.teamSearch != "") {
      setUrl("/getData/" + props.yearSearch + "/" + props.teamSearch);
    }
  }, [props.yearSearch, props.teamSearch]);

  useEffect(() => {
    async function getTeams() {
      axios.get(url).then((res) => {
        res.data.map((e) =>
          players.push({
            name: e.player_name,
            manager: e.manager,
            year: e.Year,
            retained: e.drafts_retained,
            remaining: e.drafts_remaining,
          })
        );
        setPlayersList(players);
      });
    }
    getTeams();
  }, [url]);

  return (
    <div className="flex">
      <table>
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
                <td key={uuidv4()}>{e.name}</td>
                <td key={uuidv4()}>{e.year}</td>
                <td key={uuidv4()}>{e.retained === null ? 0 : e.retained}</td>
                <td key={uuidv4()}>{e.remaining === null ? 0 : e.remaining}</td>
              </tr>,
            ];
          })}
        </tbody>
      </table>
    </div>
  );
};

export default KeeperTable;
