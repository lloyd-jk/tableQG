// react-emotion-multi-step-form@0.10.0

import React, { useRef } from "react";
import {
  FormBody,
  ComboboxMulti,
  withFormContextAndTheme,
} from "react-emotion-multi-step-form";

// Import SVG icons as React components using SVGR (built-in with create-react-app)

const ColumnSelect = ({ data }) => {
  const handleSubmit = (data) => {
    console.log(data);
  };
  var out = [["Columns"]];
  var temp = [data];
  out.push(temp);

  const options = [
    ["Arts & Entertainment"],
    [
      [
        "Art",
        "Beauty",
        "Culture",
        "Fiction",
        "Film",
        "Food",
        "Gaming",
        "Humor",
        "Music",
        "Nonfiction",
        "Sports",
      ],
    ],
  ];
  console.log(out);
  console.log(options);
  return (
    <div>
      <FormBody
        initialFocus={false}
        submitText="Subscribe"
        submitWidth={130}
        onSubmit={handleSubmit(data)}
      >
        <ComboboxMulti
          caption="What are your interests?"
          height={240}
          options={out}
        />
      </FormBody>
    </div>
  );
};

// Wrap component with React Context.Provider and Emotion ThemeProvider
export default withFormContextAndTheme(ColumnSelect);
