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
  DrawnLine? _drawnLine;
  List<DrawnLine?> _drawnLines = <DrawnLine?>[];
  final StreamController<List<DrawnLine?>> _linesStreamController = StreamController<List<DrawnLine?>>.broadcast();
  final StreamController<DrawnLine?> _currentLineStreamController = StreamController<DrawnLine?>.broadcast();

  void _onPanStart(DragStartDetails details) {
    RenderBox box = context.findRenderObject() as RenderBox;
    Offset point = box.globalToLocal(details.globalPosition);
    _drawnLine = DrawnLine(points: [point], color: Colors.black);
  }

  void _onPanEnd(DragEndDetails details) {
    _drawnLines = List.from(_drawnLines)..add(_drawnLine);

    _linesStreamController.add(_drawnLines);
  }

  void _onPanUpdate(DragUpdateDetails details) {
    RenderBox box = context.findRenderObject() as RenderBox;
    Offset point = box.globalToLocal(details.globalPosition);

    List<Offset> path = List.from(_drawnLine!.points)..add(point);
    _drawnLine = DrawnLine(points: path, color: Colors.black);
    _currentLineStreamController.add(_drawnLine);
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Colors.yellow[50],
      body: Stack(
        children: [
          _buildAllPaths(context),
          _buildCurrentPath(context),
        ],
      ),
    );
  }

  GestureDetector _buildCurrentPath(BuildContext context) {
    return GestureDetector(
      onPanStart: _onPanStart,
      onPanUpdate: _onPanUpdate,
      onPanEnd: _onPanEnd,
      child: RepaintBoundary(
        child: Container(
          width: MediaQuery.of(context).size.width,
          height: MediaQuery.of(context).size.height,
          padding: const EdgeInsets.all(4.0),
          color: Colors.transparent,
          alignment: Alignment.topLeft,
          child: StreamBuilder<DrawnLine?>(
            stream: _currentLineStreamController.stream,
            builder: (context, snapshot) {
              return CustomPaint(
                painter: ToDoPainter(
                  drawnLines: [_drawnLine],
                ),
              );
            },
          ),
        ),
      ),
    );
  }

  RepaintBoundary _buildAllPaths(BuildContext context) {
    return RepaintBoundary(
      child: Container(
        width: MediaQuery.of(context).size.width,
        height: MediaQuery.of(context).size.height,
        color: Colors.transparent,
        padding: const EdgeInsets.all(4.0),
        alignment: Alignment.topLeft,
        child: StreamBuilder<List<DrawnLine?>>(
          stream: _linesStreamController.stream,
          builder: (context, snapshot) {
            return CustomPaint(
              painter: ToDoPainter(
                drawnLines: _drawnLines,
              ),
            );
          },
        ),
      ),
    );
  }
}
