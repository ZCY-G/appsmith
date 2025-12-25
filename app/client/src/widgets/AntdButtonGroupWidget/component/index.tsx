import { Button, Space, type ButtonProps, type SpaceProps } from "antd";
import React, { useMemo } from "react";

function AntdButtonGroupComponent(props: AntdButtonGroupComponentProps) {
  const { groupButtons, style, width, ...restProps } = props;

  const spaceStyle = useMemo(() => ({ width, ...style }), [style, width]);

  const buttons = Object.values(groupButtons || {}).map(
    ({ href, label, ...restProps }, index) => (
      <Button href={href ? href : undefined} key={index} {...restProps}>
        {label ?? ""}
      </Button>
    ),
  );

  return (
    <Space style={spaceStyle} {...restProps}>
      {buttons}
    </Space>
  );
}

export interface AntdButtonGroupComponentProps extends SpaceProps {
  groupButtons?: Record<string, ButtonProps & { label?: string }>;
  width?: number
}

export default AntdButtonGroupComponent;
