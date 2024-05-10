import 'dart:async';
import 'dart:convert';

import 'package:flutter/material.dart';
import 'package:flutter/services.dart';

import '../data/data.dart';

class ToDoList extends StatefulWidget {
  const ToDoList({super.key});

  @override
  State<StatefulWidget> createState() => _ToDoListState.createWithLoading();
}

class _ToDoListState extends State<ToDoList> {
  final List<ToDoItem> _todoItems = <ToDoItem>[];

  _ToDoListState.createWithLoading() {
    _loadToDoItems();
  }

  void addToDoItem({required String task, String description = ''}) {
    setState(
        () => _todoItems.add(ToDoItem(task: task, description: description)));
  }

  FutureOr<void> _loadToDoItems() async {
    String response = await rootBundle.loadString('assets/to-do.json');
    final data = jsonDecode(response) as List<dynamic>;
    setState(() {
      _todoItems.clear();
      _todoItems.addAll(data.map((element) => ToDoItem(
          task: element['name'],
          description: element['description'],
          isCompleted: element['completed'])));
    });
  }

  @override
  Widget build(BuildContext context) {
    return Column(
        mainAxisAlignment: MainAxisAlignment.spaceBetween,
        children: <Widget>[
          Expanded(
              child: Padding(
                  padding: const EdgeInsets.all(16.0),
                  child: ListView.builder(
                    shrinkWrap: true,
                    scrollDirection: Axis.vertical,
                    itemCount: _todoItems.length,
                    itemBuilder: (context, index) {
                      final item = _todoItems[index].task;
                      return Dismissible(
                          key: Key(item),
                          direction: DismissDirection.endToStart,
                          onDismissed: (direction) => setState(() {
                                _todoItems.removeAt(index);
                              }),
                          background: Container(
                            color: Colors.red,
                            child: Container(
                                padding: const EdgeInsets.only(right: 16.0),
                                alignment: AlignmentDirectional.centerEnd,
                                child: const Icon(
                                  Icons.delete,
                                  color: Colors.white,
                                )),
                          ),
                          child: CheckboxListTile(
                            title: Text(_todoItems[index].task),
                            subtitle: Text(_todoItems[index].description),
                            value: _todoItems[index].isCompleted,
                            onChanged: (bool? value) {
                              setState(() {
                                _todoItems[index].isCompleted = value!;
                              });
                            },
                          ));
                    },
                  ))),
          Container(
              alignment: Alignment.bottomRight,
              padding: const EdgeInsets.all(16.0),
              child: FloatingActionButton.extended(
                  icon: const Icon(Icons.add),
                  label: const Text('Add a task'),
                  onPressed: () {
                    showDialog(
                        context: context,
                        builder: (BuildContext context) {
                          final TextEditingController taskNameController =
                              TextEditingController();
                          final TextEditingController descriptionController =
                              TextEditingController();
                          return SimpleDialog(
                            title: const Text('Add a task'),
                            children: <Widget>[
                              Padding(
                                  padding: const EdgeInsets.all(16.0),
                                  child: Column(children: <Widget>[
                                    TextField(
                                      controller: taskNameController,
                                      decoration: const InputDecoration(
                                          labelText: 'Task',
                                          hintText: 'e.g. Buy milk'),
                                    ),
                                    TextField(
                                      controller: descriptionController,
                                      decoration: const InputDecoration(
                                          labelText: 'Description',
                                          hintText: 'e.g. 1L of whole milk'),
                                    ),
                                  ])),
                              Row(
                                mainAxisAlignment: MainAxisAlignment.end,
                                children: <Widget>[
                                  TextButton(
                                      onPressed: () {
                                        Navigator.pop(context);
                                      },
                                      child: const Text('Cancel')),
                                  TextButton(
                                      onPressed: () {
                                        addToDoItem(
                                            task: taskNameController.text,
                                            description:
                                                descriptionController.text);
                                        Navigator.pop(context);
                                      },
                                      child: const Text('Add')),
                                ],
                              )
                            ],
                          );
                        });
                  })),
        ]);
  }
}
