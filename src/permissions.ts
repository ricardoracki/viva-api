const PERMISSIONS = [
  'ACCESS_DASHBOARD',
  'READ_STUDIES',
  'CREATE_STUDIES',
  'MANAGE_STUDIES',
  'READ_EVENTS',
  'CREATE_EVENTS',
  'MANAGE_EVENTS',
  'READ_USERS',
  'MANAGE_USERS',
  'SEND_NOTIFICATIONS',
] as const

const PermissionsDescriptions: Record<(typeof PERMISSIONS)[number], string> = {
  ACCESS_DASHBOARD: 'Acessar ao painel administrativo',
  READ_STUDIES: 'Visualizar estudos',
  CREATE_STUDIES: 'Criar estudos',
  MANAGE_STUDIES: 'Gerenciar estudos',
  READ_EVENTS: 'Visualizar eventos',
  CREATE_EVENTS: 'Criar eventos',
  MANAGE_EVENTS: 'Gerenciar eventos',
  READ_USERS: 'Visualizar usuários',
  MANAGE_USERS: 'Gerenciar usuários',
  SEND_NOTIFICATIONS: 'Enviar notificações',
}

export { PermissionsDescriptions, PERMISSIONS }
