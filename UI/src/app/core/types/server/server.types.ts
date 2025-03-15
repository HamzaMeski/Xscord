
export interface ServerRequest {
	name: string,
	description: string
}

export interface ServerResponse {
	id: number,
	individualId: number,
	name: string,
	description: string,
	createdAt: Date,
	updatedAt: Date
}
