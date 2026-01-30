import React from "react";

import type { DerivedPropertiesMap } from "WidgetProvider/factory/types";

import type { WidgetProps, WidgetState } from "widgets/BaseWidget";
import BaseWidget from "widgets/BaseWidget";

import AntdButtonComponent from "../component";

import IconSVG from "../icon.svg";
import { WIDGET_TAGS } from "constants/WidgetConstants";
import { ValidationTypes } from "constants/WidgetValidation";
import type { ButtonProps } from "antd";
import type {
  AnvilConfig,
  AutoLayoutConfig,
  PropertyUpdates,
  SnipingModeProperty,
  WidgetBaseConfiguration,
  WidgetDefaultProps,
  WidgetMethods,
} from "WidgetProvider/types";
import { EventType } from "constants/AppsmithActionConstants/ActionConstants";
import ThumbnailSVG from "../thumbnail.svg";
import type { WidgetFeatures } from "utils/WidgetFeatures";
import type {
  PropertyPaneConfig,
  PropertyPaneControlConfig,
} from "constants/PropertyControlConstants";

export const BASE_BUTTON_TYPE_CONFIG: Omit<
  PropertyPaneControlConfig,
  "propertyName"
> = {
  label: "Type",
  helpText: "语法糖，设置按钮类型。当设置 variant 与 color 时以后者为准",
  controlType: "DROP_DOWN",
  options: [
    {
      label: "primary",
      value: "primary",
    },
    {
      label: "dashed",
      value: "dashed",
    },
    {
      label: "link",
      value: "link",
    },
    {
      label: "text",
      value: "text",
    },
    {
      label: "default",
      value: "default",
    },
  ],
  isBindProperty: true,
  isTriggerProperty: false,
  validation: {
    type: ValidationTypes.TEXT,
    params: {
      allowedValues: ["primary", "dashed", "link", "text", "default"],
      default: "default",
    },
  },
};

