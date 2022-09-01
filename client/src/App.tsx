import React from "react";
import { Layout } from "antd";
import "./App.css";

const Quiz = React.lazy(() => import("./components/Quiz"));

function App() {
  return (
    <Layout>
      <Layout.Content>
        <Quiz />
      </Layout.Content>
    </Layout>
  );
}

export default App;
