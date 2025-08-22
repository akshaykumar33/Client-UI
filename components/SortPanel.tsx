import {
  Dialog, DialogTitle, DialogContent, DialogActions,
  Button, IconButton, Box, ButtonGroup,
  
} from "@mui/material";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import UpdateIcon from "@mui/icons-material/Update";
import NumbersIcon from "@mui/icons-material/Numbers";
import CloseIcon from "@mui/icons-material/Close";
import { DndContext, useSensor, useSensors, PointerSensor, closestCenter }
  from "@dnd-kit/core";
import { SortableContext, useSortable, arrayMove, verticalListSortingStrategy }
  from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { SortField, SortCriteria,Direction } from "../types";



export const FIELD_OPTIONS = [
  { id: "clientName", label: "Client Name", icon: <PersonOutlineIcon fontSize="small" /> },
  { id: "createdAt", label: "Created At", icon: <CalendarTodayIcon fontSize="small" /> },
  { id: "updatedAt", label: "Updated At", icon: <UpdateIcon fontSize="small" /> },
  { id: "clientId", label: "Client ID", icon: <NumbersIcon fontSize="small" /> },
];



function SortRow({ id, label, icon, direction, onToggle, onRemove }: {
  id: SortField;
  label: string;
  icon: React.ReactNode;
  direction: Direction;
  onToggle: (id: SortField, direction: Direction) => void;
  onRemove: (id: SortField) => void;
}) {
  const { setNodeRef, listeners, attributes, transform, transition } = useSortable({ id });
  return (
    <Box
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      sx={{
        transform: CSS.Transform.toString(transform),
        transition,
        background: "#fff",
        borderRadius: 2,
        boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
        p: 2,
        mb: 1.5,
        display: "flex",
        alignItems: "center",
        gap: 1
      }}
    >
      <Box sx={{ color: "#2196f3", mr: 1 }}>{icon}</Box>
      <Box sx={{ flex: 1, fontWeight: 500 }}>{label}</Box>
      <ButtonGroup variant="outlined" size="small" sx={{ mr: 1 }}>
        <Button
          sx={{
            bgcolor: direction === "asc" ? "#e7f4ff" : "#f2f4f6",
            color: direction === "asc" ? "#2196f3" : "#222",
            borderRadius: 1.3,
            fontWeight: 700,
            minWidth: 32,
            transition: "background 0.3s"
          }}
          onClick={() => onToggle(id, "asc")}
        >
          {label === "Client Name" ? "A-Z" : "Newest to Oldest"}
        </Button>
        <Button
          sx={{
            bgcolor: direction === "desc" ? "#e7f4ff" : "#f2f4f6",
            color: direction === "desc" ? "#2196f3" : "#222",
            borderRadius: 1.3,
            fontWeight: 700,
            minWidth: 32,
            transition: "background 0.3s"
          }}
          onClick={() => onToggle(id, "desc")}
        >
          {label === "Client Name" ? "Z-A" : "Oldest to Newest"}
        </Button>
      </ButtonGroup>
      <IconButton
        size="small"
        sx={{ color: "#bfbfbf" }}
        onClick={() => onRemove(id)}
      >
        <CloseIcon />
      </IconButton>
    </Box>
  );
}

export function SortModal({
  open, onClose, sortCriteria, setSortCriteria
}: {
  open: boolean;
  onClose: () => void;
  sortCriteria: SortCriteria[];
  setSortCriteria: (criteria: SortCriteria[]) => void;
}) {
  const sensors = useSensors(useSensor(PointerSensor));

  function handleDragEnd(event: any) {
    const { active, over } = event;
    if (active.id !== over.id) {
      const oldIndex = sortCriteria.findIndex(item => item.id === active.id);
      const newIndex = sortCriteria.findIndex(item => item.id === over.id);
      const newSorted = arrayMove(sortCriteria, oldIndex, newIndex);
      setSortCriteria(newSorted);
      localStorage.setItem("clientSort", JSON.stringify(newSorted));
    }
  }

  function handleToggle(id: SortField, direction: Direction) {
    const newCriteria = sortCriteria.map(sc => sc.id === id ? { ...sc, direction } : sc);
    setSortCriteria(newCriteria);
    localStorage.setItem("clientSort", JSON.stringify(newCriteria));
  }

  function handleRemove(id: SortField) {
    const newCriteria = sortCriteria.filter(sc => sc.id !== id);
    setSortCriteria(newCriteria);
    localStorage.setItem("clientSort", JSON.stringify(newCriteria));
  }

  function handleClear() {
    setSortCriteria([]);
    localStorage.removeItem("clientSort");
  }

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm"
      PaperProps={{
        sx: {
          borderRadius: 3,
          boxShadow: "0 12px 40px rgba(0,0,0,0.13)",
          minWidth: 400
        }
      }}
    >
      <DialogTitle sx={{ fontWeight: 700 }}>Sort By</DialogTitle>
      <DialogContent sx={{ pt: 2, pb: 0 }}>
        {sortCriteria.length > 0 ? (
          <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
            <SortableContext items={sortCriteria.map(sc => sc.id)} strategy={verticalListSortingStrategy}>
              {sortCriteria.map(sc => {
                const field = FIELD_OPTIONS.find(f => f.id === sc.id)!;
                return (
                  <SortRow
                    key={sc.id}
                    id={sc.id}
                    label={field.label}
                    icon={field.icon}
                    direction={sc.direction}
                    onToggle={handleToggle}
                    onRemove={handleRemove}
                  />
                );
              })}
            </SortableContext>
          </DndContext>
        ) : (
          <Box sx={{ color: "#888", textAlign: "center", py: 2 }}>No sort criteria yet.</Box>
        )}
        <Button
          variant="text"
          sx={{ color: "#2196f3", mt: 1 }}
          onClick={handleClear}
        >Clear all</Button>
      </DialogContent>
      <DialogActions sx={{ justifyContent: "flex-end", px: 3, pb: 2 }}>
        <Button
          onClick={onClose}
          sx={{
            background: "#111",
            color: "#fff",
            borderRadius: 2,
            px: 3,
            py: 1.2,
            fontWeight: 700,
            boxShadow: "0 2px 6px rgba(0,0,0,0.1)"
          }}
          variant="contained"
        >Apply Sort</Button>
      </DialogActions>
    </Dialog>
  );
}
