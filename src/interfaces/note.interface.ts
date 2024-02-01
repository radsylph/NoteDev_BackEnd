export interface NoteInterface {
  owner_id: number;
  title: string;
  description: string;
  priority: number;
  favorite: boolean;
  category: [number];
}
