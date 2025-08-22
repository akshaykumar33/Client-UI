

## 📁 Folder & File Structure

```
client-list-table/
│
├── components/
│   ├── ClientsTable.tsx
│   ├── ClientTabs.tsx
│   └── SortPanel.tsx    (your SortModal)
│
├── data/
│   └── mockData.ts
│
├── types.d.ts 
│   
│
├── app/ 
│   └── Page.tsx  (or as main page) 
│
├── package.json
├── README.md
└── ...etc
```

***

## 🚀 Quick Start

1. **Install dependencies:**
   ```sh
   npm install @mui/material @mui/icons-material @emotion/react @emotion/styled lodash dnd-kit/core dnd-kit/sortable dnd-kit/utilities
   ```

2. **Project Structure:**
   - Place your page code in `pages/ClientsPage.tsx` (or wherever your entry point is).
   - Place data in `data/mockData.ts`.
   - Place all types in `types/index.ts`.
   - Place each component file as in the folder structure above.

3. **Run your dev server:**
   ```sh
   npm run dev
   ```
   or
   ```sh
   yarn dev
   ```

***

## 🏗️ How It Works

### 1. **ClientsPage.tsx** (Parent)
- Manages state: selected tab, opened modal, the sort criteria, and all client data.
- Filters and sorts clients live; sends to table for display.
- Opens `SortModal` when you click the sort icon.

### 2. **SortPanel.tsx** (SortModal)
- Lets you drag & drop sort criteria, above and below a divider.
- Above divider = “active” sorters (draggable, closable, direction toggles).
- Below divider = inactive (shows as dot, can drag up to activate, can click to add).
- Order and directions are reflected in the table instantly.
- Clicking ✕ moves to below area; clicking a dot row or dragging above brings it up.
- `Clear all` clears all selected sorters.
- Uses dnd-kit for full drag-and-drop experience.

### 3. **ClientsTable.tsx**
- Receives **sorted** client array as `data`.
- Shows all fields, including a blue clickable Client ID, status chip, and modern style.

### 4. **ClientTabs.tsx**
- Switches `tab` to filter by All / Individual / Company.

### 5. **mockData.ts**
- Contains a wide variety of generated client records.
- Update or add to this as you wish for even more robust sorting/filtering tests.

***

## ⚙️ Customization & Extension

- **Add more fields**: Just add to `ALL_FIELDS` and to the mock data.
- **Change sort directions**: Change via the arrow buttons in the modal.
- **Change initial sorters**:  
  Edit `DEFAULT_SELECTED` in your main page file.

***

## 🧪 Troubleshooting

- **Only two sorters?**  
  Make sure your `SortPanel.tsx` (modal) logic lets you have ALL four sorters “selected” at once.  
  If you always see only two above divider, replace your SortModal with the one in this README.
- **Cannot drag between sections?**  
  Make sure you’re NOT using a `SortableContext` just around the selected or inactive fields—  
  you must have one for the full ALL_FIELDS array (see my robust solution above).
- **No changes in table?**  
  Double-check that `ClientsTable` receives and renders the `sortedClients` array.
- **Unexpected orders?**  
  Watch your `sortCriteria` array in console logs.  
  It should change order/directions instantly as you interact with the modal.

***

## 💡 Pro Tips

- You can pin/unpin specific sort fields by preventing them from going below divider (just add logic).
- Want more mock data? Paste up to 100 varied objects in `mockData.ts`—the system handles it!

***
