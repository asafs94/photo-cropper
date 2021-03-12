import { Box } from "@material-ui/core";

export default function TabPanel(props: any) {
  const { children, value, currentValue } = props;

  return (
    <div role="tabpanel" hidden={value !== currentValue}>
      {value === currentValue && <Box p={3}>{children}</Box>}
    </div>
  );
}
