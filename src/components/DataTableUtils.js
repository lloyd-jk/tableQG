import { makeStyles } from "@material-ui/core/styles";
import { createMuiTheme } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";

export const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
    },
  },
}));

export const theme = createMuiTheme({
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

export const whereClauseLabel = () => {
  return (
    <InputLabel style={{ fontSize: "13px", paddingTop: "3px" }}>
      Select no. of where clauses
    </InputLabel>
  );
};

export const isArrayThere = (arr1, arr2) => {
  for (let i = 0; i < arr1.length; i++) {
    // console.log("array", arr1[i], arr2);
    if (JSON.stringify(arr1[i]) === JSON.stringify(arr2)) {
      return true;
    }
  }
  return false;
};
