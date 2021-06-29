// import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Divider from "@material-ui/core/Divider";
import data from "./Sample Data copy.json";
import IconButton from "@material-ui/core/IconButton";
import ThumbUpIcon from "@material-ui/icons/ThumbUp";
import ThumbDownIcon from "@material-ui/icons/ThumbDown";
import Tooltip from "@material-ui/core/Tooltip";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    padding: "0px",
    borderRadius: "18px",
    palette: {
      type: "dark",
    },
  },
}));

const DisplayQ = ({ userSuggestion }) => {
  const classes = useStyles();

  return (
    <div
      style={{
        marginTop: "20px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "auto",
      }}
    >
      <div className={classes.root}>
        {data.map((item, index) => (
          <List key={index} style={{ padding: "0.1px" }}>
            <ListItem>
              <ListItemText
                primary={item.question[0]}
                secondary={`Answer: ${item.sql.answer}`}
              />
              <Tooltip title="Good Suggestion">
                <IconButton
                  onClick={() =>
                    userSuggestion(item.question[0], index, "good")
                  }
                  color=""
                >
                  <ThumbUpIcon />
                </IconButton>
              </Tooltip>
              <Tooltip title="Poor Suggestion">
                <IconButton
                  onClick={() => userSuggestion(item.question[0], index, "bad")}
                >
                  <ThumbDownIcon />
                </IconButton>
              </Tooltip>
            </ListItem>
            <Divider />
          </List>
        ))}
      </div>
    </div>
  );
};

export default DisplayQ;
