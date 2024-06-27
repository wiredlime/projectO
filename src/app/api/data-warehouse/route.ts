import fsPromises from "fs/promises";
import path from "path";

const dataFilePath = path.join(process.cwd(), "/public/data.json");
export async function GET(req: Request, res: Response) {
  try {
    const file = await fsPromises.readFile(dataFilePath, {
      encoding: "utf8",
    });
    return new Response(file, { status: 200 });
  } catch (e) {
    console.log(e);
    return new Response("failed", { status: 400 });
  }
}