export const BASE_BUTTON_CONFIG: PropertyPaneConfig[] = [
  {
    sectionName: "Basic",
    children: [
      {
        propertyName: "label",
        label: "Label",
        helpText: "Sets the label of the button",
        controlType: "INPUT_TEXT",
        isBindProperty: true,
        isTriggerProperty: false,
        validation: { type: ValidationTypes.TEXT },
      },
      {
        propertyName: "onClick",
        label: "onClick",
        helpText: "点击按钮时的回调",
        controlType: "ACTION_SELECTOR",
        isJSConvertible: true,
        isBindProperty: true,
        isTriggerProperty: true,
      },
    ],
  },
  {
    sectionName: "General",
    children: [
      {
        propertyName: "autoInsertSpace",
        label: "Auto insert space",
        helpText:
          "我们默认提供两个汉字之间的空格，可以设置 autoInsertSpace 为 false 关闭",
        controlType: "SWITCH",
        isJSConvertible: true,
        isBindProperty: true,
        isTriggerProperty: false,
        validation: { type: ValidationTypes.BOOLEAN },
      },
      {
        propertyName: "block",
        label: "Block",
        helpText: "将按钮宽度调整为其父宽度的选项",
        controlType: "SWITCH",
        isJSConvertible: true,
        isBindProperty: true,
        isTriggerProperty: false,
        validation: { type: ValidationTypes.BOOLEAN },
      },
      {
        propertyName: "color",
        label: "Color",
        helpText: "设置按钮的颜色",
        controlType: "DROP_DOWN",
        options: [
          {
            label: "default",
            value: "default",
          },
          {
            label: "primary",
            value: "primary",
          },
          {
            label: "danger",
            value: "danger",
          },
        ],
        isBindProperty: true,
        isTriggerProperty: false,
        validation: {
          type: ValidationTypes.TEXT,
          params: {
            allowedValues: ["default", "primary", "danger"],
          },
        },
      },
      {
        propertyName: "danger",
        label: "Danger",
        helpText: "语法糖，设置危险按钮。当设置 color 时会以后者为准",
        controlType: "SWITCH",
        isJSConvertible: true,
        isBindProperty: true,
        isTriggerProperty: false,
        validation: { type: ValidationTypes.BOOLEAN },
      },
      {
        propertyName: "disabled",
        label: "Disabled",
        helpText: "设置按钮失效状态",
        controlType: "SWITCH",
        isJSConvertible: true,
        isBindProperty: true,
        isTriggerProperty: false,
        validation: { type: ValidationTypes.BOOLEAN },
      },
      {
        propertyName: "ghost",
        label: "Ghost",
        helpText: "幽灵属性，使按钮背景透明",
        controlType: "SWITCH",
        isJSConvertible: true,
        isBindProperty: true,
        isTriggerProperty: false,
        validation: { type: ValidationTypes.BOOLEAN },
      },
      {
        propertyName: "href",
        label: "Href",
        helpText: "点击跳转的地址，指定此属性 button 的行为和 a 链接一致",
        controlType: "INPUT_TEXT",
        isBindProperty: true,
        isTriggerProperty: false,
        validation: { type: ValidationTypes.TEXT },
      },
      {
        propertyName: "htmlType",
        label: "Html type",
        helpText: "设置 button 原生的 type 值，可选值请参考 HTML 标准",
        controlType: "DROP_DOWN",
        options: [
          {
            label: "submit",
            value: "submit",
          },
          {
            label: "reset",
            value: "reset",
          },
          {
            label: "button",
            value: "button",
          },
        ],
        isBindProperty: true,
        isTriggerProperty: false,
        validation: {
          type: ValidationTypes.TEXT,
          params: {
            allowedValues: ["submit", "reset", "button"],
            default: "button",
          },
        },
      },
      {
        propertyName: "loading",
        label: "Loading",
        helpText: "设置按钮载入状态",
        controlType: "SWITCH",
        isJSConvertible: true,
        isBindProperty: true,
        isTriggerProperty: false,
        validation: { type: ValidationTypes.BOOLEAN },
      },
      {
        propertyName: "shape",
        label: "Shape",
        helpText: "设置按钮形状",
        controlType: "DROP_DOWN",
        options: [
          {
            label: "default",
            value: "default",
          },
          {
            label: "circle",
            value: "circle",
          },
          {
            label: "round",
            value: "round",
          },
        ],
        isBindProperty: true,
        isTriggerProperty: false,
        validation: {
          type: ValidationTypes.TEXT,
          params: {
            allowedValues: ["default", "circle", "round"],
            default: "default",
          },
        },
      },
      {
        propertyName: "size",
        label: "Size",
        helpText: "设置按钮大小",
        controlType: "DROP_DOWN",
        options: [
          {
            label: "large",
            value: "large",
          },
          {
            label: "middle",
            value: "middle",
          },
          {
            label: "small",
            value: "small",
          },
        ],
        isBindProperty: true,
        isTriggerProperty: false,
        validation: {
          type: ValidationTypes.TEXT,
          params: {
            allowedValues: ["large", "middle", "small"],
            default: "middle",
          },
        },
      },
      {
        propertyName: "target",
        label: "Target",
        helpText: "相当于 a 链接的 target 属性，href 存在时生效",
        controlType: "INPUT_TEXT",
        isBindProperty: true,
        isTriggerProperty: false,
        validation: { type: ValidationTypes.TEXT },
      },
      {
        propertyName: "variant",
        label: "Variant",
        helpText: "设置按钮变体",
        controlType: "DROP_DOWN",
        options: [
          {
            label: "outlined",
            value: "outlined",
          },
          {
            label: "dashed",
            value: "dashed",
          },
          {
            label: "solid",
            value: "solid",
          },
          {
            label: "filled",
            value: "filled",
          },
          {
            label: "text",
            value: "text",
          },
          {
            label: "link",
            value: "link",
          },
        ],
        isBindProperty: true,
        isTriggerProperty: false,
        validation: {
          type: ValidationTypes.TEXT,
          params: {
            allowedValues: [
              "outlined",
              "dashed",
              "solid",
              "filled",
              "text",
              "link",
            ],
          },
        },
      },
    ],
  },
];

