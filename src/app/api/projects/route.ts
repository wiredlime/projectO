import fsPromises from "fs/promises";
import path from "path";

const dataFilePath = path.join(process.cwd(), "/public/data.json");

export async function GET(request: Request) {
  try {
    const file = await fsPromises.readFile(dataFilePath, {
      encoding: "utf8",
    });
    // const data = JSON.parse(file);
    return new Response(file, { status: 200 });
  } catch (e) {
    console.log(e);
    return new Response("Error fetching", { status: 403 });
  }
}
