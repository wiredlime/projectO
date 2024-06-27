interface Project {
  id: string;
  name: string;
  notes: Note[];
  tags: Tag[];
  createdAt: Date;
}

interface Tag {
  id: string;
  name: string;
}

interface Note {
  id: string;
  projectId: string;
  content: string;
  createdAt: Date;
}
