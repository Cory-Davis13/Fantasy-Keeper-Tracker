import { useState, useEffect, useMemo, forwardRef, useRef } from "react";
import axios from "axios";
import { useSortBy, useTable, useRowSelect } from "react-table";
import "./KeeperTable.css";

const KeeperTable = (props) => {
  const [playersList, setPlayersList] = useState([]);
  const [url, setUrl] = useState("/getData");
  const deleteUrl = useRef("/getData");

  const data = useMemo(() => playersList, [playersList]);

  const columns = useMemo(
    () => [
      {
        Header: "Manager",
        accessor: "manager",
      },
      {
        Header: "Player",
        accessor: "player_name",
      },
      {
        Header: "Year",
        accessor: "year",
      },
      {
        Header: "Retained",
        accessor: "drafts_retained",
      },
      {
        Header: "Remain",
        accessor: "drafts_remaining",
      },
    ],
    []
  );

  const IndeterminateCheckbox = forwardRef(
    ({ indeterminate, ...rest }, ref) => {
      const defaultRef = useRef();
      const resolvedRef = ref || defaultRef;

      useEffect(() => {
        resolvedRef.current.indeterminate = indeterminate;
      }, [resolvedRef, indeterminate]);

      return (
        <>
          <input
            type="checkbox"
            name="myCheckbox"
            ref={resolvedRef}
            {...rest}
          />
        </>
      );
    }
  );

  const handleDeleteClick = () => {
    let checkedCount = 0;
    let manager = "";
    let player = "";
    let year = "";

    //Gets the data from selected row
    let rows = document.getElementsByName("myCheckbox");
    for (let row of rows) {
      row.checked && checkedCount++;
      if (row.checked) {
        manager = row.parentNode.parentNode.nextElementSibling.innerHTML;
        player =
          row.parentNode.parentNode.nextElementSibling.nextElementSibling
            .innerHTML;
        year =
          row.parentNode.parentNode.nextElementSibling.nextElementSibling
            .nextElementSibling.innerHTML;
      }
    }

    //if more than one row is selected stop, else make the call to deletePlayerRecord
    if (checkedCount >= 2 || checkedCount <= 0) {
      console.log("only delete one record at a time!");
    } else {
      async function deletePlayerRecord() {
        axios
          .post("/deletePlayer", {
            year: year,
            manager: manager,
            player: player,
          })
          .then((res) => {});
      }
      //call the function then update the state which should refresh the table. url variable has a useEffect that updates the playersList date which in turn has a
      //use effect to make a new axios call and get the proper data.
      deletePlayerRecord();
      deleteUrl.current = `/getData/${year}/${manager}`;
      async function updateTableAfterDelete() {
        axios.get(deleteUrl.current).then((res) => {
          setPlayersList(res.data);
        });
      }
      updateTableAfterDelete();
    }
  };

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable(
      {
        columns,
        data,
      },
      useSortBy,
      useRowSelect,
      (hooks) => {
        hooks.visibleColumns.push((columns) => [
          // Let's make a column for selection
          {
            id: "selection",
            Header: ({ getToggleAllRowsSelectedProps }) => (
              <div>
                <button onClick={handleDeleteClick} className="btn-primary">
                  X
                </button>
              </div>
            ),
            // The cell can use the individual row's getToggleRowSelectedProps method
            // to the render a checkbox
            Cell: ({ row }) => (
              <div>
                <IndeterminateCheckbox {...row.getToggleRowSelectedProps()} />
              </div>
            ),
          },
          ...columns,
        ]);
      }
    );

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
      <table id="keepers" {...getTableProps()}>
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                  {column.render("Header")}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map((cell) => {
                  return (
                    <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default KeeperTable;
