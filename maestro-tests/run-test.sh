cd server; 
npm run start & 
cd ..;
maestro test -e APP_ID=com.example.todoappflutter android-flow.yaml;
maestro test -e APP_ID=com.example.todoappflutter android-flow-drawing.yaml;
maestro test -e APP_ID=com.example.ToDoApp android-flow.yaml;
maestro test -e APP_ID=com.example.ToDoApp android-flow-drawing.yaml;
pkill node;