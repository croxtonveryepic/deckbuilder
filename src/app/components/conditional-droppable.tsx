export class ConditionalDroppable {
  onDrop: ((e: React.DragEvent) => void) | undefined;
  onDragOver: ((e: React.DragEvent) => void) | undefined;

  constructor(
    condition: boolean,
    onDrop: (e: React.DragEvent) => void,
    onDragOver = (e: React.DragEvent) => {
      e.preventDefault();
    }
  ) {
    if (condition) {
      this.onDrop = onDrop;
      this.onDragOver = onDragOver;
    }
  }
}
