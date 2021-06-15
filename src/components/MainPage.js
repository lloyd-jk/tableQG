import React, { useState } from "react";
import DataTable from "./DataTable";
import "../styles/button.scss";
import "../styles/main.css";
import { CSVReader } from "react-papaparse";
import DisplayQ from "./DisplayQ";

const buttonRef = React.createRef();

function MainPage() {
  const [data, setData] = useState([]);
  const [flag, setflag] = useState(false);

  const handleOpenDialog = (e) => {
    if (buttonRef.current) {
      buttonRef.current.open(e);
    }
  };

  const handleOnFileLoad = (data) => {
    console.log(data);
    for (let i = 0; i < data.length; i++) {
      delete data[i].errors;
      delete data[i].meta;
      var temp = data[i].data;
      data[i] = temp;
    }
    console.log(data);
    setData(data);
    setflag(true);
  };

  const handleOnError = (err, file, inputElem, reason) => {
    console.log(err);
  };

  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <CSVReader
          ref={buttonRef}
          header="true"
          onFileLoad={handleOnFileLoad}
          onError={handleOnError}
          noClick
          noDrag
        >
          {({ file }) => (
            <button type="button" onClick={handleOpenDialog} className="btn-1">
              Upload
            </button>
          )}
        </CSVReader>
      </div>
      <br />
      {flag ? (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <DataTable data={data} />
        </div>
      ) : (
        <div></div>
      )}
      <DisplayQ />
    </div>
  );
}

export default MainPage;
