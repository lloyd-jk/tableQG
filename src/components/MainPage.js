import React, { useState } from "react";
import DataTable from "./DataTable";
import ReactFileReader from "react-file-reader";
import "../styles/button.scss";
import "../styles/main.css";

function MainPage() {
  const [data, setData] = useState([]);
  const [flag, setflag] = useState(false);

  const handleFiles = (files) => {
    var reader = new FileReader();
    reader.onload = function (e) {
      var csv = reader.result;
      var lines = csv.split("\n");
      var result = [];
      var headers = lines[0].split(",");
      for (var i = 1; i < lines.length; i++) {
        var obj = {};
        var currentline = lines[i].split(",");
        for (var j = 0; j < headers.length; j++) {
          obj[headers[j]] = currentline[j];
        }
        result.push(obj);
      }
      result = JSON.stringify(result);
      result = JSON.parse(result);
      setData(result);
    };
    reader.readAsText(files[0]);
    setflag(true);
  };
  // const handleFiles = (files) => {
  //   var result;
  //   var reader = new window.FileReader();
  //   reader.onload = function (e) {
  //     // Use reader.result
  //     // console.log(reader.result);
  //     result = JSON.stringify(reader.result);
  //     result = JSON.parse(result);
  //     // alert(typeof result);
  //   };
  //   console.log(reader.readAsText(files[0]));
  // };
  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <ReactFileReader handleFiles={handleFiles} fileTypes={".csv"}>
          <button class="btn-1">Upload</button>
        </ReactFileReader>
      </div>
      <br />
      {flag ? (
        <div>
          <DataTable data={data} />
        </div>
      ) : (
        <div></div>
      )}
    </>
  );
}

export default MainPage;
