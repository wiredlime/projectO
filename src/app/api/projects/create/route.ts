import { v4 as uuid } from "uuid";

import fsPromises from "fs/promises";
import { dataFilePath } from "@/lib/constant";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name } = body;

    const file = await fsPromises.readFile(dataFilePath, {
      encoding: "utf8",
    });
    const data = JSON.parse(file) as Project[];

    const project: Project = {
      id: uuid(),
      name,
      notes: [],
      createdAt: new Date(),
      tags: [],
    };
    data.push(project);

    await fsPromises.writeFile(dataFilePath, JSON.stringify(data));
    return new Response(JSON.stringify(project), { status: 200 });
  } catch (e) {
    console.log(e);
    return new Response("Error fetching", { status: 403 });
  }
}
