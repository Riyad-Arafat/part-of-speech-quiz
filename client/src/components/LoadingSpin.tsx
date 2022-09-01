import { Spin } from "antd";

const LoadingSpin = () => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        margin: "auto",
      }}
    >
      <Spin size="large" />
      <p>Loading...</p>
    </div>
  );
};

export default LoadingSpin;
