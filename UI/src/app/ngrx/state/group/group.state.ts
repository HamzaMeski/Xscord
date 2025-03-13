import {GroupResponse} from "../../../core/types/server/group.types";


export interface GroupsState {
	newGroup: {
		group: GroupResponse | null,
		loading: boolean,
		error: string | null
	},

	getGroup: {
		group: GroupResponse | null,
		loading: boolean,
		error: string | null
	},

	getServerGroups: {
		groups: GroupResponse[] | null,
		loading: boolean,
		error: string | null
	},

	deletion: {
		loading: boolean,
		error: string | null
	}
}

export const initialGroupsState: GroupsState = {
	newGroup: {
		group: null,
		loading: false,
		error: null
	},

	getGroup: {
		group: null,
		loading: false,
		error: null
	},

	getServerGroups: {
		groups: null,
		loading: false,
		error: null
	},

	deletion: {
		loading: false,
		error: null
	}
}
