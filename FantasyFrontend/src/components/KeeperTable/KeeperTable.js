import { useState, useEffect, useMemo, forwardRef, useRef } from "react";
import axios from "axios";
import { useSortBy, useTable, useRowSelect } from "react-table";
import "./KeeperTable.css";
import SuccessMessage from "../UI/SuccessMessage";

const KeeperTable = (props) => {
  const [playersList, setPlayersList] = useState([]);
  const [url, setUrl] = useState("/getData");
  const [deleteSucces, setDeleteSuccess] = useState(false);
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
      deletePlayerRecord();
      deleteUrl.current = `/getData/${year}/${manager}`;
      async function updateTableAfterDelete() {
        axios.get(deleteUrl.current).then((res) => {
          setPlayersList(res.data);
          setDeleteSuccess(true);
        });
      }
      updateTableAfterDelete();

      return <SuccessMessage />;
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
          {
            id: "selection",
            Header: ({ getToggleAllRowsSelectedProps }) => (
              <div>
                <button onClick={handleDeleteClick} className="btn-primary">
                  X
                </button>
              </div>
            ),
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
      {deleteSucces === true && <SuccessMessage />}
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
