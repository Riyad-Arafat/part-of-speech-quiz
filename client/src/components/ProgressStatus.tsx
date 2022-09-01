import { Progress } from "antd";
import { memo } from "react";

const ProgressStatus = memo(({ percent = 0 }: { percent: number }) => {
  return <Progress type="circle" percent={percent} />;
});

export default ProgressStatus;
