import ApiService from '../api.service';

/**
 * Gateway for the API end point "document"
 * @class
 * @extends ApiService
 */
class DocumentApiService extends ApiService {
    constructor(httpClient, loginService, apiEndpoint = 'document') {
        super(httpClient, loginService, apiEndpoint);
        this.name = 'documentService';
    }

    createDocument(orderId,
        documentTypeName,
        documentConfig = {},
        referencedDocumentId = null,
        additionalParams = {},
        additionalHeaders = {}) {
        const route = `/_action/order/${orderId}/document/${documentTypeName}`;
        const headers = this.getBasicHeaders(additionalHeaders);

        return this.httpClient
            .post(route, { config: documentConfig, referenced_document_id: referencedDocumentId }, {
                additionalParams,
                headers
            });
    }

    generateDocumentPreviewLink(orderId, orderDeepLink, documentTypeName, config, context) {
        return `${context.apiPath}/v1/_action/order/${orderId}/${orderDeepLink}/document/${documentTypeName}/preview?config=${config}`;
    }

    generateDocumentLink(documentId, documentDeepLink, context, download = false) {
        return `${context.apiPath}/v1/_action/document/${documentId}/${documentDeepLink}${download ? '?download=1' : ''}`;
    }
}

export default DocumentApiService;
