export const getIndexName = (index: string | Function) =>
    `${typeof index === 'string' ? index : index.name}algolaIndex`;
