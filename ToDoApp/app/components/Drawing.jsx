import React, { useState } from "react";
import { View } from "react-native";
import {
  Gesture,
  GestureDetector,
  GestureHandlerRootView,
} from "react-native-gesture-handler";
import { Canvas, Path } from "@shopify/react-native-skia";

export default () => {
  const [paths, setPath] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  const pan = Gesture.Pan()
    .onStart((e) => {
      setPath(() => {
        const newPath = [...paths];
        newPath[currentIndex] = {
          segments: [`M ${Math.round(e.x)} ${Math.round(e.y)}`],
        };
        return newPath;
      });
    })
    .onUpdate((e) => {
      if (!paths[currentIndex]) return;
      setPath(() => {
        const newPath = [...paths];
        newPath[currentIndex]?.segments?.push(
          `L ${Math.round(e.x)} ${Math.round(e.y)}`
        );
        return newPath;
      });
    })
    .onEnd(() => {
      setCurrentIndex(currentIndex + 1);
    })
    .minDistance(1);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <GestureDetector gesture={pan}>
        <View style={{ flex: 1, backgroundColor: "#FFFDE7" }}>
          <Canvas style={{ flex: 8 }}>
            {paths.map((p, index) => (
              <Path
                key={index}
                path={p.segments.join(" ")}
                strokeWidth={5}
                style="stroke"
                color={"black"}
                strokeMiter={10}
                stroke={{
                  precision: 1,
                }}
              />
            ))}
          </Canvas>
        </View>
      </GestureDetector>
    </GestureHandlerRootView>
  );
};
