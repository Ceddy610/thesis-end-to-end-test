cd server; 
npm run start & server_pid=$!;
cd ..;
maestro test android-flow.yaml;
maestro test android-flow-drawing.yaml;
kill "$server_pid";