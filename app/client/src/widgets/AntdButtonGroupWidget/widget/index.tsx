import React from "react";

import type { DerivedPropertiesMap } from "WidgetProvider/factory/types";

import type { WidgetProps, WidgetState } from "widgets/BaseWidget";
import BaseWidget from "widgets/BaseWidget";

import AntdButtonGroupComponent from "../component";

import IconSVG from "../icon.svg";
import ThumbnailSVG from "../thumbnail.svg";
import { WIDGET_TAGS } from "constants/WidgetConstants";
import type { PropertyPaneConfig } from "constants/PropertyControlConstants";
import type { ButtonProps, SpaceProps } from "antd";
import type {
  AutoLayoutConfig,
  WidgetBaseConfiguration,
  WidgetDefaultProps,
} from "WidgetProvider/types";
import type { WidgetFeatures } from "utils/WidgetFeatures";
import { EventType } from "constants/AppsmithActionConstants/ActionConstants";
import {
  BASE_BUTTON_CONFIG,
  BASE_BUTTON_DEFAULT,
  BASE_BUTTON_TYPE_CONFIG,
} from "widgets/AntdButtonWidget/constants";
import { BASE_SPACE_CONFIG } from "constants/AntdConfig";

class AntdButtonGroupWidget extends BaseWidget<
  AntdButtonGroupWidgetProps,
  WidgetState
> {
  static type = "ANTD_BUTTON_GROUP_WIDGET";

  static getConfig(): WidgetBaseConfiguration {
    return {
      name: "Antd Button Group", // The display name which will be made in uppercase and show in the widgets panel ( can have spaces )
      iconSVG: IconSVG,
      thumbnailSVG: ThumbnailSVG,
      needsMeta: false, // Defines if this widget adds any meta properties
      isCanvas: false, // Defines if this widget has a canvas within in which we can drop other widgets
      searchTags: ["antd", "button", "group", "buttons", "click", "submit"],
      tags: [WIDGET_TAGS.BUTTONS],
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
          ...BASE_BUTTON_DEFAULT,
          block: false,
          type: "primary",
        },
        groupButton2: {
          id: "groupButton2",
          index: 1,
          widgetId: "",
          label: "取消",
          ...BASE_BUTTON_DEFAULT,
          block: false,
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
              contentChildren: BASE_BUTTON_CONFIG.concat({
                ...BASE_BUTTON_TYPE_CONFIG,
                propertyName: "type",
              }),
              styleChildren: [],
            },
          },
        ],
      },
      ...BASE_SPACE_CONFIG,
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

  handleClick = (onClick: string | undefined): void => {
    if (onClick) {
      super.executeAction({
        triggerPropertyName: "onClick",
        dynamicString: onClick,
        event: {
          type: EventType.ON_CLICK,
        },
      });
    }
  };

  getWidgetView() {
    return (
      <AntdButtonGroupComponent
        align={this.props.align}
        buttonClickHandler={this.handleClick}
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
  groupButtons?: Record<
    string,
    Omit<ButtonProps, "onClick"> & { label?: string; onClick?: string }
  >;
}

export default AntdButtonGroupWidget;
