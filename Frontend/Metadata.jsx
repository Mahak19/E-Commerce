import React from "react";
import { Helmet } from "react-helmet";

// Functional component for managing metadata, such as title
const Metadata = ({ title }) => {
  // Returns Helmet component containing title metadata
  return (
    <Helmet>
      <title>{title}</title>
    </Helmet>
  );
};

// Exporting the Metadata component as the default export
export default Metadata;
