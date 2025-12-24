export interface User {
  id: string;
  email: string;
  name?: string;
  createdAt: Date;
}

export interface NewsItem {
  id: string;
  title: string;
  titleMn?: string;
  description: string;
  descriptionMn?: string;
  image: string;
  date: string;
  author?: string;
}


export interface NewsItem1 {
  id: string
  title: string
  description: string
  img?: string
}

export interface TeamMember {
  id: string;
  name: string;
  nameMn?: string;
  position: string;
  positionMn?: string;
  image: string;
  bio?: string;
  bioMn?: string;
}

export interface Capability {
  id: string;
  title: string;
  titleMn?: string;
  description: string;
  descriptionMn?: string;
  icon: string;
}
