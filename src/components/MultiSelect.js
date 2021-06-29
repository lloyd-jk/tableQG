import React from "react";
import { Multiselect } from "multiselect-react-dropdown";

const MultiSelect = ({
  items,
  setcolSelect,
  placeholder,
  emptyRecordMsg,
  singleSelect,
  style,
  Label,
}) => {
  const options = items.map((col, index) => ({
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
        singleSelect={singleSelect}
        displayValue="name"
        placeholder={placeholder}
        hidePlaceholder="true"
        emptyRecordMsg={emptyRecordMsg}
        closeIcon="cancel"
        style={style}
      />
      <Label />
    </div>
  );
};

MultiSelect.defaultProps = {
  Label: () => {
    return <></>;
  },
};

export default MultiSelect;
