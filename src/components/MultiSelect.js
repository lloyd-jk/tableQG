import React from "react";
import { Multiselect } from "multiselect-react-dropdown";

const MultiSelect = ({ columns }) => {
  //   console.l  og("columns", columns);
  const options = columns.map((col, index) => ({
    name: col,
    id: index,
  }));
  //   console.log(options);
  //   const state = {
  //     options: [
  //       { name: "Srigar", id: 1 },
  //       { name: "Sam", id: 2 },
  //       { name: "Sam", id: 3 },
  //       { name: "Sam", id: 4 },
  //       { name: "Sam", id: 5 },
  //     ],
  //   };

  const onSelect = (selectedList, selectedItem) => {
    console.log(selectedList);
  };
  return (
    <div style={{ padding: "10px" }}>
      {/* {console.log(options)} */}
      <Multiselect
        options={options}
        onSelect={onSelect} // Function will trigger on select event
        // onRemove={onRemove} // Function will trigger on remove event
        displayValue="name"
        placeholder="Select columns"
        hidePlaceholder="true"
        emptyRecordMsg="No columns available to choose"
        closeIcon="cancel"
        style={{
          searchBox: {
            // To change search box element look
            border: "none",
            // borderRadius: "15px",
            // padding: "10px",
            // "font-size": "10px",
            // " min-height": "50px",
          },
          multiselectContainer: {
            // To change css for multiselect (Width,height,etc..)
            // width: "200px",'
            // border: "None",
            maxWidth: "800px",
          },
        }}
      />
    </div>
  );
};

export default MultiSelect;
