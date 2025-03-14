
export interface ServerJoinDemandRequest {
	serverId: number,
	receiverId: number,
	isInvitationLink: boolean
}

export interface ServerJoinDemandResponse {
	id: number,
	serverId: number,
	receiverId: number,
	isInvitationLink: boolean,
	accepted: boolean,
	createdAt: Date,
	updatedAt: Date
}
