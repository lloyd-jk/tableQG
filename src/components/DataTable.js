import MUIDataTable from "mui-datatables";
import "../styles/main.css";
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles";
import MultiSelect from "./MultiSelect";

function DataTable({ data }) {
  const columns = data[0];

  data = data.slice(1, data.length);

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
          // maxHeight: "70px",
          // maxWidth: "600px",
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
    onRowSelectionChange: (a, b, c) => {
      console.log("Rows Selection Details~", c);
    },
  };

  return (
    <div
      style={{
        paddingLeft: "10px",
        paddingRight: "10px",
      }}
    >
      <MuiThemeProvider theme={theme}>
        <MUIDataTable
          title={
            <div
              style={{
                position: "relative",
                zIndex: "2147483647",
              }}
            >
              <MultiSelect columns={columns} />
            </div>
          }
          data={data}
          columns={columns}
          options={options}
        />
      </MuiThemeProvider>
    </div>
  );
}

export default DataTable;
