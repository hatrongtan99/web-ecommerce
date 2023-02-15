export interface AllCategory {
  lists: {
    _id: string;
    name: string;
    image: string;
    isActive: boolean;
    created: string;
    slug: string;
  }[];
}

export interface NewCategory {
  name: string;
  image: string;
  description?: string;
}
