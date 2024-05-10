class ToDoItem {
  ToDoItem(
      {required this.task, this.description = '', this.isCompleted = false});

  String task;
  String description;
  bool isCompleted;
}