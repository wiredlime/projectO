import { create } from "zustand";
import { persist } from "zustand/middleware";
import { v4 as uuid } from "uuid";

export interface INote {
  id: string;
  projectId: string;
  content: string;
  updatedAt: number;
  createdAt: number;
  removedAt?: number | null;
  justSynced?: boolean;
}

export interface IProject {
  id: string;
  name: string;
  noteIds: string[];
  createdAt: number;
}

type State = {
  auth: any;
  setAuth: (auth: any) => void;
  syncCode: string | null;
  setSyncCode: (code: string | null) => void;
  showList: boolean;
  toggleShowList: (show: boolean) => void;

  projects: IProject[];
  setProjects: (projects: IProject[]) => void;
  newProject: (name: string) => string;
  editProject: (id: string, name: string) => void;
  deleteProject: (id: string) => void;

  notes: INote[];
  setNotes: (notes: INote[]) => void;
  newNote: (projectId: string) => string;
  editNote: (id: string, content: string) => void;
  deleteNote: (id: string) => void;

  recents: IProject[];
  setRecents: (project: IProject) => void;

  removeJustSynced: (id: string) => void;
  lastSync: Date | null;
  setLastSync: () => void;
};

export const useStore = create<State>()(
  persist(
    (set, get) => ({
      auth: null,
      syncCode: null,
      setAuth: (data) => set((state: State) => ({ ...state, auth: data })),
      setSyncCode: (code) =>
        set((state: State) => ({ ...state, syncCode: code })),
      showList: true,
      toggleShowList: (show) =>
        set((state: State) => ({ ...state, showList: show })),
      notes: [
        {
          id: "1",
          projectId: "1",
          content: `# About ProjectO&#x20;

          > Notes should always be written in Markdown and so here goes ProjectO!
          > Where you organize, brainstorm and do whatsoever with markdown notes 📝 ☕️
          
          Let's get in touch by: [wiredlime](https://github.com/wiredlime) or [tiennguyen.baked@gmail.com](mailto:tiennguyen.baked@gmail.com)
          
          ***
          
          # Heading 1
          
          ## Heading 2
          
          ### Heading 3
          
          Paragraph...
          
          **Bold** *Italic* <u>Underline</u>
          
          ***
          
          **Also making lists with numbered, bulleted styles and checkboxes**
          
          * **Bulleted list**
          
          1. **Numbered list**
          
          * [x] Check list
          
          ***
          
          **A table with builtin buttons to - add rows, columns, change column alignment. When editing, you can navigate the cells with \`enter\`, \`shift+enter\`, \`tab\` and \`shift+tab\`.**
          
          | Item      | In stock | 💰 Price |
          | --------- | -------- | -------- |
          | Sandwich  | True     | $5.0     |
          | Sparkling | False    | $2.5     |`,
          updatedAt: 1719301116393,
          createdAt: 1719301116393,
        },
      ],
      projects: [
        {
          id: "1",
          noteIds: ["1"],
          name: "About ProjectO",
          createdAt: 1719301116393,
        },
      ],
      recents: [],
      setProjects: (projects) =>
        set((state: State) => ({ ...state, projects })),
      newProject: (name: string) => {
        const id = uuid();
        set((state: State) => ({
          ...state,
          projects: [
            {
              id,
              name,
              noteIds: [],
              createdAt: Date.now(),
            },
            ...state.projects,
          ],
        }));
        return id;
      },
      editProject: (id: string, name: string) =>
        set((state: State) => ({
          ...state,
          projects: state.projects.map((project) =>
            project.id === id
              ? {
                  ...project,
                  name,
                }
              : project
          ),
        })),
      deleteProject: (id: string) =>
        set((state: State) => ({
          ...state,
          projects: state.projects.filter((project) => project.id !== id),
          notes: state.notes.filter((note) => note.projectId !== id),
        })),
      setNotes: (notes) => set((state: State) => ({ ...state, notes })),
      newNote: (projectId: string) => {
        const id = uuid();
        set((state: State) => ({
          ...state,
          projects: state.projects.map((project) =>
            project.id === projectId
              ? {
                  ...project,
                  noteIds: [...project.noteIds, id],
                }
              : project
          ),
          notes: [
            {
              id,
              content: "Untitled note",
              projectId,
              createdAt: Date.now(),
              updatedAt: Date.now(),
            },
            ...state.notes,
          ],
        }));
        return id;
      },
      editNote: (id, content) =>
        set((state: State) => ({
          ...state,
          notes: state.notes.map((note) =>
            note.id === id
              ? {
                  ...note,
                  content,
                  updatedAt: Date.now(),
                }
              : note
          ),
        })),
      deleteNote: (id) =>
        set((state: State) => ({
          ...state,
          notes: state.notes.filter((note) => note.id !== id),
        })),
      removeJustSynced: (id) =>
        set((state: State) => ({
          ...state,
          notes: state.notes.map((note) =>
            note.id === id
              ? {
                  ...note,
                  justSynced: false,
                }
              : note
          ),
        })),
      setRecents: (recent) => {
        set((state: State) => {
          if (state.recents.length >= 3) {
            const outdatedItem = state.recents.shift();
            return {
              ...state,
              recents: [...state.recents, recent].filter(
                (value, index, array) => array.indexOf(value) === index
              ),
            };
          } else {
            return {
              ...state,
              recents: [...state.recents, recent].filter(
                (value, index, array) => array.indexOf(value) === index
              ),
            };
          }
        });
      },
      lastSync: null,
      setLastSync: () =>
        set((state: State) => ({ ...state, lastSync: new Date() })),
    }),
    {
      name: "@projecto",
    }
  )
);
