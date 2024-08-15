// export class Draggable {
//   onDragStart: (e: React.DragEvent) => void;
//   onDragEnd: (e: React.DragEvent) => void;
//   draggable = true;

//   constructor(
//     onDragStart: (e: React.DragEvent) => void,
//     onDragEnd = (e: React.DragEvent) => {
//       e.preventDefault();
//     }
//   ) {
//     this.onDragEnd = onDragEnd;
//     this.onDragStart = onDragStart;
//   }
// }
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
    this.onDragEnd = onDragEnd;
    if (condition) {
      this.onDragStart = onDragStart;
      this.draggable = condition;
    }
  }
}
