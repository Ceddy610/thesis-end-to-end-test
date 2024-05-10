import 'package:flutter/material.dart';

class DrawnLine {
  final List<Offset?> points;
  final Color color;
  final double strokeWidth;

  DrawnLine({required this.points, this.color = Colors.black, this.strokeWidth = 5.0});
}