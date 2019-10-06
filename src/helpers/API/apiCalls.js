import {get} from "./generalCalls";

const baseUrl = 'https://api.sandbox.voice123.com/providers/search/?service=voice_over&';


export function apiCall(searchText, page) {
    return get(baseUrl + 'keywords=' + encodeURIComponent(searchText.trim()) + '&page=' + encodeURIComponent(page))
}
