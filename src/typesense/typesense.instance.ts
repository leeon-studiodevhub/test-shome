import { CollectionCreateSchema } from 'typesense/lib/Typesense/Collections';
import { TypesenseClient } from './typesense';

export function getTypesenseConfig(host: string = 'localhost',
    port: number = 8108,
    protocol: string = 'http',
    apiKey: string,
    schema: CollectionCreateSchema) {
    
    const typesenseConfig = {
        nodes: [
            {
                host,
                port,
                protocol,
            },
        ],
        apiKey,
        connectionTimeoutSeconds: 2,
    };

    return new TypesenseClient(
        typesenseConfig,
        schema,
    );
}