import { Button, type ButtonProps } from "antd";
import React from "react";

function AntdButtonComponent(props: AntdButtonComponentProps) {
  const { href, text, ...restProps } = props;

  return (
    <Button href={href ? href : undefined} {...restProps}>
      {text}
    </Button>
  );
}

export interface AntdButtonComponentProps extends ButtonProps {
  text?: string;
}

export default AntdButtonComponent;
