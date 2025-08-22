/* eslint-disable @typescript-eslint/no-explicit-any */

import {
  Dialog, DialogTitle, DialogContent, DialogActions, Button, IconButton, Box, Typography, Divider,
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

function SortRow({
  id, direction, label, icon, type, active, onToggle, onRemove, onSelect, listeners, attributes, isDragging,
}: any) {
  return (
    <Box
      sx={{
        display: "flex", alignItems: "center",
        py: 1, mb: 0.3,
        cursor: active ? "grab" : "pointer",
        opacity: isDragging ? 0.75 : 1,
        background: active ? "#fff" : "#fafbfc",
        borderRadius: 2,
        boxShadow: isDragging ? "0 2px 18px rgba(30,41,59,0.13)" : "none",
        fontFamily: "Inter,sans-serif",
        "&:hover": { background: active ? "#f7fafd" : "#fafbfc" },
        transition: "background 0.18s, box-shadow 0.18s",
      }}
      onClick={!active ? () => onSelect?.(id) : undefined}
    >
      <span
        style={{
          display: "flex", alignItems: "center", marginRight: 10,
          color: "#b5b5c3", cursor: active ? "grab" : "default", minWidth: 1,
        }}
        {...(active ? { ...listeners, ...attributes } : {})}
        tabIndex={-1}
      >
        {active
          ? <DragIndicatorOutlinedIcon sx={{ fontSize: 14 }} />
          : <Box sx={{ height: 6, width: 6, bgcolor: "#b5b5c3", borderRadius: "50%", ml: 0.2, mr: 0.2 }} />}
      </span>
      <Box sx={{ color: "#767e8c", mt: "1px", mr:0.5 }}>{icon}</Box>
      <Typography sx={{ flex: 1, fontWeight: active ? 700 : 500, fontSize: 11, color: active ? "#232b35" : "#bdbdbd" }}>{label}</Typography>
      <Box sx={{ display: "flex", gap: 1 }}>
        {type === "alpha" ? (
          <>
            <Button
              size="small"
              sx={{
                borderRadius: 1, fontWeight: 700, px: 1, minWidth: 0,
                background: active && direction === "asc" ? "#e7f4ff" : "#f7fafd",
                color: active && direction === "asc" ? "#2196f3" : "#767e8c",
                border: "1px solid #e3e8ef", fontSize: 11, boxShadow: "none",
                textTransform: "none", cursor: active ? "pointer" : "not-allowed",
                opacity: active ? 1 : 0.6,
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
                borderRadius: 1, fontWeight: 700, px: 1, minWidth: 0,
                background: active && direction === "desc" ? "#e7f4ff" : "#f7fafd",
                color: active && direction === "desc" ? "#2196f3" : "#767e8c",
                border: "1px solid #e3e8ef", fontSize: 13, boxShadow: "none",
                textTransform: "none", cursor: active ? "pointer" : "not-allowed",
                opacity: active ? 1 : 0.6,
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
                borderRadius: 1, fontWeight: 700, px: 1, minWidth: 0, fontSize: 11,
                background: active && direction === "asc" ? "#e7f4ff" : "#f7fafd",
                color: active && direction === "asc" ? "#2196f3" : "#767e8c",
                border: "1px solid #e3e8ef", boxShadow: "none", textTransform: "none",
                cursor: active ? "pointer" : "not-allowed", opacity: active ? 1 : 0.6,
              }}
              onClick={e => { if (active) { e.stopPropagation(); onToggle(id, "asc"); } }}
              disabled={!active}
            >↑ Newest to Oldest</Button>
            <Button
              size="small"
              sx={{
                borderRadius: 1, fontWeight: 700, px: 1, minWidth: 0, fontSize: 11,
                background: active && direction === "desc" ? "#e7f4ff" : "#f7fafd",
                color: active && direction === "desc" ? "#2196f3" : "#767e8c",
                border: "1px solid #e3e8ef", boxShadow: "none", textTransform: "none",
                cursor: active ? "pointer" : "not-allowed", opacity: active ? 1 : 0.6,
              }}
              onClick={e => { if (active) { e.stopPropagation(); onToggle(id, "desc"); } }}
              disabled={!active}
            >↓ Oldest to Newest</Button>
          </>
        )}
      </Box>
      {/* Only for selected sorters above divider */}
      {active && onRemove &&
        <IconButton
          size="small"
          onClick={e => { e.stopPropagation(); onRemove(id); }}
          sx={{ ml: 0.5, color: "#bdbdbd", "&:hover": { color: "#e53935" } }}
          tabIndex={-1}
        ><CloseIcon sx={{ fontSize: 11 }} /></IconButton>
      }
    </Box>
  );
}
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
      setSortCriteria(arrayMove(sortCriteria, oldIndex, newIndex));
    }
  }
  function handleToggle(id: SortField, d: Direction) {
    setSortCriteria(sortCriteria.map((c) => c.id === id ? { ...c, direction: d } : c));
  }
  function handleRemove(id: SortField) {
    setSortCriteria(sortCriteria.filter((c) => c.id !== id));
  }
  function handleClear() {
    setSortCriteria([]);
  }
  function handleSelectField(id: SortField) {
    const meta = ALL_FIELDS.find((f) => f.id === id)!;
    setSortCriteria([...sortCriteria, { id, direction: meta.defaultDir }]);
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
          fontFamily: "Inter, sans-serif",
        },
      }}
    >
      <DialogTitle sx={{ fontWeight: 700, fontSize: 15, color: "#232b35", fontFamily: "Inter,sans-serif" }}>
        Sort By
      </DialogTitle>
      <DialogContent sx={{ pt: 1, pb: 0, minWidth: 400 }}>
        {/* Selected above divider */}
        <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
          <SortableContext items={sortCriteria.map((c) => c.id)} strategy={verticalListSortingStrategy}>
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
        {inactiveFields.length > 0 && <Divider sx={{ my: 1.4, bgcolor: "#ededed" }} />}
        {/* Unselected below divider */}
        {inactiveFields.map((meta) => (
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
      </DialogContent>
      <DialogActions
        sx={{ pr: 2.5, pb: 1, pt: 1, justifyContent: "space-between", gap: 2 }}
      >
        <Button
          size="small"
          onClick={handleClear}
          sx={{
            minWidth: 60, borderRadius: 1.1, fontSize: 11,
            border: "1px solid #ededed", background: "#fafbfc",
            color: "#232b35", fontWeight: 600, boxShadow: "none",
            textTransform: "none", "&:hover": { background: "#f5f5f5" },
          }}
        >
          Clear all
        </Button>
        <Button
          size="small"
          variant="contained"
          sx={{
            minWidth: 80, px: 1.5, py: 0.7,
            borderRadius: 1.1, fontWeight: 600, fontSize: 12,
            background: "#111", color: "#fff",
            boxShadow: "0 2px 8px rgba(30,41,59,0.09)",
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
