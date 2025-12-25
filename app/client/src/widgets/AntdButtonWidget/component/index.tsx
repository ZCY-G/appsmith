import { Button, type ButtonProps } from "antd";
import React from "react";

function AntdButtonComponent(props: AntdButtonComponentProps) {
  const { href, label, ...restProps } = props;

  return (
    <Button href={href ? href : undefined} {...restProps}>
      {label}
    </Button>
  );
}

export interface AntdButtonComponentProps extends ButtonProps {
  label?: string;
}

export default AntdButtonComponent;
