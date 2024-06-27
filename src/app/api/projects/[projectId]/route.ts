import fsPromises from "fs/promises";
import path from "path";

const dataFilePath = path.join(process.cwd(), "/public/data.json");

export async function GET(
  request: Request,
  context: { params: { projectId: string } }
) {
  try {
    const file = await fsPromises.readFile(dataFilePath, {
      encoding: "utf8",
    });
    const data = JSON.parse(file) as Project[];

    const projectId = context.params.projectId;
    const response = JSON.stringify(
      data.find((project) => project.id == projectId)
    );

    return new Response(response, { status: 200 });
  } catch (e) {
    console.log(e);
    return new Response("Error fetching", { status: 403 });
  }
}

export async function DELETE(
  request: Request,
  context: { params: { projectId: string } }
) {
  try {
    const file = await fsPromises.readFile(dataFilePath, {
      encoding: "utf8",
    });
    const data = JSON.parse(file) as Project[];

    const projectId = context.params.projectId;
    const updatedData = data.filter((project) => project.id !== projectId);

    await fsPromises.writeFile(dataFilePath, JSON.stringify(updatedData));
    return new Response("OK", { status: 200 });
  } catch (e) {
    console.log(e);
    return new Response("Error deleting", { status: 403 });
  }
}
