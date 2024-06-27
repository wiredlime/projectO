import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const fetchProject = async (id: string) => {
  try {
    const response = await fetch(`/api/projects/${id}`);

    if (response.ok) {
      const data = await response.json();
      return data as Project;
    }
  } catch (e) {
    console.log(e);
  }
  return null;
};

export const fetchNote = async (projectId: string, noteId: string) => {
  try {
    const response = await fetch(`/api/projects/${projectId}`);
    if (response.ok) {
      const currentProject = (await response.json()) as Project;
      const note = currentProject.notes.find(
        (note) => note.id === noteId
      ) as Note;
      return note;
    }
  } catch (e) {
    console.log(e);
  }
  return null;
};
let emojis = ["🐛", "🚀", "🎨", "🥝", "🍌", "🎩"];
export const randomEmojiGenerator = () => {
  const max = emojis.length - 1;
  const min = 0;
  const random = Math.floor(Math.random() * (max - min + 1)) + min;
  return emojis[random];
};
