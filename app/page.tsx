"use client";
import React, { useEffect, useState } from "react";
import { Box, IconButton, Badge, Button, Divider } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import ImportExportIcon from "@mui/icons-material/ImportExport";
import FilterAltOutlined from "@mui/icons-material/FilterAltOutlined";
import ClientTabs from "../components/ClientTabs";
import { TabOption, SortCriteria, Client } from "../types";
import orderBy from "lodash/orderBy";
import ClientsTable from "../components/ClientsTable";
import { SortModal } from "../components/SortPanel";
import { clients } from "../data/mockData";

const mockClients: Client[] = clients;

export default function ClientsPage() {
  const [tab, setTab] = useState<TabOption>("All");
  const [modalOpen, setModalOpen] = useState(false);
  const [sortCriteria, setSortCriteria] = useState<SortCriteria[]>([]);
  const [clients, setClients] = useState(mockClients);

  useEffect(() => {
    const local = localStorage.getItem("clientSort");
    if (local) setSortCriteria(JSON.parse(local));
  }, []);

  const filteredClients = clients.filter((c) =>
    tab === "All" ? true : c.type === tab
  );

  const sortedClients =
    sortCriteria.length > 0
      ? orderBy(
          filteredClients,
          sortCriteria.map((sc) => {
            if (sc.id === "clientName") return "name";
            if (sc.id === "clientId") return "id";
            return sc.id;
          }),
          sortCriteria.map((sc) => sc.direction)
        )
      : filteredClients;

  return (
    <Box
      sx={{
        px: 0,
        py: 3,
        bgcolor: "#fafbfc",
        minHeight: "100vh",
        fontFamily: "Inter, sans-serif",
      }}
    >
      <Box
        sx={{
          fontWeight: 500,
          fontSize: 14,
          letterSpacing: 0,
          color: "#232b35",
           mb: 2,
           mt:0,
           pl:2,
           ml:1,
          fontFamily: "Inter, sans-serif",
        }}
      >
        Clients
      </Box>
      <Divider sx={{mb:2}}/>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          px: 4,
          mb: 1,
        }}
      >
        <ClientTabs value={tab} onChange={setTab} />
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <IconButton size="small" sx={{ bgcolor: "#fff", borderRadius: 1.5 }}>
            <SearchIcon sx={{ color: "#b0b8c1", fontSize: 22 }} />
          </IconButton>
          <IconButton size="small" onClick={() => setModalOpen(true)}>
            <Badge
              badgeContent={2}
              color="error"
              sx={{ "& .MuiBadge-badge": { fontSize: 10 } }}
            >
              <ImportExportIcon sx={{ fontSize: 24 }} />
            </Badge>
          </IconButton>
          <IconButton
            size="small"
            sx={{
              bgcolor: "#fff",
              borderRadius: 1.5,
              ml: 1,
              p: 0.7,
            }}
          >
            <FilterAltOutlined sx={{ color: "#b0b8c1", fontSize: 22 }} />
          </IconButton>
          <Button
            variant="contained"
            sx={{
              background: "#111",
              color: "#fff",
              fontWeight: 700,
              
              borderRadius: 2,
              textTransform: "none",
              fontSize: 10,
              ml: 2,
            }}
          >
            + Add Client
          </Button>
        </Box>
      </Box>
      <Box
        sx={{
          px: 4,
          pt: 1,
        }}
      >
        <ClientsTable data={sortedClients} />
      </Box>
      <SortModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        sortCriteria={sortCriteria}
        setSortCriteria={setSortCriteria}
      />
    </Box>
  );
}
