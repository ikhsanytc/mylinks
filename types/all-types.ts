interface LinksNavbar {
  display: string;
  link: string;
}

interface LoginInput {
  email: string;
  password: string;
}

interface RegisterInput {
  email: string;
  password: string;
  repeatPassword: string;
}

interface TautanT {
  email_user: string | undefined;
  url_singkat: string;
  url_base: string;
  click: number;
  created_at: Date;
}

export type { LinksNavbar, LoginInput, RegisterInput, TautanT };
