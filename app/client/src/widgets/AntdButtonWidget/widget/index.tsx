import React from "react";

import type { DerivedPropertiesMap } from "WidgetProvider/factory/types";

import type { WidgetProps, WidgetState } from "widgets/BaseWidget";
import BaseWidget from "widgets/BaseWidget";

import AntdButtonComponent from "../component";

import IconSVG from "../icon.svg";
import { WIDGET_TAGS } from "constants/WidgetConstants";
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
import type { PropertyPaneConfig } from "constants/PropertyControlConstants";
import {
  BASE_BUTTON_CONFIG,
  BASE_BUTTON_DEFAULT,
  BASE_BUTTON_TYPE_CONFIG,
} from "widgets/AntdButtonWidget/constants";

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
