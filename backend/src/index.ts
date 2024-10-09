import { createServer } from "./server";

const { app, executeSchedulesService, port } = createServer();

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
  executeSchedulesService.execute();
});