"use client";
import React, {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

interface ProjectContext {
  projects: Project[];
  setProjects?: Dispatch<SetStateAction<Project[]>>;
  project: Project | null;
  setProject?: Dispatch<SetStateAction<Project | null>>;
}

const ProjectContext = createContext<ProjectContext>({
  projects: [],
  project: null,
});

const ProjectProvider = ({ children }: { children: ReactNode }) => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [project, setProject] = useState<Project | null>(null);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        console.log("fetching");
        const response = await fetch(`/api/projects`);
        const data = await response.json();
        setProjects(data as Project[]);
      } catch (e) {
        console.log(e);
        // TODO: Toast error fetching
      }
    };

    fetchProjects();
  }, []);

  return (
    <ProjectContext.Provider
      value={{ projects, setProjects, project, setProject }}
    >
      {children}
    </ProjectContext.Provider>
  );
};

export const useProjects = () => {
  const { projects, setProjects, project, setProject } =
    useContext(ProjectContext);

  return { projects, setProjects, project, setProject };
};

export default ProjectProvider;
