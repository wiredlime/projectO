import { dataFilePath } from "@/lib/constant";
import fsPromises from "fs/promises";

export async function DELETE(
  request: Request,
  context: { params: { noteId: string } }
) {
  try {
    const body = await request.json();
    const { projectId } = body;

    const file = await fsPromises.readFile(dataFilePath, {
      encoding: "utf8",
    });
    const data = JSON.parse(file) as Project[];
    const noteId = context.params.noteId;
    const projectIndex = data.findIndex((project) => project.id === projectId);

    const updatedNotes = data[projectIndex].notes.filter(
      (note) => note.id !== noteId
    );
    data[projectIndex].notes = updatedNotes;
    // const updatedData = [...data];

    await fsPromises.writeFile(dataFilePath, JSON.stringify(data));
    return new Response("OK", { status: 200 });
  } catch (e) {
    console.log(e);
    return new Response("Error deleting", { status: 403 });
  }
}
