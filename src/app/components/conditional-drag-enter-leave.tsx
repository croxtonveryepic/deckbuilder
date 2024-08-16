export class ConditionalDragEnterLeave {
  onDragEnter: ((e: React.DragEvent) => void) | undefined;
  onDragLeave: ((e: React.DragEvent) => void) | undefined;

  constructor(
    condition: boolean,
    onDragEnter: (e: React.DragEvent) => void,
    onDragLeave: (e: React.DragEvent) => void
  ) {
    if (condition) {
      this.onDragEnter = onDragEnter;
      this.onDragLeave = onDragLeave;
    }
  }
}
