import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Chip,
  TableContainer,
  Paper,
  Link,
  
} from "@mui/material";
import TableChartIcon from '@mui/icons-material/TableChart';
import { Client } from "../types";

const ClientsTable = ({ data }: { data: Client[] }) => {
  return (
    <TableContainer component={Paper} elevation={1}>
      <Table
        size="small" 
      >
        <TableHead>
          <TableRow
            sx={{
              background: "#fafbfc",
              "& th": {
                fontWeight: 500,
                fontSize: 11,
                color: "#232b35",
                fontFamily: "Inter, sans-serif",
                background: "#fafbfc",
              },
            }}
          >
           <TableCell sx={{ width: 40 }}>
              <TableChartIcon sx={{ color: "#6b7280", fontSize: 18 }} />
            </TableCell>
            <TableCell>Client ID</TableCell>
            <TableCell>Client Name</TableCell>
            <TableCell>Client Type</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Type</TableCell>
            <TableCell>Updated At</TableCell>
            <TableCell>Updated By</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((client) => (
            <TableRow
              key={client.id}
              sx={{
                "& td": {
                  fontFamily: "Inter, sans-serif",
                  fontSize: 11,
                  color: "#434b59",
                  borderBottom: "1px solid #ededed",
                  fontWeight: 600,
                },
              }}
            >
              <TableCell></TableCell>
              <TableCell>
                <Link
                  href={`#${client.id}`}
                  sx={{
                    color: "primary.main",
                    textDecoration: "none",
                    "&:hover": { textDecoration: "underline" },
                  }}
                >
                  {client.id}
                </Link>
              </TableCell>
              <TableCell>{client.name}</TableCell>
              <TableCell>{client.type}</TableCell>
              <TableCell>{client.email}</TableCell>
              <TableCell>
                <Chip
                  label={client.status}
                  color={client.status === "Active" ? "success" : "error"}
                  size="small"
                  sx={{
                    fontWeight: 700,
                    fontSize: 11,
                    background:
                      client.status === "Active" ? "#e5f7ee" : "#fdecea",
                    color: client.status === "Active" ? "#43b87a" : "#ee293e",
                  }}
                />
              </TableCell>
              <TableCell>{client.type}</TableCell>
              <TableCell>{client.updatedAt}</TableCell>
              <TableCell>{client.updatedBy}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default ClientsTable;
