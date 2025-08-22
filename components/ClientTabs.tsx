import { TabOption } from "../types";
import { Tabs, Tab } from "@mui/material";

const ClientTabs = ({
  value,
  onChange,
}: {
  value: TabOption;
  onChange: (tab: TabOption) => void;
}) => (
  <Tabs
    value={value}
    onChange={(_, val) => onChange(val)}
    TabIndicatorProps={{
      sx: {
        backgroundColor: "black",
        height: 2,
        width: "12px", 
        borderRadius: 2,
        marginLeft: "auto",
        marginRight: "auto",
        padding:"1px"
      },
    }}
    sx={{
      minHeight: 40,
      padding:"2px",
      color: "grey.700",
    }}
    centered
  >
    {["All", "Individual", "Company"].map((tab) => (
      <Tab
        key={tab}
        label={tab}
        value={tab}
        sx={{
          textTransform: "none",
          fontSize: "0.7em",
          fontWeight: value === tab ? 600 : 500,
          color: value === tab ? "black" : "grey.700",
          minWidth: 0,
          paddingX: 2,
          "&:hover": {
            color: "black",
            opacity: 0.8,
          },
        }}
      />
    ))}
  </Tabs>
);

export default ClientTabs;
