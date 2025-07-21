// Course data based on the curriculum flow chart
// Blue arrows = Course Approved requirements
// Red arrows = Exam Approved requirements
export const courses = [
  // Semestre 1
  {
    id: 'ARQ',
    name: 'Arquitectura',
    description: 'Arquitectura de Computadoras',
    credits: 0,
    semester: 1,
    courseApproved: [],
    examApproved: [],
    category: 'Arquitectura, Sistemas Operativos y Redes'
  },
  {
    id: 'DL1',
    name: 'Discreta y Lógica 1',
    description: 'Matemática Discreta y Lógica 1',
    credits: 12,
    semester: 1,
    courseApproved: [],
    examApproved: [],
    category: 'Matemática'
  },
  {
    id: 'PP',
    name: 'Principios de Programación',
    description: 'Fundamentos de Programación',
    credits: 0,
    semester: 1,
    courseApproved: [],
    examApproved: [],
    category: 'Programación'
  },
  {
    id: 'MAT',
    name: 'Matemática',
    description: 'Matemática Básica',
    credits: 0,
    semester: 1,
    courseApproved: [],
    examApproved: [],
    category: 'Matemática'
  },
  {
    id: 'IT1',
    name: 'Inglés Técnico',
    description: 'Inglés Técnico 1',
    credits: 8,
    semester: 1,
    courseApproved: [],
    examApproved: [],
    category: 'Ciencias Sociales'
  },

  // Semestre 2
  {
    id: 'SO',
    name: 'Sistemas Operativos',
    description: 'Sistemas Operativos',
    credits: 12,
    semester: 2,
    courseApproved: ['ARQ'],
    examApproved: [],
    category: 'Arquitectura, Sistemas Operativos y Redes'
  },
  {
    id: 'DL2',
    name: 'Discreta y Lógica 2',
    description: 'Matemática Discreta y Lógica 2',
    credits: 6,
    semester: 2,
    courseApproved: ['DL1'],
    examApproved: [],
    category: 'Matemática'
  },
  {
    id: 'EDA',
    name: 'Estructuras de Datos y Algorit.',
    description: 'Estructuras de Datos y Algoritmos',
    credits: 16,
    semester: 2,
    courseApproved: ['DL1', 'PP'],
    examApproved: [],
    category: 'Programación'
  },
  {
    id: 'BD1',
    name: 'Bases de Datos 1',
    description: 'Fundamentos de Bases de Datos',
    credits: 12,
    semester: 2,
    courseApproved: ['PP'],
    examApproved: [],
    category: 'Bases de Datos y Sistemas de Información'
  },
  {
    id: 'IT2',
    name: 'Inglés Técnico 2',
    description: 'Inglés Técnico 2',
    credits: 4,
    semester: 2,
    courseApproved: [],
    examApproved: [],
    category: 'Ciencias Sociales'
  },

  // Semestre 3
  {
    id: 'RC',
    name: 'Redes de Computadoras',
    description: 'Redes de Computadoras',
    credits: 12,
    semester: 3,
    courseApproved: ['ARQ'],
    examApproved: [],
    category: 'Arquitectura, Sistemas Operativos y Redes'
  },
  {
    id: 'PA',
    name: 'Programación Avanzada',
    description: 'Programación Avanzada',
    credits: 12,
    semester: 3,
    courseApproved: ['EDA'],
    examApproved: [],
    category: 'Programación'
  },
  {
    id: 'BD2',
    name: 'Bases de Datos 2',
    description: 'Bases de Datos Avanzadas',
    credits: 12,
    semester: 3,
    courseApproved: ['BD1'],
    examApproved: [],
    category: 'Bases de Datos y Sistemas de Información'
  },
  {
    id: 'COE',
    name: 'Comunicación Oral y Escrita',
    description: 'Comunicación Oral y Escrita',
    credits: 4,
    semester: 3,
    courseApproved: [],
    examApproved: [],
    category: 'Ciencias Sociales'
  },
  {
    id: 'CONT',
    name: 'Contabilidad',
    description: 'Contabilidad Básica',
    credits: 8,
    semester: 3,
    courseApproved: [],
    examApproved: [],
    category: 'Ciencias Sociales'
  },

  // Semestre 4
  {
    id: 'AI',
    name: 'Administración de Infraestruc.',
    description: 'Administración de Infraestructura',
    credits: 8,
    semester: 4,
    courseApproved: ['RC'],
    examApproved: ['SO'],
    category: 'Arquitectura, Sistemas Operativos y Redes'
  },
  {
    id: 'PE',
    name: 'Probabilidad y Estadística',
    description: 'Probabilidad y Estadística',
    credits: 8,
    semester: 4,
    courseApproved: [],
    examApproved: ['DL1', 'DL2'],
    category: 'Matemática'
  },
  {
    id: 'IS',
    name: 'Ingeniería de Software',
    description: 'Ingeniería de Software',
    credits: 12,
    semester: 4,
    courseApproved: ['PA','BD2'],
    examApproved: ['EDA','BD1'],
    category: 'Desarrollo de Software'
  },
  {
    id: 'PAP',
    name: 'Programación de Aplicaciones',
    description: 'Programación de Aplicaciones',
    credits: 16,
    semester: 4,
    courseApproved: ['BD2','PA'],
    examApproved: ['BD1','EDA'],
    category: 'Programación'
  },
  {
    id: 'RPL',
    name: 'Relaciones Pers. Y Lab.',
    description: 'Relaciones Personales y Laborales',
    credits: 4,
    semester: 4,
    courseApproved: [],
    examApproved: [],
    category: 'Ciencias Sociales'
  }
  ,
  {
    id: 'RIA',
    name: 'Taller de Aplicaciones de Internet Ricas',
    description: 'Taller de Aplicaciones de Internet Ricas',
    credits: 4,
    semester: 5,
    courseApproved: ['PA'],
    examApproved: [],
    category: 'Programación'
  }
  ,
  {
    id: 'JAVA',
    name: 'Taller de Sistemas de Información Java EE',
    description: 'Taller de Sistemas de Información Java EE',
    credits: 12,
    semester: 5,
    courseApproved: ['PA','BD1','BD2'],
    examApproved: [],
    category: 'Programación'
  }
  ,
  {
    id: 'INFRA2',
    name: 'Administración de Infraestructuras 2',
    description: 'Administración de Infraestructuras 2',
    credits: 12,
    semester: 5,
    courseApproved: ['AI'],
    examApproved: ['ARQ','RC','SO'],
    category: 'Arquitectura, Sistemas Operativos y Redes'
  }
  ,
  {
    id: 'PAS',
    name: 'Pasantía Laboral',
    description: 'Pasantía Laboral',
    credits: 10,
    semester: 5,
    courseApproved: [],
    examApproved: ['PP','EDA','PA','ARQ','SO','RC','BD1','BD2'], //Principios de Programación, Estructuras de Datos y Algoritmos, Programación Avanzada, Arquitectura de Computadoras, Sistemas Operativos, Redes de Computadoras, Base de Datos 1, Base de Datos 2
    category: 'Proyecto y Pasantía Laboral'
  }
  ,
  {
    id: 'PHP',
    name: 'Taller de Desarrollo de Aplicaciones Web con PHP',
    description: 'Taller de Desarrollo de Aplicaciones Web con PHP',
    credits: 12,
    semester: 5,
    courseApproved: ['PA','BD1','BD2'],
    examApproved: [], 
    category: 'Programación'
  }
  ,
  {
    id: 'APPS',
    name: 'Taller de Aplicaciones para Dispositivos Móviles',
    description: 'Taller de Aplicaciones para Dispositivos Móviles',
    credits: 4,
    semester: 5,
    courseApproved: [],
    examApproved: ['PA','BD1'], 
    category: 'Programación'
  }
  ,
  {
    id: 'GC',
    name: 'Sistemas de Gestión de Contenidos',
    description: 'Sistemas de Gestión de Contenidos',
    credits: 4,
    semester: 6,
    courseApproved: ['PA','RIA'],
    examApproved: [], 
    category: 'Programación'
  }
  ,
  {
    id: '.NET',
    name: 'Taller de Sistemas de Información .NET',
    description: 'Taller de Sistemas de Información .NET',
    credits: 12,
    semester: 6,
    courseApproved: ['PA','BD1','BD2'],
    examApproved: [], 
    category: 'Programación'
  }
  ,
  {
    id: 'ISC',
    name: 'Introducción a los Sistemas de Control',
    description: 'Introducción a los Sistemas de Control',
    credits: 12,
    semester: 6,
    courseApproved: ['AI'],
    examApproved: ['ARQ','SO','RC'], 
    category: 'Arquitectura, Sistemas Operativos y Redes'
  }
  ,
  {
    id: 'GI',
    name: 'Taller de Gestión de la Innovación en Tecnología',
    description: 'Taller de Gestión de la Innovación en Tecnología',
    credits: 6,
    semester: 6,
    courseApproved: [],
    examApproved: [], 
    category: 'Ciencias Sociales'
  }
  ,
  {
    id: 'IV',
    name: 'Introducción al Desarrollo de Juegos',
    description: 'Introducción al Desarrollo de Juegos',
    credits: 4,
    semester: 6,
    courseApproved: ['PA','MDL2','BD2'],
    examApproved: [], 
    category: 'Programación'
  }
  ,
  {
    id: 'PRY',
    name: 'Proyecto',
    description: 'Proyecto',
    credits: 20,
    semester: 6,
    courseApproved: [],
    examApproved: ['ARQ', 'DL1', 'PP', 'MAT', 'IT1', 'SO', 'DL2', 'EDA', 'BD1', 'IT2', 'RC', 'PA', 'BD2', 'COE', 'CONT', 'AI', 'PE', 'IS', 'PAP', 'RPL'],//Todas las materias de semestre 1 a 4  
    category: 'Proyecto y Pasantía Laboral'
  }
  ,
  
]; 