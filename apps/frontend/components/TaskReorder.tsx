import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";

export default function TaskReorder({ tasks, onReorder }) {
  function handleDrag(result) {
    if (!result.destination) return;

    const items = Array.from(tasks);
    const [moved] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, moved);

    onReorder(items);
  }

  return (
    <DragDropContext onDragEnd={handleDrag}>
      <Droppable droppableId="tasks">
        {provided => (
          <div {...provided.droppableProps} ref={provided.innerRef} className="space-y-3">
            {tasks.map((t, i) => (
              <Draggable key={t.id} draggableId={String(t.id)} index={i}>
                {provided => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    className="bg-gray-800 border border-gray-700 p-4 rounded-lg shadow cursor-move"
                  >
                    <p className="text-lg font-semibold">{t.title}</p>
                  </div>
                )}
              </Draggable>
            ))}

            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
}
