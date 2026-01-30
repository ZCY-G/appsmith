import type { PropertyPaneConfig } from "constants/PropertyControlConstants";
import { ValidationTypes } from "constants/WidgetValidation";

export const BASE_SPACE_CONFIG: PropertyPaneConfig[] = [
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
