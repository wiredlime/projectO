import fsPromises from "fs/promises";
import path from "path";
const dataFilePath = path.join(process.cwd(), "/public/data.json");

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { noteId, projectId, content } = body;
    console.log(noteId, projectId, content);

    const file = await fsPromises.readFile(dataFilePath, {
      encoding: "utf8",
    });

    const data = JSON.parse(file) as Project[];

    let targetProjectIndex = data.findIndex(
      (project) => project.id === projectId
    );
    let targetProject = data.find((project) => project.id === projectId);
    let targetNoteIndex = targetProject?.notes.findIndex(
      (note) => note.id === noteId
    );

    // If target note is found, update content and rewrite the json file
    if (targetNoteIndex !== undefined) {
      data[targetProjectIndex].notes[targetNoteIndex].content = content;

      await fsPromises.writeFile(dataFilePath, JSON.stringify(data));
    }

    return new Response("OK", { status: 200 });
  } catch (e) {
    console.log(e);
    return new Response("Invalid request", { status: 400 });
  }
}
