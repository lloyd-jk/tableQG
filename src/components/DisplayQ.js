import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListSubheader from "@material-ui/core/ListSubheader";
import Divider from "@material-ui/core/Divider";
import data from "./Sample Data copy.json";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import Collapse from "@material-ui/core/Collapse";
import IconButton from "@material-ui/core/IconButton";
import EditIcon from "@material-ui/icons/Edit";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "75%",
    backgroundColor: theme.palette.background.paper,
    padding: "10px",
    borderRadius: "18px",
    palette: {
      type: "dark",
    },
  },
}));

const DisplayQ = () => {
  const [open, setOpen] = useState("");

  const classes = useStyles();
  console.log(data);

  const handleClick = (index) => {
    console.log("test");
    if (index === open) {
      setOpen("");
    } else {
      setOpen(index);
    }
  };

  return (
    <div
      // elevation={4}
      style={{
        marginTop: "20px",
        padding: "5px",
        marginBottom: "10px",
        marginLeft: "9px",
        marginRight: "9px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        // width: "85%",
      }}
    >
      <div className={classes.root}>
        {data.map((item, index) => (
          <List>
            <ListItem key={index} onClick={() => handleClick(index)}>
              <ListItemText primary={item.question[0]} />
              {open === index ? (
                <ListItemSecondaryAction>
                  <IconButton>
                    <EditIcon />
                  </IconButton>
                  <IconButton>
                    <ExpandLess />
                  </IconButton>
                </ListItemSecondaryAction>
              ) : (
                <ListItemSecondaryAction>
                  <IconButton>
                    <EditIcon />
                  </IconButton>
                  <IconButton>
                    <ExpandMore />
                  </IconButton>
                </ListItemSecondaryAction>
              )}
            </ListItem>
            <Collapse in={index === open} timeout="auto" unmountOnExit>
              <List subheader={<ListSubheader>Answer</ListSubheader>}>
                <ListItem>
                  <ListItemText primary={item.sql.answer} />
                </ListItem>
              </List>
              <List subheader={<ListSubheader>Columns Chosen</ListSubheader>}>
                <ListItem>
                  {item.sql.col.map((val) => {
                    return <ListItemText primary={val} />;
                  })}
                </ListItem>
              </List>
              <List subheader={<ListSubheader>SQL Conditions</ListSubheader>}>
                <ListItem>
                  {item.sql.conds.map((val) => {
                    return <ListItemText primary={val.join(" ")} />;
                  })}
                </ListItem>
              </List>
            </Collapse>
            <Divider />
          </List>
        ))}
      </div>
    </div>
  );
};

export default DisplayQ;
