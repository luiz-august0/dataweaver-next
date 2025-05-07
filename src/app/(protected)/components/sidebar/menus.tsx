import { Database, Grape, User } from 'lucide-react';

export const menus = [
  {
    name: 'Usuários',
    url: '/usuarios',
    icon: User,
  },
  {
    name: 'Relatórios',
    url: '/relatorios',
    icon: Grape,
  },
  {
    name: 'Conexão de Dados',
    url: '/conexao',
    icon: Database,
  },
];
