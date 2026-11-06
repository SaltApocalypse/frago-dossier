import {
  Avatar,
  Badge,
  Button,
  Dropdown,
  Field,
  FieldRow,
  Input,
  LightButton,
  Panel,
  Segmented,
  Sidebar,
  Textarea,
  ThemeBackground,
  Toggle,
  Tooltip,
} from "./components";

/**
 * 主题对象：daisyUI 主题 id + 跨主题组件契约。
 *
 * 应用层通过 `theme.components.*` 取用组件，避免直接依赖具体实现。
 */
export const theme = {
  id: "frago",
  name: "Frago",
  components: {
    Avatar,
    Badge,
    Button,
    Dropdown,
    Field,
    FieldRow,
    Input,
    LightButton,
    Panel,
    Segmented,
    Sidebar,
    Textarea,
    ThemeBackground,
    Toggle,
    Tooltip,
  },
} as const;

export type FragoTheme = typeof theme;
