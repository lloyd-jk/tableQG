import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Divider from "@material-ui/core/Divider";
// import data from "./Sample Data copy.json";
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

const DisplayQ = ({ userSuggestion, genQuestions }) => {
  const classes = useStyles();
  const [goodbuttonList, setgoodbuttonList] = useState([]);
  const [badbuttonList, setbadbuttonList] = useState([]);

  const checkPresent = (array, item) => {
    return array.some((a) => item === a);
  };

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
        {genQuestions.map((item, index) => (
          <List key={index} style={{ padding: "0.1px" }}>
            <ListItem>
              <ListItemText
                primary={item.question[0]}
                secondary={`Answer: ${item.sql.answer}`}
              />
              <Tooltip title="Good Suggestion">
                <IconButton
                  onClick={() => {
                    if (checkPresent(badbuttonList, index)) {
                      // badbuttonList.splice(index, 1);
                      // setbadbuttonList(badbuttonList);
                      // setgoodbuttonList((badbuttonList) =>
                      //   badbuttonList.splice(index, 1)
                      // );
                      const arr = badbuttonList.filter(
                        (item) => item !== index
                      );
                      setbadbuttonList(arr);
                    }
                    userSuggestion(item.question[0], index, "good");
                    let temp = [...goodbuttonList];
                    temp.push(index);
                    setgoodbuttonList(temp);
                  }}
                  color={
                    checkPresent(goodbuttonList, index) ? "primary" : "default"
                  }
                >
                  <ThumbUpIcon />
                </IconButton>
              </Tooltip>
              <Tooltip title="Poor Suggestion">
                <IconButton
                  onClick={() => {
                    if (checkPresent(goodbuttonList, index)) {
                      console.log("before", goodbuttonList);
                      // goodbuttonList.splice(index, 1);
                      // setgoodbuttonList(goodbuttonList);
                      // console.log("after", goodbuttonList);
                      const arr = goodbuttonList.filter(
                        (item) => item !== index
                      );
                      setgoodbuttonList(arr);
                      console.log("after", goodbuttonList);
                    }
                    userSuggestion(item.question[0], index, "bad");
                    let temp = [...badbuttonList];
                    temp.push(index);
                    setbadbuttonList(temp);
                  }}
                  color={
                    checkPresent(badbuttonList, index) ? "primary" : "default"
                  }
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
