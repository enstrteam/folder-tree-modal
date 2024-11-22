export const mockFolders = [
    {
      id: 1,
      name: 'Папка 1',
      children: [
        { id: 2, name: 'Папка 1.1', children: [] },
        {
          id: 3,
          name: 'Папка 1.2',
          children: [
            { id: 4, name: 'Папка 1.2.1', children: [
                {id: 6, name: 'Папка 1.2.1.1', children: []},
                {id: 7, name: 'Папка 1.2.1.2', children: []},
                {id: 8, name: 'Папка 1.2.1.3', children: []},
            ] },
          ],
        },
      ],
    },
    { id: 5, name: 'Папка 2', children: [
        { id: 9, name: 'Папка 2.1', children: []},
    ] },
  ];