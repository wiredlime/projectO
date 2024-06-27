import { v4 as uuid } from "uuid";

import fsPromises from "fs/promises";
import { dataFilePath } from "@/lib/constant";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { content, projectId } = body;

    const file = await fsPromises.readFile(dataFilePath, {
      encoding: "utf8",
    });
    const data = JSON.parse(file) as Project[];

    const note: Note = {
      id: uuid(),
      content,
      projectId,
      createdAt: new Date(),
    };

    const projectIndex = data.findIndex((proj) => proj.id === projectId);
    data[projectIndex].notes.push(note);

    await fsPromises.writeFile(dataFilePath, JSON.stringify(data));
    return new Response(JSON.stringify(note), { status: 200 });
  } catch (e) {
    console.log(e);
    return new Response("Error fetching", { status: 403 });
  }
}
