import type { PropertyPaneConfig, PropertyPaneControlConfig } from "constants/PropertyControlConstants";
import { ValidationTypes } from "constants/WidgetValidation";

// This file contains common constants which can be used across the widget configuration file (index.ts), widget and component folders.
export const ANTDBUTTON_WIDGET_CONSTANT = "";

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
