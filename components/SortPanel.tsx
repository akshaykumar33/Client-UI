/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import {
  Dialog, DialogTitle, DialogContent, DialogActions, Button, IconButton, Box, Typography
} from "@mui/material";
import { DndContext, useSensor, useSensors, PointerSensor, closestCenter } from "@dnd-kit/core";
import { SortableContext, useSortable, arrayMove, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import DragIndicatorOutlinedIcon from "@mui/icons-material/DragIndicatorOutlined";
import PermIdentityIcon from '@mui/icons-material/PermIdentity';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import InsertInvitationIcon from '@mui/icons-material/InsertInvitation';
import CloseIcon from "@mui/icons-material/Close";
import { SortCriteria, SortField, Direction } from "../types";

const ALL_FIELDS = [
  { id: "clientName", label: "Client Name", icon: <PermIdentityIcon />, type: "alpha", defaultDir: "asc" as Direction },
  { id: "createdAt", label: "Created At", icon: <CalendarMonthIcon />, type: "date", defaultDir: "asc" as Direction },
  { id: "updatedAt", label: "Updated At", icon: <AccountBoxIcon />, type: "date", defaultDir: "asc" as Direction },
  { id: "clientId", label: "Client ID", icon: <InsertInvitationIcon />, type: "alpha", defaultDir: "asc" as Direction },
] as const;

// Used for both draggable active and clickable disabled rows
function SortRow({
  id, direction, label, icon, type, active,
  onToggle, onRemove, onSelect, listeners, attributes, isDragging
}: any) {
  return (
    <Box
      sx={{
        display: "flex", alignItems: "center",
        py: 1, mb: 0.6, cursor: active ? "grab" : "pointer",
        opacity: isDragging ? 0.66 : 1,
        background: active ? "#fff" : "#fafbfc",
        borderRadius: 2, boxShadow: isDragging ? "0 2px 18px rgba(30,41,59,0.10)" : "none",
        "&:hover": { background: "#f7fafd" }, transition: "background 0.15s, box-shadow 0.18s"
      }}
      onClick={!active ? () => onSelect?.(id) : undefined}
    >
      <span
        style={{
          display: "flex", alignItems: "center", marginRight: 13, color: "#b5b5c3",
          cursor: active ? "grab" : "default", minWidth: 15
        }} {...(active ? { ...listeners, ...attributes } : {})} tabIndex={-1}
      >
        {active
          ? <DragIndicatorOutlinedIcon sx={{ fontSize: 18 }} />
          : <Box sx={{
            height: 6, width: 6, bgcolor: "#b5b5c3", borderRadius: "50%", ml: 0.3, mr: 0.6
          }} />}
      </span>
      <Box sx={{ color: "#767e8c", mt: "1px", mr: 1 }}>{icon}</Box>
      <Typography sx={{
        flex: 1, fontWeight: active ? 700 : 500, fontSize: 15, color: active ? "#232b35" : "#bdbdbd"
      }}>{label}</Typography>
      <Box sx={{ display: "flex", gap: 1 }}>
        {type === "alpha" ? (
          <>
            <Button
              size="small"
              sx={{
                borderRadius: 1, fontWeight: 700, px: 1.3, minWidth: 0,
                background: active && direction === "asc" ? "#e7f4ff" : "#f7fafd",
                color: active && direction === "asc" ? "#2196f3" : "#767e8c",
                border: "1px solid #e3e8ef", fontSize: 13, boxShadow: "none",
                textTransform: "none", cursor: active ? "pointer" : "not-allowed",
                opacity: active ? 1 : 0.6
              }}
              onClick={e => { if (active) { e.stopPropagation(); onToggle(id, "asc"); } }}
              disabled={!active}
              startIcon={
                <svg width="14" height="14" fill="none" viewBox="0 0 18 18"><path d="M9 5l3 3H6l3-3zm0 7v-5" stroke={active && direction === "asc" ? "#2196f3" : "#767e8c"} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
              }
            >A-Z</Button>
            <Button
              size="small"
              sx={{
                borderRadius: 1, fontWeight: 700, px: 1.2, minWidth: 0,
                background: active && direction === "desc" ? "#e7f4ff" : "#f7fafd",
                color: active && direction === "desc" ? "#2196f3" : "#767e8c",
                border: "1px solid #e3e8ef", fontSize: 13, boxShadow: "none",
                textTransform: "none", cursor: active ? "pointer" : "not-allowed",
                opacity: active ? 1 : 0.6
              }}
              onClick={e => { if (active) { e.stopPropagation(); onToggle(id, "desc"); } }}
              disabled={!active}
            >
              <svg width="14" height="14" fill="none" viewBox="0 0 18 18" style={{ marginRight: 3 }}><path d="M9 13l-3-3h6l-3 3zm0-7v5" stroke={active && direction === "desc" ? "#2196f3" : "#767e8c"} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
              Z-A
            </Button>
          </>
        ) : (
          <>
            <Button
              size="small"
              sx={{
                borderRadius: 1, fontWeight: 700, px: 1.2, minWidth: 0, fontSize: 13,
                background: active && direction === "asc" ? "#e7f4ff" : "#f7fafd",
                color: active && direction === "asc" ? "#2196f3" : "#767e8c",
                border: "1px solid #e3e8ef", boxShadow: "none", textTransform: "none",
                cursor: active ? "pointer" : "not-allowed", opacity: active ? 1 : 0.6
              }}
              onClick={e => { if (active) { e.stopPropagation(); onToggle(id, "asc"); } }}
              disabled={!active}
            >↑ Newest to Oldest</Button>
            <Button
              size="small"
              sx={{
                borderRadius: 1, fontWeight: 700, px: 1.2, minWidth: 0, fontSize: 13,
                background: active && direction === "desc" ? "#e7f4ff" : "#f7fafd",
                color: active && direction === "desc" ? "#2196f3" : "#767e8c",
                border: "1px solid #e3e8ef", boxShadow: "none", textTransform: "none",
                cursor: active ? "pointer" : "not-allowed", opacity: active ? 1 : 0.6
              }}
              onClick={e => { if (active) { e.stopPropagation(); onToggle(id, "desc"); } }}
              disabled={!active}
            >↓ Oldest to Newest</Button>
          </>
        )}
      </Box>
      {active && onRemove && (
        <IconButton
          size="small"
          onClick={e => { e.stopPropagation(); onRemove(id); }}
          sx={{
            ml: 1.5, color: "#bdbdbd", "&:hover": { color: "#e53935" },
          }}
          tabIndex={-1}
        ><CloseIcon sx={{ fontSize: 18 }} /></IconButton>
      )}
    </Box>
  );
}

// -- For Dragging --
function SortableRow(props: any) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: props.id });
  return (
    <div
      ref={setNodeRef}
      style={{ transform: CSS.Transform.toString(transform), transition, zIndex: isDragging ? 99 : "auto" }}
    >
      <SortRow {...props} attributes={attributes} listeners={listeners} isDragging={isDragging} />
    </div>
  );
}

