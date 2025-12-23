import express from "express";

export const app = express();

const PORT = 3000;

app.use(express.json());

app.post("/users");
app.get("/users/:id");
app.delete("/users/:id");

app.post("/login");
app.post("/logout");

app.get("/friends");
app.get("/friends/:id");
app.post("/friends");
app.delete("friends");

app.get("/chats");
app.get("/chats/:id");
app.post("/chats");
app.delete("/chats/:id");

app.get("/channels");
app.get("/channels/:id");
app.post("/channels");
app.delete("/channels/:id");

app.get("/rooms");
app.get("/rooms/:id");
app.post("/rooms");
app.delete("/rooms/:id");

app.listen(PORT);
