import 'dart:async';

import 'package:flutter/material.dart';

import '../data/data.dart';

class ToDoPainter extends CustomPainter {
  List<DrawnLine?>? drawnLines;

  ToDoPainter({this.drawnLines});

  @override
  void paint(Canvas canvas, Size size) {
    if (drawnLines == null) {
      return;
    }

    final paint = Paint()..style = PaintingStyle.stroke;

    for (int i = 0; i < drawnLines!.length; ++i) {
      if (drawnLines![i] == null) continue;
      for (int j = 0; j < drawnLines![i]!.points.length - 1; ++j) {
        if (drawnLines![i]?.points[j] != null &&
            drawnLines![i]?.points[j + 1] != null) {
          paint.color = drawnLines![i]!.color;
          paint.strokeWidth = drawnLines![i]!.strokeWidth;
          canvas.drawLine(drawnLines![i]!.points[j]!,
              drawnLines![i]!.points[j + 1]!, paint);
        }
      }
    }
  }

  @override
  bool shouldRepaint(CustomPainter oldDelegate) {
    return true;
  }
}

class DrawingWidget extends StatefulWidget {
  const DrawingWidget({super.key});

  @override
  State<DrawingWidget> createState() => _DrawingWidgetState();
}

class _DrawingWidgetState extends State<DrawingWidget> {
  DrawnLine? drawnLine;
  List<DrawnLine?> drawnLines = <DrawnLine?>[];
  Color selectedColor = Colors.black;

  StreamController<List<DrawnLine?>> linesStreamController = StreamController<List<DrawnLine?>>.broadcast();
  StreamController<DrawnLine?> currentLineStreamController = StreamController<DrawnLine?>.broadcast();

  void clear() {
    setState(() {
      drawnLine = null;
      drawnLines = [];
    });
  }

  void onPanStart(DragStartDetails details) {
    RenderBox box = context.findRenderObject() as RenderBox;
    Offset point = box.globalToLocal(details.globalPosition);
    drawnLine = DrawnLine(points: [point], color: selectedColor);
  }

  void onPanEnd(DragEndDetails details) {
    drawnLines = List.from(drawnLines)..add(drawnLine);

    linesStreamController.add(drawnLines);
  }

  void onPanUpdate(DragUpdateDetails details) {
    RenderBox box = context.findRenderObject() as RenderBox;
    Offset point = box.globalToLocal(details.globalPosition);

    List<Offset> path = List.from(drawnLine!.points)..add(point);
    drawnLine = DrawnLine(points: path, color: selectedColor);
    currentLineStreamController.add(drawnLine);
  }

  Widget buildToolbar() {
    return Positioned(
      top: 40.0,
      right: 10.0,
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.center,
        mainAxisAlignment: MainAxisAlignment.start,
        children: [
          buildClearButton(),
        ],
      ),
    );
  }

  Widget buildClearButton() {
    return GestureDetector(
      onTap: clear,
      child: const CircleAvatar(
        backgroundColor: Colors.grey,
        child: Icon(
          Icons.clear,
          size: 20.0,
          color: Colors.white,
        ),
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Colors.yellow[50],
      body: Stack(
        children: [
          buildAllPaths(context),
          buildCurrentPath(context),
        ],
      ),
    );
  }

  GestureDetector buildCurrentPath(BuildContext context) {
    return GestureDetector(
      onPanStart: onPanStart,
      onPanUpdate: onPanUpdate,
      onPanEnd: onPanEnd,
      child: RepaintBoundary(
        child: Container(
          width: MediaQuery.of(context).size.width,
          height: MediaQuery.of(context).size.height,
          padding: const EdgeInsets.all(4.0),
          color: Colors.transparent,
          alignment: Alignment.topLeft,
          child: StreamBuilder<DrawnLine?>(
            stream: currentLineStreamController.stream,
            builder: (context, snapshot) {
              return CustomPaint(
                painter: ToDoPainter(
                  drawnLines: [drawnLine],
                ),
              );
            },
          ),
        ),
      ),
    );
  }

  Widget buildAllPaths(BuildContext context) {
    return RepaintBoundary(
      child: Container(
        width: MediaQuery.of(context).size.width,
        height: MediaQuery.of(context).size.height,
        color: Colors.transparent,
        padding: const EdgeInsets.all(4.0),
        alignment: Alignment.topLeft,
        child: StreamBuilder<List<DrawnLine?>>(
          stream: linesStreamController.stream,
          builder: (context, snapshot) {
            return CustomPaint(
              painter: ToDoPainter(
                drawnLines: drawnLines,
              ),
            );
          },
        ),
      ),
    );
  }
}
