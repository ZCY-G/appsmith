import { Button, Space, type ButtonProps, type SpaceProps } from "antd";
import React, { useMemo } from "react";

function AntdButtonGroupComponent(props: AntdButtonGroupComponentProps) {
  const { groupButtons, style, width, ...restProps } = props;

  const spaceStyle = useMemo(() => ({ width, ...style }), [style, width]);

  const onButtonClick = (onClick: string | undefined) => {
    if (onClick) {
      props.buttonClickHandler(onClick);
    }
  };

  const getOnClick = (
    button: Omit<ButtonProps, "onClick"> & { label?: string; onClick?: string },
  ) => {
    if (!button.onClick) {
      return;
    }

    return () => {
      onButtonClick(button.onClick);
    };
  };

  const buttons = Object.values(groupButtons || {}).map((button, index) => {
    const { href, label, ...restProps } = button;

    return (
      <Button
        {...restProps}
        href={href ? href : undefined}
        key={index}
        onClick={getOnClick(button)}
      >
        {label ?? ""}
      </Button>
    );
  });

  return (
    <Space {...restProps} style={spaceStyle}>
      {buttons}
    </Space>
  );
}

export interface AntdButtonGroupComponentProps extends SpaceProps {
  groupButtons?: Record<
    string,
    Omit<ButtonProps, "onClick"> & { label?: string; onClick?: string }
  >;
  width?: number;
  buttonClickHandler: (onClick: string | undefined) => void;
}

export default AntdButtonGroupComponent;