export const BASE_BUTTON_DEFAULT = {
  autoInsertSpace: true,
  block: true,
  danger: false,
  disabled: false,
  ghost: false,
  htmlType: "button",
  iconPosition: "start",
  loading: false,
  shape: "default",
  size: "middle",
} as const;

class AntdButtonWidget extends BaseWidget<AntdButtonWidgetProps, WidgetState> {
  static type = "ANTDBUTTON_WIDGET";

  static getConfig(): WidgetBaseConfiguration {
    return {
      name: "AntdButton", // The display name which will be made in uppercase and show in the widgets panel ( can have spaces )
      iconSVG: IconSVG,
      thumbnailSVG: ThumbnailSVG,
      needsMeta: false, // Defines if this widget adds any meta properties
      isCanvas: false, // Defines if this widget has a canvas within in which we can drop other widgets
      tags: [WIDGET_TAGS.BUTTONS],
      searchTags: ["antd", "click", "submit", "button"],
    };
  }

  static getFeatures(): WidgetFeatures | null {
    return {
      dynamicHeight: {
        sectionIndex: 0,
        active: true,
      },
    };
  }

  static getDefaults(): WidgetDefaultProps {
    return {
      widgetName: "AntdButton",
      rows: 4,
      columns: 16,
      version: 1,
      ...BASE_BUTTON_DEFAULT,
      label: "按钮",
      buttonType: "default",
    };
  }

  static getMethods(): WidgetMethods {
    return {
      getSnipingModeUpdates: (
        propValueMap: SnipingModeProperty,
      ): PropertyUpdates[] => {
        return [
          {
            propertyPath: "onClick",
            propertyValue: propValueMap.run,
            isDynamicPropertyPath: true,
          },
        ];
      },
    };
  }

  static getAutoLayoutConfig(): AutoLayoutConfig | null {
    return {
      autoDimension: {
        height: true,
      },
      disableResizeHandles: {
        vertical: true,
      },
    };
  }

  static getAnvilConfig(): AnvilConfig | null {
    return {
      isLargeWidget: false,
    };
  }

  static getPropertyPaneContentConfig(): PropertyPaneConfig[] {
    return [
      ...BASE_BUTTON_CONFIG,
      {
        ...BASE_BUTTON_TYPE_CONFIG,
        propertyName: "buttonType",
      },
    ];
  }

  static getPropertyPaneStyleConfig() {
    return [];
  }

  static getDerivedPropertiesMap(): DerivedPropertiesMap {
    return {};
  }

  static getDefaultPropertiesMap(): Record<string, string> {
    return {};
  }

  static getMetaPropertiesMap(): Record<string, unknown> {
    return {};
  }

  handleClick() {
    if (this.props.onClick) {
      super.executeAction({
        triggerPropertyName: "onClick",
        dynamicString: this.props.onClick,
        event: {
          type: EventType.ON_CLICK,
        },
      });
    }
  }

  getWidgetView() {
    return (
      <AntdButtonComponent
        autoInsertSpace={this.props.autoInsertSpace}
        block={this.props.block}
        color={this.props.color}
        danger={this.props.danger}
        disabled={this.props.disabled}
        ghost={this.props.ghost}
        href={this.props.href}
        htmlType={this.props.htmlType}
        iconPosition={this.props.iconPosition}
        label={this.props.label}
        loading={this.props.loading}
        shape={this.props.shape}
        size={this.props.size}
        target={this.props.target}
        type={this.props.buttonType}
        variant={this.props.variant}
      />
    );
  }
}

export interface AntdButtonWidgetProps
  extends WidgetProps,
    Omit<ButtonProps, "type" | "onClick"> {
  label?: string;
  buttonType?: ButtonProps["type"];
  onClick?: string;
}

export default AntdButtonWidget;
