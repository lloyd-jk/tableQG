import { useState } from "react";
import MUIDataTable from "mui-datatables";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import Paper from "@material-ui/core/Paper";
// import ColumnSelect from "./ColumnSelect";
import "../styles/main.css";

function DataTable({ data }) {
  const [tableBodyHeight, setTableBodyHeight] = useState("400px");

  var columns = [];
  if (data.length > 0) {
    var columnsIn = data[0];
    for (var key in columnsIn) {
      // console.log(key);
      columns.push(key);
    }
  } else {
    console.log("No columns");
  }

  const options = {
    filter: true,
    filterType: "textField",
    responsive: "vertical",
    tableBodyHeight,
    tableBodyMaxHeight: "",
    print: false,
    elevation: 4,
    draggableColumns: { enabled: true, transitionTime: 300 },
    onRowSelectionChange: (a, b, c) => {
      console.log("Rows Selection Details~", c);
    },
  };
  // console.log(typeof columns);

  const [selectedCol, setSelectedCol] = useState([]);

  const handleSelect = function (selectedItems) {
    const cols = [];
    for (let i = 0; i < selectedItems.length; i++) {
      cols.push(selectedItems[i].value);
    }
    setSelectedCol(cols);
    console.log(" Column Selction details~ ", cols);
  };
  const MakeItem = function (X) {
    return <option>{X}</option>;
  };

  return (
    <div style={{ paddingLeft: "10px", paddingRight: "10px" }}>
      <Paper
        elevation={4}
        style={{
          display: "inline-block",
          justifyContent: "center",
          alignItems: "center",
          marginBottom: "10px",
        }}
      >
        <div
          style={{
            paddingTop: "10px",
            paddingBottom: "10px",
            paddingLeft: "6px",
            paddingRight: "6px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <FormControl>
            <InputLabel id="demo-simple-select-label">
              Height of the table
            </InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={tableBodyHeight}
              style={{
                width: "200px",
                marginBottom: "10px",
                marginRight: 10,
              }}
              onChange={(e) => setTableBodyHeight(e.target.value)}
            >
              <MenuItem value={"400px"}>Normal</MenuItem>
              <MenuItem value={"800px"}>Large</MenuItem>
            </Select>
          </FormControl>
          <form>
            <select
              multiple={true}
              value={selectedCol}
              onChange={(e) => {
                handleSelect(e.target.selectedOptions);
              }}
            >
              {columns.map(MakeItem)}
            </select>
          </form>
        </div>
      </Paper>

      <MUIDataTable
        title={"Tabular Data"}
        data={data}
        columns={columns}
        options={options}
      />

      {/* <div>
        <ColumnSelect data={columns} />
      </div> */}
    </div>
  );
}

export default DataTable;
