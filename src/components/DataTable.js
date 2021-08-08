import MUIDataTable from "mui-datatables";
import "../styles/main.css";
import { MuiThemeProvider } from "@material-ui/core/styles";
import MultiSelect from "./MultiSelect";
import Button from "@material-ui/core/Button";
import DisplayQ from "./DisplayQ";
import { useState, useEffect } from "react";
import data1 from "./Sample Data copy.json";
import {
  useStyles,
  theme,
  whereClauseLabel,
  isArrayThere,
} from "./DataTableUtils";
import CircularProgress from "@material-ui/core/CircularProgress";
import watson from "./Watson.gif";

// var colSelect, rowSelect;
var rowSelect;
const qgURL = "http://cloudnlg.sl.cloud9.ibm.com:8084/generate";
var xhr = new XMLHttpRequest();
// var aggSelect, whereSelect;

function DataTable({ data }) {
  const classes = useStyles();
  const columns = data[0];
  var toServer;
  const [flag, setflag] = useState(false);
  const [active, setactive] = useState(false);
  const [colSelect, setcolSelect] = useState();
  const [aggSelect, setaggSelect] = useState();
  const [whereSelect, setwhereSelect] = useState();
  const [userSuggestions, setuserSuggestions] = useState([]);
  const [genQuestions, setgenQuestions] = useState([]);
  data = data.slice(1, data.length);

  useEffect(() => {
    console.log("Usersuggestions ~", userSuggestions);
  }, [userSuggestions]);

  useEffect(() => {
    console.log("New Column Selection ~", colSelect);
  }, [colSelect]);

  useEffect(() => {
    console.log("Flag", flag);
  }, [flag]);

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
    rowsSelected: rowSelect,
    onRowSelectionChange: (
      currentRowsSelected,
      allRowsSelected,
      rowsSelected
    ) => {
      rowSelect = rowsSelected;
      console.log("New Row Selection ~", rowSelect);
    },
  };

  const UserSuggestion = (question, index, suggestion) => {
    if (suggestion === "good") {
      // console.log("Good Suggestion", question, index);
      let temp = [...userSuggestions];
      let addition = ["Good Suggestion", question, index];
      if (!isArrayThere(temp, addition)) {
        temp.push(addition);
        setuserSuggestions(temp);
      }
    } else {
      // console.log("Good Suggestion", question, index);
      let temp = [...userSuggestions];
      let addition = ["Poor Suggestion", question, index];
      if (!isArrayThere(temp, addition)) {
        temp.push(addition);
        setuserSuggestions(temp);
      }
    }
  };

  const reqToGenerate = () => {
    // setflag(false);
    // flag = false;
    toServer = null;
    toServer = {
      columns: colSelect,
      rows: rowSelect,
      data: data,
      aggregates: aggSelect,
      where: whereSelect,
      userSuggestions: userSuggestions,
    };
    console.log(toServer);
    setactive(true);
    setTimeout(() => {
      setactive(false);
    }, 5000);
    setgenQuestions(data1); // pass the response data to this function to update the variable "genQuestions"
    setflag(true);
  };

  // const reqToGenerate = () => {
  //   // setflag(false);
  //   // flag = false;
  //   toServer = null;
  //   toServer = {
  //     columns: colSelect,
  //     rows: rowSelect,
  //     table: [{ rows: data.slice(0, data.length - 1), header: columns }],
  //     aggregates: aggSelect,
  //     where: whereSelect,
  //     userSuggestions: userSuggestions,
  //   };
  //   toServer = JSON.stringify(toServer);

  //   xhr.open("POST", qgURL);
  //   xhr.setRequestHeader("Accept", "application/json");
  //   xhr.setRequestHeader("Content-Type", "application/json");
  //   xhr.onreadystatechange = function () {
  //     if (xhr.readyState === 4) {
  //       var genQuestions = JSON.parse(xhr.responseText)["generated_questions"];
  //       console.log(genQuestions);
  //       setgenQuestions(genQuestions); // pass the response data to this function to update the variable "genQuestions"
  //       setactive(false);
  //       setflag(true);
  //     }
  //   };
  //   xhr.send(toServer);
  //   console.log(toServer);
  //   setactive(true);
  //   setflag(true);
  // };

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
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  marginTop: "8px",
                }}
              >
                {/* Select Columns */}
                <MultiSelect
                  items={columns}
                  setcolSelect={setcolSelect}
                  placeholder="Select columns"
                  emptyRecordMsg="No columns available to choose"
                  singleSelect=""
                  style={{
                    searchBox: {
                      border: "none",
                    },
                    multiselectContainer: {
                      maxWidth: "800px",
                    },
                  }}
                />
                {/* Select Aggregates */}
                <MultiSelect
                  items={["Count", "Sum", "Avg.", "Min", "Max"]}
                  setcolSelect={setaggSelect}
                  placeholder="Select aggregates"
                  emptyRecordMsg="No aggregates available to choose"
                  singleSelect=""
                  style={{
                    searchBox: {
                      border: "none",
                    },
                    multiselectContainer: {
                      maxWidth: "800px",
                    },
                  }}
                />
                {/* Select number of where clause */}
                <MultiSelect
                  items={[1, 2, 3, 4]}
                  setcolSelect={setwhereSelect}
                  placeholder=""
                  emptyRecordMsg=""
                  singleSelect={true}
                  style={{
                    searchBox: {
                      // border: "none",
                      width: "45px",
                      height: "10px",
                    },
                  }}
                  Label={whereClauseLabel}
                />
              </div>
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
          startIcon={
            // <GetAppIcon />
            active && (
              <CircularProgress size={24} className={classes.buttonProgress} />
              // <img src={watson} width="40" height="auto" />
            )
          }
          disabled={active}
          onClick={reqToGenerate}
          style={
            {
              // maxWidth: "30px",
              // maxHeight: "30px",
              // minWidth: "100px",
              // minHeight: "60px",
            }
          }
        >
          Generate
        </Button>
      </div>
      {flag ? (
        <DisplayQ
          userSuggestion={UserSuggestion}
          genQuestions={genQuestions}
          active={active}
        />
      ) : (
        <div></div>
      )}
    </div>
  );
}

export default DataTable;
