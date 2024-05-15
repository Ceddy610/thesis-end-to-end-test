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

  const pan = Gesture.Pan()
    .onStart((e) => {
      setPath(() => {
        const newPath = [...paths];
        newPath[paths.length] = {
          segments: [`M ${Math.round(e.x)} ${Math.round(e.y)}`],
        };
        return newPath;
      });
    })
    .onUpdate((e) => {
      setPath(() => {
        const newPath = [...paths];
        newPath[paths.length - 1]?.segments?.push(
          `L ${Math.round(e.x)} ${Math.round(e.y)}`
        );
        return newPath;
      });
    })
    .onTouchesUp((g) => {
      const newPaths = [...paths];
      setPath(newPaths);
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
              />
            ))}
          </Canvas>
        </View>
      </GestureDetector>
    </GestureHandlerRootView>
  );
};
