class ToDoItem {
  String task;
  String description;
  bool isCompleted;

  ToDoItem(
      {required this.task, this.description = '', this.isCompleted = false});
}