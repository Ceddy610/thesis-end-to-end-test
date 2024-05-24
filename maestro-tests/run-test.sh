cd server; 
npm run start & 
cd ..;
maestro test -e APP_ID=com.example.todoappflutter android-flow.yaml;
maestro test -e APP_ID=com.example.todoappflutter android-flow-drawing.yaml;
pkill node;