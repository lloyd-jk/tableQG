import React from "react";
import { Multiselect } from "multiselect-react-dropdown";

const MultiSelect = ({ columns, setcolSelect }) => {
  const options = columns.map((col, index) => ({
    name: col,
    id: index,
  }));

  const onSelect = (selectedList, selectedItem) => {
    var temp = selectedList.map(function (item) {
      return item.name;
    });
    setcolSelect(temp);
  };

  return (
    <div
      key={1}
      style={{ padding: "10px", position: "relative", zIndex: "2147483647" }}
    >
      <Multiselect
        options={options}
        onSelect={onSelect}
        onRemove={onSelect}
        displayValue="name"
        placeholder="Select columns"
        hidePlaceholder="true"
        emptyRecordMsg="No columns available to choose"
        closeIcon="cancel"
        style={{
          searchBox: {
            border: "none",
          },
          multiselectContainer: {
            maxWidth: "800px",
          },
        }}
      />
    </div>
  );
};

export default MultiSelect;
