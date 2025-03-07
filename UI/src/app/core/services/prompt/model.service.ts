import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";


interface Message {
	role: 'user'
	content: string
}

interface ChatCompletionRequest {
	model: string
	messages: Message[]
}

interface ChatCompletionResponse {
	choices: {
		message: Message
	}[];
}

@Injectable({
	providedIn: 'root'
})
export class ModelService {
	private readonly API_URL = 'https://openrouter.ai/api/v1/chat/completions'
	private readonly MODEL = 'openchat/openchat-7b:free'

	constructor(private http: HttpClient) {}

	generateResponse(prompt: string): Observable<ChatCompletionResponse> {
		const payload: ChatCompletionRequest = {
			model: this.MODEL,
			messages: [
				{
					role: 'user',
					content: prompt
				}
			]
		};

		return this.http.post<ChatCompletionResponse>(this.API_URL, payload)
	}

}