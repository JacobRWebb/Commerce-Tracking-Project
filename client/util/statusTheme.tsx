import theme from "@chakra-ui/theme";
import { AlertStatus } from "../interface/IEntry";

export interface IStatusTheme {
  borderColor: string;
  type: "info" | "warning" | "success" | "error";
}

export const StatusTheme = (status?: AlertStatus): IStatusTheme => {
  if (status === undefined)
    return { type: "info", borderColor: theme.colors.red[100] };
  switch (status) {
    case AlertStatus.ACKNOWLEDGED:
      return { borderColor: theme.colors.green[200], type: "success" };
    case AlertStatus.DECLINED:
      return { borderColor: theme.colors.red[200], type: "error" };
    default:
      return { borderColor: theme.colors.blue[200], type: "info" };
  }
};
