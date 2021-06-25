import MUIDataTable from "mui-datatables";
import "../styles/main.css";
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles";
import MultiSelect from "./MultiSelect";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import DisplayQ from "./DisplayQ";
import GetAppIcon from "@material-ui/icons/GetApp";
import { useState } from "react";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
    },
  },
}));

function DataTable({ data }) {
  const classes = useStyles();
  const columns = data[0];
  var colSelect, rowSelect;
  var toServer;
  const [flag, setflag] = useState(false);

  data = data.slice(1, data.length);

  const setcolSelect = (temp) => {
    colSelect = null;
    // console.log("in set col", "colselect", colSelect, "temp", temp);
    colSelect = temp;
  };

  const theme = createMuiTheme({
    overrides: {
      MuiTableHead: {
        root: {
          borderRadius: "20px",
        },
      },
      MuiTableRow: {
        root: {
          maxHeight: "20px",
          color: "green",
        },
        head: {},
      },
      MuiTableCell: {
        root: {
          paddingTop: 4,
          paddingBottom: 4,
          "&:last-child": {
            paddingRight: 5,
          },
        },
        head: {
          fontWeight: "bold",
          backgroundColor: "black",
        },
        body: {
          width: "auto",
        },
      },
    },
  });

  const options = {
    responsive: "vertical",
    tableBodyMaxHeight: "2550px",
    filter: false,
    download: false,
    sort: false,
    print: false,
    viewColumns: false,
    searchOpen: false,
    search: false,
    selectableRows: "multiple",
    selectableRowsHideCheckboxes: true,
    selectToolbarPlacement: "none",
    selectableRowsOnClick: true,
    draggableColumns: { enabled: true, transitionTime: 300 },
    rowsPerPage: 30,
    pagination: false,
    elevation: 5,
    _onRowSelection: function (selectedRows) {
      setTimeout(function () {
        this.setState({
          selectedRows: selectedRows.slice(0),
        });
      }, 2000);
    },
    onRowSelectionChange: (a, b, c) => {
      rowSelect = c;
      console.log("Rows Selection Details~", rowSelect);
      console.log("Columns Chanege", colSelect);
    },
  };

  const reqToGenerate = () => {
    setflag(true);
    toServer = null;
    toServer = {
      columns: colSelect,
      rows: rowSelect,
      data: data,
    };
    console.log(toServer);
  };

  return (
    <div>
      <div
        style={{
          paddingLeft: "10px",
          paddingRight: "10px",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <MuiThemeProvider theme={theme}>
          <MUIDataTable
            title={
              <MultiSelect columns={columns} setcolSelect={setcolSelect} />
            }
            data={data}
            columns={columns}
            options={options}
          />
        </MuiThemeProvider>
      </div>
      <div
        className={classes.root}
        style={{ display: "flex", justifyContent: "center", marginTop: "8px" }}
      >
        <Button
          variant="contained"
          color="primary"
          startIcon={<GetAppIcon />}
          onClick={reqToGenerate}
        >
          Generate
        </Button>
      </div>
      {flag ? <DisplayQ /> : <div></div>}
    </div>
  );
}

export default DataTable;
