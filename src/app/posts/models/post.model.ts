export interface Post {
  id: string;
  content: string;
  imageUrl?: string;
  userName: string;
  createdAt?: Date | undefined;
  likes?: number;
  comments?: number;
}
