export const levels = [
    {
        level: 1,
        container: [
            { id: 1, initialScoops: [0, 1, 2, 1], parentId: 0 },
            { id: 2, initialScoops: [0, 0, 2, 2], parentId: 0 },
            { id: 3, initialScoops: [2, 0, 1, 1], parentId: 0 },
            { id: 4, initialScoops: [], parentId: 1 },
            { id: 5, initialScoops: [], parentId: 1 }
        ]
    },
    {
        level: 2,
        container: [
            { id: 1, initialScoops: [4, 1, 2, 1], parentId: 0 },
            { id: 2, initialScoops: [4, 4, 2, 2], parentId: 0 },
            { id: 3, initialScoops: [2, 4, 1, 1], parentId: 1 },
            { id: 4, initialScoops: [], parentId: 0 },
            { id: 5, initialScoops: [], parentId: 1 }
        ]
    },
    {
        level: 3,
        container: [
            { id: 1, initialScoops: [3, 1, 2, 5], parentId: 0 },
            { id: 2, initialScoops: [3, 3, 2, 5], parentId: 0 },
            { id: 3, initialScoops: [5, 1, 3, 2], parentId: 1 },
            { id: 4, initialScoops: [], parentId: 0 },
            { id: 5, initialScoops: [], parentId: 1 }
        ]
    },
    {
        level: 4,
        container: [
            { id: 1, initialScoops: [6, 4, 2, 5], parentId: 0 },
            { id: 2, initialScoops: [6, 6, 2, 5], parentId: 0 },
            { id: 3, initialScoops: [5, 4, 6, 2], parentId: 1 },
            { id: 4, initialScoops: [], parentId: 0 },
            { id: 5, initialScoops: [], parentId: 1 }
        ]
    },
    {
        level: 5,
        container: [
            { id: 1, initialScoops: [7, 5, 3, 4], parentId: 0 },
            { id: 2, initialScoops: [7, 7, 3, 4], parentId: 0 },
            { id: 3, initialScoops: [4, 5, 7, 3], parentId: 1 },
            { id: 4, initialScoops: [], parentId: 0 },
            { id: 5, initialScoops: [], parentId: 1 }
        ]
    },
    {
        level: 6,
        container: [
            { id: 1, initialScoops: [8, 6, 4, 7], parentId: 0 },
            { id: 2, initialScoops: [8, 8, 4, 7], parentId: 0 },
            { id: 3, initialScoops: [7, 6, 8, 4], parentId: 1 },
            { id: 4, initialScoops: [], parentId: 0 },
            { id: 5, initialScoops: [], parentId: 1 }
        ]
    },
    {
        level: 7,
        container: [
            { id: 1, initialScoops: [8, 7, 5, 6], parentId: 0 },
            { id: 2, initialScoops: [8, 8, 5, 6], parentId: 0 },
            { id: 3, initialScoops: [6, 7, 8, 5], parentId: 1 },
            { id: 4, initialScoops: [], parentId: 0 },
            { id: 5, initialScoops: [], parentId: 1 }
        ]
    }
];
