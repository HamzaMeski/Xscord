
export interface ServerJoinDemandRequest {
	serverId: number,
	receiverId: number,
	invitationLink: string
}

export interface ServerJoinDemandResponse {
	id: number,
	serverId: number,
	serverName: string,
	receiverId: number,
	invitationLink: string,
	accepted: boolean,
	createdAt: Date,
	updatedAt: Date
}