export default function SortModal({
  open, onClose, sortCriteria, setSortCriteria
}: {
  open: boolean;
  onClose: () => void;
  sortCriteria: SortCriteria[];
  setSortCriteria: (v: SortCriteria[]) => void;
}) {
  const sensors = useSensors(useSensor(PointerSensor));
  const inactiveFields = ALL_FIELDS.filter((f) => !sortCriteria.find((c) => c.id === f.id));
  function handleDragEnd(event: any) {
    const { active, over } = event;
    if (active.id !== over.id) {
      const oldIndex = sortCriteria.findIndex((item) => item.id === active.id);
      const newIndex = sortCriteria.findIndex((item) => item.id === over.id);
      const sorted = arrayMove(sortCriteria, oldIndex, newIndex);
      setSortCriteria(sorted);
      localStorage.setItem("clientSort", JSON.stringify(sorted));
    }
  }
  function handleToggle(id: SortField, d: Direction) {
    const updated = sortCriteria.map((c) =>
      c.id === id ? { ...c, direction: d } : c
    );
    setSortCriteria(updated);
    localStorage.setItem("clientSort", JSON.stringify(updated));
  }
  function handleRemove(id: SortField) {
    const updated = sortCriteria.filter((c) => c.id !== id);
    setSortCriteria(updated);
    localStorage.setItem("clientSort", JSON.stringify(updated));
  }
  function handleClear() {
    setSortCriteria([]);
    localStorage.removeItem("clientSort");
  }
  function handleSelectField(id: SortField) {
    const meta = ALL_FIELDS.find((f) => f.id === id)!;
    setSortCriteria([...sortCriteria, { id, direction: meta.defaultDir }]);
    localStorage.setItem(
      "clientSort",
      JSON.stringify([...sortCriteria, { id, direction: meta.defaultDir }])
    );
  }
  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="sm"
      PaperProps={{
        sx: {
          borderRadius: 3,
          boxShadow: "0 8px 32px rgba(0,0,0,0.16)",
          minWidth: 440,
          px: 2.5,
          py: 2,
        },
      }}
    >
      <DialogTitle sx={{ fontWeight: 700, fontSize: 20, color: "#232b35" }}>
        Sort By
      </DialogTitle>
      <DialogContent sx={{ pt: 1, pb: 0, minWidth: 400 }}>
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
          <SortableContext
            items={sortCriteria.map((c) => c.id)}
            strategy={verticalListSortingStrategy}
          >
            {sortCriteria.map((c) => {
              const meta = ALL_FIELDS.find((f) => f.id === c.id)!;
              return (
                <SortableRow
                  key={c.id}
                  id={c.id}
                  label={meta.label}
                  icon={meta.icon}
                  direction={c.direction}
                  type={meta.type}
                  active
                  onToggle={handleToggle}
                  onRemove={handleRemove}
                />
              );
            })}
          </SortableContext>
        </DndContext>
        {inactiveFields.length > 0 &&
          inactiveFields.map((meta) => (
            <SortRow
              key={meta.id}
              id={meta.id}
              label={meta.label}
              icon={meta.icon}
              type={meta.type}
              direction={meta.defaultDir}
              active={false}
              onSelect={handleSelectField}
            />
          ))}
        <Box sx={{
          color: "#898989", mt: 2, fontWeight: 500, cursor: "pointer",
          fontSize: 15, pl: 0.5, "&:hover": { textDecoration: "underline" }
        }}
          onClick={handleClear}
        >
          Clear all
        </Box>
      </DialogContent>
      <DialogActions sx={{ pb: 1.2, pr: 2.5, mt: 1 }}>
        <Button
          size="large"
          variant="contained"
          sx={{
            px: 3.5, py: 1.1, borderRadius: 1.6, fontWeight: 700, fontSize: 16,
            background: "#111", color: "#fff", boxShadow: "0 2px 8px rgba(30,41,59,0.09)",
            textTransform: "none", "&:hover": { background: "#232b35" },
          }}
          onClick={onClose}
        >
          Apply Sort
        </Button>
      </DialogActions>
    </Dialog>
  );
}
