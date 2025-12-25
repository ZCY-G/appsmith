import React from "react";

import type { DerivedPropertiesMap } from "WidgetProvider/factory/types";

import type { WidgetProps, WidgetState } from "widgets/BaseWidget";
import BaseWidget from "widgets/BaseWidget";

import AntdButtonGroupComponent from "../component";

import IconSVG from "../icon.svg";
import ThumbnailSVG from "../thumbnail.svg";
import { WIDGET_TAGS } from "constants/WidgetConstants";
import type { PropertyPaneConfig } from "constants/PropertyControlConstants";
import { ValidationTypes } from "constants/WidgetValidation";
import type { ButtonProps, SpaceProps } from "antd";
import type { AutoLayoutConfig } from "WidgetProvider/types";
import type { WidgetFeatures } from "utils/WidgetFeatures";

class AntdButtonGroupWidget extends BaseWidget<
  AntdButtonGroupWidgetProps,
  WidgetState
> {
  static type = "ANTD_BUTTON_GROUP_WIDGET";

  static getConfig() {
    return {
      name: "Antd Button Group", // The display name which will be made in uppercase and show in the widgets panel ( can have spaces )
      iconSVG: IconSVG,
      thumbnailSVG: ThumbnailSVG,
      needsMeta: false, // Defines if this widget adds any meta properties
      isCanvas: false, // Defines if this widget has a canvas within in which we can drop other widgets
      searchTags: ["antd", "button", "group", "buttons", "click", "submit"],
      tags: [WIDGET_TAGS.BUTTONS],
      needsErrorInfo: true,
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

  static getDefaults() {
    return {
      widgetName: "AntdButtonGroup",
      rows: 4,
      columns: 24,
      version: 1,
      spaceDirection: "horizontal",
      size: "small",
      wrap: false,
      groupButtons: {
        groupButton1: {
          id: "groupButton1",
          index: 0,
          widgetId: "",
          label: "确定",
          autoInsertSpace: true,
          block: false,
          danger: false,
          disabled: false,
          ghost: false,
          htmlType: "button",
          iconPosition: "start",
          loading: false,
          shape: "default",
          size: "middle",
          type: "primary",
        },
        groupButton2: {
          id: "groupButton2",
          index: 1,
          widgetId: "",
          label: "取消",
          autoInsertSpace: true,
          block: false,
          danger: false,
          disabled: false,
          ghost: false,
          htmlType: "button",
          iconPosition: "start",
          loading: false,
          shape: "default",
          size: "middle",
          type: "default",
        },
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

  static getPropertyPaneContentConfig(): PropertyPaneConfig[] {
    return [
      {
        sectionName: "Data",
        children: [
          {
            propertyName: "groupButtons",
            label: "Buttons",
            controlType: "GROUP_BUTTONS",
            helpText: "测试",
            isBindProperty: false,
            isTriggerProperty: false,
            panelConfig: {
              editableTitle: true,
              titlePropertyName: "text",
              panelIdPropertyName: "id",
              updateHook(props, propertyPath, propertyValue) {
                return [
                  {
                    propertyPath,
                    propertyValue,
                  },
                ];
              },
              contentChildren: [
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
                      validation: {
                        type: ValidationTypes.BOOLEAN,
                        params: {
                          default: true,
                        },
                      },
                    },
                    {
                      propertyName: "block",
                      label: "Block",
                      helpText: "将按钮宽度调整为其父宽度的选项",
                      controlType: "SWITCH",
                      isJSConvertible: true,
                      isBindProperty: true,
                      isTriggerProperty: false,
                      validation: {
                        type: ValidationTypes.BOOLEAN,
                        params: {
                          default: false,
                        },
                      },
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
                      helpText:
                        "语法糖，设置危险按钮。当设置 color 时会以后者为准",
                      controlType: "SWITCH",
                      isJSConvertible: true,
                      isBindProperty: true,
                      isTriggerProperty: false,
                      validation: {
                        type: ValidationTypes.BOOLEAN,
                        params: {
                          default: false,
                        },
                      },
                    },
                    {
                      propertyName: "disabled",
                      label: "Disabled",
                      helpText: "设置按钮失效状态",
                      controlType: "SWITCH",
                      isJSConvertible: true,
                      isBindProperty: true,
                      isTriggerProperty: false,
                      validation: {
                        type: ValidationTypes.BOOLEAN,
                        params: {
                          default: false,
                        },
                      },
                    },
                    {
                      propertyName: "ghost",
                      label: "Ghost",
                      helpText: "幽灵属性，使按钮背景透明",
                      controlType: "SWITCH",
                      isJSConvertible: true,
                      isBindProperty: true,
                      isTriggerProperty: false,
                      validation: {
                        type: ValidationTypes.BOOLEAN,
                        params: {
                          default: false,
                        },
                      },
                    },
                    {
                      propertyName: "href",
                      label: "Href",
                      helpText:
                        "点击跳转的地址，指定此属性 button 的行为和 a 链接一致",
                      controlType: "INPUT_TEXT",
                      isBindProperty: true,
                      isTriggerProperty: false,
                      validation: { type: ValidationTypes.TEXT },
                    },
                    {
                      propertyName: "htmlType",
                      label: "Html type",
                      helpText:
                        "设置 button 原生的 type 值，可选值请参考 HTML 标准",
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
                      validation: {
                        type: ValidationTypes.BOOLEAN,
                        params: {
                          default: false,
                        },
                      },
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
                      propertyName: "type",
                      label: "Type",
                      helpText:
                        "语法糖，设置按钮类型。当设置 variant 与 color 时以后者为准",
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
                          allowedValues: [
                            "primary",
                            "dashed",
                            "link",
                            "text",
                            "default",
                          ],
                          default: "default",
                        },
                      },
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
              ],
              styleChildren: [],
            },
          },
        ],
      },
      {
        sectionName: "General",
        children: [
          {
            propertyName: "align",
            label: "Align",
            helpText: "对齐方式",
            controlType: "DROP_DOWN",
            options: [
              {
                label: "start",
                value: "start",
              },
              {
                label: "end",
                value: "end",
              },
              {
                label: "center",
                value: "center",
              },
              {
                label: "baseline",
                value: "baseline",
              },
            ],
            isBindProperty: true,
            isTriggerProperty: false,
            validation: {
              type: ValidationTypes.TEXT,
              params: {
                allowedValues: ["start", "end", "center", "baseline"],
              },
            },
          },
          {
            propertyName: "spaceDirection",
            label: "Direction",
            helpText: "间距方向",
            controlType: "DROP_DOWN",
            options: [
              {
                label: "vertical",
                value: "vertical",
              },
              {
                label: "horizontal",
                value: "horizontal",
              },
            ],
            isBindProperty: true,
            isTriggerProperty: false,
            validation: {
              type: ValidationTypes.TEXT,
              params: {
                allowedValues: ["vertical", "horizontal"],
                default: "horizontal",
              },
            },
          },
          {
            propertyName: "size",
            label: "Size",
            helpText: "间距大小",
            controlType: "DROP_DOWN",
            options: [
              {
                label: "small",
                value: "small",
              },
              {
                label: "middle",
                value: "middle",
              },
              {
                label: "large",
                value: "large",
              },
            ],
            isBindProperty: true,
            isTriggerProperty: false,
            validation: {
              type: ValidationTypes.TEXT,
              params: {
                allowedValues: ["small", "middle", "large"],
                default: "small",
              },
            },
          },
          {
            propertyName: "wrap",
            label: "Wrap",
            helpText: "是否自动换行，仅在 horizontal 时有效",
            controlType: "SWITCH",
            isJSConvertible: true,
            isBindProperty: true,
            isTriggerProperty: false,
            validation: { type: ValidationTypes.BOOLEAN },
          },
        ],
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

  getWidgetView() {
    return (
      <AntdButtonGroupComponent
        align={this.props.align}
        direction={this.props.spaceDirection}
        groupButtons={this.props.groupButtons}
        size={this.props.size}
        width={this.props.componentWidth}
        wrap={this.props.wrap}
      />
    );
  }
}

export interface AntdButtonGroupWidgetProps
  extends WidgetProps,
    Omit<SpaceProps, "direction"> {
  spaceDirection?: SpaceProps["direction"];
  groupButtons?: Record<string, ButtonProps & { label?: string }>;
}

export default AntdButtonGroupWidget;
