export class ConditionalDraggable {
  onDragStart: ((e: React.DragEvent) => void) | undefined;
  onDragEnd: ((e: React.DragEvent) => void) | undefined;
  draggable: boolean;

  constructor(
    condition: boolean,
    onDragStart: (e: React.DragEvent) => void,
    onDragEnd = (e: React.DragEvent) => {
      e.preventDefault();
    }
  ) {
    if (condition) {
      this.onDragStart = onDragStart;
      this.onDragEnd = onDragEnd;
      this.draggable = condition;
    }
  }
}
