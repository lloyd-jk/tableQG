import { useState } from "react";
import MUIDataTable from "mui-datatables";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import Paper from "@material-ui/core/Paper";
import "../styles/main.css";
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles";

function DataTable({ data }) {
  const [tableBodyHeight, setTableBodyHeight] = useState("400px");
  const columns = data[0];

  data = data.slice(1, data.length);

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

  const getMuiTheme = () =>
    createMuiTheme({
      overrides: {
        // MuiGrid
        // MUIDataTable
        // MUIDataTableBody
        MUIDataTableHead: {
          root: {
            backgroundColor: "#FF0000",
            borderRadius: "18px",
          },
        },
      },
    });

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
      <MuiThemeProvider theme={getMuiTheme()}>
        <MUIDataTable
          title={"Tabular Data"}
          data={data}
          columns={columns}
          options={options}
        />
      </MuiThemeProvider>
    </div>
  );
}

export default DataTable;
